"use client";

import { useCalculator } from "@/hooks/use-calculator";
import { StepIndicator } from "@/components/step-indicator";
import { ProjectBasicsStep } from "@/components/steps/project-basics-step";
import { SingleLineItemsStep } from "@/components/steps/single-line-items-step";
import { RoomsItemsStep } from "@/components/steps/rooms-items-step";
import { AddOnsStep } from "@/components/steps/add-ons-step";
import { SummaryStep } from "@/components/steps/summary-step";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const steps = ["Basics", "Single Items", "Rooms & Items", "Add-ons", "Summary"];

export default function InteriorCalculator() {
  const calculator = useCalculator();
  const { state, calculationResult, nextStep, prevStep } = calculator;

  const renderStep = () => {
    switch (state.step) {
      case 1:
        return <ProjectBasicsStep calculator={calculator} />;
      case 2:
        return <SingleLineItemsStep calculator={calculator} />;
      case 3:
        return <RoomsItemsStep calculator={calculator} />;
      case 4:
        return <AddOnsStep calculator={calculator} />;
      case 5:
        return (
          <SummaryStep
            calculator={calculator}
            calculationResult={calculationResult}
          />
        );
      default:
        return <ProjectBasicsStep calculator={calculator} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <header className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-balance mb-2 text-black px-2">
            Interior Design Cost Calculator (India)
          </h1>
          <p className="text-black text-balance text-sm sm:text-base px-2">
            Get instant estimates for your interior design project with detailed
            breakdowns
          </p>
        </header>

        <div className="max-w-6xl mx-auto">
          <div className="mb-6 sm:mb-8">
            <StepIndicator steps={steps} currentStep={state.step} />
          </div>

          <div className="grid grid-cols-1">
            <div>
              <div className="bg-card rounded-lg p-3 sm:p-6 mb-4 sm:mb-6">
                {renderStep()}
              </div>

              <div className="flex justify-between gap-3 px-2">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={state.step === 1}
                  className="flex items-center gap-2 bg-transparent text-black border-gray-300 hover:bg-gray-100 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                  Previous
                </Button>

                <Button
                  onClick={nextStep}
                  disabled={state.step === 5}
                  className="flex items-center gap-2 text-sm sm:text-base px-3 sm:px-4 py-2 sm:py-3"
                >
                  Next
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <footer className="mt-8 sm:mt-16 text-center text-xs sm:text-sm text-black px-2">
          <p>
            * This is an estimate. Final quote will be provided after site
            verification.
          </p>
        </footer>
      </div>
    </div>
  );
}
