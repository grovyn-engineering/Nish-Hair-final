import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { X, Trash2, Plus, Minus, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import { useSiteState } from "@/lib/site-state";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cartItems, updateCartQuantity, removeCartItem } = useSiteState();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const rawSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const discountAmount = Math.round((rawSubtotal * discountPercent) / 100);
  const finalTotal = rawSubtotal - discountAmount;

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SHARKTANK10' || code === 'NISH10') {
      setDiscountPercent(10);
      setPromoMessage('10% Shark Tank Special Discount Applied!');
    } else if (code === 'PARUL15') {
      setDiscountPercent(15);
      setPromoMessage('15% Founder Story Special Applied!');
    } else {
      setPromoMessage('Invalid coupon code. Try "SHARKTANK10"');
    }
  };

  const handleCheckout = () => {
    alert('Thank you for choosing Nish Hair! Redirecting to secure encrypted checkout...');
  };

  return (
    <div className="nh-sans fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-screen max-w-md bg-white border-l-2 border-[var(--nh-ink)] shadow-2xl flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-6 bg-[var(--nh-paper)] border-b border-[var(--nh-ink)]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[var(--nh-chestnut)]" />
              <h3 className="nh-serif font-black text-xl text-[var(--nh-ink)]">
                Your Shopping Bag ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[var(--nh-ink)]/70 hover:text-[var(--nh-ink)] cursor-pointer"
              aria-label="Close Shopping Bag"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="bg-[var(--nh-bone)] px-6 py-2.5 border-b border-[var(--nh-ink)]/10 text-xs">
            <div className="flex items-center justify-between font-bold text-[var(--nh-ink)]">
              <span>Free Pan-India Express Delivery</span>
              <span className="text-emerald-700">UNLOCKED</span>
            </div>
            <div className="w-full h-1 bg-[var(--nh-mist)] mt-1.5 overflow-hidden">
              <div className="h-full bg-emerald-600 w-full" />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[var(--nh-bone)] flex items-center justify-center mx-auto text-[var(--nh-ink)]/40">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="nh-serif font-bold text-lg text-[var(--nh-ink)]">Your Bag is Empty</h4>
                  <p className="text-xs text-[var(--nh-ink)]/60">Discover our 100% human hair toppers and extensions.</p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase tracking-wider hover:bg-[var(--nh-chestnut)] transition-colors cursor-pointer"
                >
                  Shop Best-Sellers &rarr;
                </button>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedShade}-${item.selectedLength}-${index}`}
                  className="flex gap-4 p-3 bg-[var(--nh-paper)] border border-[var(--nh-ink)]/15"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-24 bg-[var(--nh-bone)] border border-[var(--nh-ink)]/10 shrink-0 overflow-hidden">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="nh-serif font-bold text-sm text-[var(--nh-ink)] leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeCartItem(index)}
                          className="text-[var(--nh-ink)]/40 hover:text-rose-600 p-0.5 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] text-[var(--nh-ink)]/60 mt-0.5">
                        Shade: <span className="font-semibold text-[var(--nh-ink)]">{item.selectedShade}</span>
                      </div>
                      <div className="text-[11px] text-[var(--nh-ink)]/60">
                        Length: <span className="font-semibold text-[var(--nh-ink)]">{item.selectedLength}</span>
                      </div>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[var(--nh-ink)]/20 bg-white">
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity - 1)}
                          className="p-1 hover:bg-[var(--nh-bone)] transition-colors cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(index, item.quantity + 1)}
                          className="p-1 hover:bg-[var(--nh-bone)] transition-colors cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="nh-serif font-black text-sm text-[var(--nh-ink)]">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Promo, Breakdown & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-[var(--nh-paper)] border-t border-[var(--nh-ink)]/15 space-y-4">

              {/* Coupon Code Input */}
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex items-center">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. SHARKTANK10)"
                    className="w-full bg-white border border-[var(--nh-ink)]/20 px-3 py-2 text-xs uppercase placeholder:normal-case font-semibold focus:outline-none focus:border-[var(--nh-ink)]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase hover:bg-[var(--nh-chestnut)] transition-colors shrink-0 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className={`text-[10px] font-semibold ${discountPercent > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
                    {promoMessage}
                  </div>
                )}
              </form>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[var(--nh-ink)]/10">
                <div className="flex justify-between text-[var(--nh-ink)]/70">
                  <span>Bag Subtotal:</span>
                  <span className="font-mono font-bold">₹{rawSubtotal.toLocaleString('en-IN')}</span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({discountPercent}%):</span>
                    <span className="font-mono">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[var(--nh-ink)]/70">
                  <span>Shipping:</span>
                  <span className="font-bold text-emerald-700 uppercase">FREE</span>
                </div>
                <div className="flex justify-between text-base nh-serif font-black text-[var(--nh-ink)] pt-2 border-t border-[var(--nh-ink)]/10">
                  <span>Total Amount:</span>
                  <span>₹{finalTotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-[var(--nh-ink)] text-white text-xs font-extrabold uppercase tracking-widest hover:bg-[var(--nh-chestnut)] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[var(--nh-ink)]/60 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>100% Secure SSL Checkout · COD & All Cards Accepted</span>
              </div>
            </div>
          )}

        </motion.div>
      </div>
    </div>
  );
}
