"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection with debounced resize handler
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        checkMobile();
      }, 150);
    };

    checkMobile();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);
  const journeySteps = [
    {
      title: "Link your accounts",
      description: "Connect safely in seconds. \nBank-level encryption.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-blue-400"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
        </svg>
      ),
      gradient: "from-blue-500/20 to-indigo-500/20",
      borderGradient: "from-blue-500/30 to-indigo-500/30",
    },
    {
      title: "Share your goals",
      description:
        "Buying a home? Paying off debt? Building wealth? We'll help you get there.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-purple-400"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          <path d="M13 8h2"></path>
          <path d="M13 12h2"></path>
          <path d="M13 16h2"></path>
        </svg>
      ),
      gradient: "from-purple-500/20 to-pink-500/20",
      borderGradient: "from-purple-500/30 to-pink-500/30",
    },
    {
      title: "Get personalized advice",
      description:
        "Real advice tailored to you. No generic tips, just results.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-mint-400"
        >
          <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
          <path d="M2 17l10 5 10-5"></path>
          <path d="M2 12l10 5 10-5"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      gradient: "from-mint-500/20 to-emerald-500/20",
      borderGradient: "from-mint-500/30 to-emerald-500/30",
    },
  ];

  return (
    <section
      className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8 relative"
      id="how-it-works"
    >
      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={isMobile ? { opacity: 1, y: 0 } : {}}
          whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Your journey to Growth
          </h2>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/70 px-3 py-1 text-xs sm:text-sm text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4A90E2] animate-pulse" />
              <span>3 simple steps to Get Started</span>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          {/* Journey path line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent transform -translate-y-1/2 z-0"></div>

          {/* Desktop layout */}
          <div className="hidden md:grid grid-cols-3 gap-8 lg:gap-12 relative z-10">
            {journeySteps.map((step, index) => (
              <motion.div
                key={index}
                initial={isMobile ? false : { opacity: 0, y: 30 }}
                animate={isMobile ? { opacity: 1, y: 0 } : {}}
                whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={
                  isMobile
                    ? { duration: 0 }
                    : { duration: 0.6, delay: index * 0.2 }
                }
                className="relative group"
              >
                {/* Desktop arrow */}
                {index < journeySteps.length - 1 && (
                  <div className="absolute top-1/2 left-full w-full h-0.5 transform -translate-y-1/2 z-0">
                    <div className="relative w-full h-full">
                      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-zinc-700/50 to-transparent"></div>
                      <div className="absolute top-1/2 right-0 w-0 h-0 border-l-[8px] border-l-zinc-700/50 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent transform -translate-y-1/2"></div>
                    </div>
                  </div>
                )}

                <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 lg:p-8 h-full group-hover:border-zinc-700/50 transition-all duration-300">
                  {/* Gradient background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  ></div>

                  <div className="relative z-10 text-center">
                    {/* Icon */}
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-6 group-hover:bg-zinc-800/70 transition-colors duration-300">
                      {step.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg lg:text-xl font-semibold text-white mb-4">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-zinc-400 text-base lg:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mobile layout – compact 3-step timeline card */}
          <div className="md:hidden">
            <motion.div
              initial={isMobile ? false : { opacity: 0, y: 30 }}
              animate={isMobile ? { opacity: 1, y: 0 } : {}}
              whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={isMobile ? { duration: 0 } : { duration: 0.6 }}
              className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-4"
            >
              {/* Subtle gradient wash using first/last step colors */}
              <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/10 via-zinc-900/0 to-emerald-500/10" />

              <div className="relative z-10">
                {/* Timeline steps */}
                <div className="space-y-3">
                  {journeySteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      {/* Numbered bullet */}
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-800 text-[11px] font-semibold text-zinc-200 border border-zinc-700">
                          {index + 1}
                        </div>
                      </div>

                      {/* Text content */}
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-white">
                          {step.title}
                        </h3>
                        <p className="mt-0.5 text-[12px] leading-snug text-zinc-400">
                          {index === 0 &&
                            "Securely link your accounts in seconds."}
                          {index === 1 &&
                            "Tell Finny your goals: home, debt, wealth and more."}
                          {index === 2 &&
                            "Get clear, personalized next steps you can act on today."}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 20 }}
          animate={isMobile ? { opacity: 1, y: 0 } : {}}
          whileInView={isMobile ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={
            isMobile ? { duration: 0 } : { duration: 0.6, delay: 0.6 }
          }
          className="text-center mt-12 sm:mt-16"
        >
          <div className="bg-zinc-900/40 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-5 sm:p-6 lg:p-8 max-w-2xl mx-auto">
            <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white mb-3 sm:mb-4">
              That's it. You're done.
            </h3>
            <p className="text-zinc-400 text-sm sm:text-base lg:text-base mb-4 sm:mb-5">
              Finny handles everything. No expensive advisors. No generic
              advice. Just you and your goals.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#4A90E2] font-medium">
              <span>Get started in under 1 minute</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
