import type { Currency } from './types';

export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  GBP: "£",
  AED: "د.إ",
  NPR: "रू",
  INR: "₹",
  JPY: "¥",
};

// Using fixed rates as per requirement for demonstration
export const EXCHANGE_RATES_TO_AED: Record<Currency, number> = {
  GBP: 4.63,
  AED: 1,
  NPR: 0.028,
  INR: 0.044,
  JPY: 0.023,
};