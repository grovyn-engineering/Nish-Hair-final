import { Sparkle, Heart, Camera, Briefcase, Plane, Coffee, Flame } from 'lucide-react';

const MOMENTS = [
  { label: 'Royal Weddings & Sangeet Nights', icon: Heart, tag: 'Bridal' },
  { label: 'C-Suite Boardroom Presentations', icon: Briefcase, tag: 'Professional' },
  { label: 'Zero-Humidity Vacation Waves', icon: Plane, tag: 'Travel' },
  { label: 'Instant Morning Bad-Hair-Day Fixes', icon: Coffee, tag: 'Everyday' },
  { label: 'Red Carpet Studio Glam', icon: Camera, tag: 'Celebrity' },
  { label: 'Postpartum Regrowth Confidence', icon: Flame, tag: 'Restoration' },
];

export function HairMomentStrip() {
  return (
    <section className="nh-sans bg-[var(--nh-bone)] py-6 overflow-hidden border-b border-[var(--nh-ink)]/10" id="hair-moments">
      <div className="relative flex overflow-x-hidden">

        {/* Infinite Marquee Track */}
        <div className="nh-animate-marquee flex items-center gap-6 whitespace-nowrap">
          {[...MOMENTS, ...MOMENTS, ...MOMENTS].map((moment, idx) => {
            const Icon = moment.icon;
            return (
              <div
                key={idx}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-[var(--nh-ink)]/15 shadow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-[var(--nh-chestnut)]"></div>
                <Icon className="w-4 h-4 text-[var(--nh-gold)]" />
                <span className="nh-serif font-bold text-sm tracking-tight text-[var(--nh-ink)]">
                  {moment.label}
                </span>
                <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 bg-[var(--nh-bone)] text-[var(--nh-chestnut)] border border-[var(--nh-ink)]/10">
                  {moment.tag}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
