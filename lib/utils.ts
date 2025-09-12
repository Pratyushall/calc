import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind + conditional classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format numbers into Indian Rupee currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0, // no paise for cleaner display
  }).format(amount);
}

/**
 * Utility: Apply contingency percentage
 */
export function applyContingency(amount: number, rate: number = 0.1): number {
  return amount * (1 + rate);
}

/**
 * Utility: Calculate GST
 */
export function calculateGST(amount: number, rate: number = 0.18): number {
  return amount * rate;
}
