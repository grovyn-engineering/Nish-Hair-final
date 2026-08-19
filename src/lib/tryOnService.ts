export interface TryOnRequest {
  image: string; // base64 data URL
  hairstyle: string;
  color: string;
  length: string;
}

export interface TryOnResponse {
  success: boolean;
  resultImageUrl?: string;
  error?: string;
}

/**
 * Frontend client service to call the secure backend try-on endpoint.
 */
export async function generateTryOn(data: TryOnRequest): Promise<TryOnResponse> {
  try {
    const response = await fetch("/api/try-on", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const resJson = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: resJson.error || "We couldn't create your preview right now. Please try again."
      };
    }

    return {
      success: true,
      resultImageUrl: resJson.resultImageUrl
    };
  } catch (error: any) {
    console.error("[tryOnService] generateTryOn error:", error.message || error);
    return {
      success: false,
      error: "We couldn't create your preview right now. Please try again."
    };
  }
}
