// Ported from the prototype's TryOnTeaser.tsx. The CTAs now call
// useSiteState().goToTryOn() to route into the real /try-on flow instead of
// opening a local fake simulator modal.

import { useState } from "react";
import { Camera, ArrowRight, Layers, Sliders, CheckCircle, RefreshCw } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

const PREVIEW_STYLES = [
  {
    id: "topper",
    name: "Crown Silk Topper (16\")",
    before: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=600&auto=format&fit=crop",
    after: "https://www.nishhair.com/cdn/shop/files/Besthairtopper-Curly-Naturalblack.png?v=1785153470",
    shade: "Natural Black",
    matchScore: "99.4% Scalp Match",
  },
  {
    id: "bangs",
    name: "Curtain Fringe Bangs",
    before: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=600&auto=format&fit=crop",
    after: "https://www.nishhair.com/cdn/shop/files/clip-in_hairline_with_curtain_3_dark_black.jpg?v=1762872102",
    shade: "Espresso Brown",
    matchScore: "98.8% Face Match",
  },
  {
    id: "volume",
    name: "7-Set Clip-In 20\" Volumizer",
    before: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop",
    after: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=600&auto=format&fit=crop",
    shade: "Mocha Caramel",
    matchScore: "99.8% Volume Blend",
  },
];

export function TryOnTeaser() {
  const { goToTryOn } = useSiteState();
  const [activeStyleIdx, setActiveStyleIdx] = useState(0);
  const [showAfter, setShowAfter] = useState(true);
  const activeStyle = PREVIEW_STYLES[activeStyleIdx];

  return (
    <section className="nh-sans relative overflow-hidden bg-[var(--nh-chestnut)] text-white nh-section-pad border-b border-white/10" id="tryon-teaser">
      <div className="absolute inset-0 nh-diagonal-backdrop pointer-events-none" />
      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-gold)]">
              <Camera className="w-3.5 h-3.5" />
              AI Scalp & Texture Match Engine
            </div>
            <div className="space-y-3">
              <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.08]">
                See Your New Hair Before You Buy.
              </h2>
              <p className="text-[16px] leading-[1.72] text-white/80 max-w-lg">
                Unsure whether you need a 3x5 or 5x5 topper, or which clip-in length blends with your natural hair density? Upload a quick selfie in our real AI Try-On Studio.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex items-start gap-3 bg-white/5 p-4 border border-white/10">
                <Layers className="w-5 h-5 text-[var(--nh-gold)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">3D Density Simulation</h4>
                  <p className="text-xs text-white/60 mt-0.5">Preview crown volume at 110%, 130%, and 150% densities.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white/5 p-4 border border-white/10">
                <Sliders className="w-5 h-5 text-[var(--nh-gold)] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white uppercase tracking-wider">Real Shade Calibrator</h4>
                  <p className="text-xs text-white/60 mt-0.5">Accurate undertone matching under daylight and warm lighting.</p>
                </div>
              </div>
            </div>
            <div className="pt-2">
              <button
                onClick={goToTryOn}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[var(--nh-gold)] text-[var(--nh-ink)] text-[13px] font-extrabold uppercase tracking-widest hover:bg-white transition-all shadow-xl cursor-pointer"
              >
                <span>Launch Interactive Try-On Studio</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2 mt-3 text-[11px] text-white/60">
                <CheckCircle className="w-3.5 h-3.5 text-[var(--nh-gold)]" />
                <span>Zero app installation required · Works in browser</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center">
            <div className="w-full max-w-[480px] bg-[var(--nh-ink)] border-2 border-white/20 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">Live Match Simulator</span>
                </div>
                <span className="px-2.5 py-0.5 bg-[var(--nh-gold)]/20 border border-[var(--nh-gold)]/40 text-[var(--nh-gold)] text-[10px] font-bold">
                  {activeStyle.matchScore}
                </span>
              </div>

              <div className="relative aspect-[4/4.5] overflow-hidden border border-white/10 bg-black/40">
                <img src={showAfter ? activeStyle.after : activeStyle.before} alt={activeStyle.name} className="w-full h-full object-cover object-center transition-all duration-300" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider ${showAfter ? "bg-[var(--nh-gold)] text-[var(--nh-ink)]" : "bg-white/20 backdrop-blur-md text-white"}`}>
                    {showAfter ? "WITH NISH HAIR PIECE" : "NATURAL HAIR (BEFORE)"}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 left-3 flex justify-between items-center bg-black/70 backdrop-blur-md p-2.5 border border-white/10">
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-white uppercase">{activeStyle.name}</div>
                    <div className="text-[10px] text-white/60">Shade: {activeStyle.shade}</div>
                  </div>
                  <button
                    onClick={() => setShowAfter(!showAfter)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white text-[var(--nh-ink)] text-[10px] font-extrabold uppercase tracking-wider hover:bg-[var(--nh-gold)] transition-colors cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{showAfter ? "Show Before" : "Show After"}</span>
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] uppercase tracking-wider font-bold text-white/50">Sample Hair Solution:</span>
                <div className="grid grid-cols-3 gap-2">
                  {PREVIEW_STYLES.map((style, idx) => (
                    <button
                      key={style.id}
                      onClick={() => { setActiveStyleIdx(idx); setShowAfter(true); }}
                      className={`p-2 text-left border transition-all cursor-pointer ${
                        activeStyleIdx === idx ? "border-[var(--nh-gold)] bg-white/10 text-white" : "border-white/10 bg-transparent text-white/60 hover:text-white hover:border-white/30"
                      }`}
                    >
                      <div className="text-[11px] font-bold uppercase truncate">{style.name.split(" ")[0]} {style.name.split(" ")[1]}</div>
                      <div className="text-[9px] text-[var(--nh-gold)] truncate">{style.matchScore}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={goToTryOn}
                className="w-full py-3 bg-white text-[var(--nh-ink)] text-[11px] font-extrabold uppercase tracking-widest hover:bg-[var(--nh-gold)] transition-colors text-center cursor-pointer"
              >
                Upload Your Own Photo in Studio &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
