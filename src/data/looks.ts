import signatureWaves from "@/assets/look-signature-waves.jpg";
import longStraight from "@/assets/look-long-straight.jpg";
import softCurls from "@/assets/look-soft-curls.jpg";
import classicBob from "@/assets/look-classic-bob.jpg";
import layeredVolume from "@/assets/look-layered-volume.jpg";

export const HAIR_COLORS = [
  { id: "black", name: "Black", swatch: "#1b1614" },
  { id: "brunette", name: "Brunette", swatch: "#3d2a20" },
  { id: "blonde", name: "Blonde", swatch: "#c9944f" },
] as const;

export type HairColorName = (typeof HAIR_COLORS)[number]["name"];
export const HAIR_LENGTHS = ["18\"", "22\"", "26\""] as const;
export type HairLength = (typeof HAIR_LENGTHS)[number];

export interface Look {
  id: string;
  name: string;
  description: string;
  category: string;
  image: string;
  productId: string;
  startingPrice: number;
  availableColors: HairColorName[];
  availableLengths: HairLength[];
  stylistNote: string;
}

const allColors: HairColorName[] = ["Black", "Brunette", "Blonde"];
const allLengths: HairLength[] = ["18\"", "22\"", "26\""];

export const looks: Look[] = [
  {
    id: "beach-waves",
    name: "Beach Waves",
    description: "Soft cascading waves with natural movement.",
    category: "Wavy",
    image: signatureWaves,
    productId: "beach-waves-product",
    startingPrice: 12999,
    availableColors: allColors,
    availableLengths: allLengths,
    stylistNote:
      "Beach Waves in Brunette adds natural-looking length and soft volume while keeping the overall finish effortless.",
  },
  {
    id: "long-straight",
    name: "Long Straight",
    description: "Sleek, mirror-smooth lengths with a clean finish.",
    category: "Straight",
    image: longStraight,
    productId: "long-straight-product",
    startingPrice: 13499,
    availableColors: allColors,
    availableLengths: allLengths,
    stylistNote:
      "Long Straight in Black reads polished and editorial — ideal if you prefer a sharp, minimal silhouette.",
  },
  {
    id: "curly",
    name: "Curly",
    description: "Rounded, bouncy curls with a warm, lived-in feel.",
    category: "Curly",
    image: softCurls,
    productId: "curly-product",
    startingPrice: 13999,
    availableColors: allColors,
    availableLengths: allLengths,
    stylistNote:
      "Curly in Blonde brings light around the face and softens strong features beautifully.",
  },
  {
    id: "bob",
    name: "Bob",
    description: "A precise, chin-grazing cut with a confident line.",
    category: "Short",
    image: classicBob,
    productId: "bob-product",
    startingPrice: 10999,
    availableColors: allColors,
    availableLengths: ["18\""],
    stylistNote:
      "Bob in Brunette is the quickest way to a modern, high-impact change with very little upkeep.",
  },
  {
    id: "layered",
    name: "Layered",
    description: "Face-framing layers built for lift and body.",
    category: "Layered",
    image: layeredVolume,
    productId: "layered-product",
    startingPrice: 12499,
    availableColors: allColors,
    availableLengths: allLengths,
    stylistNote:
      "Layered in Brunette adds fullness through the mid-lengths without losing your natural shape.",
  },
];

export const getLook = (id: string) => looks.find((l) => l.id === id);
