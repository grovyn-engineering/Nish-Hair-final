const steps = ["01 Photo", "02 Choose Look", "03 Preview"];

export function ProgressSteps({ current }: { current: 1 | 2 | 3 }) {
  return (
    <ol className="flex items-center justify-center gap-3 sm:gap-6" aria-label="Try-on progress">
      {steps.map((label, i) => {
        const index = i + 1;
        const state = index < current ? "done" : index === current ? "current" : "upcoming";
        return (
          <li key={label} className="flex items-center gap-3 sm:gap-6">
            <span
              className="flex items-center gap-2 text-sm"
              aria-current={state === "current" ? "step" : undefined}
            >
              <span
                className={`flex h-7 px-2.5 items-center justify-center rounded-full border text-xs font-medium transition-colors ${
                  state === "upcoming"
                    ? "border-border text-muted-foreground bg-card"
                    : "border-espresso bg-espresso text-primary-foreground font-semibold"
                }`}
              >
                {index}
              </span>
              <span className={state === "upcoming" ? "text-muted-foreground text-xs sm:text-sm" : "text-espresso text-xs sm:text-sm font-medium"}>
                {label}
                {state === "done" && <span className="sr-only"> (completed)</span>}
              </span>
            </span>
            {index < steps.length && <span className="h-px w-6 bg-border sm:w-12" aria-hidden="true" />}
          </li>
        );
      })}
    </ol>
  );
}
