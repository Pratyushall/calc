import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ItemToggle } from "@/components/item-toggle";
import { config } from "@/lib/config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AddOnsStepProps {
  calculator: any;
}

export function AddOnsStep({ calculator }: AddOnsStepProps) {
  const { state, updateAddonItem } = calculator;
  const { addonItems, projectBasics } = state;

  // Group addon items by category
  const sofaItems = addonItems.filter((item: { id: string | string[] }) =>
    item.id.includes("sofa")
  );
  const diningItems = addonItems.filter((item: { id: string | string[] }) =>
    item.id.includes("dining")
  );
  const carpetItems = addonItems.filter((item: { id: string | string[] }) =>
    item.id.includes("carpets")
  );
  const lightItems = addonItems.filter((item: { id: string | string[] }) =>
    item.id.includes("lights")
  );
  const curtainItems = addonItems.filter((item: { id: string | string[] }) =>
    item.id.includes("curtains")
  );

  const renderItemGroup = (items: any[], title: string) => (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => {
          const itemConfig = config.addonItems.find((c) => c.id === item.id);
          if (!itemConfig) return null;

          return (
            <ItemToggle
              key={item.id}
              item={item}
              config={itemConfig}
              model={projectBasics.model}
              onUpdate={(updates) => updateAddonItem(item.id, updates)}
            />
          );
        })}
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add-ons & Furniture</h2>
        <p className="text-muted-foreground mb-6">
          Choose additional furniture and accessories for your home. Prices vary
          by apartment size and package type.
        </p>
      </div>

      <Tabs defaultValue="sofa" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sofa">Sofa</TabsTrigger>
          <TabsTrigger value="dining">Dining</TabsTrigger>
          <TabsTrigger value="carpets">Carpets</TabsTrigger>
          <TabsTrigger value="lights">Lights</TabsTrigger>
          <TabsTrigger value="curtains">Curtains</TabsTrigger>
        </TabsList>

        <TabsContent value="sofa" className="mt-6">
          {renderItemGroup(sofaItems, "Sofa Sets")}
        </TabsContent>

        <TabsContent value="dining" className="mt-6">
          {renderItemGroup(diningItems, "Dining Tables")}
        </TabsContent>

        <TabsContent value="carpets" className="mt-6">
          {renderItemGroup(carpetItems, "Carpets & Rugs")}
        </TabsContent>

        <TabsContent value="lights" className="mt-6">
          {renderItemGroup(lightItems, "Designer Lights")}
        </TabsContent>

        <TabsContent value="curtains" className="mt-6">
          {renderItemGroup(curtainItems, "Curtains & Drapes")}
        </TabsContent>
      </Tabs>
    </div>
  );
}
