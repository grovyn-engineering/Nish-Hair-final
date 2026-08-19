import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero.jpg";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 pt-14 pb-8 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pt-24">
      <div className="animate-rise">
        <p className="eyebrow inline-flex items-center gap-2">
          <Sparkles className="size-3.5 text-champagne" aria-hidden="true" />
          AI-powered virtual try-on
        </p>
        <h1 className="mt-5 font-serif text-[2.75rem] leading-[1.05] tracking-tight text-espresso sm:text-6xl lg:text-7xl">
          See Your Next Look <em className="text-champagne">Before</em> You Buy
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Upload a photo and discover personalized hairstyles, lengths and colors with
          LustraHair's AI-powered virtual try-on experience.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link to="/try-on" className="btn-base btn-primary w-full sm:w-auto">
            Try Your Look
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <a href="#looks" className="btn-base btn-ghost w-full sm:w-auto">
            Explore Looks
          </a>
        </div>
        <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-7">
          {[
            ["100%", "Human hair"],
            ["4", "Signature shades"],
            ["60s", "To your preview"],
          ].map(([value, label]) => (
            <div key={label}>
              <dt className="font-serif text-2xl text-espresso">{value}</dt>
              <dd className="mt-1 text-xs tracking-wide text-muted-foreground">{label}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-champagne-soft/60" aria-hidden="true" />
        <img
          src={heroImage}
          alt="Model with long, glossy dark brown waves styled by LustraHair"
          width={1024}
          height={1280}
          className="h-[420px] w-full rounded-[1.75rem] object-cover object-top shadow-[var(--shadow-lift)] sm:h-[560px] lg:h-[640px]"
        />
      </div>
    </section>
  );
}
