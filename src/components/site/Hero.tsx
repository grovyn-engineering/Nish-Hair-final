// Redesigned hero — ported from the prototype's Hero.tsx. CTAs now route into
// the real /try-on flow via useSiteState().goToTryOn() instead of opening a
// local fake modal. Two of the three signature looks use real nishhair.com
// product photography; the extensions look keeps an Unsplash placeholder
// (no confirmed real photo was retrievable for that product).

import { useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ArrowRight, ShieldCheck, Star } from "lucide-react";
import { useSiteState } from "@/lib/site-state";
import { PRODUCTS } from "@/data/catalog";

const HERO_LOOKS = [
  {
    id: "topper",
    label: "Crown Hair Topper",
    headline: "Undetectable Scalp Perfection",
    sub: "100% hand-knotted silk base covering thinning crown & partings in 45 seconds.",
    image: "https://www.nishhair.com/cdn/shop/files/Besthairtopper-Curly-Naturalblack.png?v=1785153470",
    tag: "Crown Thinning Solution",
    density: "130% Natural Density",
    productId: "silk-base-crown-topper",
  },
  {
    id: "extensions",
    label: "7-Set Clip-Ins",
    headline: "Instant Hollywood Volume",
    sub: "Add 160 grams of lustrous Indian Remy hair length without clips showing.",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=900&auto=format&fit=crop",
    tag: "Instant Length & Bounce",
    density: "160g Full Set",
    productId: "7-set-clip-in-extensions",
  },
  {
    id: "bangs",
    label: "Clip-In Bangs",
    headline: "Zero-Regret Face Framing",
    sub: "French curtain bangs that snap in seamlessly without trimming real hair.",
    image: "https://www.nishhair.com/cdn/shop/files/clip-in_hairline_with_curtain_3_dark_black.jpg?v=1762872102",
    tag: "Zero Scissor Commitment",
    density: "Wispy Natural Cut",
    productId: "feather-clip-in-bangs",
  },
];

export function Hero() {
  const { goToTryOn, openQuickView, openFounderStory } = useSiteState();
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const activeLook = HERO_LOOKS[activeLookIndex];
  const shouldReduceMotion = useReducedMotion();

  const cardRef = useRef<HTMLDivElement>(null);
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || shouldReduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    cardRef.current.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale3d(1.02, 1.02, 1.02)`;
  };
  const handleCardMouseLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)";
  };

  const btn1Ref = useRef<HTMLAnchorElement>(null);
  const handleBtn1Move = (e: React.MouseEvent) => {
    if (!btn1Ref.current || shouldReduceMotion) return;
    const rect = btn1Ref.current.getBoundingClientRect();
    btn1Ref.current.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.25}px, ${(e.clientY - rect.top - rect.height / 2) * 0.25}px)`;
  };
  const handleBtn1Leave = () => { if (btn1Ref.current) btn1Ref.current.style.transform = "translate(0, 0)"; };

  const btn2Ref = useRef<HTMLButtonElement>(null);
  const handleBtn2Move = (e: React.MouseEvent) => {
    if (!btn2Ref.current || shouldReduceMotion) return;
    const rect = btn2Ref.current.getBoundingClientRect();
    btn2Ref.current.style.transform = `translate(${(e.clientX - rect.left - rect.width / 2) * 0.25}px, ${(e.clientY - rect.top - rect.height / 2) * 0.25}px)`;
  };
  const handleBtn2Leave = () => { if (btn2Ref.current) btn2Ref.current.style.transform = "translate(0, 0)"; };

  return (
    <section className="nh-sans relative overflow-hidden bg-[var(--nh-paper)] pt-8 pb-16 lg:py-20 border-b border-[var(--nh-ink)]/10" id="hero">
      <div className="absolute inset-0 nh-grid-backdrop pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[var(--nh-bone)] border border-[var(--nh-ink)]/15 text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-ink)]">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--nh-chestnut)]" />
                100% Real Human Hair
              </span>
              <div className="flex items-center gap-1 text-[12px] font-semibold text-[var(--nh-ink)]/70">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-current" />))}
                </div>
                <span>4.9/5 (10,400+ Reviews)</span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 style={{ letterSpacing: "-0.03em" }} className="nh-serif font-black text-5xl sm:text-6xl md:text-7xl lg:text-[76px] xl:text-[86px] leading-[1.02] text-[var(--nh-ink)] tracking-tight">
                Instant Hair. <br />
                <span className="italic font-normal text-[var(--nh-chestnut)]">Real Confidence.</span>
              </h1>
              <p className="text-[16px] leading-[1.72] text-[var(--nh-ink)]/80 max-w-xl">
                India's pioneer in luxury 100% human hair toppers, seamless clip-in extensions, and clip-in bangs.
                Hand-crafted for zero damage, scalp-like natural partings, and effortless everyday wear.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <span className="text-[11px] uppercase tracking-[0.28em] font-bold text-[var(--nh-ink)]/50">
                Explore Signature Silhouettes:
              </span>
              <div className="flex flex-wrap gap-2">
                {HERO_LOOKS.map((look, index) => (
                  <button
                    key={look.id}
                    onClick={() => setActiveLookIndex(index)}
                    className={`px-4 py-2 text-[12px] uppercase tracking-wider font-extrabold border transition-all cursor-pointer ${
                      activeLookIndex === index
                        ? "bg-[var(--nh-ink)] text-white border-[var(--nh-ink)] shadow-sm"
                        : "bg-white/80 text-[var(--nh-ink)] border-[var(--nh-ink)]/20 hover:border-[var(--nh-ink)]"
                    }`}
                  >
                    {look.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-3">
              <a
                ref={btn1Ref}
                onMouseMove={handleBtn1Move}
                onMouseLeave={handleBtn1Leave}
                href="#shop-curated-section"
                className="nh-btn-primary nh-magnetic group inline-flex items-center justify-center gap-3 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] shadow-md text-center cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                ref={btn2Ref}
                onMouseMove={handleBtn2Move}
                onMouseLeave={handleBtn2Leave}
                onClick={goToTryOn}
                className="nh-btn-secondary nh-magnetic inline-flex items-center justify-center gap-2 px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[var(--nh-bone)] text-center cursor-pointer"
              >
                <span>Launch 3D Try-On Studio</span>
              </button>
            </div>

            <div className="pt-4 border-t border-[var(--nh-ink)]/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--nh-ink)] text-[var(--nh-gold)] flex items-center justify-center font-serif font-black text-sm shrink-0 shadow-sm">
                  PG
                </div>
                <div className="border-l-2 border-[var(--nh-gold)] pl-3">
                  <span className="text-[13px] nh-serif italic text-[var(--nh-ink)]/80 leading-relaxed block">
                    "Hair isn't just vanity. It's confidence, freedom, and identity."
                  </span>
                  <button
                    onClick={openFounderStory}
                    className="text-[10px] font-semibold uppercase tracking-wider text-[var(--nh-chestnut)] hover:text-[var(--nh-gold)] transition-colors text-left cursor-pointer mt-1.5 block"
                  >
                    Parul Gulati, Founder — Read her story &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div
              ref={cardRef}
              onMouseMove={handleCardMouseMove}
              onMouseLeave={handleCardMouseLeave}
              style={{ transition: "transform 0.15s ease-out", transformStyle: "preserve-3d" }}
              className="relative w-full max-w-[460px] overflow-hidden border-2 border-[var(--nh-ink)] bg-[var(--nh-bone)] shadow-2xl aspect-[4/5] group"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeLook.id}
                  src={activeLook.image}
                  alt={activeLook.headline}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: "easeInOut" }}
                  className="absolute inset-0 w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              <div className="absolute inset-0 bg-gradient-to-t from-[var(--nh-ink)]/90 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[var(--nh-ink)] text-[10px] font-extrabold uppercase tracking-widest border border-black/10 shadow-sm">
                  {activeLook.tag}
                </span>
                <span className="px-2.5 py-1 bg-[var(--nh-gold)] text-white text-[9px] font-bold uppercase tracking-wider shadow-sm">
                  {activeLook.density}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-2">
                <div className="text-[11px] font-extrabold text-[var(--nh-gold)] uppercase tracking-[0.2em]">
                  Featured Transformation
                </div>
                <h3 className="nh-serif font-bold text-2xl leading-tight">{activeLook.headline}</h3>
                <p className="text-[13px] text-white/80 leading-snug line-clamp-2">{activeLook.sub}</p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-white/60 font-mono">100% Indian Temple Virgin Hair</span>
                  <button
                    onClick={() => {
                      const product = PRODUCTS.find((p) => p.id === activeLook.productId);
                      if (product) openQuickView(product);
                    }}
                    className="inline-flex items-center gap-1.5 text-[11px] uppercase font-extrabold text-[var(--nh-gold)] hover:text-white transition-colors cursor-pointer"
                  >
                    View Piece &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
