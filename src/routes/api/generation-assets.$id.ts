import { createFileRoute } from "@tanstack/react-router";
import { getTempAsset } from "@/lib/tempAssetStore.server";

/**
 * Serves a photo temporarily re-hosted by the VModel try-on tier (see
 * `src/lib/vmodelService.server.ts`), so VModel's API can fetch the user's
 * photo at a real HTTP(S) URL instead of an inline `data:` URI.
 */
export const Route = createFileRoute("/api/generation-assets/$id")({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const asset = getTempAsset(params.id);
        if (!asset) {
          return new Response("Not found or expired.", { status: 404 });
        }
        return new Response(asset.buffer, {
          headers: {
            "content-type": asset.mimeType,
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
