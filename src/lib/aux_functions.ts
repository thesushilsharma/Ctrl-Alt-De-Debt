import { CURRENCY_SYMBOLS } from "./constant";
import { Currency } from "./types";

export const formatCurrency = (amount: number, currency: Currency, options: Intl.NumberFormatOptions = {}) => {
  const defaultOptions = {
    maximumFractionDigits: 0,
    ...options,
  }
  const formattedAmount = amount.toLocaleString(undefined, defaultOptions);
  
  if (currency === 'AED') {
    return `${formattedAmount} ${CURRENCY_SYMBOLS[currency]}`;
  }
  
  return `${CURRENCY_SYMBOLS[currency]} ${formattedAmount}`;
}