"use client";

import type * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer data-[state=checked]:bg-yellow-400 data-[state=unchecked]:bg-gray-300 hover:data-[state=unchecked]:bg-gray-400 hover:shadow-[0_0_8px_rgba(251,191,36,0.6)] focus-visible:border-yellow-400 focus-visible:ring-yellow-400/50 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-gray-400 shadow-xs transition-all duration-300 outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "bg-white data-[state=checked]:bg-black pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
