import { looks } from "./looks";

export interface Product {
  id: string;
  lookId: string;
  title: string;
  collection: string;
  description: string;
  price: number;
  image: string;
  colors: string[];
  lengths: string[];
}

export const products: Product[] = looks.map((look) => ({
  id: look.productId,
  lookId: look.id,
  title: `LustraHair ${look.name}`,
  collection: "Premium Human Hair Collection",
  description: `${look.description} Ethically sourced, hand-finished and cuticle-aligned for a natural blend with your own hair.`,
  price: look.startingPrice,
  image: look.image,
  colors: look.availableColors,
  lengths: look.availableLengths,
}));

export const getProductForLook = (lookId: string) =>
  products.find((p) => p.lookId === lookId);

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
