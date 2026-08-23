import { useState, useEffect, useRef } from "react";
import type { MouseEvent } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight, ShieldCheck, Truck, RotateCcw, HeartHandshake } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

export function FinalConversion() {
  const { goToTryOn } = useSiteState();
  const shouldReduceMotion = useReducedMotion();

  // Part 10: Live countdown to midnight IST
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = Math.max(0, midnight.getTime() - now.getTime());
      setTime({
        h: Math.floor(diff / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000)
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Part 5C: Magnetic buttons on FinalConversion
  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const handleBtn1Move = (e: MouseEvent) => {
    if (!btn1Ref.current || shouldReduceMotion) return;
    const rect = btn1Ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    btn1Ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleBtn1Leave = () => {
    if (btn1Ref.current) btn1Ref.current.style.transform = 'translate(0, 0)';
  };

  const btn2Ref = useRef<HTMLButtonElement>(null);
  const handleBtn2Move = (e: MouseEvent) => {
    if (!btn2Ref.current || shouldReduceMotion) return;
    const rect = btn2Ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
    btn2Ref.current.style.transform = `translate(${x}px, ${y}px)`;
  };
  const handleBtn2Leave = () => {
    if (btn2Ref.current) btn2Ref.current.style.transform = 'translate(0, 0)';
  };

  return (
    <section className="nh-sans bg-[var(--nh-paper)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="final-conversion">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Inner Block stays bg-[var(--nh-chestnut)] */}
        <div className="relative overflow-hidden bg-[var(--nh-chestnut)] text-white p-8 sm:p-12 lg:p-16 border-2 border-[var(--nh-ink)] shadow-2xl">
          {/* Part 4: Structured Diagonal Pattern */}
          <div className="absolute inset-0 nh-diagonal-backdrop pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">

            {/* Part 10: Live Countdown to Midnight */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
              <span className="text-[10px] uppercase tracking-widest text-white/70 font-semibold">
                Same-day dispatch if ordered in:
              </span>
              <div className="flex items-center gap-2">
                {[
                  { val: String(time.h).padStart(2, '0'), label: 'HRS' },
                  { val: String(time.m).padStart(2, '0'), label: 'MIN' },
                  { val: String(time.s).padStart(2, '0'), label: 'SEC' },
                ].map(({ val, label }) => (
                  <div key={label} className="flex flex-col items-center">
                    <span className="font-mono text-xl font-bold text-white tabular-nums w-11 text-center bg-white/10 border border-white/20 py-1 shadow-sm">
                      {val}
                    </span>
                    <span className="text-[8px] text-white/50 uppercase tracking-widest mt-0.5 font-bold">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-gold)] block">
                Instant Hair. Lifelong Confidence.
              </span>
              <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                Your Dream Hair Is Just One Click Away.
              </h2>
              <p className="text-[16px] leading-[1.72] text-white/85 max-w-xl mx-auto">
                Join over 100,000+ men and women who chose 100% hand-knotted real human hair pieces. Zero damage. Zero salon anxiety.
              </p>
            </div>

            {/* Magnetic CTA Buttons (Part 5C) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a
                ref={btn1Ref}
                onMouseMove={handleBtn1Move}
                onMouseLeave={handleBtn1Leave}
                href="#shop-curated-section"
                className="nh-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 bg-[var(--nh-gold)] text-[var(--nh-ink)] text-[13px] font-extrabold uppercase tracking-widest hover:bg-white transition-all shadow-xl text-center cursor-pointer"
              >
                <span>Shop Best-Selling Hair Pieces</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                ref={btn2Ref}
                onMouseMove={handleBtn2Move}
                onMouseLeave={handleBtn2Leave}
                onClick={goToTryOn}
                className="nh-magnetic w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent text-white border-2 border-white text-[13px] font-extrabold uppercase tracking-widest hover:bg-white hover:text-[var(--nh-ink)] transition-all text-center cursor-pointer"
              >
                <span>Try On in Virtual Studio</span>
              </button>
            </div>

            {/* Guarantees */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-4 text-left text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--nh-gold)] shrink-0" />
                <span className="text-white/80">100% Remy Human Hair</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[var(--nh-gold)] shrink-0" />
                <span className="text-white/80">Free Pan-India Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-[var(--nh-gold)] shrink-0" />
                <span className="text-white/80">Easy Shade Exchange</span>
              </div>
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-4 h-4 text-[var(--nh-gold)] shrink-0" />
                <span className="text-white/80">Discreet Packaging</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
