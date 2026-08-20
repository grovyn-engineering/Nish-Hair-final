const steps = [
  { n: "01", title: "Upload", copy: "Upload a clear photo of yourself." },
  { n: "02", title: "Choose", copy: "Select a hairstyle, length and color." },
  {
    n: "03",
    title: "Discover",
    copy: "See your personalized AI preview and find the matching NishHair product.",
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8" aria-labelledby="how-it-works">
      <p className="eyebrow">How it works</p>
      <h2 id="how-it-works" className="mt-3 max-w-xl font-serif text-3xl text-espresso sm:text-4xl">
        Three quiet steps to a confident decision
      </h2>
      <ol className="mt-12 grid gap-5 md:grid-cols-3">
        {steps.map((s) => (
          <li
            key={s.n}
            className="rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
          >
            <span className="font-serif text-3xl text-champagne">{s.n}</span>
            <h3 className="mt-5 font-serif text-2xl text-espresso">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
