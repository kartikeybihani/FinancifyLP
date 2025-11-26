"use client";

import {
  Sparkles,
  Zap,
  ArrowDownToDot,
  TrendingUp,
  Shield,
  Users,
  BarChart3,
  CreditCard,
  Target,
  PiggyBank,
} from "lucide-react";
import { PricingSection } from "@/components/pricing-section";

const financifyTiers = [
  {
    name: "Free",
    price: {
      monthly: 0,
      yearly: 0,
    },
    description: "Perfect for getting started with financial planning",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/30 to-blue-500/30 blur-2xl rounded-full" />
        <Sparkles className="w-7 h-7 relative z-10 text-green-500 dark:text-green-400 animate-[float_3s_ease-in-out_infinite]" />
      </div>
    ),
    features: [
      {
        name: "Basic Budget Tracking",
        description: "Track income, expenses, and investments",
        included: true,
      },
      {
        name: "1 Financial Goal",
        description: "Set and track your financial objective",
        included: true,
      },
      {
        name: "Basic Analytics",
        description: "Simple spending insights and reports",
        included: true,
      },
      {
        name: "AI Financial Assistant",
        description: "Limited AI-powered financial advice",
        included: true,
      },
      {
        name: "Community Support",
        description: "Access to community forums and basic help",
        included: true,
      },
      // {
      //   name: "Investment Tracking",
      //   description: "Track basic investment portfolios",
      //   included: false,
      // },
      // {
      //   name: "Advanced Analytics",
      //   description: "Deep insights and predictive analysis",
      //   included: false,
      // },
      // {
      //   name: "Priority Support",
      //   description: "24/7 priority email and chat support",
      //   included: false,
      // },
    ],
  },
  {
    name: "Pro",
    price: {
      monthly: 9.99,
      yearly: 99,
    },
    description: "Ideal for serious financial planning and wealth building",
    highlight: true,
    badge: "Most Popular",
    icon: (
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/30 to-blue-500/30 blur-2xl rounded-full" />
        <TrendingUp className="w-7 h-7 relative z-10 text-emerald-500 dark:text-emerald-400" />
      </div>
    ),
    features: [
      {
        name: "Advanced Budget Tracking",
        description: "Comprehensive expense categorization and analysis",
        included: true,
      },
      {
        name: "Unlimited Financial Goals",
        description: "Set unlimited goals with detailed tracking",
        included: true,
      },
      {
        name: "Advanced Analytics",
        description: "Deep insights, trends, and predictive analysis",
        included: true,
      },
      {
        name: "Unlimited AI Assistant",
        description: "Unlimited AI-powered financial advice and insights",
        included: true,
      },
      {
        name: "Investment Tracking",
        description: "Track stocks, crypto, real estate, and more",
        included: true,
      },
      {
        name: "Portfolio Analysis",
        description: "Advanced investment portfolio insights",
        included: true,
      },
      {
        name: "Tax Optimization (Coming Soon)",
        description: "AI-powered tax-saving recommendations",
        included: true,
      },
    ],
  },
];

interface PricingDemoProps {
  onJoinWaitlist?: () => void;
}

function PricingDemo({ onJoinWaitlist }: PricingDemoProps) {
  return <PricingSection tiers={financifyTiers} onJoinWaitlist={onJoinWaitlist} />;
}

export { PricingDemo };
