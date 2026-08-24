import { Check } from "lucide-react";
import type { Look } from "@/data/looks";
import { formatPrice } from "@/data/products";

interface Props {
  look: Look;
  selected?: boolean;
  ctaLabel?: string;
  onSelect: (look: Look) => void;
}

export function LookCard({ look, selected = false, ctaLabel = "Try Look", onSelect }: Props) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] ${
        selected ? "border-espresso ring-1 ring-espresso" : "border-border"
      }`}
    >
      {selected && (
        <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-full bg-espresso px-3 py-1 text-[0.65rem] tracking-wide text-primary-foreground">
          <Check className="size-3" aria-hidden="true" /> Selected
        </span>
      )}
      <div className="flex items-center justify-center overflow-hidden bg-[#f5f0eb]" style={{ height: "240px" }}>
        <img
          src={look.image}
          alt={`${look.name} - ${look.description}`}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="eyebrow">{look.category}</p>
        <h3 className="mt-2 font-serif text-2xl text-espresso">{look.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{look.description}</p>
        <p className="mt-4 text-sm text-espresso">
          From {formatPrice(look.startingPrice)}
        </p>
        <button
          type="button"
          onClick={() => onSelect(look)}
          className="btn-base btn-ghost mt-5 w-full group-hover:border-champagne"
          aria-pressed={selected}
        >
          {selected ? "Selected" : ctaLabel}
        </button>
      </div>
    </article>
  );
}
