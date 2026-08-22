export interface TryOnRequest {
  image: string; // base64 data URL
  hairstyle: string;
  color: string;
  length: string;
}

export interface TryOnResponse {
  success: boolean;
  jobId?: string;
  /** Present when the backend responds synchronously with the finished image. */
  resultImageUrl?: string;
  error?: string;
}

export interface StatusResponse {
  success: boolean;
  status: "completed" | "processing" | "failed";
  resultImageUrl?: string;
  isSample?: boolean;
  error?: string;
}

/**
 * Sends the image + hairstyle params directly to VITE_EXTERNAL_API_URL (client-side)
 * and returns the result image immediately — no server route, no polling.
 */
async function callExternalBackend(data: TryOnRequest): Promise<TryOnResponse> {
  const url = import.meta.env.VITE_EXTERNAL_API_URL as string;
  console.log(`[tryOnService] Calling external backend directly: ${url}`);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => "");
    console.error(`[tryOnService] External backend ${response.status}:`, errText.slice(0, 200));
    return {
      success: false,
      error: `Backend returned ${response.status}. Please try again.`,
    };
  }

  const resJson = await response.json();

  // Accept whichever field name the backend uses for the result image
  const resultImageUrl: string | undefined =
    resJson.resultImageUrl ??
    resJson.result_image_url ??
    resJson.imageUrl ??
    resJson.url ??
    resJson.image ??
    undefined;

  if (!resultImageUrl) {
    console.error("[tryOnService] External backend returned no image field:", JSON.stringify(resJson).slice(0, 200));
    return { success: false, error: "Backend returned an unrecognised response. Please try again." };
  }

  return { success: true, jobId: "ext_done", resultImageUrl };
}

/**
 * Main entry point. If VITE_EXTERNAL_API_URL is configured the request goes
 * directly from the browser to that URL (no server hop). Otherwise it falls
 * through to the existing /api/try-on server route.
 */
export async function generateTryOn(data: TryOnRequest): Promise<TryOnResponse> {
  // ── Direct browser → external backend ─────────────────────────────────────
  if (import.meta.env.VITE_EXTERNAL_API_URL) {
    return callExternalBackend(data);
  }

  // ── Existing server-side route (TryItOn / mock) ────────────────────────────
  try {
    const endpoint = `/api/try-on`;
    console.log(`[tryOnService] Calling local server API: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const resJson = await response.json();
    if (response.ok && resJson.success) {
      return {
        success: true,
        jobId: resJson.jobId,
        resultImageUrl: resJson.resultImageUrl,
      };
    }

    return {
      success: false,
      error: resJson.error || "We couldn't create your preview right now. Please try again.",
    };
  } catch (error: any) {
    console.error("[tryOnService] generateTryOn connection error:", error.message || error);
    return {
      success: false,
      error: "We couldn't create your preview right now. Please try again.",
    };
  }
}



/**
 * Frontend client service to check the status of a try-on job via local server API.
 */
export async function checkTryOnStatus(jobId: string): Promise<StatusResponse> {
  // Bypassed mock job status check
  if (jobId.startsWith("mock_job_")) {
    return {
      success: true,
      status: "completed",
      isSample: true
    };
  }

  try {
    const endpoint = `/api/try-on-status`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ jobId })
    });

    const resJson = await response.json();
    if (response.ok) {
      return {
        success: true,
        status: resJson.status,
        resultImageUrl: resJson.resultImageUrl,
        isSample: resJson.isSample,
        error: resJson.error
      };
    }

    return {
      success: false,
      status: "failed",
      error: resJson.error || "Could not retrieve preview status."
    };
  } catch (error: any) {
    console.error("[tryOnService] checkTryOnStatus connection error:", error.message || error);
    return {
      success: false,
      status: "failed",
      error: "Could not retrieve preview status."
    };
  }
}
