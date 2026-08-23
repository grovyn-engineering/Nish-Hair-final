// Redesigned footer — ported from the prototype's Footer.tsx, with real
// contact info from nishhair.com. Exported as `Footer` (unchanged name)
// because src/routes/try-on.tsx renders <Footer /> with zero props.

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Youtube, Facebook } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

export function Footer() {
  const { setSelectedCategory, openFounderStory, goToTryOn } = useSiteState();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="nh-sans bg-[var(--nh-ink)] text-white border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="nh-serif font-black text-3xl tracking-tight text-white">NISH HAIR</span>
              <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--nh-gold)] font-bold">
                By Parul Gulati · 100% Real Human Hair
              </span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              India's pioneer in luxury 100% human hair toppers, seamless clip-in extensions, and clip-in bangs.
              Restoring crowns, smiles, and self-confidence since 2017.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://instagram.com/nishhair" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--nh-chestnut)] transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--nh-chestnut)] transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-white/80 hover:text-white hover:bg-[var(--nh-chestnut)] transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop links */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--nh-gold)]">Shop Collections</h4>
            <ul className="space-y-2 text-xs text-white/70">
              {[
                ["toppers", "Silk Hair Toppers"],
                ["extensions", "Clip-In Hair Extensions"],
                ["bangs", "Clip-In Curtain Bangs"],
                ["men", "Men's Toupees & Wigs"],
                ["ponytails", "Glamour Ponytails"],
                ["color", "Balayage Highlights"],
              ].map(([cat, label]) => (
                <li key={cat}>
                  <Link
                    to="/"
                    search={{ category: cat }}
                    hash="shop-curated-section"
                    onClick={() => setSelectedCategory(cat)}
                    className="hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Studios */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--nh-gold)]">Flagship Studios</h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li><a href="#stores-section" className="hover:text-white transition-colors">Mumbai (Andheri, Bandra, Worli)</a></li>
              <li><a href="#stores-section" className="hover:text-white transition-colors">Bengaluru (Lavelle Road)</a></li>
              <li><a href="#stores-section" className="hover:text-white transition-colors">New Delhi (Vasant Kunj)</a></li>
              <li><a href="#stores-section" className="hover:text-white transition-colors">Hyderabad (Banjara Hills)</a></li>
              <li><a href="#stores-section" className="hover:text-white transition-colors">Pune & Goa Studios</a></li>
              <li><a href="#stores-section" className="hover:text-white transition-colors">Dubai (Al Seef)</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-[0.2em] text-[var(--nh-gold)]">Private Scalp Club</h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Receive secret flash sale codes, shade drop alerts, and hair styling masterclasses.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Address"
                  required
                  className="w-full bg-white/10 border border-white/20 px-3 py-2.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--nh-gold)]"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-[var(--nh-gold)] text-[var(--nh-ink)] font-bold hover:bg-white transition-colors cursor-pointer shrink-0"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-emerald-400 font-semibold">
                  Thank you! Check your inbox for your 10% welcome coupon.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <div>© {new Date().getFullYear()} NISH HAIR INDIA PVT. LTD. All Rights Reserved.</div>
          <div className="flex items-center gap-6">
            <button onClick={openFounderStory} className="hover:text-white transition-colors cursor-pointer">
              Parul Gulati Story
            </button>
            <a href="#hair-quiz-section" className="hover:text-white transition-colors">Hair Match Quiz</a>
            <button onClick={goToTryOn} className="hover:text-white transition-colors cursor-pointer">Virtual Try-On</button>
            <span>Handmade with Love in India</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
