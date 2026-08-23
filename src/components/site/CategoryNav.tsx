// Ported from the prototype's CategoryNav.tsx. Uses useSiteState().setSelectedCategory
// instead of an onSelectCategory prop.

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

const WOMEN_CATEGORIES = [
  { id: "extensions", label: "Hair Extensions", sub: "Clip-in · Tape-in · Wefts" },
  { id: "toppers", label: "Hair Toppers", sub: "Lace base · Silk base · Crown" },
  { id: "bangs", label: "Clip-In Bangs", sub: "Curtain · Wispy · Fringe" },
  { id: "color", label: "Color Pieces", sub: "Highlights · Balayage · Ombre" },
  { id: "ponytails", label: "Ponytails", sub: "Wrap-around · Glamour" },
];

const MEN_CATEGORIES = [
  { id: "men", label: "Hair Toupees", sub: "Lace · PU · French lace" },
  { id: "toppers", label: "Men's Toppers", sub: "Crown coverage · Silk base" },
];

export function CategoryNav() {
  const { setSelectedCategory } = useSiteState();
  const [activeGender, setActiveGender] = useState<"women" | "men">("women");
  const shouldReduceMotion = useReducedMotion();
  const cats = activeGender === "women" ? WOMEN_CATEGORIES : MEN_CATEGORIES;

  return (
    <section className="nh-sans bg-[var(--nh-bone)] border-b border-[var(--nh-ink)]/10" id="category-nav">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-6">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-[11px] font-semibold text-[var(--nh-ink)]/50 uppercase tracking-[0.28em] mr-2">Shop For:</span>
          {(["women", "men"] as const).map((g) => (
            <button
              key={g}
              onClick={() => {
                setActiveGender(g);
                setSelectedCategory(g === "men" ? "men" : "all");
              }}
              className={`px-5 py-2 text-[11px] uppercase tracking-widest font-extrabold border transition-all cursor-pointer ${
                activeGender === g ? "bg-[var(--nh-ink)] text-white border-[var(--nh-ink)]" : "bg-transparent text-[var(--nh-ink)] border-[var(--nh-ink)]/20 hover:border-[var(--nh-ink)]/60"
              }`}
            >
              {g === "women" ? "Women" : "Men"}
            </button>
          ))}
        </div>

        <motion.div
          key={activeGender}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="flex flex-wrap gap-4"
        >
          {cats.map((cat) => (
            <a
              key={cat.id + cat.label}
              href="#shop-curated-section"
              onClick={() => setSelectedCategory(cat.id)}
              className="nh-category-pill group flex items-center gap-4 cursor-pointer shadow-sm"
            >
              <div>
                <div className="text-[12px] font-extrabold uppercase tracking-wider leading-none">{cat.label}</div>
                <div className="text-[9px] opacity-40 mt-1 font-normal uppercase tracking-normal">{cat.sub}</div>
              </div>
              <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
