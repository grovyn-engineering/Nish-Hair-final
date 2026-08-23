// Shared UI state for the redesigned marketing site: cart, quick view, the
// founder-story modal, and the shop-by-category filter. Centralizing this in
// one context means every ported section (Header, Footer, CuratedProducts,
// ShopByGoal, etc.) can read/act on it directly with zero prop drilling,
// which keeps Navbar/Footer usable with no required props — important
// because src/routes/try-on.tsx renders <Navbar /> and <Footer /> as-is and
// must keep working unmodified.
//
// This does NOT touch the try-on flow itself (src/routes/try-on.tsx,
// src/data/looks.ts, src/lib/tryOnService.ts) — those are untouched.

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import type { CatalogProduct, CartLine } from "@/data/catalogTypes";

interface SiteState {
  // Cart
  cartItems: CartLine[];
  cartCount: number;
  addToCart: (product: CatalogProduct, shade: string, length: string) => void;
  updateCartQuantity: (index: number, quantity: number) => void;
  removeCartItem: (index: number) => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Quick view
  quickViewProduct: CatalogProduct | null;
  openQuickView: (product: CatalogProduct) => void;
  closeQuickView: () => void;

  // Founder story modal
  isFounderStoryOpen: boolean;
  openFounderStory: () => void;
  closeFounderStory: () => void;

  // Shop-by-category filter (drives CuratedProducts; set from Header/CategoryNav/ShopByGoal)
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Navigate into the real NishHair Try-On Studio at /try-on (never a local fake modal)
  goToTryOn: () => void;
}

const SiteStateContext = createContext<SiteState | null>(null);

export function SiteStateProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartLine[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<CatalogProduct | null>(null);
  const [isFounderStoryOpen, setIsFounderStoryOpen] = useState(false);
  const [selectedCategory, setSelectedCategoryState] = useState("all");

  const addToCart = (product: CatalogProduct, shade: string, length: string) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedShade === shade && i.selectedLength === length,
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity: updated[existingIndex].quantity + 1 };
        return updated;
      }
      return [...prev, { product, selectedShade: shade, selectedLength: length, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      removeCartItem(index);
      return;
    }
    setCartItems((prev) => prev.map((item, i) => (i === index ? { ...item, quantity } : item)));
  };

  const removeCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const setSelectedCategory = (category: string) => {
    setSelectedCategoryState(category);
    // Only relevant on the home page — harmless no-op elsewhere.
    if (typeof document !== "undefined") {
      const el = document.getElementById("shop-curated-section");
      el?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToTryOn = () => {
    navigate({ to: "/try-on" });
  };

  const value = useMemo<SiteState>(
    () => ({
      cartItems,
      cartCount: cartItems.reduce((acc, item) => acc + item.quantity, 0),
      addToCart,
      updateCartQuantity,
      removeCartItem,
      isCartOpen,
      openCart: () => setIsCartOpen(true),
      closeCart: () => setIsCartOpen(false),
      quickViewProduct,
      openQuickView: setQuickViewProduct,
      closeQuickView: () => setQuickViewProduct(null),
      isFounderStoryOpen,
      openFounderStory: () => setIsFounderStoryOpen(true),
      closeFounderStory: () => setIsFounderStoryOpen(false),
      selectedCategory,
      setSelectedCategory,
      goToTryOn,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cartItems, isCartOpen, quickViewProduct, isFounderStoryOpen, selectedCategory],
  );

  return <SiteStateContext.Provider value={value}>{children}</SiteStateContext.Provider>;
}

export function useSiteState(): SiteState {
  const ctx = useContext(SiteStateContext);
  if (!ctx) {
    throw new Error("useSiteState must be used within a SiteStateProvider (mounted in src/routes/__root.tsx)");
  }
  return ctx;
}
