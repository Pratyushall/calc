export type Model = "premium" | "luxury";

export type Rate =
  | { unit: "sqft"; rate: Record<Model, number | "TBD"> }
  | { unit: "each"; rate: Record<Model, number | "TBD"> };

export type ItemConfig = {
  id: string;
  label: string;
  section:
    | "singleLine"
    | "bedrooms"
    | "living"
    | "pooja"
    | "kitchen"
    | "addons";
  rateType: Rate;
  defaults?: { enabled?: boolean; areaSqft?: number; qty?: number };
  notes?: string;

  options?: string[];
  optionsLabel?: string; // ✅ label for dropdown
  dimensions?: string[];
};

export type AppConfig = {
  globals: {
    currency: "INR";
    rounding: "nearest-1000";
    cityMultiplier: { "Tier-1": number; "Tier-2": number; Other: number };
    taxes: { gstPercent: number | "TBD" };
    fees: {
      designFee: { type: "percent" | "fixed" | "none"; value: number | "TBD" };
      transportInstall: {
        type: "percent" | "fixed" | "included";
        value: number | "TBD";
      };
      contingencyPercent: number | "TBD";
    };
  };
  singleLineItems: ItemConfig[];
  bedroomItems: ItemConfig[];
  livingItems: ItemConfig[];
  poojaItems: ItemConfig[];
  kitchenItems: ItemConfig[];
  addonItems: ItemConfig[];
};

export const config: AppConfig = {
  globals: {
    currency: "INR",
    rounding: "nearest-1000",
    cityMultiplier: { "Tier-1": 1.0, "Tier-2": 1.0, Other: 1.0 },
    taxes: { gstPercent: 18 },
    fees: {
      designFee: { type: "percent", value: 5 },
      transportInstall: { type: "percent", value: 3 },
      contingencyPercent: 5,
    },
  },

  singleLineItems: [
    {
      id: "false_ceiling",
      label: "False Ceiling",
      section: "singleLine",
      rateType: { unit: "sqft", rate: { premium: 900, luxury: 900 } },
      defaults: { enabled: true },
      notes: "Applied to total carpet area (user-editable).",
    },
    {
      id: "ceiling_painting",
      label: "Ceiling Painting",
      section: "singleLine",
      rateType: { unit: "sqft", rate: { premium: 200, luxury: 200 } },
      defaults: { enabled: true },
    },
    {
      id: "electrical_wiring",
      label: "Electrical & Wiring",
      section: "singleLine",
      rateType: { unit: "sqft", rate: { premium: 450, luxury: 550 } },
      defaults: { enabled: false },
      notes: "Complete electrical work including wiring and fixtures.",
    },
  ],

  bedroomItems: [
    {
      id: "wardrobe",
      label: "Wardrobe",
      section: "bedrooms",
      rateType: { unit: "sqft", rate: { premium: 2050, luxury: 4800 } },
      defaults: { enabled: true, areaSqft: 30 },
      notes: "Standard wardrobe with shelving and hanging space.",
      options: ["2-door", "3-door", "Sliding", "Walk-in"],
      optionsLabel: "Wardrobe Type",
      dimensions: ["width", "height", "depth"],
    },
    {
      id: "study_table",
      label: "Study Table",
      section: "bedrooms",
      rateType: { unit: "sqft", rate: { premium: 2050, luxury: 3800 } },
      defaults: { enabled: false, areaSqft: 12 },
      dimensions: ["width", "depth"],
    },
    {
      id: "tv_unit_bedroom",
      label: "TV Unit (Bedroom)",
      section: "bedrooms",
      rateType: { unit: "sqft", rate: { premium: 1500, luxury: 1500 } },
      defaults: { enabled: false, areaSqft: 8 },
      options: ["Wall-mounted", "Free-standing"],
      optionsLabel: "TV Unit Type",
    },
    {
      id: "bed_back_panel",
      label: "Bed with Back Panel",
      section: "bedrooms",
      rateType: { unit: "sqft", rate: { premium: 2800, luxury: 3000 } },
      defaults: { enabled: false, areaSqft: 24 },
      notes: "Custom bed with decorative back panel.",
      options: ["King", "Queen", "Custom"],
      optionsLabel: "Bed Size",
      dimensions: ["width", "height"],
    },
  ],

  livingItems: [
    {
      id: "tv_drawer_unit_living",
      label: "TV Drawer Unit (Living)",
      section: "living",
      rateType: { unit: "each", rate: { premium: 22000, luxury: 24500 } },
      defaults: { enabled: false, qty: 1 },
      notes: "Entertainment unit with storage drawers.",
      options: ["Laminate", "Veneer", "Acrylic"],
      optionsLabel: "Finish",
      dimensions: ["length", "height"],
    },
  ],

  poojaItems: [
    {
      id: "pooja_unit",
      label: "Pooja Unit",
      section: "pooja",
      rateType: { unit: "each", rate: { premium: 25000, luxury: 30000 } },
      defaults: { enabled: false, qty: 1 },
      notes: "Traditional pooja unit with storage.",
      options: ["Traditional", "Contemporary", "Wall-mounted"],
      optionsLabel: "Design",
    },
    {
      id: "doors",
      label: "Doors (per door)",
      section: "pooja",
      rateType: { unit: "each", rate: { premium: 11000, luxury: 13000 } },
      defaults: { enabled: false, qty: 1 },
      notes: "Premium quality doors with hardware.",
      options: ["Wood", "Laminate Finish", "Veneer Finish"],
      optionsLabel: "Material",
    },
  ],

  kitchenItems: [
    {
      id: "base_unit",
      label: "Base Units",
      section: "kitchen",
      rateType: { unit: "sqft", rate: { premium: 2050, luxury: 2800 } },
      defaults: { enabled: true, areaSqft: 120 },
      notes: "Modular kitchen base cabinets.",
      options: ["Modular", "Island", "Parallel", "L-Shaped"],
      optionsLabel: "Layout",
      dimensions: ["length", "height"],
    },
    {
      id: "tandem_baskets",
      label: "Tandem Baskets",
      section: "kitchen",
      rateType: { unit: "each", rate: { premium: 5000, luxury: 5000 } },
      defaults: { enabled: false, qty: 1 },
      options: ["Blum", "Hettich", "Aristo", "Ebco"],
      optionsLabel: "Brand",
    },
    {
      id: "bottle_pullout",
      label: "Bottle Pullout",
      section: "kitchen",
      rateType: { unit: "each", rate: { premium: 12000, luxury: 12000 } },
      defaults: { enabled: false, qty: 1 },
      options: ["Blum", "Hettich", "Aristo", "Ebco"],
      optionsLabel: "Brand",
    },
    {
      id: "corner_unit",
      label: "Corner Unit",
      section: "kitchen",
      rateType: { unit: "each", rate: { premium: 27500, luxury: 27500 } },
      defaults: { enabled: false, qty: 1 },
      options: ["Carousel", "Magic Corner", "L-corner"],
      optionsLabel: "Mechanism",
    },
    {
      id: "wicker_basket",
      label: "Wicker Basket",
      section: "kitchen",
      rateType: { unit: "each", rate: { premium: 6500, luxury: 6500 } },
      defaults: { enabled: false, qty: 1 },
    },
  ],

  addonItems: [
    {
      id: "sofa_2bhk_prem",
      label: "Sofa (2BHK, Premium)",
      section: "addons",
      rateType: { unit: "each", rate: { premium: 75000, luxury: 75000 } },
      defaults: { enabled: false, qty: 1 },
      options: ["Fabric", "Leatherette", "Leather"],
      optionsLabel: "Upholstery",
    },
    {
      id: "sofa_2bhk_lux",
      label: "Sofa (2BHK, Luxury)",
      section: "addons",
      rateType: { unit: "each", rate: { premium: 90000, luxury: 90000 } },
      defaults: { enabled: false, qty: 1 },
      options: ["Fabric", "Leatherette", "Leather"],
      optionsLabel: "Upholstery",
    },
    // …you can extend dining, carpets, lights, curtains with options/labels too
  ],
};
