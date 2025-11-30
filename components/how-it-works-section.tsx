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
      title: "Connect Your Accounts",
      description:
        "Securely link your bank accounts and investment accounts. We use bank-level encryption to keep your data safe.",
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
      title: "Tell Finny Your Goals",
      description:
        "Share your financial goals and priorities. Want to buy a home? Pay off debt? Build wealth? Finny understands your unique situation.",
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
      title: "Get Personalized Guidance",
      description:
        "Finny analyzes your data, calculates optimal strategies, and nudges you with personalized advice. No generic ChatGPT responses—just real financial guidance.",
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
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Your journey to financial freedom
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-sm sm:text-base lg:text-lg px-4">
            Three simple steps to get your personal financial advisor
          </p>
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

          {/* Mobile layout */}
          <div className="md:hidden space-y-6">
            {journeySteps.map((step, index) => (
              <div key={index} className="relative">
                <motion.div
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
                  <div className="relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-4 group-hover:border-zinc-700/50 transition-all duration-300">
                    {/* Gradient background */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${step.gradient} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    ></div>

                    <div className="relative z-10 text-center">
                      {/* Icon */}
                      <div className="w-12 h-12 rounded-xl bg-zinc-800/50 flex items-center justify-center mx-auto mb-4 group-hover:bg-zinc-800/70 transition-colors duration-300">
                        {step.icon}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white mb-3">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Mobile arrow - only between steps, not after the last one */}
                {index < journeySteps.length - 1 && (
                  <motion.div
                    initial={isMobile ? false : { opacity: 0 }}
                    animate={isMobile ? { opacity: 1 } : {}}
                    whileInView={isMobile ? {} : { opacity: 1 }}
                    viewport={{ once: true }}
                    transition={
                      isMobile
                        ? { duration: 0 }
                        : { duration: 0.6, delay: index * 0.2 + 0.3 }
                    }
                    className="flex justify-center py-2"
                  >
                    <div className="w-8 h-8 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-500"
                      >
                        <path d="M12 5v14"></path>
                        <path d="m19 12-7 7-7-7"></path>
                      </svg>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
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
              Finny handles all the calculations, tracking, and personalized
              nudges. No more expensive advisors. No more generic advice.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-[#4A90E2] font-medium">
              <span>Get started in under 5 minutes</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
