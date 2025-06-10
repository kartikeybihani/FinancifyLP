"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 px-4 sm:px-6 backdrop-blur-sm border-b border-zinc-800/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="/">
              <motion.div
                className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
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
                className={`text-lg sm:text-xl md:text-2xl font-bold text-transparent bg-clip-text transition-all duration-300 ease-out ${
                  isHovered
                    ? "bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600"
                    : "bg-gradient-to-r from-white to-zinc-300"
                }`}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              >
                Financify
              </motion.div>
            </Link>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="#features"
                className="text-zinc-300 hover:text-white transition-colors text-sm"
              >
                Features
              </Link>
              <Link
                href="#chat-section"
                className="text-zinc-300 hover:text-white transition-colors text-sm"
              >
                AI Chat
              </Link>
            </nav>

            <div className="hidden md:flex items-center">
              <Link
                href="#top"
                className="inline-flex text-sm font-medium text-white bg-[#4A90E2] hover:bg-[#3A7BC9] py-2 px-4 rounded-lg transition-colors"
              >
                Join Waitlist
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden text-zinc-300 p-1.5 rounded-md bg-zinc-800/30 border border-zinc-700/30"
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
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden"
            >
              <nav className="flex flex-col py-4 gap-4 border-t border-zinc-800/30 mt-3">
                <Link
                  href="#features"
                  className="text-zinc-300 hover:text-white transition-colors px-1 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#chat-section"
                  className="text-zinc-300 hover:text-white transition-colors px-1 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  AI Chat
                </Link>
                <Link
                  href="#top"
                  className="text-sm font-medium text-white bg-[#4A90E2] hover:bg-[#3A7BC9] py-2 px-4 rounded-lg transition-colors w-full text-center mt-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join Waitlist
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
