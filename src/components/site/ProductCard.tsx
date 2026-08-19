import { formatPrice, type Product } from "@/data/products";

interface Props {
  product: Product;
  color: string;
  length: string;
  added: boolean;
  onAddToCart: () => void;
  onSaveLook: () => void;
  onConsultation: () => void;
}

export function ProductCard({
  product, color, length, added, onAddToCart, onSaveLook, onConsultation,
}: Props) {
  return (
    <article className="grid gap-8 rounded-2xl border border-border bg-card p-6 sm:p-8 md:grid-cols-[minmax(0,320px)_1fr]">
      <img
        src={product.image}
        alt={product.title}
        width={800}
        height={1000}
        loading="lazy"
        className="h-64 w-full rounded-xl object-cover md:h-full"
      />
      <div className="flex flex-col">
        <p className="eyebrow">{product.collection}</p>
        <h3 className="mt-2 font-serif text-3xl text-espresso">{product.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
        <p className="mt-5 font-serif text-2xl text-espresso">{formatPrice(product.price)}</p>

        <dl className="mt-5 space-y-1.5 text-sm">
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Selected color:</dt>
            <dd className="text-espresso">{color}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="text-muted-foreground">Selected length:</dt>
            <dd className="text-espresso">{length}</dd>
          </div>
          <div className="flex flex-wrap gap-2">
            <dt className="text-muted-foreground">Available in:</dt>
            <dd className="text-espresso">{product.colors.join(" · ")}</dd>
          </div>
        </dl>

        <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button
            type="button"
            onClick={onAddToCart}
            disabled={added}
            className="btn-base btn-primary"
            aria-live="polite"
          >
            {added ? "Added ✓" : "Add to Cart"}
          </button>
          <button type="button" onClick={onSaveLook} className="btn-base btn-ghost">
            Save Look
          </button>
          <button type="button" onClick={onConsultation} className="btn-base btn-ghost">
            Request Consultation
          </button>
        </div>
      </div>
    </article>
  );
}
