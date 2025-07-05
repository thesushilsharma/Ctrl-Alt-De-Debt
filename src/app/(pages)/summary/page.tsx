"use server";

import {
  getEnrichedDebts,
  getExchangeRates,
} from "@/app/actions/getExchangeRates.action";
import { DebtTracker } from "@/components/debt-tracker";

export default async function Home() {
  const initialDebts = await getEnrichedDebts();
  const exchangeRates = await getExchangeRates();

  return (
    <DebtTracker initialDebts={initialDebts} exchangeRates={exchangeRates} />
  );
}
