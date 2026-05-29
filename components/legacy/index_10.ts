import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const SKILL_DIR = join(__dirname, "../skills");

export interface TasteConfig {
  DESIGN_VARIANCE: number;
  MOTION_INTENSITY: number;
  VISUAL_DENSITY: number;
}

export const sierraBluTasteConfig: Record<string, TasteConfig> = {
  onboarding: {
    DESIGN_VARIANCE: 4,
    MOTION_INTENSITY: 3,
    VISUAL_DENSITY: 3,
  },
  propertySearch: {
    DESIGN_VARIANCE: 6,
    MOTION_INTENSITY: 5,
    VISUAL_DENSITY: 7,
  },
  matching: {
    DESIGN_VARIANCE: 6,
    MOTION_INTENSITY: 5,
    VISUAL_DENSITY: 6,
  },
  conciergeGallery: {
    DESIGN_VARIANCE: 9,
    MOTION_INTENSITY: 8,
    VISUAL_DENSITY: 5,
  },
  closing: {
    DESIGN_VARIANCE: 3,
    MOTION_INTENSITY: 2,
    VISUAL_DENSITY: 4,
  },
};

export const availableSkills = [
  "taste-skill",
  "soft-skill",
  "minimalist-skill",
  "redesign-skill",
  "image-to-code-skill",
  "output-skill",
  "gpt-tasteskill",
] as const;

export type AvailableSkill = (typeof availableSkills)[number];

export function getSkillPath(skill: AvailableSkill): string {
  return join(SKILL_DIR, skill, "SKILL.md");
}

export function getTasteConfigForStage(stage: number): TasteConfig {
  if (stage <= 2) return sierraBluTasteConfig.onboarding;
  if (stage <= 5) return sierraBluTasteConfig.propertySearch;
  if (stage <= 7) return sierraBluTasteConfig.matching;
  if (stage === 8) return sierraBluTasteConfig.conciergeGallery;
  return sierraBluTasteConfig.closing;
}
