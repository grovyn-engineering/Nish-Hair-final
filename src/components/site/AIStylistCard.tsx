import { Sparkles } from "lucide-react";

interface Props {
  note: string;
  onApply: () => void;
}

export function AIStylistCard({ note, onApply }: Props) {
  return (
    <aside className="rounded-2xl border border-champagne/50 bg-champagne-soft/40 p-6 sm:p-8">
      <p className="eyebrow inline-flex items-center gap-2">
        <Sparkles className="size-3.5 text-champagne" aria-hidden="true" />
        AI Stylist's Pick
      </p>
      <p className="mt-4 max-w-2xl font-serif text-xl leading-relaxed text-espresso italic">
        “{note}”
      </p>
      <button type="button" onClick={onApply} className="btn-base btn-ghost mt-6 bg-background">
        Try Stylist's Pick
      </button>
    </aside>
  );
}
