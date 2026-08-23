import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { X, Star, ShoppingBag, ShieldCheck } from "lucide-react";
import type { CatalogProduct } from "@/data/catalogTypes";
import { useSiteState } from "@/lib/site-state";

interface QuickViewModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
}

export function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const { addToCart } = useSiteState();

  // Hooks must run unconditionally (before the `!product` early return below),
  // so state is seeded from the product when present and re-synced whenever
  // a different product is quick-viewed.
  const [selectedShade, setSelectedShade] = useState(product?.shades[0] ?? "");
  const [selectedLength, setSelectedLength] = useState(product?.lengths[0] ?? "");
  const [activeImage, setActiveImage] = useState(product?.image ?? "");

  useEffect(() => {
    if (product) {
      setSelectedShade(product.shades[0]);
      setSelectedLength(product.lengths[0]);
      setActiveImage(product.image);
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="nh-sans fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border-2 border-[var(--nh-ink)] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
      >
        {/* Header */}
        <div className="bg-[var(--nh-paper)] px-6 py-4 flex items-center justify-between border-b border-[var(--nh-ink)]/10">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--nh-chestnut)] font-extrabold">
              {product.category.toUpperCase()}
            </span>
            <span className="text-[var(--nh-ink)]/30">·</span>
            <span className="text-xs font-bold text-[var(--nh-ink)]/70">{product.badge || '100% Remy Hair'}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[var(--nh-ink)]/60 hover:text-[var(--nh-ink)] cursor-pointer"
            aria-label="Close product quick view"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-0">

          {/* Left Column: Product Photos */}
          <div className="md:col-span-6 bg-[var(--nh-bone)] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[var(--nh-ink)]/10">
            <div className="aspect-[4/5] bg-white border border-[var(--nh-ink)]/15 overflow-hidden">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {product.hoverImage && (
              <div className="flex gap-2 pt-3">
                <button
                  onClick={() => setActiveImage(product.image)}
                  className={`w-16 h-16 border overflow-hidden cursor-pointer ${activeImage === product.image ? 'border-2 border-[var(--nh-ink)]' : 'opacity-60'}`}
                >
                  <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
                <button
                  onClick={() => setActiveImage(product.hoverImage!)}
                  className={`w-16 h-16 border overflow-hidden cursor-pointer ${activeImage === product.hoverImage ? 'border-2 border-[var(--nh-ink)]' : 'opacity-60'}`}
                >
                  <img src={product.hoverImage} alt="Thumbnail 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Customizer & Add To Bag */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-[var(--nh-ink)] font-bold mb-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                  <span className="text-[var(--nh-ink)]/50">({product.reviewsCount} verified reviews)</span>
                </div>
                <h3 className="nh-serif font-black text-2xl sm:text-3xl text-[var(--nh-ink)]">
                  {product.name}
                </h3>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="nh-serif font-black text-3xl text-[var(--nh-ink)]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[var(--nh-ink)]/40 line-through">
                    ₹{product.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 border border-emerald-200">
                  Save ₹{(product.originalPrice ? product.originalPrice - product.price : 0).toLocaleString('en-IN')}
                </span>
              </div>

              <p className="text-sm text-[var(--nh-ink)]/80 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              {(product.baseSize || product.density) && (
                <div className="p-3 bg-[var(--nh-paper)] border border-[var(--nh-ink)]/10 text-xs space-y-1">
                  {product.baseSize && <div><span className="font-bold">Base Type:</span> {product.baseSize}</div>}
                  {product.density && <div><span className="font-bold">Density:</span> {product.density}</div>}
                </div>
              )}

              {/* Shade */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--nh-ink)]/60 text-[10px]">Select Shade:</span>
                  <span className="font-bold text-[var(--nh-chestnut)]">{selectedShade}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.shades.map((shade) => (
                    <button
                      key={shade}
                      onClick={() => setSelectedShade(shade)}
                      className={`px-3 py-1.5 text-xs font-semibold border cursor-pointer ${
                        selectedShade === shade
                          ? 'bg-[var(--nh-ink)] text-white border-[var(--nh-ink)]'
                          : 'bg-white text-[var(--nh-ink)] border-[var(--nh-ink)]/20 hover:border-[var(--nh-ink)]'
                      }`}
                    >
                      {shade}
                    </button>
                  ))}
                </div>
              </div>

              {/* Length */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold uppercase tracking-wider text-[var(--nh-ink)]/60 text-[10px]">Select Length:</span>
                  <span className="font-bold text-[var(--nh-ink)]">{selectedLength}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.lengths.map((len) => (
                    <button
                      key={len}
                      onClick={() => setSelectedLength(len)}
                      className={`px-3 py-1.5 text-xs font-semibold border cursor-pointer ${
                        selectedLength === len
                          ? 'bg-[var(--nh-ink)] text-white border-[var(--nh-ink)]'
                          : 'bg-white text-[var(--nh-ink)] border-[var(--nh-ink)]/20 hover:border-[var(--nh-ink)]'
                      }`}
                    >
                      {len}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Bag CTA */}
            <div className="pt-4 border-t border-[var(--nh-ink)]/10 space-y-2">
              <button
                onClick={() => {
                  addToCart(product, selectedShade, selectedLength);
                  onClose();
                }}
                className="w-full py-4 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-chestnut)] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Piece To Shopping Bag</span>
              </button>
              <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--nh-ink)]/60">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Remy Hair Guarantee · Free Express Shipping</span>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </div>
  );
}
