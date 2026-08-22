import { AlertTriangle, CheckCircle } from "lucide-react";

interface Props {
  src: string;
  fileName?: string;
  dimensions?: { width: number; height: number };
  isLowQuality?: boolean;
  onChange: () => void;
  onContinue: () => void;
}

export function ImagePreview({ src, fileName, dimensions, isLowQuality = false, onChange, onContinue }: Props) {
  return (
    <div className={`grid gap-8 rounded-2xl border p-6 sm:p-8 md:grid-cols-2 md:items-center bg-card transition-colors ${
      isLowQuality ? "border-amber-400/60" : "border-border"
    }`}>
      <div className="relative overflow-hidden rounded-xl bg-sand">
        <img
          src={src}
          alt="The photo you uploaded for your virtual try-on"
          className="mx-auto max-h-[420px] w-full object-cover"
        />
        {isLowQuality ? (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-amber-500 px-3 py-1 text-[0.7rem] font-medium text-white shadow-sm">
            <AlertTriangle className="size-3" aria-hidden="true" />
            Low Quality
          </span>
        ) : (
          <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[0.7rem] font-medium text-white shadow-sm">
            <CheckCircle className="size-3" aria-hidden="true" />
            Success
          </span>
        )}
      </div>

      <div>
        {isLowQuality ? (
          <>
            <p className="eyebrow text-amber-600">Low Quality Detected</p>
            <h3 className="mt-3 font-serif text-3xl text-espresso">Image Too Small</h3>
          </>
        ) : (
          <>
            <p className="eyebrow">Photo Uploaded Successfully</p>
            <h3 className="mt-3 font-serif text-3xl text-espresso">Looking Good</h3>
          </>
        )}

        {isLowQuality && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-amber-500" aria-hidden="true" />
            <p className="leading-relaxed">
              This image is below the recommended minimum of <strong>400 × 400 px</strong>. Results may be blurry or inaccurate. For best results, please upload a higher-resolution photo.
            </p>
          </div>
        )}

        <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {fileName && (
            <p>
              <strong className="text-espresso">Filename:</strong> {fileName}
            </p>
          )}
          {dimensions && (
            <p>
              <strong className={isLowQuality ? "text-amber-700" : "text-espresso"}>Dimensions:</strong>{" "}
              <span className={isLowQuality ? "text-amber-700 font-semibold" : ""}>
                {dimensions.width} × {dimensions.height} px
              </span>
            </p>
          )}
          {!isLowQuality && (
            <p className="pt-2 leading-relaxed">
              We'll use this photo as the "BEFORE" in your comparison preview. Front-facing photos with even lighting provide the most realistic blending results.
            </p>
          )}
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onContinue}
            className={`btn-base ${isLowQuality ? "btn-ghost border-amber-400 text-amber-700 hover:bg-amber-50" : "btn-primary"}`}
          >
            {isLowQuality ? "Continue Anyway →" : "Continue →"}
          </button>
          <button type="button" onClick={onChange} className={`btn-base ${isLowQuality ? "btn-primary" : "btn-ghost"}`}>
            {isLowQuality ? "Upload Better Photo" : "Change Photo"}
          </button>
        </div>
      </div>
    </div>
  );
}

