/**
 * Consolidation of all hairstyle, color, and length prompts.
 */

export const ALLOWED_HAIRSTYLES = [
  "Clip-in Hairline with Curtain Bangs",
  "Bangs With Scalp Hair Topper",
  "Electric Blue Hair Strand"
];

export const ALLOWED_COLORS = [
  "Black",
  "Brunette",
  "Blonde"
];

export const ALLOWED_LENGTHS = [
  "12\"",
  "14\"",
  "16\""
];

export const HAIRSTYLE_PROMPTS: Record<string, string> = {
  "Clip-in Hairline with Curtain Bangs": "curtain bangs clipped into the hairline with a soft, face-framing finish",
  "Bangs With Scalp Hair Topper": "silk-base scalp topper with bangs adding natural volume and coverage at the crown",
  "Electric Blue Hair Strand": "electric blue clip-in colour streaks blended through dark hair for a bold pop of colour"
};

export const COLOR_PROMPTS: Record<string, string> = {
  "Black": "deep natural black hair with subtle realistic tonal variation",
  "Brunette": "dark chocolate brown with warm ombre highlights",
  "Blonde": "electric blue highlights streaked through dark hair"
};

export const LENGTH_PROMPTS: Record<string, string> = {
  "12\"": "approximately 12-inch length, sitting around the collarbone area.",
  "14\"": "approximately 14-inch length, sitting just below the collarbone.",
  "16\"": "approximately 16-inch length, reaching the upper chest area."
};

