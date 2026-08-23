// Ported from the prototype's CuratedProducts.tsx. Reads/writes the shared
// selectedCategory + cart + quick view state from useSiteState() instead of
// receiving them as props.

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PRODUCTS } from "@/data/catalog";
import type { CatalogProduct } from "@/data/catalogTypes";
import { Star, ShoppingBag, Eye, Check } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

const CATEGORIES = [
  { id: "all", label: "All Products" },
  { id: "toppers", label: "Hair Toppers" },
  { id: "extensions", label: "Clip-In Extensions" },
  { id: "bangs", label: "Clip-In Bangs" },
  { id: "men", label: "Men's Range" },
  { id: "ponytails", label: "Ponytails" },
  { id: "color", label: "Color Streaks" },
];

export function CuratedProducts() {
  const { selectedCategory, setSelectedCategory, addToCart, openQuickView } = useSiteState();
  const shouldReduceMotion = useReducedMotion();
  const [selectedShades, setSelectedShades] = useState<Record<string, string>>({});
  const [selectedLengths, setSelectedLengths] = useState<Record<string, string>>({});
  const [addedPopup, setAddedPopup] = useState<string | null>(null);

  const filteredProducts: CatalogProduct[] =
    selectedCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === selectedCategory);

  const handleAdd = (product: CatalogProduct) => {
    const shade = selectedShades[product.id] || product.shades[0];
    const length = selectedLengths[product.id] || product.lengths[0];
    addToCart(product, shade, length);
    setAddedPopup(product.id);
    setTimeout(() => setAddedPopup(null), 2000);
  };

  return (
    <section className="nh-sans bg-[var(--nh-bone)] nh-section-pad border-b border-[var(--nh-ink)]/10" id="shop-curated-section">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
          <div className="space-y-2">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-[var(--nh-chestnut)] block">
              Direct From The Workshop
            </span>
            <h2 className="nh-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[var(--nh-ink)] tracking-tight">
              Curated Hair Collection
            </h2>
          </div>
          <p className="text-[16px] leading-[1.72] text-[var(--nh-ink)]/70 max-w-md">
            Every strand is hand-sourced, hygienically washed, hand-knotted on breathable bases, and tested to last up to 3+ years with proper care.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[var(--nh-ink)]/10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 sm:px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? "bg-[var(--nh-ink)] text-white border-[var(--nh-ink)] shadow-sm"
                  : "bg-white text-[var(--nh-ink)] border-[var(--nh-ink)]/15 hover:border-[var(--nh-ink)]/60"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div style={{ perspective: 1000 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const currentShade = selectedShades[product.id] || product.shades[0];
            const isAdded = addedPopup === product.id;
            return (
              <motion.div
                key={product.id}
                style={{ transformStyle: "preserve-3d" }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.04, rotateX: -2, translateZ: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="group bg-white border-2 border-[var(--nh-ink)] flex flex-col justify-between shadow-md hover:shadow-2xl transition-shadow"
              >
                <div className="relative aspect-[4/4.5] overflow-hidden bg-[var(--nh-bone)] border-b border-[var(--nh-ink)]/10">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  {product.badge && (
                    <div className="absolute top-3 left-3 px-2.5 py-1 bg-[var(--nh-chestnut)] text-white text-[9px] font-extrabold uppercase tracking-widest shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  <button
                    onClick={() => openQuickView(product)}
                    className="absolute bottom-3 right-3 p-2 bg-white/90 backdrop-blur-md text-[var(--nh-ink)] border border-black/10 shadow-md hover:bg-[var(--nh-ink)] hover:text-white transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
                    aria-label="Quick View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--nh-chestnut)]">
                        {product.subCategory || product.category}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-[var(--nh-ink)] font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                        <span className="text-[var(--nh-ink)]/40 font-normal">({product.reviewsCount})</span>
                      </div>
                    </div>
                    <h3 className="nh-serif font-bold text-lg text-[var(--nh-ink)] leading-snug group-hover:text-[var(--nh-chestnut)] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-[var(--nh-ink)]/70 line-clamp-2 leading-relaxed">{product.description}</p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[var(--nh-ink)]/10">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-[var(--nh-ink)]/60">Shade:</span>
                      <span className="font-bold text-[var(--nh-ink)] truncate max-w-[140px]">{currentShade}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {product.shades.map((shade) => (
                        <button
                          key={shade}
                          onClick={() => setSelectedShades((prev) => ({ ...prev, [product.id]: shade }))}
                          title={shade}
                          className={`text-[9px] px-2 py-0.5 border font-semibold transition-all cursor-pointer ${
                            currentShade === shade
                              ? "bg-[var(--nh-ink)] text-white border-[var(--nh-ink)]"
                              : "bg-[var(--nh-paper)] text-[var(--nh-ink)] border-[var(--nh-ink)]/20 hover:border-[var(--nh-ink)]"
                          }`}
                        >
                          {shade.split(" ")[0]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--nh-ink)]/10 flex items-center justify-between gap-3">
                    <div>
                      <div className="nh-serif font-black text-xl text-[var(--nh-ink)]">₹{product.price.toLocaleString("en-IN")}</div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-[var(--nh-ink)]/40 line-through">₹{product.originalPrice.toLocaleString("en-IN")}</div>
                      )}
                    </div>
                    <button
                      onClick={() => handleAdd(product)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 text-[11px] font-extrabold uppercase tracking-wider border transition-all cursor-pointer ${
                        isAdded ? "bg-emerald-700 text-white border-emerald-700" : "bg-[var(--nh-ink)] text-white border-[var(--nh-ink)] hover:bg-[var(--nh-chestnut)]"
                      }`}
                    >
                      {isAdded ? (<><Check className="w-3.5 h-3.5" /><span>Added!</span></>) : (<><ShoppingBag className="w-3.5 h-3.5" /><span>Add to Bag</span></>)}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
