"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons";
import { Tab } from "@/components/ui/pricing-tab";
import { cn } from "@/lib/utils";

interface Feature {
  name: string;
  description: string;
  included: boolean;
}

interface PricingTier {
  name: string;
  price: {
    monthly: number;
    yearly: number;
  };
  description: string;
  features: Feature[];
  highlight?: boolean;
  badge?: string;
  icon: React.ReactNode;
}

interface PricingSectionProps {
  tiers: PricingTier[];
  className?: string;
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = useState("monthly");
  const isYearly = selectedFrequency === "yearly";

  const buttonStyles = {
    default: cn(
      "h-10 bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-700",
      "hover:from-zinc-100 hover:to-zinc-200 dark:hover:from-zinc-700 dark:hover:to-zinc-600",
      "text-zinc-900 dark:text-zinc-100",
      "border border-zinc-200/80 dark:border-zinc-700/80",
      "hover:border-zinc-300 dark:hover:border-zinc-600",
      "shadow-sm hover:shadow-lg hover:-translate-y-0.5",
      "text-sm font-medium transition-all duration-300 transform-gpu"
    ),
    highlight: cn(
      "h-10 bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200",
      "hover:from-zinc-800 hover:to-zinc-700 dark:hover:from-zinc-200 dark:hover:to-zinc-300",
      "text-white dark:text-zinc-900",
      "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
      "hover:shadow-[0_6px_25px_rgba(0,0,0,0.2)] hover:-translate-y-0.5",
      "font-semibold text-base transition-all duration-300 transform-gpu"
    ),
  };

  const badgeStyles = cn(
    "px-4 py-1.5 text-sm font-medium",
    "bg-zinc-900 dark:bg-zinc-100",
    "text-white dark:text-zinc-900",
    "border-none shadow-lg"
  );

  return (
    <section
      id="pricing"
      className={cn(
        "relative bg-background text-foreground",
        "py-8 px-4 md:py-16 lg:py-20",
        "overflow-hidden",
        "scroll-mt-20",
        className
      )}
    >
      <div className="w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 mb-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Simple Pricing
          </h2>
          <p className="text-sm text-muted-foreground">
            Choose the best plan for your needs. No hidden fees.
          </p>
          <div className="flex w-fit rounded-full bg-muted p-1">
            {["monthly", "yearly"].map((frequency) => (
              <Tab
                key={frequency}
                text={frequency}
                selected={selectedFrequency === frequency}
                setSelected={setSelectedFrequency}
                discount={frequency === "yearly"}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={cn(
                "relative group backdrop-blur-sm",
                "rounded-2xl transition-all duration-300",
                "flex flex-col",
                tier.highlight
                  ? "bg-gradient-to-br from-zinc-100/90 via-zinc-50/80 to-transparent dark:from-zinc-400/[0.2] dark:via-zinc-300/[0.1]"
                  : "bg-white/90 dark:bg-zinc-800/60",
                "border",
                tier.highlight
                  ? "border-zinc-300/50 dark:border-zinc-400/30 shadow-xl hover:shadow-2xl"
                  : "border-zinc-200/80 dark:border-zinc-700/80 shadow-lg hover:shadow-xl",
                "hover:-translate-y-1 hover:scale-[1.02]",
                "transform-gpu"
              )}
            >
              {tier.badge && tier.highlight && (
                <div className="absolute -top-4 left-6">
                  <Badge className={badgeStyles}>{tier.badge}</Badge>
                </div>
              )}

              {/* Yearly discount badge for Pro tier */}
              {tier.highlight && isYearly && (
                <div className="absolute -top-4 right-6">
                  <Badge className="px-4 py-1.5 text-sm font-bold bg-yellow-400 text-yellow-900 border-none shadow-lg animate-[glow_2s_ease-in-out_infinite]">
                    Save 22%
                  </Badge>
                </div>
              )}

              <div className="p-4 flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={cn(
                      "p-2 rounded-lg transition-all duration-300 group-hover:scale-110",
                      tier.highlight
                        ? "bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm"
                        : "bg-gradient-to-br from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-700 text-zinc-600 dark:text-zinc-400 shadow-sm"
                    )}
                  >
                    {tier.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {tier.name}
                  </h3>
                </div>

                <div className="mb-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                      {tier.price.monthly === 0
                        ? "Free"
                        : `$${
                            isYearly ? tier.price.yearly : tier.price.monthly
                          }`}
                    </span>
                    {tier.price.monthly > 0 && (
                      <span className="text-sm text-zinc-500 dark:text-zinc-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {tier.description}
                  </p>
                </div>

                <div className="space-y-2">
                  {tier.features.map((feature) => (
                    <div key={feature.name} className="flex gap-4">
                      <div
                        className={cn(
                          "mt-1 p-0.5 rounded-full transition-colors duration-200",
                          feature.included
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-zinc-400 dark:text-zinc-600"
                        )}
                      >
                        <CheckIcon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                          {feature.name}
                        </div>
                        <div className="text-sm text-zinc-500 dark:text-zinc-400">
                          {feature.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 pt-0 mt-auto">
                <Button
                  className={cn(
                    "w-full relative transition-all duration-300",
                    tier.highlight
                      ? buttonStyles.highlight
                      : buttonStyles.default
                  )}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {tier.price.monthly === 0 ? (
                      <>
                        Get started free
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    ) : tier.highlight ? (
                      <>
                        Buy now
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Get started
                        <ArrowRightIcon className="w-4 h-4" />
                      </>
                    )}
                  </span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { PricingSection };
