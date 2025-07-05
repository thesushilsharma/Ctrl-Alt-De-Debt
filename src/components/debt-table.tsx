"use client";

import React, { useState, useMemo } from "react";
import type { Debt } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowUpDown,
  Edit,
  Filter,
  Trash2,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/aux_functions";

interface DebtTableProps {
  debts: Debt[];
  onEdit?: (debt: Debt) => void;
  onDelete?: (id: string) => void;
}

type SortKey = keyof Debt | "historicalValue" | "";
type SortDirection = "asc" | "desc";

export function DebtTable({ debts, onEdit, onDelete }: DebtTableProps) {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const canPerformActions = !!(onEdit && onDelete);

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const sortedAndFilteredDebts = useMemo(() => {
    const result = debts.filter((debt) =>
      debt.personName.toLowerCase().includes(filter.toLowerCase())
    );

    if (sortKey) {
      result.sort((a, b) => {
        if (!sortKey) return 0;

        let aVal, bVal;

        if (sortKey === "historicalValue") {
          aVal = a.historicalNprRate ? a.amount * a.historicalNprRate : 0;
          bVal = b.historicalNprRate ? b.amount * b.historicalNprRate : 0;
        } else {
          aVal = a[sortKey as keyof Debt];
          bVal = b[sortKey as keyof Debt];
        }

        let comparison = 0;
        if (typeof aVal === "string" && typeof bVal === "string") {
          comparison = aVal.localeCompare(bVal);
        } else if (typeof aVal === "number" && typeof bVal === "number") {
          comparison = aVal - bVal;
        } else if (aVal instanceof Date && bVal instanceof Date) {
          comparison = aVal.getTime() - bVal.getTime();
        }

        return sortDirection === "asc" ? comparison : -comparison;
      });
    }

    return result;
  }, [debts, filter, sortKey, sortDirection]);

  const SortableHeader = ({
    tkey,
    label,
  }: {
    tkey: SortKey;
    label: string;
  }) => (
    <Button variant="ghost" onClick={() => handleSort(tkey)}>
      {label}
      {sortKey === tkey && <ArrowUpDown className="ml-2 h-4 w-4" />}
    </Button>
  );

  const colSpan = canPerformActions ? 6 : 5;

  return (
    <div className="rounded-lg border shadow-sm bg-card">
      <div className="p-4 flex items-center gap-4">
        <div className="relative flex-1">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>
              <SortableHeader tkey="personName" label="Name" />
            </TableHead>
            <TableHead className="text-right">
              <SortableHeader tkey="amount" label="Amount" />
            </TableHead>
            <TableHead className="text-right">
              <SortableHeader tkey="historicalValue" label="Value (NPR)" />
            </TableHead>
            <TableHead>
              <SortableHeader tkey="date" label="Date" />
            </TableHead>
            {canPerformActions && (
              <TableHead className="text-right">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedAndFilteredDebts.length > 0 ? (
            sortedAndFilteredDebts.map((debt) => (
              <React.Fragment key={debt.id}>
                <TableRow
                  data-state={
                    expandedRows.has(debt.id) ? "selected" : undefined
                  }
                >
                  <TableCell>
                    {debt.notes && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleRow(debt.id)}
                      >
                        {expandedRows.has(debt.id) ? (
                          <ChevronUp className="h-4 w-4" />
                        ) : (
                          <ChevronDown className="h-4 w-4" />
                        )}
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">
                    {debt.personName}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={
                        debt.type === "i_owe" ? "default" : "destructive"
                      }
                      className={cn(
                        "font-mono",
                        debt.type === "i_owe"
                          ? "bg-accent text-chart-1"
                          : ""
                      )}
                    >
                      {formatCurrency(debt.amount, debt.currency)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-mono text-primary">
                    {debt.historicalNprRate
                      ? formatCurrency(
                          debt.amount * debt.historicalNprRate,
                          "NPR"
                        )
                      : "-"}
                  </TableCell>
                  <TableCell>{format(debt.date, "PP")}</TableCell>
                  {canPerformActions && onEdit && onDelete && (
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => onEdit(debt)}>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete this debt entry.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => onDelete(debt.id)}
                                  className="bg-destructive hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
                {expandedRows.has(debt.id) && debt.notes && (
                  <TableRow key={`${debt.id}-details`}>
                    <TableCell colSpan={colSpan + 1} className="p-0">
                      <div className="bg-muted/50 p-4 space-y-3">
                        {debt.notes && (
                          <div>
                            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1">
                              Notes
                            </h4>
                            <p className="text-sm text-foreground/80">
                              {debt.notes}
                            </p>
                          </div>
                        )}
                        {debt.historicalNprRate && debt.currency !== "NPR" && (
                          <div>
                            <h4 className="font-semibold text-xs uppercase tracking-wider text-muted-foreground mb-1">
                              Historical Rate
                            </h4>
                            <p className="text-sm text-foreground/80">
                              On {format(debt.date, "PPP")}, the exchange rate
                              was approximately{" "}
                              <strong>
                                1 {debt.currency} ≈{" "}
                                {debt.historicalNprRate.toFixed(2)} NPR
                              </strong>
                              .
                            </p>
                          </div>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={colSpan + 1} className="h-24 text-center">
                No debts found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
