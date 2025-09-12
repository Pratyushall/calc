"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { CityTier, Model } from "@/lib/types";

interface ProjectBasicsStepProps {
  calculator: any;
}

export function ProjectBasicsStep({ calculator }: ProjectBasicsStepProps) {
  const { state, updateProjectBasics } = calculator;
  const { projectBasics } = state;

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-4 text-black">
          Project Basics
        </h2>
        <p className="text-black text-sm sm:text-base mb-4 sm:mb-6">
          Let's start with the basic details of your interior design project.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Card className="bg-gray-100 border-gray-300">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-black">
              Carpet Area
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label
                htmlFor="carpet-area"
                className="text-black text-sm sm:text-base"
              >
                Total Carpet Area (sq ft)
              </Label>
              <Input
                id="carpet-area"
                type="number"
                value={projectBasics.carpetAreaSqft}
                onChange={(e) =>
                  updateProjectBasics({
                    carpetAreaSqft: Number(e.target.value) || 0,
                  })
                }
                placeholder="Enter carpet area"
                min="100"
                max="10000"
                className="bg-white border-gray-300 text-black text-sm sm:text-base h-10 sm:h-11"
              />
              <p className="text-xs sm:text-sm text-gray-600">
                Enter the total carpet area of your home in square feet
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-100 border-gray-300">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg text-black">
              Location - Hyderabad
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label className="text-black text-sm sm:text-base">
                Select your area
              </Label>
              <Select
                value={projectBasics.cityTier}
                onValueChange={(value: CityTier) =>
                  updateProjectBasics({ cityTier: value })
                }
              >
                <SelectTrigger className="bg-white border-gray-300 text-black h-10 sm:h-11 text-sm sm:text-base">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white border-gray-300">
                  <SelectItem
                    value="Tier-1"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Banjara Hills
                  </SelectItem>
                  <SelectItem
                    value="Tier-1"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Jubilee Hills
                  </SelectItem>
                  <SelectItem
                    value="Tier-1"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Film Nagar
                  </SelectItem>
                  <SelectItem
                    value="Tier-1"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Madhapur
                  </SelectItem>
                  <SelectItem
                    value="Tier-2"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Hitech City
                  </SelectItem>
                  <SelectItem
                    value="Tier-2"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Gachibowli
                  </SelectItem>
                  <SelectItem
                    value="Tier-2"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Kondapur
                  </SelectItem>
                  <SelectItem
                    value="Tier-2"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Kukatpally
                  </SelectItem>
                  <SelectItem
                    value="Tier-2"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Miyapur
                  </SelectItem>
                  <SelectItem
                    value="Tier-2"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Begumpet
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Secunderabad
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Ameerpet
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Dilsukhnagar
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    LB Nagar
                  </SelectItem>
                  <SelectItem
                    value="Other"
                    className="text-black hover:bg-gray-100 text-sm sm:text-base py-2 sm:py-3"
                  >
                    Uppal
                  </SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs sm:text-sm text-gray-600"></p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-100 border-gray-300">
        <CardHeader className="pb-3 sm:pb-6">
          <CardTitle className="text-base sm:text-lg text-black">
            Interior Package
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Label className="text-black text-sm sm:text-base">
              Choose your interior package
            </Label>
            <RadioGroup
              value={projectBasics.model}
              onValueChange={(value: Model) =>
                updateProjectBasics({ model: value })
              }
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4"
            >
              <div className="flex items-center space-x-3 border rounded-lg p-3 sm:p-4 bg-gray-100 hover:bg-gray-200 hover:shadow-[0_0_10px_rgba(251,191,36,0.4)] transition-all duration-300">
                <RadioGroupItem value="premium" id="premium" className="mt-1" />
                <div className="flex-1">
                  <Label
                    htmlFor="premium"
                    className="font-medium cursor-pointer text-black text-sm sm:text-base"
                  >
                    Premium Package
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Quality materials with good finishes. Best value for money.
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3 border rounded-lg p-3 sm:p-4 bg-gray-100 hover:bg-gray-200 hover:shadow-[0_0_10px_rgba(251,191,36,0.4)] transition-all duration-300">
                <RadioGroupItem value="luxury" id="luxury" className="mt-1" />
                <div className="flex-1">
                  <Label
                    htmlFor="luxury"
                    className="font-medium cursor-pointer text-black text-sm sm:text-base"
                  >
                    Luxury Package
                  </Label>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    Premium materials with luxury finishes. Top-tier quality.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
