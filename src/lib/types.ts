export const CURRENCIES = ["GBP", "AED", "NPR", "INR", "JPY"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Debt = {
  id: string;
  debtorCreditorName: string;
  amount: number;
  currency: Currency;
  date: Date;
  notes?: string;
};
