import crypto from "node:crypto";
import {
  HAIRSTYLE_PROMPTS,
  COLOR_PROMPTS,
  LENGTH_PROMPTS,
} from "@/config/hairstyles";

/**
 * VModel's `google/nano-banana` model
 * (https://vmodel.ai/models/google/nano-banana/), which is Google's Gemini
 * 2.5 Flash Image ("Nano Banana") hosted through VModel's own API. Ported
 * over from the Velura project's `src/lib/generation/vmodel.ts`, adapted to
 * this app's hairstyle/color/length request shape (no per-variant overlay
 * asset here, so we always run VModel in single-reference-image mode).
 *
 * VModel follows a Replicate-style "create task, then poll" pattern:
 *   1. POST /api/tasks/v1/create  ->  { task_id }
 *   2. GET  /api/tasks/v1/get/{task_id}  ->  { status, output }  (poll until settled)
 *
 * IMPORTANT: `img_urls` requires real, publicly-fetchable HTTP(S) URLs —
 * inline `data:` URIs are rejected with a generic 400. The user's photo only
 * exists as a `data:` URL at this point, so we briefly upload it to
 * Cloudinary and pass that URL instead, deleting it again once the task
 * settles (success, failure, or timeout). This sidesteps the local-dev
 * "VModel needs to reach a URL your dev server owns" problem entirely — no
 * ngrok tunnel or SITE_URL needed, in dev or production.
 */

const CREATE_URL = "https://api.vmodel.ai/api/tasks/v1/create";
const GET_URL = (taskId: string) => `https://api.vmodel.ai/api/tasks/v1/get/${taskId}`;
// Model version for google/nano-banana, per the model's API tab.
const MODEL_VERSION =
  "44b9310748ecdccd1dfa60d68efe35b4a6291453d5edfad417075890d55a208f";

const POLL_INTERVAL_MS = 1500;
const TASK_TIMEOUT_MS = 300_000;

// Folder the temp uploads live under in your Cloudinary media library, purely
// for tidiness — every asset in it is deleted right after its VModel task
// settles, so nothing should accumulate here under normal operation.
const CLOUDINARY_TEMP_FOLDER = "vmodel-tryon-temp";

export interface VModelTryOnInput {
  /** The user's photo, as a base64 data URL. */
  photoDataUrl: string;
  hairstyle: string;
  color: string;
  length: string;
}

export interface VModelTryOnOutput {
  imageUrl: string;
}

interface VModelCreateResponse {
  task_id?: string;
  result?: { task_id?: string };
}

interface VModelGetResponse {
  status?: string;
  output?: string[] | string;
  error?: string;
  message?: string | { en?: string };
  result?: {
    status?: string;
    output?: string[] | string;
    error?: string;
    message?: string | { en?: string };
  };
}

function extractTaskId(json: VModelCreateResponse): string {
  const taskId = json.task_id ?? json.result?.task_id;
  if (!taskId) {
    throw new Error(
      `VModel: task creation response missing task_id. Raw response: ${JSON.stringify(json)}`
    );
  }
  return taskId;
}

function extractStatusAndOutput(json: VModelGetResponse) {
  const status = json.status ?? json.result?.status;
  const rawOutput = json.output ?? json.result?.output;
  const output = Array.isArray(rawOutput) ? rawOutput[0] : rawOutput;
  return { status, output };
}

function getCloudinaryConfig() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error(
      "VModel: Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }
  return { cloudName, apiKey, apiSecret };
}

/** Signs a set of Cloudinary API params per their documented signing scheme. */
function signCloudinaryParams(
  params: Record<string, string>,
  apiSecret: string
): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto.createHash("sha1").update(toSign + apiSecret).digest("hex");
}

/** Uploads a data URL to Cloudinary and returns its public URL + public_id (for later deletion). */
async function uploadToCloudinary(
  photoDataUrl: string
): Promise<{ url: string; publicId: string }> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signParams = { folder: CLOUDINARY_TEMP_FOLDER, timestamp };
  const signature = signCloudinaryParams(signParams, apiSecret);

  const form = new FormData();
  // Cloudinary's upload endpoint accepts a base64 data URI directly as `file`.
  form.append("file", photoDataUrl);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", CLOUDINARY_TEMP_FOLDER);
  form.append("signature", signature);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) {
    const bodyText = await res.text().catch(() => "<failed to read response body>");
    throw new Error(`VModel: Cloudinary upload failed with status ${res.status}. ${bodyText}`);
  }

  const json = (await res.json()) as { secure_url?: string; public_id?: string };
  if (!json.secure_url || !json.public_id) {
    throw new Error(
      `VModel: Cloudinary upload response missing secure_url/public_id. Raw response: ${JSON.stringify(json)}`
    );
  }

  return { url: json.secure_url, publicId: json.public_id };
}

/** Best-effort cleanup of a temp Cloudinary upload — logs but never throws. */
async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();
    const timestamp = Math.floor(Date.now() / 1000).toString();
    const signParams = { public_id: publicId, timestamp };
    const signature = signCloudinaryParams(signParams, apiSecret);

    const form = new FormData();
    form.append("public_id", publicId);
    form.append("api_key", apiKey);
    form.append("timestamp", timestamp);
    form.append("signature", signature);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
      method: "POST",
      body: form,
    });
    if (!res.ok) {
      console.error(`[vmodel] Failed to delete temp Cloudinary asset ${publicId}: ${res.status}`);
    }
  } catch (err) {
    console.error(`[vmodel] Failed to delete temp Cloudinary asset ${publicId}.`, err);
  }
}

function buildPrompt(hairstyle: string, color: string, length: string): string {
  const stylePart = HAIRSTYLE_PROMPTS[hairstyle] ?? hairstyle;
  const colorPart = COLOR_PROMPTS[color] ?? color;
  const lengthPart = LENGTH_PROMPTS[length] ?? length;

  const preservationClause =
    "Do not brighten, relight, retouch, or beautify the face — keep the exact same exposure, brightness, contrast, and light direction/color as the first photo, including any shadows on the face. Do not rotate, tilt, or otherwise change the head pose, camera angle, or face orientation — the head must face the exact same direction at the exact same angle as in the first photo. Preserve the person's face, identity, skin tone, expression, background, and framing from the first photo exactly as-is — change nothing except the hair.";

  return `Do not recrop, reframe, or regenerate this photo from scratch — treat it as the base image and edit it in place. Edit only the hair to show the following hairstyle: ${stylePart}, in ${colorPart}, ${lengthPart} ${preservationClause}`;
}

export async function generateWithVModel({
  photoDataUrl,
  hairstyle,
  color,
  length,
}: VModelTryOnInput): Promise<VModelTryOnOutput> {
  const apiKey = process.env.VMODEL_API_KEY;
  if (!apiKey) throw new Error("VModel: VMODEL_API_KEY is not configured.");

  const { url: photoUrl, publicId } = await uploadToCloudinary(photoDataUrl);

  try {
    const instruction = buildPrompt(hairstyle, color, length);

    const createRes = await fetch(CREATE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
        input: {
          prompt: instruction,
          img_urls: [photoUrl],
          output_format: "png",
          // "1:1" forces every input photo to be recropped to square, which
          // pushes the model toward regenerating the whole image rather than
          // editing it in place. "auto" keeps the input's own aspect ratio.
          aspect_ratio: "auto",
          // VModel's default safety checker flags face-editing prompts fairly
          // aggressively (observed on ordinary hairstyle-edit requests). Docs
          // note the website always keeps it on, but the API field itself is
          // documented as available.
          disable_safety_checker: true,
        },
      }),
    });

    if (!createRes.ok) {
      const bodyText = await createRes.text().catch(() => "<failed to read response body>");
      throw new Error(
        `VModel: task creation failed with status ${createRes.status}. ${bodyText}`
      );
    }

    const taskId = extractTaskId((await createRes.json()) as VModelCreateResponse);

    const deadline = Date.now() + TASK_TIMEOUT_MS;
    for (;;) {
      if (Date.now() > deadline) {
        throw new Error(`VModel: timed out after ${TASK_TIMEOUT_MS}ms waiting for task ${taskId}.`);
      }

      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));

      const getRes = await fetch(GET_URL(taskId), {
        headers: { Authorization: `Bearer ${apiKey}` },
      });
      if (!getRes.ok) {
        const bodyText = await getRes.text().catch(() => "<failed to read response body>");
        throw new Error(`VModel: polling failed with status ${getRes.status}. ${bodyText}`);
      }

      const getJson = (await getRes.json()) as VModelGetResponse;
      const { status, output } = extractStatusAndOutput(getJson);

      if (status === "succeeded" || status === "success") {
        if (!output) throw new Error("VModel: task succeeded but returned no output.");
        return { imageUrl: output };
      }
      if (status === "failed" || status === "error" || status === "canceled") {
        throw new Error(
          `VModel: task ended with status "${status}". Raw response: ${JSON.stringify(getJson)}`
        );
      }
      // status is pending/processing/starting — keep polling.
    }
  } finally {
    // Fire-and-forget cleanup — don't let a slow/failed delete hold up the response.
    void deleteFromCloudinary(publicId);
  }
}
