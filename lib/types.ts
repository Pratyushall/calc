// Which interior package user selects
export type Model = "premium" | "luxury";

// City tiers for cost multipliers
export type CityTier = "Tier-1" | "Tier-2" | "Other";

// Basic project info
export type ProjectBasics = {
  carpetAreaSqft: number;
  cityTier: CityTier;
  model: Model;
};

// Generic item in the calculator
export type ItemState = {
  id: string;
  enabled: boolean;
  areaSqft?: number;
  qty?: number;
};

// A room with multiple items
export type RoomState = {
  id: string;
  name: string;
  type: "master" | "children" | "guest";
  items: ItemState[];
};

// Full calculator state
export type CalculatorState = {
  step: number;
  projectBasics: ProjectBasics;
  singleLineItems: ItemState[];
  rooms: RoomState[];
  livingItems: ItemState[];
  poojaItems: ItemState[];
  kitchenItems: ItemState[];
  addonItems: ItemState[];
};

// Subtotal of a section (for running totals)
export type SectionTotal = {
  section: string;
  subtotal: number;
  items: Array<{
    label: string;
    amount: number;
    formula: string;
  }>;
};

// Final calculation result
export type CalculationResult = {
  sectionTotals: SectionTotal[];
  subtotal: number;
  designFee: number;
  transportInstall: number;
  contingency: number;
  gst: number;
  grandTotal: number;
};
