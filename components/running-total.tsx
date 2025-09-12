import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { CalculationResult, SectionTotal } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";

interface RunningTotalProps {
  calculation: CalculationResult;
}

export function RunningTotal({ calculation }: RunningTotalProps) {
  return (
    <Card className="sticky top-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Running Total</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {calculation.sectionTotals.map((section: SectionTotal) => (
          <div key={section.section} className="flex justify-between text-sm">
            <span className="text-muted-foreground">{section.section}</span>
            <span className="font-bold">
              {formatCurrency(section.subtotal)}
            </span>
          </div>
        ))}

        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total Estimate</span>
            <span className="text-primary">
              {formatCurrency(calculation.grandTotal)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
