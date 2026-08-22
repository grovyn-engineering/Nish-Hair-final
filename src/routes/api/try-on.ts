import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/try-on")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const { image, hairstyle, color, length } = body;

          // ── Priority 1: Custom external backend ──────────────────────────────
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

          // ── Priority 2: TryItOn API key ──────────────────────────────────────
          const apiKey = process.env.TRYITON_API_KEY || "";

          if (!apiKey || apiKey === "mock" || apiKey === "demo") {
            console.warn("[Local server API] TRYITON_API_KEY is not configured or set to mock. Returning mock job.");
            return Response.json({ success: true, jobId: `mock_job_${hairstyle.replace(/\s+/g, "_").toLowerCase()}` });
          }

          const haircutMap: Record<string, string> = {
            "Beach Waves": "LongWavy",
            "Long Straight": "LongStraight",
            "Curly": "LongCurly",
            "Bob": "BobCut",
            "Layered": "WavyShag",
          };

          const colorMap: Record<string, string> = {
            "Black": "jet black",
            "Brunette": "dark chocolate brown",
            "Blonde": "honey blonde with golden highlights",
          };

          const haircut = haircutMap[hairstyle] || "LongStraight";
          const hairColor = colorMap[color] || color.toLowerCase();

          console.log(`[Local server API] Forwarding try-on request to TryItOn: haircut=${haircut}, hairColor=${hairColor}`);

          const response = await fetch("https://tryiton.now/api/v1/tryon/hairstyle", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              face_image: image,
              haircut: haircut,
              hair_color: hairColor,
              num_samples: 1,
            }),
          });

          if (!response.ok) {
            const errText = await response.text().catch(() => "");
            console.error(`[Local server API] TryItOn failed with status ${response.status}:`, errText.slice(0, 300));

            if (response.status === 403 || response.status === 401 || response.status === 402) {
              console.warn("[Local server API] Auth/credits failure. Falling back to mock job.");
              return Response.json({ success: true, jobId: `mock_job_${hairstyle.replace(/\s+/g, "_").toLowerCase()}` });
            }

            return Response.json(
              { success: false, error: "AI service failed. Please try again." },
              { status: response.status }
            );
          }

          const resJson = await response.json();
          return Response.json({
            success: true,
            jobId: resJson.jobId || resJson.job_id,
          });
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

