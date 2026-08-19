interface Props {
  src: string;
  fileName?: string;
  dimensions?: { width: number; height: number };
  onChange: () => void;
  onContinue: () => void;
}

export function ImagePreview({ src, fileName, dimensions, onChange, onContinue }: Props) {
  return (
    <div className="grid gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 md:grid-cols-2 md:items-center">
      <div className="relative overflow-hidden rounded-xl bg-sand">
        <img
          src={src}
          alt="The photo you uploaded for your virtual try-on"
          className="mx-auto max-h-[420px] w-full object-cover"
        />
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1 text-[0.7rem] font-medium text-white shadow-sm">
          ✓ Success
        </span>
      </div>
      <div>
        <p className="eyebrow">Photo Uploaded Successfully</p>
        <h3 className="mt-3 font-serif text-3xl text-espresso">Looking Good</h3>
        
        <div className="mt-4 space-y-1.5 text-sm text-muted-foreground">
          {fileName && (
            <p>
              <strong className="text-espresso">Filename:</strong> {fileName}
            </p>
          )}
          {dimensions && (
            <p>
              <strong className="text-espresso">Dimensions:</strong> {dimensions.width} × {dimensions.height} px
            </p>
          )}
          <p className="pt-2 leading-relaxed">
            We'll use this photo as the "BEFORE" in your comparison preview. Front-facing photos with even lighting provide the most realistic blending results.
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onContinue} className="btn-base btn-primary">
            Continue →
          </button>
          <button type="button" onClick={onChange} className="btn-base btn-ghost">
            Change Photo
          </button>
        </div>
      </div>
    </div>
  );
}
