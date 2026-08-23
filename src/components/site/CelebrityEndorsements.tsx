import { useReducedMotion } from 'motion/react';
import { CELEBRITY_REVIEWS } from '@/data/catalog';
import { Quote, CheckCircle2, Award } from 'lucide-react';

export function CelebrityEndorsements() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="nh-sans bg-[var(--nh-ink)] text-white nh-section-pad border-b border-white/10" id="celebrities-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-gold)] block">
              Red Carpet Endorsements
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
              Loved by Creators, Icons & Judges
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-white/10 px-5 py-3 border border-white/15">
            <Award className="w-6 h-6 text-[var(--nh-gold)]" />
            <div>
              <div className="text-xs font-extrabold uppercase text-white">Shark Tank India Season 2</div>
              <div className="text-[11px] text-white/60">Featured Pitch & Unanimous Praise</div>
            </div>
          </div>
        </div>

        {/* 4 Cards Grid with Part 3D Depth Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CELEBRITY_REVIEWS.map((celeb) => (
            <div
              key={celeb.id}
              className="bg-[var(--nh-paper)] text-[var(--nh-ink)] border-2 border-white/15 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-8px_rgba(15,11,8,0.5)] group"
            >
              <div className="space-y-4">
                {/* Photo & Header */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[var(--nh-chestnut)] shrink-0 bg-[var(--nh-bone)]">
                    <img
                      src={celeb.image}
                      alt={celeb.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="nh-serif font-black text-lg text-[var(--nh-ink)] leading-tight">
                      {celeb.name}
                    </h3>
                    <p className="text-[11px] font-semibold text-[var(--nh-chestnut)]">
                      {celeb.title}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <div className="space-y-2 pt-2 border-t border-[var(--nh-ink)]/10">
                  <Quote className="w-5 h-5 text-[var(--nh-gold)]" />
                  <p className="nh-serif italic text-[13px] text-[var(--nh-ink)]/85 leading-relaxed">
                    {celeb.quote}
                  </p>
                </div>
              </div>

              {/* Loved Product Footer */}
              <div className="pt-4 mt-4 border-t border-[var(--nh-ink)]/10 flex items-center justify-between text-xs">
                <span className="text-[10px] uppercase font-bold text-[var(--nh-ink)]/50">Favorite Piece:</span>
                <span className="font-bold text-[var(--nh-ink)] text-[11px]">{celeb.productLoved}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
