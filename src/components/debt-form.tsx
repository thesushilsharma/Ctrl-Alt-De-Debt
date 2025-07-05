"use client";

import { useActionState, useEffect, useRef } from "react";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CURRENCIES, Currency, type Debt } from "@/lib/types";
import { RadioGroup } from "./ui/radio-group";
import { debtSchema } from "@/lib/validateSchema/debt";

interface DebtFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<Debt, "id">, id?: string) => void;
  debtToEdit?: Debt;
}

type FormState = {
  errors?: Partial<Record<keyof z.infer<typeof debtSchema>, string[]>>;
  success?: boolean;
  message?: string;
};

async function submitDebtAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const data = {
    personName: formData.get("personName") as string,
    amount: formData.get("amount"),
    currency: formData.get("currency"),
    type: formData.get("type"),
    date: formData.get("date"),
    notes: formData.get("notes"),
  };
  const result = debtSchema.safeParse({
    ...data,
    amount: Number(data.amount),
    date: new Date(data.date as string),
  });
  if (!result.success) {
    const errors: FormState["errors"] = {};
    for (const issue of result.error.issues) {
      const key = issue.path[0] as keyof z.infer<typeof debtSchema>;
      if (!errors[key]) errors[key] = [];
      errors[key]!.push(issue.message);
    }
    return { errors };
  }
  return { success: true, message: "Debt saved successfully" };
}

export function DebtForm({
  open,
  onOpenChange,
  onSubmit,
  debtToEdit,
}: DebtFormProps) {
  const [state, formAction, isPending] = useActionState(submitDebtAction, {});
  const formRef = useRef<HTMLFormElement>(null);

  // Handle successful form submission
  useEffect(() => {
    if (state.success && formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        personName: formData.get("personName") as string,
        amount: parseFloat(formData.get("amount") as string),
        currency: formData.get("currency") as Currency,
        type: formData.get("type") as "owed_to_me" | "i_owe",
        date: new Date(formData.get("date") as string),
        notes: formData.get("notes") as string,
      };

      onSubmit(data, debtToEdit?.id);
      onOpenChange(false);
    }
  }, [state.success, onSubmit, debtToEdit?.id, onOpenChange]);

  // Reset form when dialog opens/closes or when editing different debt
  useEffect(() => {
    if (formRef.current && open) {
      const form = formRef.current;
      if (debtToEdit) {
        // Set form values for editing
        (form.elements.namedItem("personName") as HTMLInputElement).value =
          debtToEdit.personName;
        (form.elements.namedItem("amount") as HTMLInputElement).value =
          debtToEdit.amount.toString();
        (form.elements.namedItem("currency") as HTMLSelectElement).value =
          debtToEdit.currency;
        (form.elements.namedItem("type") as HTMLInputElement).value =
          debtToEdit.type;
        (form.elements.namedItem("date") as HTMLInputElement).value =
          debtToEdit.date.toISOString().split("T")[0];
        (form.elements.namedItem("notes") as HTMLTextAreaElement).value =
          debtToEdit.notes || "";
      } else {
        // Reset form for new entry
        form.reset();
        (form.elements.namedItem("currency") as HTMLSelectElement).value =
          "AED";
        (form.elements.namedItem("type") as HTMLInputElement).value =
          "owed_to_me";
        (form.elements.namedItem("date") as HTMLInputElement).value = new Date()
          .toISOString()
          .split("T")[0];
      }
    }
  }, [debtToEdit, open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{debtToEdit ? "Edit Debt" : "Add New Debt"}</DialogTitle>
          <DialogDescription>
            {debtToEdit
              ? "Update the details of your debt entry."
              : "Enter the details of the new debt."}
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="space-y-4">
          <div className="space-y-3">
            <label htmlFor="type" className="text-sm font-medium">
              Transaction Type
            </label>
            <RadioGroup
              name="type"
              defaultValue="owed_to_me"
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="owed_to_me"
                  name="type"
                  value="owed_to_me"
                  className="w-4 h-4"
                />
                <label htmlFor="owed_to_me" className="text-sm font-normal">
                  Someone owes me
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="i_owe"
                  name="type"
                  value="i_owe"
                  className="w-4 h-4"
                />
                <label htmlFor="i_owe" className="text-sm font-normal">
                  I owe someone
                </label>
              </div>
            </RadioGroup>
            {state.errors?.type && (
              <p className="text-sm text-red-600">{state.errors.type[0]}</p>
            )}
          </div>

          <div>
            <label htmlFor="personName" className="text-sm font-medium">
              Person's Name
            </label>
            <Input
              id="personName"
              name="personName"
              placeholder="e.g., John Doe"
              className="mt-1"
            />
            {state.errors?.personName && (
              <p className="text-sm text-red-600 mt-1">
                {state.errors.personName[0]}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className="text-sm font-medium">
                Amount
              </label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="any"
                placeholder="e.g., 100"
                className="mt-1"
              />
              {state.errors?.amount && (
                <p className="text-sm text-red-600 mt-1">
                  {state.errors.amount[0]}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="currency" className="text-sm font-medium">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                defaultValue="AED"
              >
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              {state.errors?.currency && (
                <p className="text-sm text-red-600 mt-1">
                  {state.errors.currency[0]}
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="date" className="text-sm font-medium">
              Date
            </label>
            <Input
              id="date"
              name="date"
              type="date"
              className="mt-1"
              defaultValue={new Date().toISOString().split("T")[0]}
            />
            {state.errors?.date && (
              <p className="text-sm text-red-600 mt-1">
                {state.errors.date[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </label>
            <Textarea
              id="notes"
              name="notes"
              placeholder="e.g., For lunch last week"
              className="mt-1"
            />
            {state.errors?.notes && (
              <p className="text-sm text-red-600 mt-1">
                {state.errors.notes[0]}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? "Saving..."
                : debtToEdit
                ? "Save Changes"
                : "Add Debt"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
