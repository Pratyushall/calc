"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemToggle } from "@/components/item-toggle";
import { config } from "@/lib/config";
import type { ItemState } from "@/lib/types";

interface SingleLineItemsStepProps {
  calculator: any;
}

export function SingleLineItemsStep({ calculator }: SingleLineItemsStepProps) {
  const { state, updateSingleLineItem } = calculator;
  const { singleLineItems, projectBasics } = state;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Single Line Items</h2>
        <p className="text-muted-foreground mb-6">
          These items are typically applied to the entire carpet area. Toggle
          items on/off and adjust areas as needed.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Area-Based Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {singleLineItems.map((item: ItemState) => {
            const itemConfig = config.singleLineItems.find(
              (c) => c.id === item.id
            );
            if (!itemConfig) return null;

            return (
              <ItemToggle
                key={item.id}
                item={item}
                config={itemConfig}
                model={projectBasics.model}
                onUpdate={(updates) => updateSingleLineItem(item.id, updates)}
                defaultArea={projectBasics.carpetAreaSqft}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
