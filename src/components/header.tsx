"use client";

import { Button } from "@/components/ui/button";
import { BanknoteX, PlusCircle } from "lucide-react";

interface HeaderProps {
  onAddDebt: () => void;
}

export function Header({ onAddDebt }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <div className="flex items-center gap-2">
        <BanknoteX className="h-6 w-6 text-primary" />
        <h1 className="text-xl font-bold text-foreground">Ctrl-Alt-De-Debt</h1>
      </div>
      <div className="ml-auto">
        <Button onClick={onAddDebt} size="sm">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Debt
        </Button>
      </div>
    </header>
  );
}
