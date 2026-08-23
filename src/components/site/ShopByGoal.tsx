// Ported from the prototype's ShopByGoal.tsx. Category selection now goes
// through useSiteState().setSelectedCategory instead of an onSelectCategory prop.

import { motion, useReducedMotion } from "motion/react";
import { useSiteState } from "@/lib/site-state";

const GOALS = [
  {
    id: "toppers",
    title: "Cover Crown Thinning & Widening Part",
    subtitle: "Invisible scalp-matching silk base toppers in 12\" to 22\" lengths",
    tag: "Crown & Scalp",
    image: "https://www.nishhair.com/cdn/shop/files/Besthairtopper-Curly-Naturalblack_2.png?v=1785153471",
    stats: "Over 65,000+ Toppers Fitted",
  },
  {
    id: "extensions",
    title: "Add Instant Volume & Red-Carpet Length",
    subtitle: "7-piece seamless clip-ins that feel completely weightless",
    tag: "Volume & Length",
    image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=700&auto=format&fit=crop",
    stats: "Zero Glue or Tape Needed",
  },
  {
    id: "bangs",
    title: "Face Framing Curtain Bangs (Zero Cuts)",
    subtitle: "French wispy fringe that snaps in and out in 15 seconds",
    tag: "Instant Makeover",
    image: "https://www.nishhair.com/cdn/shop/files/clip-in_curtain_dark_brown.jpg?v=1768224307",
    stats: "No Salon Grow-Out Regret",
  },
  {
    id: "men",
    title: "Men's Toupees & Hair Replacement",
    subtitle: "French lace undetectable hairlines for men of all ages",
    tag: "Men's Solution",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=700&auto=format&fit=crop",
    stats: "100% Discreet Packaging",
  },
];

export function ShopByGoal() {
  const { setSelectedCategory } = useSiteState();
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="nh-sans bg-[var(--nh-ink)] text-white nh-section-pad border-b border-white/10" id="shop-by-goal">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-gold)] block">
              Solution-Driven Hierarchy
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              Shop By Your Hair Goal
            </h2>
          </div>
          <p className="text-[16px] leading-[1.72] text-white/70 max-w-md">
            Whether you want undetectable crown coverage, bridal glamour, or zero-scissor bangs, explore solutions tailored to your unique hair profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {GOALS.map((goal) => (
            <motion.div
              key={goal.id}
              whileHover={shouldReduceMotion ? undefined : { rotateX: -4, scale: 1.03, translateZ: 16 }}
              style={{ transformStyle: "preserve-3d", perspective: 800 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              onClick={() => setSelectedCategory(goal.id)}
              className="group relative h-[420px] bg-[var(--nh-chestnut)]/30 border-2 border-white/15 overflow-hidden cursor-pointer flex flex-col justify-end p-6 select-none shadow-xl"
            >
              <img src={goal.image} alt={goal.title} className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--nh-ink)] via-[var(--nh-ink)]/70 to-transparent group-hover:via-[var(--nh-ink)]/60 transition-all duration-300" />
              <div className="relative z-10 space-y-2">
                <span className="inline-block px-3 py-1 bg-[var(--nh-gold)] text-[var(--nh-ink)] text-[10px] font-extrabold uppercase tracking-wider">
                  {goal.tag}
                </span>
                <h3 className="nh-serif font-bold text-xl sm:text-2xl text-white group-hover:text-[var(--nh-gold)] transition-colors leading-tight">
                  {goal.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">{goal.subtitle}</p>
                <div className="pt-2 flex items-center justify-between border-t border-white/15 text-[11px] text-[var(--nh-gold)] font-extrabold uppercase tracking-wider">
                  <span>{goal.stats}</span>
                  <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">Explore &rarr;</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
