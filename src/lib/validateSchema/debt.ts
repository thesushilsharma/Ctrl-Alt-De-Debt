import * as z from 'zod';
import { CURRENCIES } from "../types";

export const debtSchema = z.object({
  personName: z.string().min(2, 'Name is too short').max(50, 'Name is too long'),
  amount: z.coerce.number().positive('Amount must be a positive number.'),
  currency: z.enum(CURRENCIES),
  type: z.enum(['owed_to_me', 'i_owe']),
  date: z.date(),
  notes: z.string().max(280, 'Notes are too long').optional(),
  historicalNprRate: z.coerce.number().positive('Amount must be a positive number.').optional(),
});

export type DeptValues = z.infer<typeof debtSchema>;