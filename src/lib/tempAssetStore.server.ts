/**
 * In-memory, short-lived store for exposing an uploaded photo at a real URL.
 *
 * Why this exists: VModel's `google/nano-banana` model requires `img_urls`
 * entries to be real, publicly-fetchable HTTP(S) URLs — it rejects inline
 * `data:` URIs. The user's photo only exists as a `data:` URL inside the
 * try-on request, so we register it here under a random id, serve it back
 * out via `/api/generation-assets/[id]`, and pass that URL to VModel instead.
 * Entries expire quickly since these are only needed for the few seconds it
 * takes VModel to fetch them once.
 *
 * This is process-local memory — fine for a single server instance handling
 * the request end-to-end, but won't survive a restart or be shared across
 * multiple server instances/replicas. Good enough for the current single
 * Docker/Dokploy deployment; a multi-instance deployment would want a shared
 * store (e.g. Redis, or actual object storage) instead.
 */

interface TempAsset {
  buffer: Buffer;
  mimeType: string;
  expiresAt: number;
}

const TTL_MS = 10 * 60 * 1000; // 10 minutes — plenty for a single generation call.

const store = new Map<string, TempAsset>();

function sweepExpired() {
  const now = Date.now();
  for (const [id, asset] of store) {
    if (asset.expiresAt <= now) store.delete(id);
  }
}

/** Registers a photo buffer and returns an id to build a fetchable URL from. */
export function registerTempAsset(buffer: Buffer, mimeType: string): string {
  sweepExpired();
  const id = crypto.randomUUID();
  store.set(id, { buffer, mimeType, expiresAt: Date.now() + TTL_MS });
  return id;
}

/** Looks up a previously registered asset. Returns undefined if missing/expired. */
export function getTempAsset(id: string): { buffer: Buffer; mimeType: string } | undefined {
  sweepExpired();
  const asset = store.get(id);
  if (!asset) return undefined;
  return { buffer: asset.buffer, mimeType: asset.mimeType };
}
