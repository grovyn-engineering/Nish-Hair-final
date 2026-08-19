const steps = ["Photo", "Look", "Preview"];

export function ProgressIndicator({ current }: { current: 1 | 2 | 3 }) {
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
                className={`flex size-7 items-center justify-center rounded-full border text-xs transition-colors ${
                  state === "upcoming"
                    ? "border-border text-muted-foreground"
                    : "border-espresso bg-espresso text-primary-foreground"
                }`}
              >
                {index}
              </span>
              <span className={state === "upcoming" ? "text-muted-foreground" : "text-espresso"}>
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
