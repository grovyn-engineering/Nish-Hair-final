import { Link } from "@tanstack/react-router";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const links = [
  { to: "/shop", label: "Shop" },
  { to: "/try-on", label: "Virtual Try-On" },
  { to: "/story", label: "Our Story" },
  { to: "/help", label: "Help" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="font-serif text-2xl tracking-tight text-espresso">
          Nish<span className="italic text-champagne">Hair</span>
        </Link>

        {/* <ul className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="relative text-sm tracking-wide text-muted-foreground transition-colors hover:text-espresso after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-champagne after:transition-all hover:after:w-full"
                activeProps={{ className: "text-espresso" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul> */}

        <div className="flex items-center gap-2">
          <Link to="/try-on" className="btn-base btn-primary hidden md:inline-flex">
            <Sparkles className="size-4" aria-hidden="true" />
            Try Your Look
          </Link>
          <button
            type="button"
            className="btn-base btn-ghost !p-2.5 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-background md:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/60 py-3.5 text-sm text-espresso"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 pb-2">
              <Link to="/try-on" onClick={() => setOpen(false)} className="btn-base btn-primary w-full">
                Try Your Look
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
