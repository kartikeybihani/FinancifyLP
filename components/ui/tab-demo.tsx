"use client";

import * as React from "react";
import { Tab } from "@/components/ui/pricing-tab";

const FREQUENCIES = ["monthly", "yearly"];

export function TabDemo() {
  const [selected, setSelected] = React.useState(FREQUENCIES[0]);

  return (
    <div className="flex flex-col items-center gap-8 p-6">
      <div className="space-y-2 text-center">
        <h3 className="text-2xl font-bold">Simple Pricing</h3>
        <p className="text-muted-foreground">
          Choose the best plan for your needs
        </p>
      </div>
      <div className="flex w-fit rounded-full bg-muted p-1">
        {FREQUENCIES.map((frequency) => (
          <Tab
            key={frequency}
            text={frequency}
            selected={selected === frequency}
            setSelected={setSelected}
            discount={frequency === "yearly"}
          />
        ))}
      </div>
    </div>
  );
}
