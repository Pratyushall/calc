"use client";

import { useState, useCallback, useEffect } from "react";
import type {
  CalculatorState,
  ProjectBasics,
  ItemState,
  RoomState,
} from "@/lib/types";
import { config } from "@/lib/config";
import { calculateEstimate } from "@/lib/calculations";

interface CalculationResult {
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
}

const initialProjectBasics: ProjectBasics = {
  carpetAreaSqft: 100, // Changed default carpet area from 1000 to 100 sqft
  cityTier: "Tier-1",
  model: "premium",
};

const createItemState = (itemConfig: any): ItemState => ({
  id: itemConfig.id,
  enabled: itemConfig.defaults?.enabled ?? false,
  areaSqft: itemConfig.defaults?.areaSqft,
  qty: itemConfig.defaults?.qty ?? 1,
});

const initialState: CalculatorState = {
  step: 1,
  projectBasics: initialProjectBasics,
  singleLineItems: config.singleLineItems.map(createItemState),
  rooms: [],
  livingItems: config.livingItems.map(createItemState),
  poojaItems: config.poojaItems.map(createItemState),
  kitchenItems: config.kitchenItems.map(createItemState),
  addonItems: config.addonItems.map(createItemState),
};

const initialCalculationResult: CalculationResult = {
  subtotals: {
    singleLine: 0,
    bedrooms: 0,
    living: 0,
    pooja: 0,
    kitchen: 0,
    addons: 0,
  },
  grandTotal: 0,
  itemCount: 0,
  isLoading: false,
  error: null,
};

export function useCalculator() {
  const [state, setState] = useState<CalculatorState>(initialState);
  const [calculationResult, setCalculationResult] = useState<CalculationResult>(
    initialCalculationResult
  );

  const recalculate = useCallback(async () => {
    setCalculationResult((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Prepare selected items for API
      const selectedItems: {
        [itemId: string]: { enabled: boolean; areaSqft?: number; qty?: number };
      } = {};

      // Add single line items
      state.singleLineItems.forEach((item) => {
        selectedItems[item.id] = {
          enabled: item.enabled,
          areaSqft: item.areaSqft,
          qty: item.qty,
        };
      });

      // Add room items
      state.rooms.forEach((room) => {
        room.items.forEach((item) => {
          selectedItems[item.id] = {
            enabled: item.enabled,
            areaSqft: item.areaSqft,
            qty: item.qty,
          };
        });
      });

      // Add other section items
      [
        ...state.livingItems,
        ...state.poojaItems,
        ...state.kitchenItems,
        ...state.addonItems,
      ].forEach((item) => {
        selectedItems[item.id] = {
          enabled: item.enabled,
          areaSqft: item.areaSqft,
          qty: item.qty,
        };
      });

      const result = await calculateEstimate({
        carpetArea: state.projectBasics.carpetAreaSqft,
        city: state.projectBasics.cityTier,
        model: state.projectBasics.model,
        bedrooms: state.rooms.length,
        selectedItems,
      });

      setCalculationResult({
        ...result,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setCalculationResult((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : "Calculation failed",
      }));
    }
  }, [state]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      recalculate();
    }, 300); // Debounce calculations

    return () => clearTimeout(timeoutId);
  }, [recalculate]);

  const updateProjectBasics = useCallback((basics: Partial<ProjectBasics>) => {
    setState((prev) => ({
      ...prev,
      projectBasics: { ...prev.projectBasics, ...basics },
    }));
  }, []);

  const updateSingleLineItem = useCallback(
    (itemId: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        singleLineItems: prev.singleLineItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const addRoom = useCallback((type: "master" | "children" | "guest") => {
    const roomId = `${type}_${Date.now()}`;
    const newRoom: RoomState = {
      id: roomId,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Bedroom`,
      type,
      items: config.bedroomItems.map(createItemState),
    };

    setState((prev) => ({
      ...prev,
      rooms: [...prev.rooms, newRoom],
    }));
  }, []);

  const removeRoom = useCallback((roomId: string) => {
    setState((prev) => ({
      ...prev,
      rooms: prev.rooms.filter((room) => room.id !== roomId),
    }));
  }, []);

  const updateRoomItem = useCallback(
    (roomId: string, itemId: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        rooms: prev.rooms.map((room) =>
          room.id === roomId
            ? {
                ...room,
                items: room.items.map((item) =>
                  item.id === itemId ? { ...item, ...updates } : item
                ),
              }
            : room
        ),
      }));
    },
    []
  );

  const updateLivingItem = useCallback(
    (itemId: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        livingItems: prev.livingItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const updatePoojaItem = useCallback(
    (itemId: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        poojaItems: prev.poojaItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const updateKitchenItem = useCallback(
    (itemId: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        kitchenItems: prev.kitchenItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const updateAddonItem = useCallback(
    (itemId: string, updates: Partial<ItemState>) => {
      setState((prev) => ({
        ...prev,
        addonItems: prev.addonItems.map((item) =>
          item.id === itemId ? { ...item, ...updates } : item
        ),
      }));
    },
    []
  );

  const setStep = useCallback((step: number) => {
    setState((prev) => ({ ...prev, step }));
  }, []);

  const nextStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 5) }));
  }, []);

  const prevStep = useCallback(() => {
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) }));
  }, []);

  return {
    state,
    calculationResult,
    recalculate,
    updateProjectBasics,
    updateSingleLineItem,
    addRoom,
    removeRoom,
    updateRoomItem,
    updateLivingItem,
    updatePoojaItem,
    updateKitchenItem,
    updateAddonItem,
    setStep,
    nextStep,
    prevStep,
  };
}
