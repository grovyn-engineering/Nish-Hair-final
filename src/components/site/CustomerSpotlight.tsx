import { CUSTOMER_REVIEWS } from "@/data/catalog";
import { Star, ShieldCheck, CheckCircle, ThumbsUp } from "lucide-react";

export function CustomerSpotlight() {
  return (
    <section className="nh-sans bg-[var(--nh-paper)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="reviews-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)] block">
              Verified Buyer Community
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--nh-ink)] tracking-tight">
              Real Hair Stories from Real Women & Men
            </h2>
          </div>
          <div className="flex items-center gap-3 bg-[var(--nh-bone)] p-4 border border-[var(--nh-ink)]/15">
            <div className="text-3xl nh-serif font-black text-[var(--nh-ink)]">4.9</div>
            <div>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-[11px] font-bold text-[var(--nh-ink)]/70 mt-0.5">
                Based on 10,400+ Verified Customer Ratings
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CUSTOMER_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border-2 border-[var(--nh-ink)] p-6 sm:p-8 flex flex-col justify-between shadow-lg space-y-6"
            >
              <div className="space-y-4">
                {/* Header with Photo and Verification */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden border border-[var(--nh-ink)]/20 shrink-0 bg-[var(--nh-bone)]">
                    <img
                      src={rev.image}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h3 className="nh-serif font-bold text-lg text-[var(--nh-ink)]">
                      {rev.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-emerald-700 font-bold">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{rev.date}</span>
                    </div>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex text-amber-500">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-sm text-[var(--nh-ink)]/80 leading-relaxed font-normal">
                  "{rev.review}"
                </p>
              </div>

              {/* Concern & Solution Footer */}
              <div className="pt-4 border-t border-[var(--nh-ink)]/10 space-y-1.5 bg-[var(--nh-paper)] p-3 border">
                <div className="text-[11px]">
                  <span className="font-bold text-[var(--nh-ink)]/60">Concern: </span>
                  <span className="font-semibold text-[var(--nh-ink)]">{rev.hairConcern}</span>
                </div>
                <div className="text-[11px]">
                  <span className="font-bold text-[var(--nh-ink)]/60">Solution: </span>
                  <span className="font-bold text-[var(--nh-chestnut)]">{rev.solution}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
