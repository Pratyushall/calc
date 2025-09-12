"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ItemToggle } from "@/components/item-toggle";
import { config } from "@/lib/config";
import { Plus, Trash2 } from "lucide-react";
import type { RoomState, ItemState } from "@/lib/types";

interface RoomsItemsStepProps {
  calculator: any;
}

export function RoomsItemsStep({ calculator }: RoomsItemsStepProps) {
  const {
    state,
    addRoom,
    removeRoom,
    updateRoomItem,
    updateLivingItem,
    updatePoojaItem,
    updateKitchenItem,
  } = calculator;
  const { rooms, livingItems, poojaItems, kitchenItems, projectBasics } = state;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Rooms & Items</h2>
        <p className="text-muted-foreground mb-6">
          Add bedrooms and configure items for each room type.
        </p>
      </div>

      {/* Bedrooms Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Bedrooms</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => addRoom("master")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Master
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addRoom("children")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Children
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => addRoom("guest")}
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Guest
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {rooms.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              No bedrooms added yet. Click the buttons above to add bedrooms.
            </p>
          ) : (
            rooms.map((room: RoomState) => (
              <div key={room.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{room.name}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeRoom(room.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {room.items.map((item: ItemState) => {
                    const itemConfig = config.bedroomItems.find(
                      (c) => c.id === item.id
                    );
                    if (!itemConfig) return null;

                    return (
                      <ItemToggle
                        key={item.id}
                        item={item}
                        config={itemConfig}
                        model={projectBasics.model}
                        onUpdate={(updates) =>
                          updateRoomItem(room.id, item.id, updates)
                        }
                      />
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Living Room Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Living Room</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {livingItems.map((item: ItemState) => {
            const itemConfig = config.livingItems.find((c) => c.id === item.id);
            if (!itemConfig) return null;

            return (
              <ItemToggle
                key={item.id}
                item={item}
                config={itemConfig}
                model={projectBasics.model}
                onUpdate={(updates) => updateLivingItem(item.id, updates)}
              />
            );
          })}
        </CardContent>
      </Card>

      {/* Pooja Room Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Pooja Room</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {poojaItems.map((item: ItemState) => {
            const itemConfig = config.poojaItems.find((c) => c.id === item.id);
            if (!itemConfig) return null;

            return (
              <ItemToggle
                key={item.id}
                item={item}
                config={itemConfig}
                model={projectBasics.model}
                onUpdate={(updates) => updatePoojaItem(item.id, updates)}
              />
            );
          })}
        </CardContent>
      </Card>

      {/* Kitchen Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Modular Kitchen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {kitchenItems.map((item: ItemState) => {
            const itemConfig = config.kitchenItems.find(
              (c) => c.id === item.id
            );
            if (!itemConfig) return null;

            return (
              <ItemToggle
                key={item.id}
                item={item}
                config={itemConfig}
                model={projectBasics.model}
                onUpdate={(updates) => updateKitchenItem(item.id, updates)}
              />
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
