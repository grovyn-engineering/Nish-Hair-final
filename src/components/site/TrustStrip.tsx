// Ported near-verbatim from the prototype's TrustStrip.tsx (no props/state to adapt).

import { motion, useReducedMotion } from "motion/react";
import { CheckCircle2, Award, Truck, HeartHandshake, ShieldCheck } from "lucide-react";

const TRUST_METRICS = [
  { icon: ShieldCheck, stat: "100% Remy", label: "Virgin Human Hair", sub: "Single donor raw cuticles aligned" },
  { icon: Award, stat: "Shark Tank", label: "India Winner", sub: "Solo founded by Parul Gulati" },
  { icon: HeartHandshake, stat: "100,000+", label: "Women Transformed", sub: "Across 45+ countries globally" },
  { icon: CheckCircle2, stat: "Zero Damage", label: "Damage-Free Clips", sub: "Medical-grade silicon coated" },
  { icon: Truck, stat: "Pan-India", label: "Express Dispatch", sub: "Same day dispatch before 2 PM" },
];

export function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="nh-sans bg-[var(--nh-ink)] text-white py-8 border-b border-white/10 relative z-10" id="trust-strip">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8">
          {TRUST_METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.stat}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.06, ease: "easeOut" }}
                className="flex items-start gap-3.5 group"
              >
                <div className="p-2 bg-white/5 border border-white/10 text-[var(--nh-gold)] group-hover:border-[var(--nh-gold)] transition-colors shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="nh-serif font-black text-lg lg:text-xl text-white tracking-tight leading-tight">{metric.stat}</div>
                  <div className="text-[12px] font-bold uppercase tracking-wider text-[var(--nh-gold)] mt-0.5">{metric.label}</div>
                  <div className="text-[11px] text-white/50 mt-0.5 leading-snug">{metric.sub}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
