import { motion, useReducedMotion } from 'motion/react';
import { useSiteState } from "@/lib/site-state";

const PILLARS = [
  {
    num: '01',
    title: '100% Sourced Remy Human Hair',
    description: 'We never mix synthetic fibers or plastic strands. Every hair piece is single-donor raw virgin hair with cuticles perfectly intact, allowing full wash, heat styling, and dying.'
  },
  {
    num: '02',
    title: 'Scalp-Mimicking Breathable Silk Bases',
    description: 'Our toppers use ultra-fine triple-layered silk bases that replicate real scalp skin pores. Part it anywhere—left, middle, or zigzag—with complete invisibility.'
  },
  {
    num: '03',
    title: 'Zero Heat, Zero Glue, Zero Traction Damage',
    description: 'Clip in and snap off in seconds. Medical-grade silicon coated grips cushion natural hair follicles, preventing breakage, traction alopecia, and scalp strain.'
  },
  {
    num: '04',
    title: 'Endorsed by Top Dermatologists & Stylists',
    description: 'Recommended by leading trichologists across India as the safest cosmetic alternative to invasive hair transplants and harsh chemical treatments.'
  }
];

export function WhyNishHair() {
  const shouldReduceMotion = useReducedMotion();
  const { openFounderStory } = useSiteState();

  return (
    <section className="nh-sans bg-[var(--nh-paper)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="why-nish-hair">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: 4 Pillars with Staggered Entrance (Part 5A) */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)] block">
                The Nish Hair Standard
              </span>
              <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--nh-ink)] tracking-tight">
                Crafted for Scalp Health & Lifelong Confidence
              </h2>
              <p className="text-[16px] leading-[1.72] text-[var(--nh-ink)]/70 max-w-xl">
                Founded in 2017 by Parul Gulati, Nish Hair was born out of frustration with synthetic wigs and fake marketing. We handcraft hair pieces that empower you without ever harming your natural roots.
              </p>
            </div>

            {/* 4 Pillars */}
            <div className="space-y-6 pt-2">
              {PILLARS.map((pillar, index) => (
                <motion.div
                  key={pillar.num}
                  initial={shouldReduceMotion ? false : { opacity: 0, x: -16 }}
                  whileInView={shouldReduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: 'easeOut' }}
                  className="flex items-start gap-4 p-4 bg-[var(--nh-bone)] border border-[var(--nh-ink)]/10 hover:border-[var(--nh-ink)] transition-colors group"
                >
                  <div className="nh-serif font-black text-2xl text-[var(--nh-gold)] group-hover:text-[var(--nh-chestnut)] transition-colors shrink-0">
                    {pillar.num}
                  </div>
                  <div>
                    <h3 className="nh-serif font-bold text-lg text-[var(--nh-ink)] leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-sm text-[var(--nh-ink)]/75 mt-1 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={openFounderStory}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-chestnut)] transition-colors cursor-pointer"
              >
                <span>Read Parul's Shark Tank Journey &rarr;</span>
              </button>
            </div>
          </div>

          {/* Right Column: Part 4 Half-tone Dot Pattern Backdrop Wrapper */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative p-6 sm:p-8 border-2 border-[var(--nh-ink)] bg-white shadow-2xl w-full max-w-[460px]">
              {/* Part 4: Dot backdrop applied to right column */}
              <div className="absolute inset-0 nh-dot-backdrop pointer-events-none opacity-40" />

              <div className="relative z-10 space-y-6">
                <div className="aspect-[4/5] overflow-hidden border border-[var(--nh-ink)]/20 shadow-md bg-[var(--nh-bone)]">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                    alt="Parul Gulati with Nish Hair"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="p-4 bg-[var(--nh-bone)] border border-[var(--nh-ink)]/10 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-extrabold uppercase tracking-wider text-[var(--nh-chestnut)]">Founder & Creative Director</span>
                    <span className="font-mono text-[10px] text-[var(--nh-ink)]/50">EST. 2017</span>
                  </div>
                  <div className="nh-serif font-black text-xl text-[var(--nh-ink)]">
                    Parul Gulati
                  </div>
                  <p className="text-xs text-[var(--nh-ink)]/70 italic nh-serif leading-relaxed">
                    "I started Nish Hair with just my savings and a dream to make every woman look in the mirror and smile with pride."
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
