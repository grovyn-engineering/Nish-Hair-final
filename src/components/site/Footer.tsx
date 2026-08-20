import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-sand">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-12 sm:px-8 md:flex-row md:items-end md:justify-between">
        <div className="max-w-sm">
          <p className="font-serif text-2xl text-espresso">
            Nish<span className="italic text-champagne">Hair</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            See your next look before you buy. Premium human hair, previewed on you.
          </p>
        </div>
        <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted-foreground">
          <li><Link to="/shop" className="hover:text-espresso">Shop</Link></li>
          <li><Link to="/try-on" className="hover:text-espresso">Virtual Try-On</Link></li>
          <li><Link to="/story" className="hover:text-espresso">Our Story</Link></li>
          <li><Link to="/help" className="hover:text-espresso">Help</Link></li>
        </ul>
      </div>
      <div className="border-t border-border/70 px-5 py-5 text-center text-xs text-muted-foreground sm:px-8">
        © {new Date().getFullYear()} NishHair. A fictional brand created for demonstration.
      </div>
    </footer>
  );
}
