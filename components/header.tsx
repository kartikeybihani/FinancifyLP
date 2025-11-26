"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onContactClick?: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "mt-2 sm:mt-4 mx-4 sm:mx-auto max-w-[calc(100%-2rem)] sm:max-w-4xl bg-white/3 backdrop-blur-xl rounded-3xl sm:rounded-[2rem] shadow-sm border border-white/10 py-2 sm:py-3 px-4 sm:px-0"
          : "max-w-7xl mx-auto py-2 sm:py-4 px-4 sm:px-6"
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center cursor-pointer ${
              isScrolled ? "gap-2.5 sm:gap-4" : "gap-1.5 sm:gap-2"
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="/">
              <motion.div
                className={`relative ${
                  isScrolled
                    ? "w-6 h-6 sm:w-8 sm:h-8"
                    : "w-8 h-8 sm:w-10 sm:h-10"
                }`}
                animate={{
                  rotate: isHovered ? 180 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  duration: 0.5,
                }}
              >
                <Image
                  src="/main1.png"
                  alt="Financify Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </motion.div>
            </Link>
            <Link href="/">
              <motion.div
                className={`font-bold text-transparent bg-clip-text transition-all duration-300 ease-out ${
                  isHovered
                    ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
                    : "bg-gradient-to-r from-white to-zinc-300"
                } ${isScrolled ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"}`}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                Financify
              </motion.div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-zinc-300 p-1.5 rounded-md bg-zinc-800/30 border border-zinc-700/30 hover:bg-zinc-800/50 transition-colors"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="6" x2="20" y2="6"></line>
                <line x1="4" y1="18" x2="20" y2="18"></line>
              </svg>
            )}
          </button>

          {/* Mobile menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden absolute top-full left-0 right-0 mt-2 mx-2 bg-zinc-900/90 backdrop-blur-lg rounded-xl border border-zinc-800/50 shadow-lg overflow-hidden"
              >
                <nav className="flex flex-col py-4 gap-3 px-2">
                  <Link
                    href="#how-it-works"
                    className="text-zinc-300 transition-all duration-300 px-3 py-2.5 rounded-lg hover:bg-zinc-800/50 hover:text-blue-400 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    How it Works
                  </Link>
                  <Link
                    href="#chat-section"
                    className="text-zinc-300 transition-all duration-300 px-3 py-2.5 rounded-lg hover:bg-zinc-800/50 hover:text-blue-400 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Financial Copilot
                  </Link>
                  <Link
                    href="#pricing"
                    className="text-zinc-300 transition-all duration-300 px-3 py-2.5 rounded-lg hover:bg-zinc-800/50 hover:text-blue-400 active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Pricing
                  </Link>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onContactClick?.();
                    }}
                    className="text-zinc-300 transition-all duration-300 px-3 py-2.5 rounded-lg hover:bg-zinc-800/50 hover:text-blue-400 active:scale-95 text-left w-full"
                  >
                    Contact
                  </button>
                  <Link
                    href="#top"
                    className="text-sm font-medium text-white bg-[#4A90E2] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 py-2.5 px-4 rounded-lg transition-all duration-300 text-center mt-2 hover:shadow-[0_0_15px_rgba(74,144,226,0.5)] active:scale-95"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Join Waitlist
                  </Link>
                </nav>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Desktop navigation */}
          <nav
            className={`hidden md:flex items-center gap-8 lg:gap-16 ${
              isScrolled ? "mr-0" : "mr-6"
            }`}
          >
            <Link
              href="#how-it-works"
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? "text-[11px] lg:text-[13px] py-1 px-2 opacity-85 hover:opacity-100"
                  : "text-base py-1 px-2"
              } bg-gradient-to-r from-zinc-300 to-zinc-300 bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] hover:text-blue-400`}
            >
              How it Works
            </Link>
            <Link
              href="#chat-section"
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? "text-[11px] lg:text-[13px] py-1 px-2 opacity-85 hover:opacity-100"
                  : "text-base py-1 px-2"
              } bg-gradient-to-r from-zinc-300 to-zinc-300 bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] hover:text-blue-400`}
            >
              Financial Copilot
            </Link>
            <Link
              href="#pricing"
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? "text-[11px] lg:text-[13px] py-1 px-2 opacity-85 hover:opacity-100"
                  : "text-base py-1 px-2"
              } bg-gradient-to-r from-zinc-300 to-zinc-300 bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] hover:text-blue-400`}
            >
              Pricing
            </Link>
            <button
              onClick={() => onContactClick?.()}
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? "text-[11px] lg:text-[13px] py-1 px-2 opacity-85 hover:opacity-100"
                  : "text-base py-1 px-2"
              } bg-gradient-to-r from-zinc-300 to-zinc-300 bg-[length:0%_2px] bg-no-repeat bg-bottom hover:bg-[length:100%_2px] hover:text-blue-400`}
            >
              Contact
            </button>
          </nav>

          <div
            className={`hidden md:flex items-center ${
              isScrolled ? "pr-0" : ""
            }`}
          >
            <Link
              href="#top"
              className={`inline-flex font-medium text-white bg-[#4A90E2] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(74,144,226,0.5)] rounded-[25px] ${
                isScrolled ? "text-sm py-2 px-4 pr-4" : "text-base py-2.5 px-5"
              }`}
            >
              Join Waitlist
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
