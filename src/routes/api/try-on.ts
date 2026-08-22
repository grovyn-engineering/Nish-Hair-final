import { createFileRoute } from "@tanstack/react-router";
import { generateWithVModel } from "@/lib/vmodelService.server";

export const Route = createFileRoute("/api/try-on")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { image, hairstyle, color, length } = body;

          // ── Priority 1: VModel (google/nano-banana), ported from Velura ──────
          if (process.env.VMODEL_API_KEY) {
            try {
              console.log("[Local server API] Generating via VModel (google/nano-banana).");
              const { imageUrl } = await generateWithVModel({
                photoDataUrl: image,
                hairstyle,
                color,
                length,
                request,
              });
              return Response.json({ success: true, jobId: "vmodel_done", resultImageUrl: imageUrl });
            } catch (err: any) {
              // Falls through to the next configured tier rather than failing
              // the request outright — mirrors Velura's tiered fallback.
              console.error("[Local server API] VModel tier failed:", err.message || err);
            }
          }

          // ── Priority 2: Custom external backend ──────────────────────────────
          const externalApiUrl = process.env.EXTERNAL_API_URL || "";
          if (externalApiUrl) {
            console.log(`[Local server API] Forwarding to custom EXTERNAL_API_URL: ${externalApiUrl}`);
            const extResponse = await fetch(externalApiUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ image, hairstyle, color, length }),
            });

            if (!extResponse.ok) {
              const errText = await extResponse.text().catch(() => "");
              console.error(`[Local server API] External backend responded ${extResponse.status}:`, errText.slice(0, 300));
              return Response.json(
                { success: false, error: `External backend error (${extResponse.status}). Please try again.` },
                { status: extResponse.status }
              );
            }

            const extJson = await extResponse.json();

            // Accept either a URL or a base64 image in the response
            const resultImageUrl: string | undefined =
              extJson.resultImageUrl ??
              extJson.result_image_url ??
              extJson.imageUrl ??
              extJson.url ??
              extJson.image ??   // base64 data URL also works
              undefined;

            if (!resultImageUrl) {
              console.error("[Local server API] External backend returned no image field:", JSON.stringify(extJson).slice(0, 300));
              return Response.json(
                { success: false, error: "External backend returned an unrecognised response format." },
                { status: 502 }
              );
            }

            // Return as an already-completed job so the frontend skips polling
            return Response.json({
              success: true,
              jobId: "ext_done",
              resultImageUrl,
            });
          }

          // ── No backend configured — return mock job ───────────────────────────
          console.warn("[Local server API] No VMODEL_API_KEY or EXTERNAL_API_URL configured. Returning mock job.");
          return Response.json({ success: true, jobId: `mock_job_${hairstyle.replace(/\s+/g, "_").toLowerCase()}` });
        } catch (error: any) {
          console.error("[Local server API] catch exception:", error.message || error);
          return Response.json(
            { success: false, error: "Internal server error." },
            { status: 500 }
          );
        }
      },
    },
  },
});
