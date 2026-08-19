import { createFileRoute } from "@tanstack/react-router";
import { ALLOWED_HAIRSTYLES, ALLOWED_COLORS, ALLOWED_LENGTHS } from "../../config/hairstyles";

const TRYITON_BASE_URL = "https://tryiton.now";

// Provider mapping for TryItOn haircuts
const HAIRSTYLE_PROVIDER_MAP: Record<string, string> = {
  "Signature Waves": "LongWavy",
  "Long Straight": "LongStraight",
  "Soft Curls": "LongCurly",
  "Classic Bob": "BobCut",
  "Layered Volume": "WavyShag",
};

// Provider mapping for TryItOn colors (free-text description)
const COLOR_PROVIDER_MAP: Record<string, string> = {
  "Black": "jet black",
  "Dark Brown": "dark chocolate brown",
  "Chestnut": "chestnut brown with warm highlights",
  "Honey Blonde": "honey blonde with golden highlights",
};

export const Route = createFileRoute("/api/try-on")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // 1. Read request body
          let body: any;
          try {
            body = await request.json();
          } catch {
            return new Response(
              JSON.stringify({ success: false, error: "Invalid request payload." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const { image, hairstyle, color, length } = body || {};

          // 2. Validate required fields
          if (!image || !hairstyle || !color || !length) {
            return new Response(
              JSON.stringify({ success: false, error: "Missing required try-on information." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // 3. Validate hairstyle, color, and length allowlists
          if (!ALLOWED_HAIRSTYLES.includes(hairstyle)) {
            return new Response(
              JSON.stringify({ success: false, error: "Unsupported hairstyle selected." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          if (!ALLOWED_COLORS.includes(color)) {
            return new Response(
              JSON.stringify({ success: false, error: "Unsupported hair color selected." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          let normalizedLength = length;
          if (!length.endsWith('"')) {
            normalizedLength = `${length}"`;
          }

          if (!ALLOWED_LENGTHS.includes(normalizedLength)) {
            return new Response(
              JSON.stringify({ success: false, error: "Unsupported length selected." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // 4. Image Validation: base64, size limit 10MB, formats (JPEG, JPG, PNG, WEBP)
          const imageStr = String(image);
          if (imageStr.length < 50) {
            return new Response(
              JSON.stringify({ success: false, error: "Image file is too small or corrupted." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const approxSizeBytes = (imageStr.length * 3) / 4;
          if (approxSizeBytes > 10 * 1024 * 1024) {
            return new Response(
              JSON.stringify({ success: false, error: "Please upload a valid JPG, PNG or WEBP image up to 10MB." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const matches = imageStr.match(/^data:(image\/[a-zA-Z+.-]+);base64,/);
          if (!matches) {
            return new Response(
              JSON.stringify({ success: false, error: "Please upload a valid JPG, PNG or WEBP image up to 10MB." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const mimeType = matches[1];
          const allowedMimes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
          if (!allowedMimes.includes(mimeType)) {
            return new Response(
              JSON.stringify({ success: false, error: "Please upload a valid JPG, PNG or WEBP image up to 10MB." }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          // 5. Check API key configuration on the server side
          const apiKey = process.env.TRYITON_API_KEY?.trim();
          if (!apiKey) {
            console.error("[api/try-on] TRYITON_API_KEY is not configured.");
            return new Response(
              JSON.stringify({ success: false, error: "AI service is not configured." }),
              { status: 403, headers: { "Content-Type": "application/json" } }
            );
          }

          // 6. Map hairstyle and color values to provider formats
          const haircut = HAIRSTYLE_PROVIDER_MAP[hairstyle];
          const hairColor = COLOR_PROVIDER_MAP[color] || color.toLowerCase();

          console.log(`[api/try-on] Submitting TryItOn job: haircut="${haircut}", hairColor="${hairColor}"`);

          // 7. Post request to TryItOn Hairstyle API
          const submitRes = await fetch(`${TRYITON_BASE_URL}/api/v1/tryon/hairstyle`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              face_image: imageStr,
              haircut: haircut,
              hair_color: hairColor,
              num_samples: 1,
            }),
          });

          if (submitRes.status !== 201 && !submitRes.ok) {
            const errText = await submitRes.text().catch(() => "");
            console.error(`[api/try-on] TryItOn submit failed with status ${submitRes.status}:`, errText.slice(0, 300));
            
            if (submitRes.status === 403) {
              return new Response(
                JSON.stringify({ success: false, error: "AI service authentication failed. Please check your API key." }),
                { status: 403, headers: { "Content-Type": "application/json" } }
              );
            }
            if (submitRes.status === 402) {
              return new Response(
                JSON.stringify({ success: false, error: "Our AI stylist is temporarily busy. Please try again shortly." }),
                { status: 429, headers: { "Content-Type": "application/json" } }
              );
            }
            return new Response(
              JSON.stringify({ success: false, error: "We couldn't create your preview right now. Please try again." }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          const submitData = await submitRes.json();
          const jobId = submitData.jobId ?? submitData.job_id;

          if (!submitData.ok || !jobId) {
            console.error("[api/try-on] TryItOn response missing ok or jobId:", JSON.stringify(submitData));
            return new Response(
              JSON.stringify({ success: false, error: "We couldn't create your preview right now. Please try again." }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          console.log(`[api/try-on] TryItOn job created: jobId="${jobId}". Starting polling loop...`);

          // 8. Poll job status endpoint
          let attempts = 0;
          const maxAttempts = 40; // 40 attempts * 3s = 120s (2 minutes)
          let completed = false;
          let resultImageUrl = "";
          let pollError = "";

          while (attempts < maxAttempts && !completed) {
            attempts++;
            await new Promise((resolve) => setTimeout(resolve, 3000));

            try {
              const statusRes = await fetch(`${TRYITON_BASE_URL}/api/v1/status/${jobId}`, {
                method: "GET",
                headers: {
                  "Authorization": `Bearer ${apiKey}`,
                },
              });

              if (!statusRes.ok) {
                console.error(`[api/try-on] Status check failed: HTTP ${statusRes.status}`);
                continue;
              }

              const statusData = await statusRes.json();
              const providerStatus = statusData.status;

              console.log(`[api/try-on] Poll attempt ${attempts}: status="${providerStatus}"`);

              if (providerStatus === "completed") {
                const outputUrls = statusData.outputUrls ?? statusData.output_urls ?? [];
                resultImageUrl = outputUrls[0] ?? statusData.resultUrl ?? statusData.result_url;
                if (resultImageUrl) {
                  completed = true;
                } else {
                  console.error("[api/try-on] Job completed but resultImageUrl is empty:", JSON.stringify(statusData));
                  pollError = "Generation completed but no preview image was returned.";
                  completed = true;
                }
              } else if (providerStatus === "failed") {
                console.error("[api/try-on] Job failed on provider side:", statusData.error ?? statusData.message);
                pollError = "We couldn't create your preview right now. Please try again.";
                completed = true;
              }
            } catch (err: any) {
              console.error("[api/try-on] Error during polling iteration:", err.message || err);
            }
          }

          if (!completed) {
            console.error("[api/try-on] Polling timed out.");
            return new Response(
              JSON.stringify({ success: false, error: "Your preview is taking longer than expected. Please try again." }),
              { status: 504, headers: { "Content-Type": "application/json" } }
            );
          }

          if (pollError || !resultImageUrl) {
            return new Response(
              JSON.stringify({ success: false, error: pollError || "We couldn't create your preview right now. Please try again." }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          console.log(`[api/try-on] Polling succeeded. Result image URL: "${resultImageUrl}"`);
          return new Response(
            JSON.stringify({ success: true, resultImageUrl }),
            { status: 200, headers: { "Content-Type": "application/json" } }
          );

        } catch (error: any) {
          console.error("[api/try-on] Catch-all route handler error:", error.message || error);
          return new Response(
            JSON.stringify({ success: false, error: "We couldn't create your preview right now. Please try again." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      }
    }
  }
});
