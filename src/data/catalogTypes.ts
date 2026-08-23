// Data types for the marketing/storefront catalog ported from the design prototype.
// Named distinctly from src/data/products.ts's `Product` (the try-on product model)
// so both modules can be imported side by side without collisions.

export interface CatalogProduct {
  id: string;
  name: string;
  category: 'extensions' | 'toppers' | 'bangs' | 'wigs' | 'color' | 'men' | 'ponytails';
  subCategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  image: string;
  hoverImage?: string;
  badge?: string;
  shades: string[];
  lengths: string[];
  description: string;
  density?: string;
  baseSize?: string;
  gender: 'women' | 'men' | 'unisex';
  isBestseller?: boolean;
  /** nishhair.com product URL, when known, for "shop the real thing" links. */
  shopUrl?: string;
}

export interface CartLine {
  product: CatalogProduct;
  selectedShade: string;
  selectedLength: string;
  quantity: number;
}

export interface TransformationCase {
  id: string;
  title: string;
  subtitle: string;
  beforeImg: string;
  afterImg: string;
  productUsed: string;
  timeToApply: string;
  tag: string;
  customerQuote: string;
  customerName: string;
  /**
   * Optional Tailwind object-position class for the before/after slider images
   * in this case, overriding the section's default ("object-top"). Use this
   * when a source photo needs a different crop — e.g. to crop below a
   * baked-in label near the top of the image.
   */
  imgObjectPosition?: string;
}

export interface StoreLocation {
  id: string;
  name: string;
  city: string;
  address: string;
  timings: string;
  phone: string;
  image?: string;
  mapUrl: string;
  isFlagship?: boolean;
}

export interface JournalArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: string;
}

export interface CelebrityReview {
  id: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  productLoved: string;
  verified: boolean;
  pressQuote?: string;
}

export interface CustomerTestimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  image: string;
  hairConcern: string;
  solution: string;
  review: string;
  verifiedBuyer: boolean;
  date: string;
}

export interface QuizOption {
  id: string;
  label: string;
  desc: string;
  recommend?: string;
  color?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}
