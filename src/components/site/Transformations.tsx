// Ported from the prototype's Transformations.tsx. Data now comes from
// src/data/catalog.ts (TRANSFORMATION_CASES); the "Shop This Solution" link
// scrolls to the curated products grid via useSiteState().setSelectedCategory.

import { useState } from "react";
import { TRANSFORMATION_CASES } from "@/data/catalog";
import { Clock, ShieldCheck, Quote } from "lucide-react";
import { useSiteState } from "@/lib/site-state";
import { BeforeAfterSlider } from "@/components/site/BeforeAfterSlider";

export function Transformations() {
  const { setSelectedCategory } = useSiteState();
  const [activeCaseIdx, setActiveCaseIdx] = useState(0);

  const activeCase = TRANSFORMATION_CASES[activeCaseIdx];

  return (
    <section className="nh-sans bg-[var(--nh-paper)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="transformations-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)] block">
              Proven Results & Transformations
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--nh-ink)] tracking-tight">
              Real People. <span className="italic font-normal">Real Transformations.</span>
            </h2>
          </div>
          <p className="text-[16px] leading-[1.72] text-[var(--nh-ink)]/70 max-w-md">
            Drag the comparison slider to reveal how Nish Hair 100% human hair pieces seamlessly blend with real scalps and hair textures.
          </p>
        </div>

        <div className="flex flex-wrap gap-2.5 mb-8">
          {TRANSFORMATION_CASES.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setActiveCaseIdx(idx)}
              className={`px-5 py-3 text-xs uppercase tracking-wider font-extrabold border transition-all cursor-pointer ${
                activeCaseIdx === idx
                  ? "bg-[var(--nh-ink)] text-white border-[var(--nh-ink)] shadow-md"
                  : "bg-[var(--nh-bone)] text-[var(--nh-ink)] border-[var(--nh-ink)]/20 hover:border-[var(--nh-ink)]"
              }`}
            >
              <span className="text-[10px] text-[var(--nh-gold)] mr-2">0{idx + 1}</span>
              {item.tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <BeforeAfterSlider
              key={activeCase.id}
              beforeSrc={activeCase.beforeImg}
              afterSrc={activeCase.afterImg}
              beforeLabel="Before"
              afterLabel="After (With Nish Hair)"
              className="aspect-[4/3] sm:aspect-[16/10] border-2 border-[var(--nh-ink)] bg-black cursor-ew-resize"
              imgClassName={`absolute inset-0 h-full w-full object-cover ${activeCase.imgObjectPosition ?? "object-top"}`}
            />
          </div>

          <div className="lg:col-span-4 bg-[var(--nh-bone)] border-2 border-[var(--nh-ink)] p-7 space-y-6">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)]">Case Study</span>
              <h3 className="nh-serif font-black text-2xl sm:text-3xl text-[var(--nh-ink)] mt-1">{activeCase.title}</h3>
              <p className="text-sm text-[var(--nh-ink)]/70 mt-2 leading-relaxed">{activeCase.subtitle}</p>
            </div>
            <div className="space-y-3 pt-3 border-t border-[var(--nh-ink)]/10">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--nh-ink)]/60 font-medium">Piece Used:</span>
                <span className="font-bold text-[var(--nh-ink)]">{activeCase.productUsed}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--nh-ink)]/60 font-medium">Application Time:</span>
                <span className="font-bold text-[var(--nh-chestnut)] flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{activeCase.timeToApply}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[var(--nh-ink)]/60 font-medium">Guarantee:</span>
                <span className="font-bold text-emerald-700 flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" />100% Remy Human Hair</span>
              </div>
            </div>
            <div className="p-4 bg-white border border-[var(--nh-ink)]/10 space-y-2">
              <Quote className="w-5 h-5 text-[var(--nh-gold)]" />
              <p className="text-xs italic text-[var(--nh-ink)]/80 leading-relaxed nh-serif">"{activeCase.customerQuote}"</p>
              <div className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--nh-ink)]">— {activeCase.customerName}</div>
            </div>
            <button
              onClick={() => setSelectedCategory("all")}
              className="block w-full py-3.5 bg-[var(--nh-ink)] text-white text-[11px] font-extrabold uppercase tracking-widest text-center hover:bg-[var(--nh-chestnut)] transition-colors cursor-pointer"
            >
              Shop This Solution &rarr;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
