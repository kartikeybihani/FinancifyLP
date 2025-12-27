"use client";

import React from "react";

export default function SparkMomentSection() {
  return (
    <section className="py-12 sm:py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-6 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-relaxed">
              <span className="block">Your personal money</span>
              <span className="block mt-1 md:mt-1 bg-gradient-to-r from-[#4A90E2] via-indigo-400 to-blue-400 text-transparent bg-clip-text leading-tight">
                coach. Always on.
              </span>
            </h2>

            <p className="text-base sm:text-xl text-zinc-300 max-w-xl leading-relaxed">
              Get clear, confident money decisions without the guesswork.
            </p>

            {/* Mobile: compact proof row */}
            <div className="sm:hidden grid grid-cols-2 gap-2 max-w-sm">
              <div className="bg-zinc-800/40 backdrop-blur-sm px-3 py-2.5 rounded-lg border border-zinc-700/40">
                <div className="text-base font-bold text-purple-300 mb-0.5">
                  $0/hour
                </div>
                <div className="text-xs text-zinc-400">
                  vs $300/hour coaches
                </div>
              </div>
              <div className="bg-zinc-800/40 backdrop-blur-sm px-3 py-2.5 rounded-lg border border-zinc-700/40">
                <div className="text-base font-bold text-mint-300 mb-0.5">
                  24/7
                </div>
                <div className="text-xs text-zinc-400">Always available</div>
              </div>
            </div>

            {/* Desktop / tablet: full stat grid */}
            <div className="hidden sm:grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-zinc-700/30">
                <div className="text-lg font-bold text-purple-400 mb-1">
                  $0/hour
                </div>
                <div className="text-xs text-zinc-400">
                  vs $300/hour money coaches
                </div>
              </div>

              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-zinc-700/30">
                <div className="text-lg font-bold text-mint-400 mb-1">24/7</div>
                <div className="text-xs text-zinc-400">
                  Always available when you need advice
                </div>
              </div>

              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-zinc-700/30">
                <div className="text-lg font-bold text-indigo-400 mb-1">
                  Personalized
                </div>
                <div className="text-xs text-zinc-400">
                  Advice based on your actual financial situation
                </div>
              </div>

              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-zinc-700/30">
                <div className="text-lg font-bold text-blue-400 mb-1">
                  Gen Z First
                </div>
                <div className="text-xs text-zinc-400">
                  Built for how you actually manage money
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="w-full sm:max-w-md bg-zinc-900/60 border border-zinc-800/50 rounded-xl overflow-hidden relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A90E2]/10 to-blue-500/10 rounded-xl blur opacity-50"></div>

              <div className="p-4 sm:p-6 relative z-10">
                <p className="text-xs text-zinc-400">
                  Before: random money moves.
                </p>
                <p className="text-xs text-zinc-400 mb-2">
                  After: one clear plan and next step.
                </p>
                <h3 className="text-lg font-medium mb-6">
                  Your Complete Financial Plan
                </h3>

                <div className="space-y-4 sm:space-y-6 relative">
                  {/* Timeline line */}
                  <div className="absolute left-[18px] sm:left-[18px] top-1 bottom-1 w-0.5 sm:w-0.5 bg-zinc-600/70 sm:bg-zinc-700/50 -z-10"></div>

                  {/* Timeline items */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Short-term: Emergency Fund */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 relative z-10 bg-zinc-900/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-400 sm:w-4 sm:h-4"
                        >
                          <path d="M19 5V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2"></path>
                          <path d="M1 5h22v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5z"></path>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold text-blue-400">
                            2024
                          </span>
                          <span className="text-sm text-zinc-300 font-medium whitespace-nowrap">
                            Emergency Fund
                          </span>
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            95%
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-1">
                          6 months of expenses saved
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5 sm:h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 sm:h-1.5 rounded-full"
                            style={{ width: "95%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Short-term: Student Loan */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-mint-500/20 border border-mint-500/30 flex items-center justify-center shrink-0 relative z-10 bg-zinc-900/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-mint-400 sm:w-4 sm:h-4"
                        >
                          <rect
                            width="20"
                            height="14"
                            x="2"
                            y="5"
                            rx="2"
                          ></rect>
                          <line x1="2" x2="22" y1="10" y2="10"></line>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold text-mint-400">
                            2025
                          </span>
                          <span className="text-sm text-zinc-300 font-medium whitespace-nowrap">
                            Student Loan Payoff
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-1">
                          Debt freedom milestone
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5 sm:h-1.5">
                          <div
                            className="bg-mint-500 h-1.5 sm:h-1.5 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Mid-term: Investment Portfolio */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 relative z-10 bg-zinc-900/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-400 sm:w-4 sm:h-4"
                        >
                          <path d="M3 3v18h18"></path>
                          <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold text-purple-400">
                            2026
                          </span>
                          <span className="text-sm text-zinc-300 font-medium whitespace-nowrap">
                            Investment Portfolio
                          </span>
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            In progress
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-1">
                          Diversified portfolio for long-term growth
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5 sm:h-1.5">
                          <div
                            className="bg-purple-500 h-1.5 sm:h-1.5 rounded-full"
                            style={{ width: "45%" }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Long-term: Home */}
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div className="w-9 h-9 sm:w-9 sm:h-9 rounded-full bg-mint-500/20 border border-mint-500/30 flex items-center justify-center shrink-0 relative z-10 bg-zinc-900/60">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-mint-400 sm:w-4 sm:h-4"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-sm font-semibold text-mint-400">
                            2028
                          </span>
                          <span className="text-sm text-zinc-300 font-medium whitespace-nowrap">
                            Home Downpayment
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400 mt-1">
                          20% down on your dream home
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5 sm:h-1.5">
                          <div
                            className="bg-mint-500 h-1.5 sm:h-1.5 rounded-full"
                            style={{ width: "25%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile: hint that more is tracked without overwhelming the view */}
                  <p className="mt-3 text-xs text-zinc-500 sm:hidden relative z-10 pl-12">
                    And more goals tracked automatically as your life evolves.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
