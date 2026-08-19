import type { Look } from "@/data/looks";
import { LookCard } from "./LookCard";

interface Props {
  looks: Look[];
  selectedId?: string | null;
  ctaLabel?: string;
  onSelect: (look: Look) => void;
}

export function LookGrid({ looks, selectedId, ctaLabel, onSelect }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {looks.map((look) => (
        <LookCard
          key={look.id}
          look={look}
          ctaLabel={ctaLabel}
          selected={selectedId === look.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}
