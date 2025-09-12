import { type NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import type { Model } from "@/lib/config";

export interface CalculationRequest {
  carpetArea: number;
  city: "Tier-1" | "Tier-2" | "Other";
  model: Model;
  bedrooms: number;
  selectedItems: {
    [itemId: string]: {
      enabled: boolean;
      areaSqft?: number;
      qty?: number;
    };
  };
}

export interface CalculationResponse {
  subtotals: {
    singleLine: number;
    bedrooms: number;
    living: number;
    pooja: number;
    kitchen: number;
    addons: number;
  };
  grandTotal: number;
  itemCount: number;
}

function calculateItemCost(
  itemId: string,
  selection: { enabled: boolean; areaSqft?: number; qty?: number },
  model: Model,
  cityMultiplier: number
): number {
  if (!selection.enabled) return 0;

  // Find item in config
  const allItems = [
    ...config.singleLineItems,
    ...config.bedroomItems,
    ...config.livingItems,
    ...config.poojaItems,
    ...config.kitchenItems,
    ...config.addonItems,
  ];

  const item = allItems.find((i) => i.id === itemId);
  if (!item) return 0;

  const rate = item.rateType.rate[model];
  if (typeof rate !== "number") return 0;

  let cost = 0;
  if (item.rateType.unit === "sqft") {
    const area = selection.areaSqft || item.defaults?.areaSqft || 0;
    cost = rate * area;
  } else if (item.rateType.unit === "each") {
    const qty = selection.qty || item.defaults?.qty || 1;
    cost = rate * qty;
  }

  return cost * cityMultiplier;
}

export async function POST(request: NextRequest) {
  try {
    const body: CalculationRequest = await request.json();
    const { carpetArea, city, model, bedrooms, selectedItems } = body;

    // Validate input
    if (!carpetArea || carpetArea <= 0) {
      return NextResponse.json(
        { error: "Invalid carpet area" },
        { status: 400 }
      );
    }

    const cityMultiplier = config.globals.cityMultiplier[city] || 1.0;

    // Calculate subtotals by section
    const subtotals = {
      singleLine: 0,
      bedrooms: 0,
      living: 0,
      pooja: 0,
      kitchen: 0,
      addons: 0,
    };

    let itemCount = 0;

    // Calculate single line items (use carpet area for area-based items)
    config.singleLineItems.forEach((item) => {
      const selection = selectedItems[item.id];
      if (selection?.enabled) {
        itemCount++;
        if (item.rateType.unit === "sqft") {
          // Use carpet area for single line items
          const modifiedSelection = { ...selection, areaSqft: carpetArea };
          subtotals.singleLine += calculateItemCost(
            item.id,
            modifiedSelection,
            model,
            cityMultiplier
          );
        } else {
          subtotals.singleLine += calculateItemCost(
            item.id,
            selection,
            model,
            cityMultiplier
          );
        }
      }
    });

    // Calculate bedroom items (multiply by bedroom count for area-based items)
    config.bedroomItems.forEach((item) => {
      const selection = selectedItems[item.id];
      if (selection?.enabled) {
        itemCount++;
        if (item.rateType.unit === "sqft") {
          // Multiply area by bedroom count
          const area =
            (selection.areaSqft || item.defaults?.areaSqft || 0) * bedrooms;
          const modifiedSelection = { ...selection, areaSqft: area };
          subtotals.bedrooms += calculateItemCost(
            item.id,
            modifiedSelection,
            model,
            cityMultiplier
          );
        } else {
          // Multiply quantity by bedroom count
          const qty = (selection.qty || item.defaults?.qty || 1) * bedrooms;
          const modifiedSelection = { ...selection, qty };
          subtotals.bedrooms += calculateItemCost(
            item.id,
            modifiedSelection,
            model,
            cityMultiplier
          );
        }
      }
    });

    // Calculate other sections normally
    const sections = [
      { items: config.livingItems, key: "living" as const },
      { items: config.poojaItems, key: "pooja" as const },
      { items: config.kitchenItems, key: "kitchen" as const },
      { items: config.addonItems, key: "addons" as const },
    ];

    sections.forEach(({ items, key }) => {
      items.forEach((item) => {
        const selection = selectedItems[item.id];
        if (selection?.enabled) {
          itemCount++;
          subtotals[key] += calculateItemCost(
            item.id,
            selection,
            model,
            cityMultiplier
          );
        }
      });
    });

    // Calculate grand total
    const baseTotal = Object.values(subtotals).reduce(
      (sum, val) => sum + val,
      0
    );

    // Apply fees and taxes
    let grandTotal = baseTotal;

    // Design fee
    if (
      config.globals.fees.designFee.type === "percent" &&
      typeof config.globals.fees.designFee.value === "number"
    ) {
      grandTotal += baseTotal * (config.globals.fees.designFee.value / 100);
    }

    // Transport & install
    if (
      config.globals.fees.transportInstall.type === "percent" &&
      typeof config.globals.fees.transportInstall.value === "number"
    ) {
      grandTotal +=
        baseTotal * (config.globals.fees.transportInstall.value / 100);
    }

    // Contingency
    if (typeof config.globals.fees.contingencyPercent === "number") {
      grandTotal += baseTotal * (config.globals.fees.contingencyPercent / 100);
    }

    // GST
    if (typeof config.globals.taxes.gstPercent === "number") {
      grandTotal += grandTotal * (config.globals.taxes.gstPercent / 100);
    }

    // Round to nearest 1000
    if (config.globals.rounding === "nearest-1000") {
      grandTotal = Math.round(grandTotal / 1000) * 1000;
    }

    return NextResponse.json({
      subtotals,
      grandTotal,
      itemCount,
    });
  } catch (error) {
    console.error("Calculation error:", error);
    return NextResponse.json({ error: "Calculation failed" }, { status: 500 });
  }
}
