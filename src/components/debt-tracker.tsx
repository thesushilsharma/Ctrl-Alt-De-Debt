"use client";

import { useState } from "react";
import type { Currency, Debt } from "@/lib/types";
import { Header } from "@/components/header";
import { DebtSummary } from "@/components/debt-summary";
import { DebtTable } from "@/components/debt-table";
import { DebtForm } from "@/components/debt-form";

interface DebtTrackerProps {
  initialDebts: Debt[];
  exchangeRates: Record<Currency, number>;
}

export function DebtTracker({ initialDebts, exchangeRates }: DebtTrackerProps) {
  const [debts, setDebts] = useState<Debt[]>(initialDebts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [debtToEdit, setDebtToEdit] = useState<Debt | undefined>(undefined);

  const handleAdd = () => {
    setDebtToEdit(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (debt: Debt) => {
    setDebtToEdit(debt);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setDebts((prev) => prev.filter((debt) => debt.id !== id));
  };

  const handleSubmit = (debtData: Omit<Debt, "id">, id?: string) => {
    // In a real app, you would re-fetch or re-enrich the debt with its historical rate here
    const newDebt: Debt = {
      ...debtData,
      id: id || crypto.randomUUID(),
      // For now, we don't have a mechanism to fetch historical rate on client, so it will be undefined
      historicalNprRate: undefined,
    };

    if (id) {
      // Update
      setDebts((prev) => prev.map((d) => (d.id === id ? newDebt : d)));
    } else {
      // Create
      setDebts((prev) => [...prev, newDebt]);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col dark:bg-gray-950">
      <Header onAddDebt={handleAdd} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 container mx-auto">
        <DebtSummary
          debts={debts}
          exchangeRates={exchangeRates}
          showPerPersonSummary={true}
        />
        <DebtTable debts={debts} onEdit={handleEdit} onDelete={handleDelete} />
      </main>
      <DebtForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        debtToEdit={debtToEdit}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
