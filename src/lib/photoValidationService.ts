/**
 * Photo validation service for Velura backend API.
 * 
 * Validates uploaded photos against the Velura backend API before
 * allowing them to proceed to the hair try-on generation pipeline.
 */

export interface PhotoValidationResult {
  ok: boolean;
  failures?: string[];
  reasons?: string[];
  error?: string;
}

const BACKEND_URL = import.meta.env.VITE_PHOTO_CHECK_BACKEND_URL || "http://localhost:8000";

/**
 * Validate a photo using the Velura backend API.
 * 
 * @param file - The File object to validate
 * @returns Validation result with ok status and failure details if any
 */
export async function validatePhoto(file: File): Promise<PhotoValidationResult> {
  const formData = new FormData();
  formData.append("photo", file);

  try {
    const response = await fetch(`${BACKEND_URL}/photo-check`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // Try to parse error response, fall back to generic error
      let errorData: PhotoValidationResult = { ok: false, error: "Validation failed" };
      try {
        errorData = await response.json();
      } catch {
        errorData = { ok: false, error: `Server returned ${response.status}` };
      }

      return {
        ok: false,
        failures: errorData.failures,
        reasons: errorData.reasons,
        error: errorData.error,
      };
    }

    return { ok: true };
  } catch (error: any) {
    console.error("[photoValidationService] Network error:", error);
    return {
      ok: false,
      error: "Could not connect to validation server. Please ensure the backend is running.",
    };
  }
}

/**
 * Format validation failures for user-friendly display.
 */
export function formatValidationFailures(failures?: string[], reasons?: string[]): string {
  if (!failures || !reasons || failures.length === 0) {
    return "Photo validation failed.";
  }

  // Map failure codes to user-friendly messages
  const messageMap: Record<string, string> = {
    low_resolution: "Photo resolution is too low. Minimum 400×400px required.",
    too_blurry: "Photo is too blurry. Please use a clearer image.",
    too_dark: "Photo is too dark. Please ensure good lighting.",
    overexposed: "Photo is overexposed. Avoid bright backlighting.",
    no_face_detected: "No face detected in the photo.",
    multiple_faces: "Multiple faces detected. Please use a photo with one person.",
    face_too_small: "Face is too small in the frame. Get closer to the camera.",
    face_too_large: "Face is too large in the frame. You may be too close.",
    head_turned: "Head is turned too far to the side. Please face the camera more directly.",
    head_tilted: "Head is tilted too far to the side. Keep your head level.",
    head_pitched: "Head is pitched too far up or down. Look straight at the camera.",
    forehead_occluded: "Forehead is covered. Remove hats or hood.",
  };

  return reasons
    .map((reason, index) => {
      const code = failures?.[index] || "";
      const defaultMsg = reason || "Unknown validation error";
      return messageMap[code] || defaultMsg;
    })
    .join(" ");
}
