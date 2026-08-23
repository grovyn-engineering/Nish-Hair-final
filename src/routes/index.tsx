import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { TrustStrip } from "@/components/site/TrustStrip";
import { CategoryNav } from "@/components/site/CategoryNav";
import { TryOnTeaser } from "@/components/site/TryOnTeaser";
import { Transformations } from "@/components/site/Transformations";
import { HairQuizWidget } from "@/components/site/HairQuizWidget";
import { ShopByGoal } from "@/components/site/ShopByGoal";
import { CuratedProducts } from "@/components/site/CuratedProducts";
import { WhyNishHair } from "@/components/site/WhyNishHair";
import { HairMomentStrip } from "@/components/site/HairMomentStrip";
import { CelebrityEndorsements } from "@/components/site/CelebrityEndorsements";
import { CustomerSpotlight } from "@/components/site/CustomerSpotlight";
import { StoreLocator } from "@/components/site/StoreLocator";
import { HairJournal } from "@/components/site/HairJournal";
import { FinalConversion } from "@/components/site/FinalConversion";
import { useSiteState } from "@/lib/site-state";

const title = "NishHair — Instant Hair, Real Confidence";
const description =
  "India's pioneer in luxury 100% human hair toppers, clip-in extensions, and clip-in bangs. Preview your next look with the NishHair AI Try-On Studio before you buy.";

const searchSchema = z.object({
  category: z.string().optional(),
});

export const Route = createFileRoute("/")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  const { category } = Route.useSearch();
  const { setSelectedCategory } = useSiteState();

  // Sync ?category= from a Header/Footer link (or a direct shared link) into
  // shared site state so CuratedProducts opens pre-filtered.
  useEffect(() => {
    if (category) setSelectedCategory(category);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className="min-h-screen bg-[var(--nh-paper)]">
      <Navbar />
      <main>
        <Hero />
        <TrustStrip />
        <CategoryNav />
        <TryOnTeaser />
        <Transformations />
        <HairQuizWidget />
        <ShopByGoal />
        <CuratedProducts />
        <WhyNishHair />
        <HairMomentStrip />
        <CelebrityEndorsements />
        <CustomerSpotlight />
        <StoreLocator />
        <HairJournal />
        <FinalConversion />
      </main>
      <Footer />
    </div>
  );
}
