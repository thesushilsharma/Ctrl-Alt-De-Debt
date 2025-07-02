"use server";

import { Currency } from "@/lib/types";

export async function getExchangeRates(): Promise<Partial<Record<Currency, number>>> {
export async function getExchangeRates(): Promise<Record<Currency, number>> {
  const currencies: Currency[] = ["GBP", "AED", "NPR", "INR", "JPY"];
  const target: Currency = "AED";
  
  const rates: Record<Currency, number> = {
  GBP: 0,
  AED: 1,
  NPR: 0,
  INR: 0,
  JPY: 0,
};

  const promises = currencies
    .filter(c => c !== target)
    .map(async (currency) => {
      try {
        const res = await fetch(
          `https://api.coinbase.com/v2/prices/${currency}-${target}/spot`, // e.g. GBP-AED
          { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!res.ok) {
          console.error(`Failed to fetch rate for ${currency}: ${res.status} ${res.statusText}`);
          return { currency, rate: null };
        }

        const data = await res.json();
        const rate = parseFloat(data.data.amount);
        if (!rate) {
            return { currency, rate: null };
        }
        return { currency, rate };
      } catch (e) {
        console.error(`Error fetching rate for ${currency}:`, e);
        return { currency, rate: null };
      }
    });

  const results = await Promise.all(promises);
  
  for (const result of results) {
      if (result.rate !== null) {
          rates[result.currency as Currency] = result.rate;
      } else {
          // Fallback to constants if API fails
          console.warn(`Using fallback exchange rate for ${result.currency}`);
          rates[result.currency as Currency] = EXCHANGE_RATES_TO_AED[result.currency as Currency];
      }
  }
  
  return rates;
}
