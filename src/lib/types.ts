export const CURRENCIES = ["GBP", "AED", "NPR", "INR", "JPY"] as const;
export type Currency = (typeof CURRENCIES)[number];

export type Debt = {
  id: string;
  personName: string
  amount: number;
  currency: Currency;
  type: "owed_to_me" | "i_owe"
  date: Date;
  notes?: string;
};