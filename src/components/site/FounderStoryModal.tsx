import { motion } from "motion/react";
import { X, Award, ShieldCheck } from "lucide-react";

interface FounderStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FounderStoryModal({ isOpen, onClose }: FounderStoryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="nh-sans fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border-2 border-[var(--nh-ink)] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-[var(--nh-ink)] text-white px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div>
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--nh-gold)] font-bold">
              The Founder’s Journey
            </span>
            <h3 className="nh-serif font-black text-2xl text-white">
              The Nish Hair Story by Parul Gulati
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-white/70 hover:text-white cursor-pointer"
            aria-label="Close Story Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 space-y-8 bg-[var(--nh-paper)] text-[var(--nh-ink)]">

          {/* Top Hero with Founder Photo */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 aspect-[4/5] border-2 border-[var(--nh-ink)] overflow-hidden bg-[var(--nh-bone)] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
                alt="Parul Gulati Founder of Nish Hair"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--nh-bone)] border border-[var(--nh-ink)]/15 text-[11px] font-extrabold uppercase tracking-wider text-[var(--nh-chestnut)]">
                <Award className="w-3.5 h-3.5" />
                Shark Tank India Feature
              </div>

              <h3 className="nh-serif font-black text-3xl sm:text-4xl text-[var(--nh-ink)] leading-tight">
                "I was told women in India wouldn't talk about hair loss. We proved everyone wrong."
              </h3>

              <p className="text-sm text-[var(--nh-ink)]/80 leading-relaxed nh-serif italic border-l-2 border-[var(--nh-gold)] pl-4">
                "Hair isn't just about looking glamorous for a photo. When a woman loses her hair to PCOS, postpartum shedding, chemo, or genetics, she loses a part of herself. Nish Hair was built to restore that dignity instantly."
              </p>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="space-y-6 pt-4 border-t border-[var(--nh-ink)]/10">
            <h4 className="nh-serif font-black text-2xl text-[var(--nh-ink)]">
              The Milestones of India’s #1 Hair Brand
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-white border border-[var(--nh-ink)]/15 space-y-2">
                <div className="nh-serif font-black text-2xl text-[var(--nh-chestnut)]">2017</div>
                <h5 className="font-bold text-sm text-[var(--nh-ink)]">Born in a Small Flat</h5>
                <p className="text-xs text-[var(--nh-ink)]/70 leading-relaxed">
                  Parul invested her entire acting savings to handcraft raw virgin hair toppers when no Indian brand existed.
                </p>
              </div>

              <div className="p-5 bg-white border border-[var(--nh-ink)]/15 space-y-2">
                <div className="nh-serif font-black text-2xl text-[var(--nh-chestnut)]">2023</div>
                <h5 className="font-bold text-sm text-[var(--nh-ink)]">Shark Tank Viral Pitch</h5>
                <p className="text-xs text-[var(--nh-ink)]/70 leading-relaxed">
                  Stepped onto national television as a 100% solo founder, showcasing massive profitability and emotional consumer trust.
                </p>
              </div>

              <div className="p-5 bg-white border border-[var(--nh-ink)]/15 space-y-2">
                <div className="nh-serif font-black text-2xl text-[var(--nh-chestnut)]">Today</div>
                <h5 className="font-bold text-sm text-[var(--nh-ink)]">Global Sisterhood</h5>
                <p className="text-xs text-[var(--nh-ink)]/70 leading-relaxed">
                  Over 100,000+ satisfied clients across 45 countries, with 7 flagship experiential lounges in major metro hubs.
                </p>
              </div>
            </div>
          </div>

          {/* Founder Promise */}
          <div className="bg-[var(--nh-ink)] text-white p-6 sm:p-8 space-y-4 border border-[var(--nh-ink)]">
            <div className="flex items-center gap-2 text-[var(--nh-gold)] text-xs font-extrabold uppercase tracking-widest">
              <ShieldCheck className="w-4 h-4" />
              The Nish Hair Founder Promise
            </div>
            <p className="text-sm text-white/85 leading-relaxed">
              Every single piece leaving our atelier is touched by human hands, ethically sourced, and tested for pure human hair authenticity. If a product does not meet the standards I would wear myself on camera, it never goes into a box.
            </p>
            <div className="pt-2 flex items-center justify-between">
              <span className="nh-serif italic font-bold text-lg text-[var(--nh-gold)]">— Parul Gulati</span>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[var(--nh-gold)] text-[var(--nh-ink)] text-xs font-extrabold uppercase tracking-wider hover:bg-white transition-colors cursor-pointer"
              >
                Explore The Collection
              </button>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
