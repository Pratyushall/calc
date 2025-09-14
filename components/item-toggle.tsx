"use client";

import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import type { ItemConfig } from "@/lib/config";
import type { ItemState } from "@/lib/types";

interface ItemToggleProps {
  item: ItemState;
  config: ItemConfig;
  model: "premium" | "luxury";
  onUpdate: (updates: Partial<ItemState>) => void;
  defaultArea?: number;
}

export function ItemToggle({
  item,
  config,
  model,
  onUpdate,
  defaultArea,
}: ItemToggleProps) {
  const rate = config.rateType.rate[model];
  const isRateValid = rate !== "TBD" && typeof rate === "number";

  return (
    <div className="flex items-center justify-between p-4 border rounded-lg bg-gray-100 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)] transition-all duration-300">
      <div className="flex-1">
        {/* Toggle + label */}
        <div className="flex items-center space-x-3">
          <div className="hover:shadow-[0_0_10px_rgba(251,191,36,0.6)] rounded transition-all duration-300 bg-gray-200 p-1">
            <Switch
              checked={item.enabled}
              onCheckedChange={(enabled) => onUpdate({ enabled })}
              disabled={!isRateValid}
            />
          </div>
          <div className="flex-1">
            <Label className="text-sm font-bold text-black">
              {config.label}
            </Label>
            {config.notes && (
              <p className="text-xs text-black mt-1 font-semibold">
                {config.notes}
              </p>
            )}
            {!isRateValid && (
              <p className="text-xs text-destructive mt-1 font-semibold">
                Rate not available
              </p>
            )}
          </div>
        </div>

        {/* Inputs / dropdowns when enabled */}
        {item.enabled && isRateValid && (
          <div className="mt-3 flex flex-wrap gap-4">
            {/* Sqft input */}
            {config.rateType.unit === "sqft" && (
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor={`area-${item.id}`}
                  className="text-xs font-bold text-black"
                >
                  Area (sqft):
                </Label>
                <Input
                  id={`area-${item.id}`}
                  type="number"
                  value={item.areaSqft || defaultArea || ""}
                  onChange={(e) =>
                    onUpdate({ areaSqft: Number(e.target.value) || 0 })
                  }
                  className="w-20 h-8 text-xs font-bold hover:shadow-[0_0_8px_rgba(251,191,36,0.4)] focus:shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-300"
                  min="0"
                />
              </div>
            )}

            {/* Quantity input */}
            {config.rateType.unit === "each" && (
              <div className="flex items-center space-x-2">
                <Label
                  htmlFor={`qty-${item.id}`}
                  className="text-xs font-bold text-black"
                >
                  Quantity:
                </Label>
                <Input
                  id={`qty-${item.id}`}
                  type="number"
                  value={item.qty || 1}
                  onChange={(e) =>
                    onUpdate({ qty: Number(e.target.value) || 1 })
                  }
                  className="w-16 h-8 text-xs font-bold hover:shadow-[0_0_8px_rgba(251,191,36,0.4)] focus:shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-300"
                  min="1"
                />
              </div>
            )}

            {/* Dropdown if options exist */}
            {config.options && config.options.length > 0 && (
              <div className="flex items-center space-x-2">
                <Label className="text-xs font-bold text-black">Type:</Label>
                <Select
                  value={item.selectedOption || ""}
                  onValueChange={(value) => onUpdate({ selectedOption: value })}
                >
                  <SelectTrigger className="w-40 h-8 text-xs font-bold">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    {config.options.map((opt) => (
                      <SelectItem key={opt} value={opt}>
                        {opt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Dimension inputs if defined */}
            {config.dimensions &&
              config.dimensions.map((dim) => (
                <div key={dim} className="flex items-center space-x-2">
                  <Label
                    htmlFor={`${item.id}-${dim}`}
                    className="text-xs font-bold text-black"
                  >
                    {dim}:
                  </Label>
                  <Input
                    id={`${item.id}-${dim}`}
                    type="number"
                    value={item.dimensions?.[dim] || ""}
                    onChange={(e) =>
                      onUpdate({
                        dimensions: {
                          ...item.dimensions,
                          [dim]: Number(e.target.value) || 0,
                        },
                      })
                    }
                    className="w-20 h-8 text-xs font-bold hover:shadow-[0_0_8px_rgba(251,191,36,0.4)] focus:shadow-[0_0_12px_rgba(251,191,36,0.6)] transition-all duration-300"
                    min="0"
                  />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
