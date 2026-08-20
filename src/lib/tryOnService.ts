export interface TryOnRequest {
  image: string; // base64 data URL
  hairstyle: string;
  color: string;
  length: string;
}

export interface TryOnResponse {
  success: boolean;
  jobId?: string;
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
 * Frontend client service to call Local API Routes.
 */
export async function generateTryOn(data: TryOnRequest): Promise<TryOnResponse> {
  try {
    const endpoint = `/api/try-on`;
    
    console.log(`[tryOnService] Calling local server API: ${endpoint}`);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resJson = await response.json();
    if (response.ok && resJson.success) {
      return {
        success: true,
        jobId: resJson.jobId
      };
    }

    return {
      success: false,
      error: resJson.error || "We couldn't create your preview right now. Please try again."
    };
  } catch (error: any) {
    console.error("[tryOnService] generateTryOn connection error:", error.message || error);
    return {
      success: false,
      error: "We couldn't create your preview right now. Please try again."
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
