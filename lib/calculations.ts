export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export async function calculateEstimate(data: {
  carpetArea: number;
  city: "Tier-1" | "Tier-2" | "Other";
  model: "premium" | "luxury";
  bedrooms: number;
  selectedItems: {
    [itemId: string]: {
      enabled: boolean;
      areaSqft?: number;
      qty?: number;
    };
  };
}) {
  const response = await fetch("/api/calculate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to calculate estimate");
  }

  return response.json();
}
