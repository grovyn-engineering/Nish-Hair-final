import { AlertCircle } from "lucide-react";

interface Props {
  title?: string;
  message: string;
  onRetry?: () => void;
  onChooseAnother?: () => void;
}

export function ErrorState({ title = "Something didn't go to plan", message, onRetry, onChooseAnother }: Props) {
  return (
    <div role="alert" className="rounded-2xl border border-border bg-card p-8 text-center">
      <AlertCircle className="mx-auto size-6 text-destructive" aria-hidden="true" />
      <h3 className="mt-4 font-serif text-2xl text-espresso">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{message}</p>
      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
        {onRetry && (
          <button type="button" onClick={onRetry} className="btn-base btn-primary">
            Try Again
          </button>
        )}
        {onChooseAnother && (
          <button type="button" onClick={onChooseAnother} className="btn-base btn-ghost">
            Choose Another Look
          </button>
        )}
      </div>
    </div>
  );
}
