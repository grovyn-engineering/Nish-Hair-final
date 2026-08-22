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

          // All jobs (mock or external "ext_done") are resolved immediately
          console.log(`[Local server API] Resolving status for jobId=${jobId}`);
          return Response.json({ success: true, status: "completed", isSample: true });

        } catch (error: any) {
          console.error("[Local server API status] exception:", error.message || error);
          return Response.json({ success: false, error: "Internal server error." }, { status: 500 });
        }
      }
    }
  }
});
