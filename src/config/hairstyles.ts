import { HAIR_COLORS } from "@/data/looks";

/**
 * Consolidation of all hairstyle, color, and length prompts.
 */

export const ALLOWED_HAIRSTYLES = [
  "Clip-in Hairline with Curtain Bangs",
  "Bangs With Scalp Hair Topper",
  "Electric Blue Hair Strand",
];

const COLOR_HEX: Record<string, string> = {
  ...Object.fromEntries(HAIR_COLORS.map(({ name, swatch }) => [name, swatch])),
  "Electric Blue": "#0047AB",
};

export const ALLOWED_LENGTHS = [
  "12\"",
  "14\"",
  "16\""
];

export const HAIRSTYLE_PROMPTS: Record<string, string> = {
  "Clip-in Hairline with Curtain Bangs":
    "Add a clip-in curtain fringe at the front hairline. Use the third reference image (an isolated product photo of the physical piece on a mannequin head, shown from a 3/4 angle) for the piece's exact shape: a soft, wispy fringe with an OFF-CENTER part — NOT parted evenly down the middle — with most of the length swept to one side, thinning out into loose face-framing strands rather than a thick, blunt, even curtain. Use the second reference image (a real photo of a model wearing this exact piece) as the placement guide for how it sits at the hairline, blends into the rest of the hair, and frames the face in a soft side-swept way. ATTACHMENT: the piece clips in at a single base point at the crown/part line — blend a few of the person's own hairs over that base so the clip/root is hidden, with the fringe appearing to grow naturally from the same part as their existing hair, matching that part's exact position (do not recenter or symmetrize the part). Do not alter the length, texture, or style of the rest of the person's hair — only the front fringe area changes.",
  "Bangs With Scalp Hair Topper":
    "Add volume and coverage at the crown/scalp using a silk-base hair topper with integrated bangs, exactly as shown in the second reference image (an isolated product photo of the topper piece). The topper should blend seamlessly with the person's own hair at the scalp — matching the part line and hair flow — adding natural-looking fullness rather than looking like a distinct attached piece. Do not change the length, texture, or style of the hair below the crown; only the crown/scalp area and front bangs change.",
  "Electric Blue Hair Strand":
    "Add exactly ONE single thin electric-blue clip-in colour strand. Use the second reference image (a real photo of a model wearing this exact strand) as the primary guide for HOW it's worn: one narrow strand only, clipped in near the roots within a single side-framing section of hair close to the face, positioned asymmetrically off to one side — NOT parted symmetrically at the center, NOT mirrored on both sides, and NOT a wide flat panel of color. WIDTH: keep it genuinely thin — no wider than a pencil, roughly the width of a small handful of individual hairs bundled together, NOT a thick chunky section. If in doubt, make it thinner rather than thicker. Match that reference photo's placement and the way the strand follows the natural fall and slight wave of the surrounding hair (curving and blending at the edges rather than hanging as a stiff straight line). ATTACHMENT: the strand must have exactly ONE root/clip point at the top, at the same point on the scalp/part as the surrounding hair, with a few of the person's own dark hairs overlapping in front of and blended into that single topmost section so the root is hidden — it must then run downward as ONE continuous, uninterrupted piece. Do NOT have it reattach, re-emerge, or appear to start again from the scalp at any other point along its length or in a different section of hair — only one visible attachment point total, not multiple. Match the lighting, shadow, and slight motion blur of the surrounding hair so the strand sits IN the hair, not floating in front of it or behind it as a flat cutout. Use the third reference image (an isolated studio photo of the physical strand piece) for the strand's exact color, shine, and texture up close. Keep every other section of the person's hair exactly as in the first photo — same color, same part, same style — with the blue strand as the only change.",
};

const COLOR_DESCRIPTORS: Record<string, string> = {
  "Black": "deep, natural-looking black with subtle realistic tonal variation",
  "Brunette": "rich brunette brown with realistic tonal variation and natural highlights",
  "Blonde": "warm blonde with realistic natural highlights",
  "Electric Blue": "vivid, saturated electric blue with natural-looking light reflection",
};

export const COLOR_PROMPTS: Record<string, string> = Object.fromEntries(
  Object.entries(COLOR_HEX).map(([name, hex]) => [
    name,
    `${COLOR_DESCRIPTORS[name] ?? `${name} hair color`} — match the exact hex color ${hex}.`,
  ])
);

export const LENGTH_PROMPTS: Record<string, string> = {
  "12\"": "approximately 12 inches long, blending naturally with the person's own hair length.",
  "14\"": "approximately 14 inches long, blending naturally with the person's own hair length.",
  "16\"": "approximately 16 inches long, blending naturally with the person's own hair length.",
};
