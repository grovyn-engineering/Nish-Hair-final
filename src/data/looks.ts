import curtainBangs from "@/assets/look-curtain-bangs.jpg";
import scalpTopper from "@/assets/look-scalp-topper.jpg";
import electricBlue from "@/assets/look-electric-blue.jpg";
import strand from "@/assets/strand.webp";
import curtainBangsProduct from "@/assets/curtainBangsProduct.webp";

export const HAIR_COLORS = [
  { id: "natural-black-brown", name: "Black", swatch: "#1c1c1b" },
  { id: "parul-ombre", name: "Brunette", swatch: "#3d2a20" },
  { id: "electric-blue", name: "Electric Blue", swatch: "#0047AB" },
] as const;

export type HairColorName = (typeof HAIR_COLORS)[number]["name"];
export const HAIR_LENGTHS = ['12"', '14"', '16"'] as const;
export type HairLength = (typeof HAIR_LENGTHS)[number];

export interface Look {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  references?: string[];
  productId: string;
  shopUrl: string;
  startingPrice: number;
  availableColors: HairColorName[];
  availableLengths: HairLength[];
  stylistNote: string;
}

const allColors: HairColorName[] = ["Black", "Brunette", "Blonde"];
const allLengths: HairLength[] = ["12\"", "14\"", "16\""];

export const looks: Look[] = [
  {
    id: "curtain-bangs",
    name: "Clip-in Hairline with Curtain Bangs",
    description: "Instant curtain fringe that clips seamlessly into your hairline.",
    category: "Bangs",
    image: scalpTopper,
    references: [curtainBangsProduct],
    productId: "clip-in-hairline-curtain-bangs",
    shopUrl: "https://www.nishhair.com/products/clip-in-hairline-with-curtain-bangs-human-hair-nish-hair",
    startingPrice: 3999,
    availableColors: ["Black", "Brunette"],
    availableLengths: ['12"'],
    stylistNote:
      "Curtain Bangs in Natural Black/Brown instantly frame the face and add a soft, editorial feel without any commitment.",
  },
  {
    id: "scalp-topper",
    name: "Bangs With Scalp Hair Topper",
    description: "Silk-base topper with bangs for natural volume at the crown.",
    category: "Topper",
    image: curtainBangs,
    productId: "bangs-scalp-topper-paruls-ombre",
    shopUrl: "https://www.nishhair.com/collections/clip-in-bangs/products/bangs-with-scalp-hair-topper-silk-base-paruls-ombre",
    startingPrice: 6299,
    availableColors: ["Brunette"],
    availableLengths: ['12"'],
    stylistNote:
      "The Paruls Ombre topper blends seamlessly at the scalp and adds dimension with its warm ombre finish.",
  },
  {
    id: "electric-blue-strand",
    name: "Electric Blue Hair Strand",
    description: "Bold electric blue clip-in colour streaks for instant drama.",
    category: "Colour",
    image: electricBlue,
    references: [strand],
    productId: "electric-blue-hair-strand-strandout",
    shopUrl: "https://www.nishhair.com/products/electric-blue-hair-strand-strandout-coloured-clip-in-hair-nish-hair?variant=49276336668962",
    startingPrice: 599,
    availableColors: ["Electric Blue"],
    availableLengths: ['12"'],
    stylistNote:
      "Electric Blue strands pop beautifully against dark hair — try a single strand for a subtle peek or layer multiples for full impact.",
  },
];

export const getLook = (id: string) => looks.find((l) => l.id === id);
