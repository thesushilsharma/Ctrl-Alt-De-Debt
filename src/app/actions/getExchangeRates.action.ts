"use server";

import { Currency } from "@/lib/types";

export async function getExchangeRates(): Promise<Partial<Record<Currency, number>>> {
  const currencies: Currency[] = ["GBP", "NPR", "INR", "JPY"];
  const base: Currency = "AED";
  
  const rates: Partial<Record<Currency, number>> = {};

  const responses = await Promise.all(
    currencies.map(async (currency) => {
      try {
        const res = await fetch(
          `https://api.coinbase.com/v2/prices/${currency}-${base}/spot`,
          { next: { revalidate: 3600 } } // Cache for 1 hour
        );

        if (!res.ok) {
          console.error(`Failed to fetch rate for ${currency}: ${res.status} ${res.statusText}`);
          return { currency, rate: null };
        }

        const data = await res.json();
        const rate = parseFloat(data.data.amount);
        if (isNaN(rate)) {
            return { currency, rate: null };
        }
        return { currency, rate };
      } catch (e) {
        console.error(`Error fetching rate for ${currency}:`, e);
        return { currency, rate: null };
      }
    })
  );
  
  for (const res of responses) {
      if (res.rate !== null) {
          rates[res.currency] = res.rate;
      }
  }

  rates['AED'] = 1;

  return rates;
}
