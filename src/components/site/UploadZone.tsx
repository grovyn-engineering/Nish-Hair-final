import { UploadCloud } from "lucide-react";
import { useRef, useState, type DragEvent } from "react";
import { toast } from "sonner";

import { validatePhoto, formatValidationFailures } from "@/lib/photoValidationService";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 10 * 1024 * 1024;
const MIN_WIDTH = 400;
const MIN_HEIGHT = 400;

interface Props {
  onAccepted: (dataUrl: string, fileName: string, dimensions?: { width: number; height: number }, isLowQuality?: boolean) => void;
  onError: (message: string) => void;
  onValidationFailure?: (failures: string[], reasons: string[]) => void;
  enableBackendValidation?: boolean;
}

export function UploadZone({ onAccepted, onError, onValidationFailure, enableBackendValidation = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [validating, setValidating] = useState(false);

  const handleFile = async (file: File | undefined | null) => {
    if (!file) {
      onError("Please choose a photo to continue.");
      return;
    }
    if (!ACCEPTED.includes(file.type)) {
      onError("That file type isn't supported. Please upload a JPG, PNG or WEBP photo.");
      return;
    }
    if (file.size > MAX_BYTES) {
      onError("That photo is larger than 10MB. Please choose a smaller file.");
      return;
    }

    // Backend validation (optional)
    if (enableBackendValidation) {
      setValidating(true);
      try {
        const result = await validatePhoto(file);
        if (!result.ok) {
          const failures = result.failures || [];
          const reasons = result.reasons || [];
          
          if (onValidationFailure) {
            onValidationFailure(failures, reasons);
          } else {
            onError(formatValidationFailures(failures, reasons));
          }
          setValidating(false);
          return;
        }
      } catch (error: any) {
        console.error("[UploadZone] Validation error:", error);
        // Continue anyway if validation fails (e.g., backend offline)
        onError("Warning: Could not validate photo with server. Proceeding anyway.");
      } finally {
        setValidating(false);
      }
    }

    const reader = new FileReader();
    reader.onerror = () => onError("We couldn't read that photo. Please try another one.");
    reader.onload = () => {
      const dataUrl = String(reader.result);
      const img = new Image();
      img.onerror = () => onError("That image appears to be damaged. Please try another photo.");
      img.onload = () => {
        const dims = { width: img.width, height: img.height };
        const isLowQuality = img.width < MIN_WIDTH || img.height < MIN_HEIGHT;
        onAccepted(dataUrl, file.name, dims, isLowQuality);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`rounded-2xl border border-dashed p-8 text-center transition-colors sm:p-14 ${
        dragging ? "border-champagne bg-champagne-soft/40" : "border-border bg-card"
      }`}
    >
      {!validating && (
        <>
          <UploadCloud className="mx-auto size-8 text-champagne" aria-hidden="true" />
          <p className="mt-5 font-serif text-2xl text-espresso">Drag your photo here</p>
          <p className="mt-2 text-sm text-muted-foreground">or browse from your device</p>
        </>
      )}

      {!validating ? (
        <button
          type="button"
          className="btn-base btn-primary mt-6"
          onClick={() => inputRef.current?.click()}
        >
          Choose Photo
        </button>
      ) : (
        <span> Validating Image... </span>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Upload your photo"
        onChange={(e) => {
          handleFile(e.target.files?.[0]);
          e.target.value = "";
        }}
      />
      <p className="mt-6 text-xs tracking-wide text-muted-foreground">
        JPG, PNG or WEBP · Maximum 10MB · Minimum 400 × 400 px recommended
        {enableBackendValidation && !validating && " • Validated with backend"}
        {validating && " • Validating..."}
      </p>
    </div>
  );
}
