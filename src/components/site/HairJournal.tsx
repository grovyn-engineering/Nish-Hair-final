import { ARTICLES } from "@/data/catalog";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

export function HairJournal() {
  return (
    <section className="nh-sans bg-[var(--nh-paper)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="journal-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)] block">
              Editorial & Guides
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--nh-ink)] tracking-tight">
              The Nish Hair Journal
            </h2>
          </div>
          <p className="text-[16px] leading-[1.72] text-[var(--nh-ink)]/70 max-w-md">
            Expert trichology insights, styling tutorials, wash-care masterclasses, and real self-care narratives directly from our founder.
          </p>
        </div>

        {/* Articles Grid (Part 7 editorial layout with aspect-[3/2] and top-left reading time pill) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              className="bg-white border-2 border-[var(--nh-ink)] flex flex-col justify-between group shadow-md hover:shadow-2xl transition-shadow"
            >
              <div>
                {/* Image Frame with Part 7 aspect-[3/2] and reading time pill badge */}
                <div className="relative aspect-[3/2] overflow-hidden bg-[var(--nh-bone)] border-b border-[var(--nh-ink)]/15">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />

                  {/* Part 7: Reading time pill badge at top-left of image overlay */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[var(--nh-bone)] text-[var(--nh-ink)] text-[10px] font-extrabold uppercase tracking-wider border border-[var(--nh-ink)]/10 shadow-sm">
                      <Clock className="w-3 h-3 text-[var(--nh-chestnut)]" />
                      {article.readTime}
                    </span>
                  </div>
                </div>

                {/* Article Info */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--nh-chestnut)]">
                      {article.category}
                    </span>
                    <span className="text-[11px] text-[var(--nh-ink)]/50">{article.date}</span>
                  </div>

                  <h3 className="nh-serif font-bold text-xl text-[var(--nh-ink)] leading-snug group-hover:text-[var(--nh-chestnut)] transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-[var(--nh-ink)]/70 leading-relaxed line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read Link */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-[var(--nh-ink)]/10 text-xs">
                <span className="font-bold text-[var(--nh-ink)]/70">By {article.author}</span>
                <span className="font-extrabold text-[var(--nh-chestnut)] uppercase flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read Article &rarr;
                </span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
