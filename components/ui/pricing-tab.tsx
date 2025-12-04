"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface TabProps {
  text: string;
  selected: boolean;
  setSelected: (text: string) => void;
  discount?: boolean;
}

export function Tab({
  text,
  selected,
  setSelected,
  discount = false,
}: TabProps) {
  return (
    <button
      onClick={() => setSelected(text)}
      className={cn(
        "relative flex-1 px-4 py-2 text-xs sm:text-sm font-semibold capitalize",
        "text-foreground transition-colors flex items-center justify-center gap-1.5",
        discount && "gap-2.5"
      )}
    >
      <span className="relative z-10">{text}</span>
      {selected && (
        <motion.span
          layoutId="tab"
          transition={{ type: "spring", duration: 0.4 }}
          className="absolute inset-0 z-0 rounded-full bg-background shadow-sm"
        />
      )}
      {discount && (
        <Badge
          variant="secondary"
          className={cn(
            "relative z-10 whitespace-nowrap shadow-none border-2 border-yellow-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]",
            selected && "bg-muted"
          )}
        >
          Save 22%
        </Badge>
      )}
    </button>
  );
}
