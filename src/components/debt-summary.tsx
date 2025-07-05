"use client";

import { useMemo } from "react";
import type { Debt, Currency } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { formatCurrency } from "@/lib/aux_functions";

interface DebtSummaryProps {
  debts: Debt[];
  exchangeRates: Record<Currency, number>;
  showPerPersonSummary?: boolean;
}

export function DebtSummary({
  debts,
  exchangeRates,
  showPerPersonSummary = true,
}: DebtSummaryProps) {
  const {
    totalOwedToMeNPR,
    totalIOweNPR,
    netPositionNPR,
    totalOwedToMeAED,
    totalIOweAED,
    netPositionAED,
    owedToMeByCurrency,
    iOweByCurrency,
    totalsByPersonNPR,
  } = useMemo(() => {
    let totalOwedToMeNPR = 0;
    let totalIOweNPR = 0;
    let totalOwedToMeAED = 0;
    let totalIOweAED = 0;
    const owedToMeByCurrency: Partial<Record<Currency, number>> = {};
    const iOweByCurrency: Partial<Record<Currency, number>> = {};
    const totalsByPersonNPR: Record<string, number> = {};

    for (const debt of debts) {
      const historicalNprAmount =
        (debt.amount || 0) * (debt.historicalNprRate || 0);
      const currentAedAmount =
        (debt.amount || 0) * (exchangeRates[debt.currency] || 0);

      if (!totalsByPersonNPR[debt.personName]) {
        totalsByPersonNPR[debt.personName] = 0;
      }

      if (debt.type === "owed_to_me") {
        totalOwedToMeNPR += historicalNprAmount;
        totalOwedToMeAED += currentAedAmount;
        owedToMeByCurrency[debt.currency] =
          (owedToMeByCurrency[debt.currency] || 0) + debt.amount;
        totalsByPersonNPR[debt.personName] += historicalNprAmount;
      } else {
        // i_owe
        totalIOweNPR += historicalNprAmount;
        totalIOweAED += currentAedAmount;
        iOweByCurrency[debt.currency] =
          (iOweByCurrency[debt.currency] || 0) + debt.amount;
        totalsByPersonNPR[debt.personName] -= historicalNprAmount;
      }
    }

    const netPositionNPR = totalOwedToMeNPR - totalIOweNPR;
    const netPositionAED = totalOwedToMeAED - totalIOweAED;

    return {
      totalOwedToMeNPR,
      totalIOweNPR,
      netPositionNPR,
      totalOwedToMeAED,
      totalIOweAED,
      netPositionAED,
      owedToMeByCurrency,
      iOweByCurrency,
      totalsByPersonNPR,
    };
  }, [debts, exchangeRates]);

  return (
    <>
      <div className="grid grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Net Position</CardTitle>
            <CardDescription>
              Your overall financial position based on historical and current
              rates
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <div className="flex flex-col sm:flex-row justify-around items-center gap-6">
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${
                    netPositionNPR >= 0 ? "text-destructive" : "text-destructive"
                  }`}
                >
                  {formatCurrency(Math.abs(netPositionNPR), "NPR")}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {netPositionNPR >= 0
                    ? "Net amount owed to you"
                    : "Net amount you owe"}{" "}
                  (historical)
                </p>
              </div>
              <div className="text-center">
                <div
                  className={`text-3xl font-bold ${
                    netPositionAED >= 0 ? "text-chart-1" : "text-destructive"
                  }`}
                >
                  {formatCurrency(Math.abs(netPositionAED), "AED")}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {netPositionAED >= 0
                    ? "Net amount owed to you"
                    : "Net amount you owe"}{" "}
                  (current)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5 text-chart-1" />
              Owed to Me
            </CardTitle>
            <CardDescription>Money others owe you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.keys(owedToMeByCurrency).length > 0 ? (
              Object.entries(owedToMeByCurrency).map(([currency, amount]) => (
                <div
                  key={currency}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-muted-foreground">{currency}</span>
                  <div className="font-semibold text-chart-1">
                    {formatCurrency(amount, currency as Currency)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No money is currently owed to you.
              </p>
            )}
            {Object.keys(owedToMeByCurrency).length > 0 && (
              <Separator className="my-2" />
            )}
            <div className="flex justify-between items-center font-bold text-base pt-2">
              <span className="text-muted-foreground text-sm">
                Total (Historical NPR)
              </span>
              <span className="text-chart-1">
                {formatCurrency(totalOwedToMeNPR, "NPR")}
              </span>
            </div>
            <div className="flex justify-between items-center font-bold text-base">
              <span className="text-muted-foreground text-sm">
                Total (Current AED)
              </span>
              <span className="text-chart-1">
                {formatCurrency(totalOwedToMeAED, "AED")}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <TrendingDown className="h-5 w-5 text-destructive" />I Owe
            </CardTitle>
            <CardDescription>Money you owe others</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {Object.keys(iOweByCurrency).length > 0 ? (
              Object.entries(iOweByCurrency).map(([currency, amount]) => (
                <div
                  key={currency}
                  className="flex justify-between items-center text-sm"
                >
                  <span className="text-muted-foreground">{currency}</span>
                  <div className="font-semibold text-destructive">
                    {formatCurrency(amount, currency as Currency)}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                You don't currently owe any money.
              </p>
            )}
            {Object.keys(iOweByCurrency).length > 0 && (
              <Separator className="my-2" />
            )}
            <div className="flex justify-between items-center font-bold text-base pt-2">
              <span className="text-muted-foreground text-sm">
                Total (Historical NPR)
              </span>
              <span className="text-destructive">
                {formatCurrency(totalIOweNPR, "NPR")}
              </span>
            </div>
            <div className="flex justify-between items-center font-bold text-base">
              <span className="text-muted-foreground text-sm">
                Total (Current AED)
              </span>
              <span className="text-destructive">
                {formatCurrency(totalIOweAED, "AED")}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {showPerPersonSummary && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">
            Per Person Summary (Historical NPR)
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(totalsByPersonNPR)
              .filter(([, totalNPR]) => Math.abs(totalNPR) > 0.01)
              .map(([personName, totalNPR]) => (
                <Link
                  href={`/person/${encodeURIComponent(personName)}`}
                  key={personName}
                  className="block hover:ring-2 hover:ring-chart-3 rounded-lg transition-all"
                >
                  <Card className="h-full">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{personName}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`text-2xl font-bold ${
                          totalNPR > 0 ? "text-chart-1" : "text-destructive"
                        }`}
                      >
                        {formatCurrency(Math.abs(totalNPR), "NPR")}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {totalNPR > 0 ? `Owes you` : `You owe`}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
          {Object.keys(totalsByPersonNPR).filter(
            (p) => Math.abs(totalsByPersonNPR[p]) > 0.01
          ).length === 0 && (
            <p className="text-sm text-muted-foreground">
              No outstanding balances with anyone.
            </p>
          )}
        </div>
      )}
    </>
  );
}
