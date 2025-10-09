"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export default function SparkMomentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  const [hasAnimated, setHasAnimated] = useState(false);

  // Set up intersection observer to detect when section is in view
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          controls.start("visible");
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, hasAnimated]);

  // Define staggered animation variants for timeline
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-6 items-center">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" },
              },
            }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-relaxed">
              <span className="block">Your personal financial</span>
              <span className="block mt-2 md:mt-1 bg-gradient-to-r from-[#4A90E2] via-indigo-400 to-blue-400 text-transparent bg-clip-text animate-shimmer">
                advisor. Always on.
              </span>
            </h2>

            <p className="text-xl text-zinc-300 max-w-xl leading-relaxed">
              Get personalized financial guidance that actually understands your
              goals.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-3 rounded-lg border border-zinc-700/30">
                <div className="text-lg font-bold text-purple-400 mb-1">
                  $0/hour
                </div>
                <div className="text-xs text-zinc-400">
                  vs $300/hour financial advisors
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="w-full max-w-md bg-zinc-900/60 border border-zinc-800/50 rounded-xl overflow-hidden relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A90E2]/10 to-blue-500/10 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>

              <div className="p-6 relative z-10">
                <h3 className="text-lg font-medium mb-6">
                  Your Complete Financial Plan
                </h3>

                <div className="space-y-6 relative">
                  {/* Timeline line - Animated */}
                  <motion.div
                    initial={{ scaleY: 0, originY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                    className="absolute left-[18px] top-1 bottom-1 w-0.5 bg-zinc-700/50"
                  ></motion.div>

                  {/* Timeline items - Staggered animation */}
                  <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    {/* Short-term: Emergency Fund */}
                    <motion.div
                      variants={item}
                      className="flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center shrink-0 z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-blue-400"
                        >
                          <path d="M19 5V3a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v2"></path>
                          <path d="M1 5h22v16a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V5z"></path>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-blue-400">
                            2023
                          </span>
                          <span className="text-zinc-300 font-medium">
                            Emergency Fund
                          </span>
                          <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                            85% done
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          6 months of expenses saved
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5">
                          <div
                            className="bg-blue-500 h-1.5 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Short-term: Student Loan */}
                    <motion.div
                      variants={item}
                      className="flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-mint-500/20 border border-mint-500/30 flex items-center justify-center shrink-0 z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-mint-400"
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
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-mint-400">
                            2024
                          </span>
                          <span className="text-zinc-300 font-medium">
                            Student Loan Payoff
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Debt freedom milestone
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5">
                          <div
                            className="bg-mint-500 h-1.5 rounded-full"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mid-term: Investment Portfolio */}
                    <motion.div
                      variants={item}
                      className="flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0 z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-purple-400"
                        >
                          <path d="M3 3v18h18"></path>
                          <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-purple-400">
                            2025
                          </span>
                          <span className="text-zinc-300 font-medium">
                            Investment Portfolio
                          </span>
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                            In progress
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Diversified portfolio for long-term growth
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5">
                          <div
                            className="bg-purple-500 h-1.5 rounded-full"
                            style={{ width: "30%" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Long-term: Home */}
                    <motion.div
                      variants={item}
                      className="flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-mint-500/20 border border-mint-500/30 flex items-center justify-center shrink-0 z-10">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-mint-400"
                        >
                          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                          <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-mint-400">
                            2028
                          </span>
                          <span className="text-zinc-300 font-medium">
                            Home Downpayment
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          20% down on your dream home
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5">
                          <div
                            className="bg-mint-500 h-1.5 rounded-full"
                            style={{ width: "15%" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-r from-[#4A90E2]/5 via-transparent to-blue-900/5 transform -skew-y-6 -z-10"></div>
    </section>
  );
}
