import { createFileRoute } from "@tanstack/react-router";

/**
 * Server-side proxy for the Velura photo validation backend.
 * The browser calls /api/photo-check and this route forwards it
 * to the internal photo-check-backend service — no localhost hardcoding
 * in the client bundle.
 */
export const Route = createFileRoute("/api/photo-check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const backendUrl = process.env.PHOTO_CHECK_BACKEND_URL || "http://photo-check-backend:8000";

        try {
          // Forward the multipart form data as-is to the backend
          const formData = await request.formData();

          const response = await fetch(`${backendUrl}/photo-check`, {
            method: "POST",
            body: formData,
          });

          const json = await response.json();

          return Response.json(json, { status: response.status });
        } catch (error: any) {
          console.error("[photo-check proxy] Failed to reach backend:", error.message || error);
          return Response.json(
            { ok: false, error: "Could not connect to validation server." },
            { status: 502 }
          );
        }
      },
    },
  },
});
