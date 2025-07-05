"use server";

import { DebtSummary } from "@/components/debt-summary";
import { DebtTable } from "@/components/debt-table";
import Link from "next/link";
import { ArrowLeft, BanknoteX } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getEnrichedDebts,
  getExchangeRates,
} from "@/app/actions/getExchangeRates.action";

interface PersonPageProps {
  params: Promise<{
    personName: string;
  }>;
}

export default async function PersonPage({ params }: PersonPageProps) {
  // Await params before accessing its properties
  const resolvedParams = await params;
  const personName = decodeURIComponent(resolvedParams.personName);

  const allDebts = await getEnrichedDebts();
  const exchangeRates = await getExchangeRates();

  // In a real app, fetch this data from a database
  const debtsForPerson = allDebts.filter(
    (debt) => debt.personName === personName
  );

  return (
    <div className="flex min-h-screen w-full flex-col dark:bg-gray-950">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
        <div className="flex items-center gap-2">
          <BanknoteX className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">DebtWatch</h1>
        </div>
        <div className="ml-auto">
          <Button asChild variant="outline" size="sm">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Debts
            </Link>
          </Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 container mx-auto">
        <h2 className="text-3xl font-bold tracking-tight">
          Debt Summary for {personName}
        </h2>
        {debtsForPerson.length > 0 ? (
          <>
            <DebtSummary
              debts={debtsForPerson}
              exchangeRates={exchangeRates}
              showPerPersonSummary={false}
            />
            <div className="mt-8">
              <h3 className="text-2xl font-bold tracking-tight mb-4">
                All Transactions
              </h3>
              <DebtTable debts={debtsForPerson} />
            </div>
          </>
        ) : (
          <p>No debts found for {personName}.</p>
        )}
      </main>
    </div>
  );
}