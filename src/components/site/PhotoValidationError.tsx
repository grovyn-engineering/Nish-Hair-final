import { AlertCircle, Shield } from "lucide-react";

interface Props {
  failures: string[];
  reasons: string[];
  onRetry?: () => void;
}

/**
 * PhotoValidationError - Displays backend validation failure details
 * 
 * Shows user-friendly messages for each validation failure code from the Velura backend.
 */
export function PhotoValidationError({ failures, reasons, onRetry }: Props) {
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

  const getErrorMessage = (code: string, defaultReason: string) => {
    return messageMap[code] || defaultReason;
  };

  return (
    <div role="alert" className="rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-destructive/10">
        <AlertCircle className="size-7 text-destructive" aria-hidden="true" />
      </div>
      <h3 className="mt-4 font-serif text-2xl text-espresso">Photo Validation Failed</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
        Our system couldn't approve this photo for hair try-on. Please fix the issues below:
      </p>

      <div className="mx-auto mt-6 max-w-md space-y-3 text-left">
        {reasons.map((reason, index) => {
          const code = failures[index] || "";
          const message = getErrorMessage(code, reason);
          return (
            <div key={`${code}-${index}`} className="flex items-start gap-3 rounded-lg border border-destructive/20 bg-destructive/5 p-3">
              <Shield className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden="true" />
              <div>
                <p className="font-medium text-espresso">{code.replace(/_/g, " ")}</p>
                <p className="mt-1 text-sm text-muted-foreground">{message}</p>
              </div>
            </div>
          );
        })}
      </div>

      {onRetry && (
        <div className="mt-6">
          <button type="button" onClick={onRetry} className="btn-base btn-primary">
            Try Another Photo
          </button>
        </div>
      )}
    </div>
  );
}
