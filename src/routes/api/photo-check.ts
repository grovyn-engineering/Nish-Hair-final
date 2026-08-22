import { createFileRoute } from "@tanstack/react-router";

/**
 * Server-side proxy for the Velura photo validation backend.
 * The browser calls /api/photo-check and this route forwards it
 * to the internal photo-check-backend service — no localhost hardcoding
 * in the client bundle.
 *
 * If PHOTO_CHECK_BACKEND_URL is not set, validation is skipped and
 * the request is passed through as ok (useful for Vercel / environments
 * where the backend is not available).
 */
export const Route = createFileRoute("/api/photo-check")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const backendUrl = process.env.PHOTO_CHECK_BACKEND_URL || "";

        // No backend configured — skip validation and pass through
        if (!backendUrl) {
          console.warn("[photo-check proxy] PHOTO_CHECK_BACKEND_URL not set, skipping validation.");
          return Response.json({ ok: true });
        }

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
          // Fail open — don't block the user if the backend is unreachable
          return Response.json({ ok: true });
        }
      },
    },
  },
});
