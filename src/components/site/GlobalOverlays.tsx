// Mounts the cart drawer and quick-view modal once, sitewide, wired to the
// shared site-state context. Rendered from src/routes/__root.tsx so the cart
// icon in the header works from any route (home, /try-on, etc.).

import { useSiteState } from "@/lib/site-state";
import { CartDrawer } from "@/components/site/CartDrawer";
import { QuickViewModal } from "@/components/site/QuickViewModal";
import { FounderStoryModal } from "@/components/site/FounderStoryModal";

export function GlobalOverlays() {
  const { isCartOpen, closeCart, quickViewProduct, closeQuickView, isFounderStoryOpen, closeFounderStory } =
    useSiteState();

  return (
    <>
      <CartDrawer isOpen={isCartOpen} onClose={closeCart} />
      <QuickViewModal product={quickViewProduct} onClose={closeQuickView} />
      <FounderStoryModal isOpen={isFounderStoryOpen} onClose={closeFounderStory} />
    </>
  );
}
