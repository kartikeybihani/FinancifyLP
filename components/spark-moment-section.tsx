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
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              <span className="block">Goal planning,</span>
              <span className="block mt-2 md:mt-1 bg-gradient-to-r from-purple-400 via-indigo-400 to-mint-400 text-transparent bg-clip-text">
                for you — by you.
              </span>
            </h2>

            <p className="text-xl text-zinc-300 max-w-xl leading-relaxed">
              Set a goal once. Let Finny track it with you.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-zinc-700/30">
                <div className="text-xl sm:text-2xl font-bold text-purple-400">
                  93%
                </div>
                <div className="text-xs sm:text-sm text-zinc-400">
                  of users achieve their first financial goal
                </div>
              </div>

              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-zinc-700/30">
                <div className="text-xl sm:text-2xl font-bold text-mint-400">
                  2.5x
                </div>
                <div className="text-xs sm:text-sm text-zinc-400">
                  faster savings rate than traditional methods
                </div>
              </div>

              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-zinc-700/30">
                <div className="text-xl sm:text-2xl font-bold text-indigo-400">
                  80%
                </div>
                <div className="text-xs sm:text-sm text-zinc-400">
                  less stress about money management
                </div>
              </div>

              <div className="bg-zinc-800/30 backdrop-blur-sm px-4 py-2.5 rounded-lg border border-zinc-700/30">
                <div className="text-xl sm:text-2xl font-bold text-blue-400">
                  5+
                </div>
                <div className="text-xs sm:text-sm text-zinc-400">
                  financial goals achieved on average
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/10 to-mint-500/10 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000"></div>

              <div className="p-6 relative z-10">
                <h3 className="text-lg font-medium mb-6">
                  Your Financial Journey
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
                          3 months of expenses saved
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
                            style={{ width: "40%" }}
                          ></div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Mid-term: Trip */}
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
                          <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-purple-400">
                            2025
                          </span>
                          <span className="text-zinc-300 font-medium">
                            Europe Trip
                          </span>
                          <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full">
                            In progress
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          First major travel experience
                        </p>
                      </div>
                    </motion.div>

                    {/* Mid-term: Car */}
                    <motion.div
                      variants={item}
                      className="flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 z-10">
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
                          className="text-indigo-400"
                        >
                          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2"></path>
                          <circle cx="7" cy="17" r="2"></circle>
                          <path d="M9 17h6"></path>
                          <circle cx="17" cy="17" r="2"></circle>
                        </svg>
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-400">
                            2026
                          </span>
                          <span className="text-zinc-300 font-medium">
                            First Car
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          $15K saved for reliable transportation
                        </p>
                        {/* Progress bar */}
                        <div className="mt-2 w-full bg-zinc-700/30 rounded-full h-1.5">
                          <div
                            className="bg-indigo-500 h-1.5 rounded-full"
                            style={{ width: "25%" }}
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
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-mint-400">
                            2030
                          </span>
                          <span className="text-zinc-300 font-medium">
                            Home Downpayment
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          20% down on your dream home
                        </p>
                      </div>
                    </motion.div>

                    {/* Long-term: Retirement */}
                    <motion.div
                      variants={item}
                      className="flex items-start gap-4"
                    >
                      <div className="w-9 h-9 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0 z-10">
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
                          className="text-indigo-400"
                        >
                          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"></path>
                        </svg>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-indigo-400">
                            2038
                          </span>
                          <span className="text-zinc-300 font-medium">
                            FIRE Goal
                          </span>
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">
                          Financial independence achieved
                        </p>
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
      <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-r from-purple-900/5 via-transparent to-mint-900/5 transform -skew-y-6 -z-10"></div>
    </section>
  );
}
