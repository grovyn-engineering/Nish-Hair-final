import crypto from "node:crypto";
import { looks } from "@/data/looks";
import { HAIRSTYLE_PROMPTS, COLOR_PROMPTS, LENGTH_PROMPTS } from "@/config/hairstyles";

/**
 * VModel's `google/nano-banana` model
 * (https://vmodel.ai/models/google/nano-banana/), which is Google's Gemini
 * 2.5 Flash Image ("Nano Banana") hosted through VModel's own API. Ported
 * over from the Velura project's `src/lib/generation/vmodel.ts`, adapted to
 * this app's hairstyle/color/length request shape.
 *
 * VModel follows a Replicate-style "create task, then poll" pattern:
 *   1. POST /api/tasks/v1/create  ->  { task_id }
 *   2. GET  /api/tasks/v1/get/{task_id}  ->  { status, output }  (poll until settled)
 *
 * IMPORTANT: `img_urls` requires real, publicly-fetchable HTTP(S) URLs —
 * inline `data:` URIs are rejected with a generic 400.
 *
 * Any number of images can be sent per generation:
 *   1. The user's own photo — only exists as a `data:` URL inside the
 *      request, so it's briefly uploaded to Cloudinary and deleted again
 *      once the task settles (success, failure, or timeout).
 *   2+. The product's own reference photo(s) — `Look.image` plus any extra
 *      `Look.references` in `src/data/looks.ts` — these
 *      products are physical clip-in/topper pieces, so giving VModel a
 *      concrete photo of the actual piece (and, when available, a photo of
 *      it worn on a model for scale/placement) produces far more accurate
 *      results than a text description alone. A look can list multiple
 *      reference images (e.g. an isolated product shot AND an on-model
 *      shot) — all of them are sent together. These images are the same
 *      for every user, so each is uploaded to Cloudinary once per server
 *      process and the URL is cached in memory (not deleted — it's not
 *      user data, and reusing it avoids a repeat upload on every request).
 */

const CREATE_URL = "https://api.vmodel.ai/api/tasks/v1/create";
const GET_URL = (taskId: string) => `https://api.vmodel.ai/api/tasks/v1/get/${taskId}`;
// Model version for google/nano-banana, per the model's API tab.
const MODEL_VERSION = "3fdd8dc68ca68be11df2e56053a0448f94a94099808a1d61be42a7e86c6ca107";

const POLL_INTERVAL_MS = 1500;
const TASK_TIMEOUT_MS = 300_000;

// Folder for the user's own temp photo upload — deleted right after each task settles.
const CLOUDINARY_TEMP_FOLDER = "vmodel-tryon-temp";
// Folder for the (small, fixed set of) product reference photos — persisted
// and reused across requests/server restarts under a stable public_id, so
// redeploys don't pile up duplicates.
const CLOUDINARY_PRODUCT_FOLDER = "vmodel-product-references";

export interface VModelTryOnInput {
  /** The user's photo, as a base64 data URL. */
  photoDataUrl: string;
  hairstyle: string;
  color: string;
  length: string;
  /** The inbound request — used only to fetch the product reference image(s) from this same server. */
  request: Request;
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
      `VModel: task creation response missing task_id. Raw response: ${JSON.stringify(json)}`,
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
      "VModel: Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
    );
  }
  return { cloudName, apiKey, apiSecret };
}

/** Signs a set of Cloudinary API params per their documented signing scheme. */
function signCloudinaryParams(params: Record<string, string>, apiSecret: string): string {
  const toSign = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");
  return crypto
    .createHash("sha1")
    .update(toSign + apiSecret)
    .digest("hex");
}

/**
 * Uploads a `data:` URL (or a real http(s) URL — Cloudinary fetches it
 * itself) to Cloudinary and returns its public URL + public_id.
 */
async function uploadToCloudinary(
  fileSource: string,
  folder: string,
  publicId?: string,
): Promise<{ url: string; publicId: string }> {
  const { cloudName, apiKey, apiSecret } = getCloudinaryConfig();

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const signParams: Record<string, string> = { folder, timestamp };
  if (publicId) signParams.public_id = publicId;
  // Overwrite + a stable public_id means redeploys reuse the same asset
  // instead of accumulating duplicates for the product reference photos.
  if (publicId) signParams.overwrite = "true";
  const signature = signCloudinaryParams(signParams, apiSecret);

  const form = new FormData();
  form.append("file", fileSource);
  form.append("api_key", apiKey);
  form.append("timestamp", timestamp);
  form.append("folder", folder);
  if (publicId) {
    form.append("public_id", publicId);
    form.append("overwrite", "true");
  }
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
      `VModel: Cloudinary upload response missing secure_url/public_id. Raw response: ${JSON.stringify(json)}`,
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

// In-memory cache of "lookId-index" -> the Cloudinary URL for that reference
// photo, so each product image is only ever uploaded once per server
// process. Stores the in-flight promise (not just the resolved value) so
// concurrent requests for the same image share one upload instead of racing
// duplicate uploads.
const productReferenceCache = new Map<string, Promise<string>>();

/**
 * Resolves one look reference photo to a Cloudinary URL VModel can fetch,
 * uploading (and caching) it on first use. The image is fetched from this
 * same server first — that's a same-process/internal fetch, so it works
 * fine against `localhost` in local dev; it's only VModel's *own* fetch of
 * the final Cloudinary URL that needs public reachability.
 */
async function uploadSingleProductReference(
  cacheKey: string,
  imagePath: string,
  request: Request,
): Promise<string> {
  const cached = productReferenceCache.get(cacheKey);
  if (cached) return cached;

  const upload = (async () => {
    const absoluteImageUrl = new URL(imagePath, new URL(request.url).origin).toString();
    const imgRes = await fetch(absoluteImageUrl);
    if (!imgRes.ok) {
      throw new Error(
        `VModel: failed to fetch product reference image at ${absoluteImageUrl} (status ${imgRes.status}).`,
      );
    }
    const contentType = imgRes.headers.get("content-type") ?? "image/jpeg";
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const dataUrl = `data:${contentType};base64,${buffer.toString("base64")}`;

    const { url } = await uploadToCloudinary(dataUrl, CLOUDINARY_PRODUCT_FOLDER, cacheKey);
    return url;
  })();

  // Cache the promise immediately so concurrent callers await the same upload.
  productReferenceCache.set(cacheKey, upload);
  upload.catch(() => productReferenceCache.delete(cacheKey)); // don't cache failures
  return upload;
}

/** Resolves every reference image for a look, in order, uploading/caching each individually. */
async function getProductReferenceUrls(
  lookId: string,
  imagePaths: string[],
  request: Request,
): Promise<string[]> {
  return Promise.all(
    imagePaths.map((imagePath, index) =>
      uploadSingleProductReference(`${lookId}-${index}`, imagePath, request),
    ),
  );
}

function buildPrompt(
  hairstyle: string,
  color: string,
  length: string,
  referenceImageCount: number,
): string {
  const styleInstruction =
    HAIRSTYLE_PROMPTS[hairstyle] ?? `Edit only the hair to show the following: ${hairstyle}.`;
  const colorPart = COLOR_PROMPTS[color] ?? color;
  const lengthPart = LENGTH_PROMPTS[length] ?? length;

  const preservationClause =
    "Do not brighten, relight, retouch, or beautify the face — keep the exact same exposure, brightness, contrast, and light direction/color as the first photo, including any shadows on the face. Do not rotate, tilt, or otherwise change the head pose, camera angle, or face orientation — the head must face the exact same direction at the exact same angle as in the first photo. Preserve the person's face, identity, skin tone, expression, background, and framing from the first photo exactly as-is — change nothing except as instructed below.";

  const base =
    referenceImageCount > 0
      ? `The first image is a photo of a person; treat it as the base image and edit it in place — do not recrop, reframe, or regenerate it from scratch. ${styleInstruction}`
      : `Do not recrop, reframe, or regenerate this photo from scratch — treat it as the base image and edit it in place. ${styleInstruction}`;

  const extraReferenceNote =
    referenceImageCount > 1
      ? " Additional reference images are included beyond the second one — use all of them together as the visual target for the exact color, texture, scale, and how the piece sits when worn."
      : "";

  return `${base}${extraReferenceNote} Render the added piece in ${colorPart}, ${lengthPart} ${preservationClause}`;
}

export async function generateWithVModel({
  photoDataUrl,
  hairstyle,
  color,
  length,
  request,
}: VModelTryOnInput): Promise<VModelTryOnOutput> {
  const apiKey = process.env.VMODEL_API_KEY;
  if (!apiKey) throw new Error("VModel: VMODEL_API_KEY is not configured.");

  const { url: photoUrl, publicId } = await uploadToCloudinary(
    photoDataUrl,
    CLOUDINARY_TEMP_FOLDER,
  );

  try {
    const look = looks.find((l) => l.name === hairstyle);

    const imgUrls = [photoUrl];
    if (look) {
      // Always includes the look's main `image`, plus any extra
      // `references` (e.g. an on-model shot) defined for it.
      const referencePaths = [look.image, ...(look.references ?? [])];
      try {
        const productImageUrls = await getProductReferenceUrls(look.id, referencePaths, request);
        imgUrls.push(...productImageUrls);
      } catch (err) {
        // Fall back to a single-image, text-only prompt rather than failing
        // the whole generation over a reference-image hiccup.
        console.error(
          "[vmodel] Failed to prep product reference image(s), continuing without them:",
          err,
        );
      }
    }

    const instruction = buildPrompt(hairstyle, color, length, imgUrls.length - 1);

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
          img_urls: imgUrls,
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
      throw new Error(`VModel: task creation failed with status ${createRes.status}. ${bodyText}`);
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
          `VModel: task ended with status "${status}". Raw response: ${JSON.stringify(getJson)}`,
        );
      }
      // status is pending/processing/starting — keep polling.
    }
  } finally {
    // Fire-and-forget cleanup of the user's own photo — don't let a
    // slow/failed delete hold up the response. The product reference
    // image(s) are intentionally NOT deleted here — they're cached and reused.
    void deleteFromCloudinary(publicId);
  }
}
