// Redesigned header — ported from the "digital flagship" prototype's Header.tsx.
// Exported as `Navbar` (unchanged name) because src/routes/try-on.tsx renders
// <Navbar /> with zero props and must keep working without modification.
// All interactivity now reads from useSiteState() instead of callback props.

import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X, Sparkles, PhoneCall } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

const NAV_LINKS = [
  { label: "Hair Toppers", category: "toppers" },
  { label: "Clip-In Extensions", category: "extensions" },
  { label: "Clip-In Bangs", category: "bangs" },
  { label: "Men's Range", category: "men" },
] as const;

export function Navbar() {
  const { cartCount, openCart, setSelectedCategory, openFounderStory, goToTryOn } = useSiteState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="nh-sans sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top announcement bar */}
      <div className="bg-[var(--nh-ink)] text-white text-[11px] font-medium py-2 px-4 border-b border-white/10">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-4 text-white/70">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Free Express Shipping Across India
            </span>
            <span className="text-white/30">|</span>
            <a href="tel:+918287093400" className="hover:text-white transition-colors flex items-center gap-1">
              <PhoneCall className="w-3 h-3 text-[var(--nh-gold)]" />
              Hair Expert Hotline: +91 82870 93400
            </a>
          </div>
          <div className="mx-auto sm:mx-0 text-center flex items-center gap-2">
            <span className="text-[var(--nh-gold)] font-bold tracking-wider">SHARK TANK INDIA FAVORITE</span>
            <span className="text-white/40 hidden md:inline">·</span>
            <span className="text-white/80 hidden md:inline">100,000+ Scalp Matches Delivered</span>
          </div>
          <Link to="/try-on" className="hidden sm:inline text-white/70 hover:text-white transition-colors">
            AI Try-On Studio &rarr;
          </Link>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`w-full transition-all duration-200 ${
          isScrolled
            ? "bg-[var(--nh-paper)]/95 backdrop-blur-md shadow-md py-3 border-b border-[var(--nh-ink)]/10"
            : "bg-[var(--nh-paper)] py-4 border-b border-[var(--nh-ink)]/10"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen((v) => !v)}
              className="lg:hidden p-1.5 text-[var(--nh-ink)] hover:text-[var(--nh-chestnut)] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <Link to="/" className="flex flex-col group">
              <div className="flex items-baseline gap-1">
                <span className="nh-serif font-black text-2xl sm:text-3xl tracking-tight text-[var(--nh-ink)] group-hover:text-[var(--nh-chestnut)] transition-colors">
                  NISH HAIR
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--nh-gold)]" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.28em] text-[var(--nh-ink)]/60 font-semibold -mt-1">
                By Parul Gulati · 100% Human Hair
              </span>
            </Link>
          </div>

          <nav aria-label="Main" className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.category}
                to="/"
                search={{ category: link.category }}
                hash="shop-curated-section"
                onClick={() => setSelectedCategory(link.category)}
                className="text-[13px] font-semibold uppercase tracking-wider text-[var(--nh-ink)]/80 hover:text-[var(--nh-chestnut)] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={openFounderStory}
              className="text-[13px] font-semibold uppercase tracking-wider text-[var(--nh-ink)]/80 hover:text-[var(--nh-chestnut)] transition-colors cursor-pointer"
            >
              Founder Story
            </button>
          </nav>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={goToTryOn}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2 bg-[var(--nh-ink)] text-white text-[10px] font-bold uppercase tracking-[0.2em] border border-[var(--nh-ink)] hover:bg-[var(--nh-chestnut)] hover:border-[var(--nh-chestnut)] transition-all shadow-sm cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--nh-gold)]" />
              <span>Try Your Look</span>
            </button>

            <button
              onClick={openCart}
              className="relative p-2 text-[var(--nh-ink)] hover:text-[var(--nh-chestnut)] transition-colors cursor-pointer"
              aria-label="Open Shopping Bag"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[var(--nh-chestnut)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[var(--nh-paper)] border-b border-[var(--nh-ink)]/20 px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.category}
                to="/"
                search={{ category: link.category }}
                hash="shop-curated-section"
                onClick={() => {
                  setSelectedCategory(link.category);
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-bold uppercase tracking-wider text-[var(--nh-ink)] hover:text-[var(--nh-chestnut)] py-1.5"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                openFounderStory();
                setMobileMenuOpen(false);
              }}
              className="text-left text-sm font-bold uppercase tracking-wider text-[var(--nh-ink)] hover:text-[var(--nh-chestnut)] py-1.5"
            >
              Founder Story
            </button>
          </div>
          <div className="pt-4 border-t border-[var(--nh-ink)]/10">
            <button
              onClick={() => {
                goToTryOn();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[var(--nh-chestnut)] text-white text-xs font-extrabold uppercase tracking-widest"
            >
              <Sparkles className="w-4 h-4 text-[var(--nh-gold)]" />
              Launch AI Hair Try-On Studio
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
