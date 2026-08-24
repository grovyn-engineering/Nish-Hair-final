import { Check } from "lucide-react";
import { HAIR_COLORS, type HairColorName, type HairLength, type Look } from "@/data/looks";

interface Props {
  look: Look;
  color: HairColorName;
  length: HairLength;
  onColorChange: (c: HairColorName) => void;
  onLengthChange: (l: HairLength) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
  isDemoMode: boolean;
  onDemoModeChange: (val: boolean) => void;
}

export function CustomizationPanel({
  look,
  color,
  length,
  onColorChange,
  onLengthChange,
  onSubmit,
  onBack,
  isLoading,
  isDemoMode,
  onDemoModeChange,
}: Props) {
  return (
    <section className="rounded-2xl border border-border bg-card p-6 sm:p-8" aria-labelledby="customize">
      <p className="eyebrow">Customize</p>
      <h3 id="customize" className="mt-3 font-serif text-3xl text-espresso">{look.name}</h3>

      <fieldset className="mt-8">
        <legend className="text-sm text-espresso">Length</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {look.availableLengths.map((l) => {
            const active = l === length;
            return (
              <button
                key={l}
                type="button"
                aria-pressed={active}
                disabled={isLoading}
                onClick={() => onLengthChange(l as HairLength)}
                className={`btn-base ${active ? "btn-primary" : "btn-ghost"} !px-6 disabled:opacity-50`}
              >
                {l}
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-8">
        <legend className="text-sm text-espresso">Color</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {HAIR_COLORS.filter((c) => look.availableColors.includes(c.name)).map((c) => {
            const active = c.name === color;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={active}
                disabled={isLoading}
                onClick={() => onColorChange(c.name)}
                className={`flex items-center gap-2.5 rounded-full border py-2 pr-4 pl-2 text-sm transition-all ${
                  active
                    ? "border-espresso bg-sand text-espresso"
                    : "border-border text-muted-foreground hover:border-champagne"
                } disabled:opacity-50`}
              >
                <span
                  className="flex size-6 items-center justify-center rounded-full border border-border/70"
                  style={{ backgroundColor: c.swatch }}
                  aria-hidden="true"
                >
                  {active && <Check className="size-3.5 text-white" />}
                </span>
                {c.name}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p className="mt-8 rounded-xl bg-sand px-4 py-3 text-sm text-espresso">
        {look.name} · {length} · {color}
      </p>

      {/* Demo Mode Toggle */}
      {/* <div className="mt-6 flex items-center gap-3 rounded-xl border border-champagne-soft bg-champagne-soft/10 p-3">
        <input
          type="checkbox"
          id="demo-mode"
          checked={isDemoMode}
          onChange={(e) => onDemoModeChange(e.target.checked)}
          className="size-4 rounded border-border text-espresso focus:ring-espresso cursor-pointer"
          disabled={isLoading}
        />
        <label htmlFor="demo-mode" className="text-sm font-medium text-espresso cursor-pointer select-none">
          Demo Mode (Instant simulation, no API key required)
        </label>
      </div> */}

      {/* Explanatory Box: What am I selecting? What happens next? */}
      <div className="mt-6 rounded-xl border border-border bg-sand/30 p-4 text-xs text-muted-foreground space-y-3">
        <div>
          <h4 className="font-semibold text-espresso text-sm flex items-center gap-1.5">
            🔍 What am I selecting?
          </h4>
          <p className="mt-1 leading-relaxed">
            You are selecting a specific physical hair extension or wig look from the NishHair catalog, customized by length ({length}) and color ({color}).
          </p>
        </div>
        <div className="border-t border-border/50 pt-2.5">
          <h4 className="font-semibold text-espresso text-sm flex items-center gap-1.5">
            ⚡ What will happen after I select it?
          </h4>
          <p className="mt-1 leading-relaxed">
            Our AI model will analyze your uploaded face photo and overlay the selected hairstyle, letting you compare the before and after with a sliding preview tool.
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="btn-base btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating your look..." : "Try This Look ✨"}
        </button>
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="btn-base btn-ghost w-full sm:w-auto disabled:opacity-50"
        >
          Back
        </button>
      </div>
    </section>
  );
}
