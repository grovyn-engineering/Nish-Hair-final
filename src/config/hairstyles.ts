/**
 * Consolidation of all hairstyle, color, and length prompts.
 */

export const ALLOWED_HAIRSTYLES = [
  "Signature Waves",
  "Long Straight",
  "Soft Curls",
  "Classic Bob",
  "Layered Volume"
];

export const ALLOWED_COLORS = [
  "Black",
  "Dark Brown",
  "Chestnut",
  "Honey Blonde"
];

export const ALLOWED_LENGTHS = [
  "18\"",
  "22\"",
  "26\""
];

export const HAIRSTYLE_PROMPTS: Record<string, string> = {
  "Signature Waves": "soft cascading waves with natural movement and realistic volume",
  "Long Straight": "sleek long straight hair with smooth natural texture",
  "Soft Curls": "soft defined curls with natural volume and movement",
  "Classic Bob": "polished classic bob with a natural hairline",
  "Layered Volume": "long layered hairstyle with natural volume and dimension"
};

export const COLOR_PROMPTS: Record<string, string> = {
  "Black": "deep black hair with subtle realistic tonal variation",
  "Dark Brown": "dark brown hair color with realistic tonal variation and highlights",
  "Chestnut": "rich chestnut brown color with natural warm highlights",
  "Honey Blonde": "honey blonde color with realistic warm highlights"
};

export const LENGTH_PROMPTS: Record<string, string> = {
  "18\"": "approximately 18-inch long hair, reaching around the shoulder area depending on the person's pose.",
  "22\"": "approximately 22-inch long hair, reaching around the upper/mid back depending on the person's pose.",
  "26\"": "approximately 26-inch long hair, reaching around the mid/lower back depending on the person's pose."
};
