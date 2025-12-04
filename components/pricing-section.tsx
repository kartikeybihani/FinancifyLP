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
  onJoinWaitlist?: () => void;
}

function PricingSection({
  tiers,
  className,
  onJoinWaitlist,
}: PricingSectionProps) {
  const [selectedFrequency, setSelectedFrequency] = useState("monthly");
  const isYearly = selectedFrequency === "yearly";

  // Show highlighted (Pro) tier first for clearer decision-making
  const sortedTiers = [...tiers].sort((a, b) => {
    const aHighlight = a.highlight ? 1 : 0;
    const bHighlight = b.highlight ? 1 : 0;
    return bHighlight - aHighlight;
  });

  return (
    <section
      id="pricing"
      className={cn(
        "relative py-16 px-4 md:px-6 lg:px-8 overflow-hidden scroll-mt-20",
        className
      )}
    >
      <div className="w-full max-w-5xl mx-auto relative">
        <div className="flex flex-col items-center gap-4 mb-12">
          <h2 className="text-3xl font-bold text-white">Simple Pricing</h2>
          <p className="text-sm text-zinc-400">
            Choose the best plan for your needs. No hidden fees.
          </p>
          <div className="flex w-full max-w-xs rounded-full bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-1">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-stretch">
          {sortedTiers.map((tier) => {
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative group backdrop-blur-sm rounded-2xl transition-all duration-300 flex flex-col h-full",
                  tier.highlight
                    ? "bg-gradient-to-br from-zinc-900/80 via-zinc-900/70 to-blue-950/20 border-2 border-blue-500/30 shadow-xl hover:shadow-[0_0_30px_rgba(59,130,246,0.25)] z-10"
                    : "bg-zinc-900/60 border border-zinc-700/50 shadow-lg hover:shadow-xl",
                  tier.highlight
                    ? "hover:-translate-y-2 transform-gpu"
                    : "hover:-translate-y-1 hover:scale-[1.02] transform-gpu"
                )}
              >
                {/* Animated glow effect for Pro tier */}
                {tier.highlight && (
                  <>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 via-blue-400/15 to-blue-500/10 rounded-2xl blur-lg animate-[glow_3s_ease-in-out_infinite] opacity-50"></div>
                    <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-600/5 via-blue-500/10 to-blue-600/5 rounded-2xl blur-xl animate-[glow_2s_ease-in-out_infinite] opacity-30"></div>
                  </>
                )}
                {tier.badge && tier.highlight && (
                  <div className="absolute -top-3 left-6">
                    <Badge className="px-3 py-1 text-xs font-medium bg-blue-500/15 text-blue-300/90 border border-blue-400/20 backdrop-blur-sm">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                {/* Yearly discount badge for Pro tier */}
                {tier.highlight && isYearly && (
                  <div className="absolute -top-3 right-6">
                    <Badge className="px-3 py-1 text-xs font-bold bg-yellow-400/15 text-yellow-300/90 border border-yellow-400/20 backdrop-blur-sm animate-[glow_2s_ease-in-out_infinite]">
                      Save 22%
                    </Badge>
                  </div>
                )}

                <div className="p-4 sm:p-6 flex-1 relative z-10 flex flex-col">
                  <div className="flex items-center gap-4 mb-4 sm:mb-6">
                    <div
                      className={cn(
                        "p-1.5 sm:p-2 rounded-lg transition-all duration-300",
                        tier.highlight
                          ? "group-hover:scale-110 group-hover:rotate-3"
                          : "group-hover:scale-110"
                      )}
                    >
                      {tier.icon}
                    </div>
                    <h3
                      className={cn(
                        "text-2xl font-semibold",
                        tier.highlight
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400/90 via-blue-500/90 to-blue-600/90"
                          : "text-white"
                      )}
                    >
                      {tier.name}
                    </h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span
                        className={cn(
                          "text-4xl font-bold",
                          tier.highlight
                            ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400/90 to-blue-600/90"
                            : "text-white"
                        )}
                      >
                        $
                        {tier.price.monthly === 0
                          ? "0"
                          : isYearly
                          ? tier.price.yearly
                          : tier.price.monthly}
                      </span>
                      <span className="text-sm text-zinc-400">
                        /{isYearly ? "year" : "month"}
                      </span>
                    </div>
                    <p className="mt-3 text-sm text-zinc-300">
                      {tier.description}
                    </p>
                    {tier.highlight && (
                      <p className="mt-2 text-xs text-zinc-400">
                        Everything in Free, plus unlimited goals, deeper
                        insights, and real investment tracking.
                      </p>
                    )}
                  </div>

                  <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                    {tier.features.map((feature) => (
                      <div key={feature.name} className="flex gap-3">
                        <div
                          className={cn(
                            "mt-1 p-0.5 rounded-full transition-colors duration-200 shrink-0",
                            feature.included ? "text-blue-400" : "text-zinc-600"
                          )}
                        >
                          <CheckIcon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-white">
                            {feature.name}
                          </div>
                          <div className="text-sm text-zinc-400">
                            {feature.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button
                      onClick={onJoinWaitlist}
                      className={cn(
                        "w-full relative transition-all duration-300",
                        tier.highlight
                          ? "bg-gradient-to-r from-blue-500/90 to-blue-600/90 hover:from-blue-400/90 hover:to-blue-500/90 text-white shadow-lg hover:shadow-blue-500/30 hover:scale-105 font-semibold text-base py-6"
                          : "bg-zinc-800/50 hover:bg-zinc-800/70 text-white border border-zinc-700/50 hover:border-blue-500/50 backdrop-blur-sm"
                      )}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Get Started
                        <ArrowRightIcon className="w-4 h-4" />
                      </span>
                    </Button>
                    {tier.highlight && (
                      <p className="mt-2 text-[11px] text-zinc-400 text-center">
                        No card required today. Change or cancel anytime.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { PricingSection };
