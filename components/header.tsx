"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 backdrop-blur-sm border-b border-zinc-800/10">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-3 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Link href="/">
              <motion.div
                className="relative w-10 h-10 md:w-12 md:h-12"
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
                className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text transition-all duration-300 ease-out ${
                  isHovered
                    ? "bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-500"
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

          <div className="flex items-center gap-6">
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

            <div className="flex items-center">
              <Link
                href="#top"
                className="hidden md:inline-flex text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-lg transition-colors"
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
