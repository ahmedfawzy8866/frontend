import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

export const SKILL_DIR = join(__dirname, "../skills/design-motion-principles");

export const designers = {
  emil: {
    name: "Emil Kowalski",
    philosophy: "Restraint & Speed",
    bestFor: ["productivity tools", "high-frequency interactions", "utility UI"],
    sierraBluStages: [1, 2, 3, 9, 10],
  },
  jakub: {
    name: "Jakub Krehel",
    philosophy: "Production Polish",
    bestFor: ["consumer apps", "professional refinement", "shipped products"],
    sierraBluStages: [4, 5, 6, 7, 8],
  },
  jhey: {
    name: "Jhey Tompkins",
    philosophy: "Creative Experimentation",
    bestFor: ["portfolios", "playful contexts", "showcase moments"],
    sierraBluStages: [8],
  },
} as const;

export type DesignerKey = keyof typeof designers;

export interface MotionAuditConfig {
  primaryDesigner: DesignerKey;
  secondaryDesigner?: DesignerKey;
  context: string;
}

export function getAuditConfigForStage(stage: number): MotionAuditConfig {
  if (stage <= 3) {
    return { primaryDesigner: "emil", context: "onboarding and data entry flows" };
  }
  if (stage <= 7) {
    return {
      primaryDesigner: "jakub",
      secondaryDesigner: "emil",
      context: "property search and matching flows",
    };
  }
  if (stage === 8) {
    return {
      primaryDesigner: "jakub",
      secondaryDesigner: "jhey",
      context: "concierge gallery showcase",
    };
  }
  return { primaryDesigner: "emil", context: "closing and transaction flows" };
}

export const skillPath = SKILL_DIR;
