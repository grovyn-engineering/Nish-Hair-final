import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { HowItWorks } from "@/components/site/HowItWorks";
import { LookGrid } from "@/components/site/LookGrid";
import { looks } from "@/data/looks";

const title = "NishHair — See Your Next Look Before You Buy";
const description =
  "Upload a photo and preview personalized hairstyles, lengths and colors with NishHair's AI-powered virtual try-on.";

export const Route = createFileRoute("/")({
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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />

        <section id="looks" className="mx-auto max-w-7xl px-5 py-16 sm:px-8" aria-labelledby="looks-title">
          <p className="eyebrow">Featured looks</p>
          <h2 id="looks-title" className="mt-3 font-serif text-3xl text-espresso sm:text-4xl">
            Explore Your Next Look
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            From effortless waves to polished lengths, discover styles designed to fit your mood.
          </p>
          <div className="mt-10">
            <LookGrid
              looks={looks}
              onSelect={(look) => navigate({ to: "/try-on", search: { look: look.id } })}
            />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-[1.75rem] bg-sand px-6 py-14 text-center sm:px-12 sm:py-20">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl text-espresso sm:text-4xl">
              Confidence before purchase — not guesswork
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Our AI preview exists for one reason: so you know how a NishHair piece will look on
              you before it arrives at your door.
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/try-on" })}
              className="btn-base btn-primary mt-8"
            >
              Try Your Look
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
