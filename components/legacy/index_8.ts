export type { DetectResult, Finding, Severity } from "./types.js";

export async function detectAntiPatterns(
  targets: string[],
  options: { fast?: boolean; json?: boolean } = {}
): Promise<unknown> {
  const mod = await import("./detect-antipatterns.mjs");
  return mod.default?.(targets, options) ?? mod;
}

export async function detectAntiPatternsInBrowser(): Promise<unknown> {
  const mod = await import("./detect-antipatterns-browser.js");
  return mod;
}

export const sierraBluChecks = {
  stages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const,
  criticalAntiPatterns: [
    "side-tab-border",
    "purple-gradient",
    "bounce-easing",
    "dark-glow",
    "card-in-card",
    "gray-text-on-color",
  ],
  skipForGallery: ["bounce-easing"],
};
