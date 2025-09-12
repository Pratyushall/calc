"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/calculations";
import { Download, Share2 } from "lucide-react";

interface SummaryStepProps {
  calculator: any;
  calculationResult: {
    subtotals: {
      singleLine: number;
      bedrooms: number;
      living: number;
      pooja: number;
      kitchen: number;
      addons: number;
    };
    grandTotal: number;
    itemCount: number;
    isLoading: boolean;
    error: string | null;
  };
}

export function SummaryStep({
  calculator,
  calculationResult,
}: SummaryStepProps) {
  const { state } = calculator;
  const { projectBasics } = state;

  const handleDownloadPDF = async () => {
    try {
      const content = `
Interior Design Estimate

Project Details:
- Carpet Area: ${projectBasics.carpetAreaSqft} sq ft
- City Tier: ${projectBasics.cityTier}
- Package: ${projectBasics.model}
- Selected Items: ${calculationResult.itemCount}

Total Estimate: ${formatCurrency(calculationResult.grandTotal)}

*This is an estimate. Final quote will be provided after site verification.
      `;

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "interior-estimate.txt";
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating file:", error);
      alert("Error generating file. Please try again.");
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Interior Design Cost Estimate",
        text: `My interior design estimate: ${formatCurrency(
          calculationResult.grandTotal
        )}`,
        url: window.location.href,
      });
    }
  };

  if (calculationResult.isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-lg font-bold">Calculating your estimate...</div>
        </div>
      </div>
    );
  }

  if (calculationResult.error) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="text-lg font-bold text-red-600">
            Error: {calculationResult.error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Your Estimate</h2>
        <p className="text-muted-foreground mb-6">
          Here's your interior design cost estimate.
        </p>
      </div>

      {/* Project Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Project Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Carpet Area</p>
            <p className="font-bold">{projectBasics.carpetAreaSqft} sq ft</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">City Tier</p>
            <p className="font-bold">{projectBasics.cityTier}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Package</p>
            <p className="font-bold capitalize">{projectBasics.model}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Selected Items</p>
            <p className="font-bold">{calculationResult.itemCount} items</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cost Breakdown</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {calculationResult.subtotals.singleLine > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <h4 className="font-bold">Single Line Items</h4>
              <span className="font-bold text-lg">
                {formatCurrency(calculationResult.subtotals.singleLine)}
              </span>
            </div>
          )}
          {calculationResult.subtotals.bedrooms > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <h4 className="font-bold">Bedrooms</h4>
              <span className="font-bold text-lg">
                {formatCurrency(calculationResult.subtotals.bedrooms)}
              </span>
            </div>
          )}
          {calculationResult.subtotals.living > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <h4 className="font-bold">Living Room</h4>
              <span className="font-bold text-lg">
                {formatCurrency(calculationResult.subtotals.living)}
              </span>
            </div>
          )}
          {calculationResult.subtotals.pooja > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <h4 className="font-bold">Pooja Room</h4>
              <span className="font-bold text-lg">
                {formatCurrency(calculationResult.subtotals.pooja)}
              </span>
            </div>
          )}
          {calculationResult.subtotals.kitchen > 0 && (
            <div className="flex justify-between items-center py-2 border-b">
              <h4 className="font-bold">Kitchen</h4>
              <span className="font-bold text-lg">
                {formatCurrency(calculationResult.subtotals.kitchen)}
              </span>
            </div>
          )}
          {calculationResult.subtotals.addons > 0 && (
            <div className="flex justify-between items-center py-2 border-b last:border-b-0">
              <h4 className="font-bold">Add-ons</h4>
              <span className="font-bold text-lg">
                {formatCurrency(calculationResult.subtotals.addons)}
              </span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Final Total */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between text-2xl font-bold">
            <span>Total Estimate</span>
            <span className="text-primary">
              {formatCurrency(calculationResult.grandTotal)}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 hover-glow"
        >
          <Download className="w-4 h-4" />
          Download Estimate
        </Button>
        <Button
          variant="outline"
          onClick={handleShare}
          className="flex items-center gap-2 bg-transparent hover-glow"
        >
          <Share2 className="w-4 h-4" />
          Share Estimate
        </Button>
      </div>

      {/* Disclaimer */}
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong>Disclaimer:</strong> This is an estimate based on standard
            rates and may vary based on actual site conditions, material
            availability, and specific requirements. Final quote will be
            provided after detailed site survey and consultation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
