import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/try-on-status")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const { jobId } = await request.json();
          
          if (!jobId) {
            return Response.json({ success: false, error: "Missing jobId." }, { status: 400 });
          }

          const apiKey = process.env.TRYITON_API_KEY || "";

          // Handle mock job status check
          if (jobId.startsWith("mock_job_") || !apiKey || apiKey === "mock" || apiKey === "demo") {
            console.log(`[Local server API] Processing mock job status for jobId=${jobId}`);
            return Response.json({ success: true, status: "completed", isSample: true });
          }

          console.log(`[Local server API] Forwarding status check to TryItOn for jobId=${jobId}`);

          const response = await fetch(`https://tryiton.now/api/v1/status/${jobId}`, {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${apiKey}`,
            },
          });

          if (!response.ok) {
            console.error(`[Local server API] Status check failed: HTTP ${response.status}`);
            return Response.json(
              { success: false, error: "Could not retrieve preview status." },
              { status: response.status }
            );
          }

          const resJson = await response.json();
          const providerStatus = resJson.status;

          if (providerStatus === "completed") {
            const outputUrls = resJson.outputUrls ?? resJson.output_urls ?? [];
            const resultImageUrl = outputUrls[0] ?? resJson.resultUrl ?? resJson.result_url;
            return Response.json({
              success: true,
              status: "completed",
              resultImageUrl
            });
          }

          if (providerStatus === "failed") {
            return Response.json({
              success: false,
              status: "failed",
              error: resJson.error || "We couldn't create your preview."
            });
          }

          return Response.json({
            success: true,
            status: "processing"
          });
        } catch (error: any) {
          console.error("[Local server API status] exception:", error.message || error);
          return Response.json({ success: false, error: "Internal server error." }, { status: 500 });
        }
      }
    }
  }
});
