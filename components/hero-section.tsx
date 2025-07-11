"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function HeroSection() {
  const [email, setEmail] = useState("");
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isMessageChanging, setIsMessageChanging] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [showControls, setShowControls] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const finnyMessages = [
    "You're 75% of the way to your Hawaii trip goal. Keep it up!",
    "Your portfolio is up 12% this year, would you like to rebalance?",
    "Want to auto-invest $50 next Friday when your paycheck hits?",
    "I noticed your subscriptions total $87/month. Let's review them?",
  ];

  // Define categories for each message
  const messageCategories = ["Goals", "Investing", "Insights", "Spending"];

  // Define icons for each category
  const categoryIcons = [
    <svg
      key="goals"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM11 7H13V13H17V15H11V7Z"
        fill="currentColor"
      />
    </svg>,
    <svg
      key="investing"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 11.78L20.24 4.45L21.97 5.45L16.74 14.5L10.23 10.75L5.46 19H22V21H2V3H4V17.54L9.5 8L16 11.78Z"
        fill="currentColor"
      />
    </svg>,
    <svg
      key="insights"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3C17.5 3 22 6.58 22 11C22 15.42 17.5 19 12 19C10.76 19 9.57 18.82 8.47 18.5C5.55 21 2 21 2 21C4.33 18.67 4.7 17.1 4.75 16.5C3.05 15.07 2 13.13 2 11C2 6.58 6.5 3 12 3ZM11 13H13V17H11V13ZM11 7H13V11H11V7Z"
        fill="currentColor"
      />
    </svg>,
    <svg
      key="spending"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4ZM12 11H15V13H12V16H10V13H7V11H10V8H12V11Z"
        fill="currentColor"
      />
    </svg>,
  ];

  // Get the current time for message timestamps
  const getTimeString = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Times for each message to create a realistic chat experience
  const messageTimes = ["9:43 AM", "9:45 AM", "9:48 AM", "9:52 AM"];

  // Generate response time in seconds (random between 1-3 seconds)
  const getResponseTime = () => {
    return Math.floor(Math.random() * 3) + 1;
  };

  // Handle email form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    // Improved email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      console.log("Invalid email");
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    console.log("Email submitted:", email);

    try {
      // Create form data for Google Apps Script
      const formData = new URLSearchParams();
      formData.append("email", email);

      // Submit to Google Apps Script - simple POST to avoid preflight
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyEs7w326Cp6vNhgK6C835GgKaJ1PsUV8tm0rz74okNnwGEmDAAMihjJ5qtpeHU1q6z/exec",
        {
          method: "POST",
          body: formData, // Let browser set Content-Type automatically
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.text();
      console.log("Google Apps Script response:", result);

      // Show success notification
      setNotificationMessage(
        "🎉 You're on the waitlist! We'll be in touch soon."
      );
      setShowNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      toast({
        title: "You're on the list!",
        description: "We'll notify you when early access is available.",
        duration: 7000,
      });

      // Store in localStorage as a fallback
      try {
        const storedEmails = JSON.parse(
          localStorage.getItem("waitlistEmails") || "[]"
        );
        storedEmails.push({
          email,
          timestamp: new Date().toISOString(),
          source: "hero",
        });
        localStorage.setItem("waitlistEmails", JSON.stringify(storedEmails));
        console.log("Email stored in localStorage");
      } catch (err) {
        console.error("Error storing email in localStorage:", err);
      }

      setEmail("");
    } catch (error) {
      console.error("Error submitting to Google Apps Script:", error);

      // Show error notification
      setNotificationMessage("❌ Something went wrong. Please try again.");
      setShowNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      toast({
        title: "Submission failed",
        description: "Please try again or contact support.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  // Type animation effect for messages
  useEffect(() => {
    if (!isMessageChanging && !isTyping) return;

    if (isTyping) {
      const currentMessage = finnyMessages[currentMessageIndex];

      if (displayedText.length < currentMessage.length) {
        const timer = setTimeout(() => {
          setDisplayedText(
            currentMessage.substring(0, displayedText.length + 1)
          );
        }, 30); // Speed of typing

        return () => clearTimeout(timer);
      } else {
        setIsTyping(false);
      }
    }
  }, [isTyping, displayedText, currentMessageIndex, finnyMessages]);

  // Handle manual navigation
  const handleNavigate = (direction: "prev" | "next") => {
    setIsMessageChanging(true);

    // Wait for fade-out animation to complete
    setTimeout(() => {
      if (direction === "prev") {
        setCurrentMessageIndex((prev) =>
          prev === 0 ? finnyMessages.length - 1 : prev - 1
        );
      } else {
        setCurrentMessageIndex((prev) => (prev + 1) % finnyMessages.length);
      }
      setDisplayedText("");
      setIsMessageChanging(false);
      setIsTyping(true);
    }, 500);
  };

  // Rotate through Finny messages
  useEffect(() => {
    const rotateMessages = setInterval(() => {
      setIsMessageChanging(true);

      // Wait for fade-out animation to complete
      setTimeout(() => {
        const nextIndex = (currentMessageIndex + 1) % finnyMessages.length;
        setCurrentMessageIndex(nextIndex);
        setDisplayedText("");
        setIsMessageChanging(false);
        setIsTyping(true);
      }, 500); // Half duration of the transition
    }, 5000);

    return () => clearInterval(rotateMessages);
  }, [currentMessageIndex, finnyMessages.length]);

  // Start initial typing on component mount
  useEffect(() => {
    setIsTyping(true);
  }, []);

  // Show controls on hover
  const handleMouseEnter = () => setShowControls(true);
  const handleMouseLeave = () => setShowControls(false);

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNavigate("next");
    }
    if (isRightSwipe) {
      handleNavigate("prev");
    }

    // Reset values
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 sm:pt-20 pb-12 sm:pb-16 px-4 md:px-6 lg:px-8 relative">
      {/* Custom notification overlay */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="fixed top-0 left-0 right-0 z-[100] flex justify-center pointer-events-none"
            style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
          >
            <div className="pointer-events-auto bg-white/90 dark:bg-zinc-900/95 border border-zinc-200 dark:border-zinc-700 shadow-xl rounded-b-2xl px-10 py-4 mt-4 max-w-2xl w-full flex items-center relative overflow-hidden mx-4 sm:mx-8">
              <div className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-[#4A90E2] via-blue-400 to-blue-500 opacity-70" />
              <div className="flex items-center gap-3 flex-1">
                <div className="shrink-0 w-8 h-8 rounded-full bg-[#4A90E2]/15 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-[#4A90E2]"
                  >
                    <path
                      d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm sm:text-base text-zinc-900 dark:text-zinc-100 font-semibold truncate">
                    {notificationMessage}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                    We'll send you an email when we're ready for you.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors p-1 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800/60"
                aria-label="Close notification"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                    fill="currentColor"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-8 items-center">
          <div className="text-left sm:text-left text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-zinc-800/30 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-zinc-300 border border-zinc-700/30 mb-6 md:mb-8 mx-auto sm:mx-0"
            >
              <div className="h-1.5 w-1.5 rounded-full bg-[#4A90E2] animate-pulse"></div>
              <span className="bg-gradient-to-r from-[#4A90E2] via-blue-500 to-blue-400 text-transparent bg-clip-text">
                AI-powered financial guidance
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-3 md:mb-4 relative"
            >
              <span className="relative inline-block">
                Your money. <br className="md:block hidden" />
                <span className="absolute -inset-1 bg-[#4A90E2]/20 blur-2xl rounded-lg"></span>
              </span>
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-gradient-to-r from-[#4A90E2]/20 via-indigo-400/20 to-mint-400/20 blur-2xl rounded-lg"></span>
                <span className="relative bg-gradient-to-r from-[#4A90E2] via-indigo-400 to-mint-400 text-transparent bg-clip-text animate-shimmer">
                  Fully understood.
                </span>
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-lg sm:text-xl md:text-2xl text-zinc-300 max-w-xl mb-3 md:mb-4 mx-auto sm:mx-0"
            >
              Guided by Finny — your AI financial coach.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="text-base sm:text-lg text-zinc-400 max-w-xl mb-2 mx-auto sm:mx-0"
            >
              A financial coach that helps you invest, plan, and save.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="text-sm text-zinc-400 max-w-xl mb-8 mx-auto sm:mx-0"
            >
              Built to give you a peace of mind.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto sm:mx-0"
            >
              <form
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full"
              >
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full bg-zinc-800/40 border-zinc-700/30 focus:border-[#4A90E2]/50 h-10 sm:h-12"
                    value={email}
                    onChange={(e) => {
                      console.log("Email input changed:", e.target.value);
                      setEmail(e.target.value);
                    }}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="h-10 sm:h-12 px-4 sm:px-6 bg-[#4A90E2] hover:bg-[#3A7BC9] text-white font-medium rounded-lg transition-colors"
                  onClick={() => console.log("Join button clicked")}
                >
                  Join the Waitlist
                </Button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.7 }}
            className="flex justify-center lg:justify-end relative mt-6 sm:mt-8 lg:mt-0 lg:pl-12"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Category indicators - Hidden on mobile, visible from md breakpoint */}
            <div className="absolute -left-8 md:-left-10 lg:-left-12 top-1/2 transform -translate-y-1/2 hidden md:flex flex-col gap-6 z-10">
              {messageCategories.map((category, idx) => (
                <motion.div
                  key={category}
                  className={`flex items-center gap-3 cursor-pointer transition-all ${
                    idx === currentMessageIndex
                      ? "opacity-100 translate-x-0"
                      : "opacity-50 -translate-x-2"
                  }`}
                  whileHover={{ scale: 1.05, opacity: 1 }}
                  onClick={() => {
                    setIsMessageChanging(true);
                    setTimeout(() => {
                      setCurrentMessageIndex(idx);
                      setDisplayedText("");
                      setIsMessageChanging(false);
                      setIsTyping(true);
                    }, 500);
                  }}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-white ${
                      idx === currentMessageIndex
                        ? "bg-gradient-to-r from-[#4A90E2] to-blue-600"
                        : "bg-zinc-800"
                    }`}
                  >
                    {React.cloneElement(categoryIcons[idx], {
                      className: `w-3.5 h-3.5 ${
                        idx === currentMessageIndex
                          ? "text-white"
                          : "text-zinc-400"
                      }`,
                    })}
                  </div>
                  <span
                    className={`text-xs font-medium pr-2 ${
                      idx === currentMessageIndex
                        ? "text-white"
                        : "text-zinc-500"
                    }`}
                  >
                    {category}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Mobile category indicators - REMOVED completely for phones */}

            <div
              className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-[380px] sm:h-[450px] md:h-[500px] mx-auto lg:mr-0 lg:ml-auto"
              ref={chatContainerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Sliding navigation controls */}
              <AnimatePresence>
                {showControls && (
                  <>
                    <motion.button
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 -right-10 z-10 w-8 h-8 rounded-full bg-zinc-800/70 flex items-center justify-center text-white backdrop-blur-sm border border-zinc-700/50 hover:bg-[#4A90E2]/50 transition-colors hidden sm:flex"
                      onClick={() => handleNavigate("next")}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.button>
                    <motion.button
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-1/2 -left-10 z-10 w-8 h-8 rounded-full bg-zinc-800/70 flex items-center justify-center text-white backdrop-blur-sm border border-zinc-700/50 hover:bg-[#4A90E2]/50 transition-colors hidden sm:flex"
                      onClick={() => handleNavigate("prev")}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z"
                          fill="currentColor"
                        />
                      </svg>
                    </motion.button>
                  </>
                )}
              </AnimatePresence>

              {/* Glow background effects */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A90E2]/30 to-blue-500/30 rounded-2xl blur-md"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#4A90E2]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

              {/* Chat interface container */}
              <div className="relative bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Chat header */}
                <div className="bg-zinc-800/50 backdrop-blur-sm px-3 sm:px-6 py-3 sm:py-4 border-b border-zinc-700/30 flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="w-12 sm:w-16 h-12 sm:h-16 shrink-0">
                      <Image
                        src="/mascot1.jpg"
                        alt="Finny Mascot"
                        width={90}
                        height={90}
                        className="w-full h-full scale-x-[-1]"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-zinc-200 text-sm sm:text-base">
                        Finny
                      </div>
                      <div className="text-xs text-zinc-400 flex items-center gap-1">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-400"></span>
                        <span>Online</span>
                      </div>
                    </div>
                  </div>
                  {/* <div className="text-zinc-400">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sm:w-14 sm:h-14"
                    >
                      <path
                        d="M12 3C17.5 3 22 6.58 22 11C22 15.42 17.5 19 12 19C10.76 19 9.57 18.82 8.47 18.5C5.55 21 2 21 2 21C4.33 18.67 4.7 17.1 4.75 16.5C3.05 15.07 2 13.13 2 11C2 6.58 6.5 3 12 3ZM11 13H13V17H11V13ZM11 7H13V11H11V7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div> */}
                </div>

                {/* Chat messages area */}
                <div className="flex-1 px-3 sm:px-6 py-3 sm:py-4 overflow-auto">
                  {/* System welcome message */}
                  <div className="bg-zinc-800/50 px-3 sm:px-4 py-2 rounded-lg text-center text-xs text-zinc-500 mb-3 sm:mb-4">
                    Today • Conversation with Finny
                  </div>

                  {/* User account message */}

                  {/* Previous message bubble */}
                  <div className="flex gap-2 mb-4 sm:mb-6">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#4A90E2] to-blue-600 flex items-center justify-center shrink-0">
                      <Image
                        src="/mascot1.jpg"
                        alt="Finny Mascot"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                    </div>
                    <div className="max-w-[85%] sm:max-w-[80%]">
                      <div className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-zinc-200">
                        <p>
                          Hello! I'm Finny, your AI financial coach. I'll help
                          you manage your money better.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Current animated message bubble */}
                  <div className="flex gap-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#4A90E2] to-blue-600 flex items-center justify-center shrink-0">
                      <Image
                        src="/mascot1.jpg"
                        alt="Finny Mascot"
                        width={32}
                        height={32}
                        className="w-full h-full object-cover scale-x-[-1]"
                      />
                    </div>
                    <div className="max-w-[85%] sm:max-w-[80%]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentMessageIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.5 }}
                          className="bg-blue-600/20 backdrop-blur-sm border border-blue-500/30 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base text-zinc-200"
                        >
                          <div className="flex items-center mb-1.5 flex-wrap">
                            <span className="text-xs text-blue-300 font-medium bg-blue-500/20 rounded-full px-2 py-0.5 flex items-center gap-1 mb-1 sm:mb-0">
                              {React.cloneElement(
                                categoryIcons[currentMessageIndex],
                                {
                                  className: "text-blue-300",
                                }
                              )}
                              {messageCategories[currentMessageIndex]}
                            </span>
                            {isTyping && (
                              <span className="text-xs text-zinc-500 ml-2 flex items-center gap-1">
                                <span className="h-1 w-1 bg-zinc-500 rounded-full animate-pulse"></span>
                                Typing...
                              </span>
                            )}
                          </div>
                          <p>
                            {displayedText}
                            {isTyping && (
                              <span className="inline-block w-1.5 h-4 bg-zinc-400 ml-1 animate-pulse"></span>
                            )}
                          </p>
                          {!isTyping && (
                            <div className="flex flex-wrap justify-end gap-2 mt-2">
                              <button className="text-xs text-blue-300 hover:text-blue-200 transition-colors py-1 px-2">
                                Tell me more
                              </button>
                              <button className="text-xs text-green-300 hover:text-green-200 transition-colors py-1 px-2">
                                Let's do it
                              </button>
                            </div>
                          )}
                        </motion.div>
                      </AnimatePresence>
                      <div className="text-xs text-zinc-500 ml-2 mt-1 flex items-center gap-2">
                        {!isTyping && (
                          <span className="text-xs text-zinc-600">
                            {getResponseTime()}s response time
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message progress indicators */}
                <div className="flex justify-center gap-1.5 py-2 sm:py-3 bg-zinc-800/30 border-t border-zinc-700/30">
                  {finnyMessages.map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1.5 rounded-full cursor-pointer transition-all duration-500 ${
                        index === currentMessageIndex
                          ? "w-6 sm:w-8 bg-gradient-to-r from-[#4A90E2] to-blue-600"
                          : "w-1.5 sm:w-2 bg-zinc-600"
                      }`}
                      whileHover={{
                        scale: 1.1,
                        backgroundColor:
                          index === currentMessageIndex
                            ? undefined
                            : "rgb(168, 85, 247)",
                      }}
                      onClick={() => {
                        setIsMessageChanging(true);
                        setTimeout(() => {
                          setCurrentMessageIndex(index);
                          setDisplayedText("");
                          setIsMessageChanging(false);
                          setIsTyping(true);
                        }, 500);
                      }}
                    ></motion.div>
                  ))}
                </div>

                {/* Swipe indicator for mobile */}
                <div className="sm:hidden text-center text-xs text-zinc-500 py-2">
                  Swipe to change messages
                </div>

                {/* Chat input */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-t border-zinc-700/30 flex items-center gap-2">
                  <div className="flex-1 bg-zinc-800/50 border border-zinc-700/50 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-zinc-500 text-xs sm:text-sm">
                    Type a message...
                  </div>
                  <button className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-gradient-to-r from-[#4A90E2] to-blue-600 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="sm:w-18 sm:h-18"
                    >
                      <path
                        d="M22 2L11 13"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 2L15 22L11 13L2 9L22 2Z"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* Glow effects */}
                <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#4A90E2]/10 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#4A90E2]/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
