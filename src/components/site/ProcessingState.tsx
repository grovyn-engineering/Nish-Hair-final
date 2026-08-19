import { Check, Loader2 } from "lucide-react";

const stages = [
  "Analyzing your photo",
  "Understanding your hair profile",
  "Creating your personalized style",
  "Preparing your preview",
];

export function ProcessingState({ stage }: { stage: number }) {
  return (
    <section className="rounded-2xl border border-border bg-card p-8 text-center sm:p-14" aria-live="polite">
      <span className="relative mx-auto flex size-14 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-champagne-soft" aria-hidden="true" />
        <Loader2 className="size-7 animate-spin text-champagne" aria-hidden="true" />
      </span>
      <h2 className="mt-7 font-serif text-3xl text-espresso">Creating Your Look</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We're creating a personalized preview while preserving your natural appearance.
      </p>

      <ul className="mx-auto mt-9 max-w-sm space-y-3 text-left">
        {stages.map((label, i) => {
          const done = i < stage;
          const active = i === stage;
          return (
            <li key={label} className="flex items-center gap-3 text-sm">
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                  done
                    ? "border-espresso bg-espresso"
                    : active
                      ? "border-champagne bg-champagne"
                      : "border-border"
                }`}
                aria-hidden="true"
              >
                {done && <Check className="size-3 text-primary-foreground" />}
              </span>
              <span className={done || active ? "text-espresso" : "text-muted-foreground"}>
                {label}
                {done && <span className="sr-only"> — complete</span>}
                {active && <span className="sr-only"> — in progress</span>}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
