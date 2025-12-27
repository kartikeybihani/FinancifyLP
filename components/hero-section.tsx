"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Image from "next/image";
import { getStoredSourceData } from "@/lib/source-tracking";
import { submitToGoogleScript } from "@/lib/google-scripts-api";
import FinnyAvatar from "@/components/finny-avatar";

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
  const [isMobile, setIsMobile] = useState(false);
  const [responseTime, setResponseTime] = useState(2); // Default value to prevent hydration mismatch
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const chatMessagesRef = useRef<HTMLDivElement>(null);
  const typingTimerRef = useRef<NodeJS.Timeout | null>(null);
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const navigateTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressClickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rotationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Memoize messages array to prevent recreation on every render
  const finnyMessages = useMemo(
    () => [
      "You're 75% to your Hawaii trip. You're almost there. Just $1,200 more and you'll be booking flights.",
      "Your investments are up 12% this year. Should we rebalance? I can help you optimize your portfolio.",
      "You could save $87/month by cutting unused subscriptions. That's over $1,000 a year back in your pocket.",
      "Your emergency fund needs $2,000 more. Let's get there. I'll help you set up automatic savings.",
    ],
    []
  );

  // Set response time on client side only to prevent hydration mismatch
  useEffect(() => {
    setResponseTime(Math.floor(Math.random() * 3) + 1);
  }, []);

  // Handle email form submission - memoized
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Improved email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Show success notification IMMEDIATELY
      setNotificationMessage(
        "🎉 You're on the waitlist! We'll be in touch soon."
      );
      setShowNotification(true);

      // Hide notification after 3 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);

      // Get source tracking data if available
      const sourceData = getStoredSourceData();
      const trackingSource = sourceData?.source || "hero";

      // Store in localStorage immediately
      try {
        const storedEmails = JSON.parse(
          localStorage.getItem("waitlistEmails") || "[]"
        );
        storedEmails.push({
          email,
          timestamp: new Date().toISOString(),
          source: trackingSource,
          sourceData: sourceData || null,
        });
        localStorage.setItem("waitlistEmails", JSON.stringify(storedEmails));
      } catch (err) {
        console.error("Error storing email in localStorage:", err);
      }

      // Handle Google Apps Script submission in the background (non-blocking) with retry logic
      setEmail("");
      submitToGoogleScript({
        type: "waitlist",
        email: email,
        source: trackingSource,
        sourceData: sourceData || null,
      });
    },
    [email]
  );

  // Memoize current message to avoid recalculation
  const currentMessage = useMemo(
    () => finnyMessages[currentMessageIndex],
    [finnyMessages, currentMessageIndex]
  );

  // Optimized type animation effect - skip typing on mobile
  useEffect(() => {
    // Clear any existing timer
    if (typingTimerRef.current) {
      clearTimeout(typingTimerRef.current);
      typingTimerRef.current = null;
    }

    if (!isMessageChanging && !isTyping) return;

    // Skip typing animation on mobile - show message directly (faster for mobile UX)
    if (isMobile && isTyping) {
      setDisplayedText(currentMessage);
      // Add a small delay to prevent race conditions
      typingTimerRef.current = setTimeout(() => {
        setIsTyping(false);
        typingTimerRef.current = null;
      }, 100);
      return;
    }

    if (isTyping) {
      const typingSpeed = 25; // Desktop typing speed - slower for better readability

      if (displayedText.length < currentMessage.length) {
        typingTimerRef.current = setTimeout(() => {
          setDisplayedText(
            currentMessage.substring(0, displayedText.length + 1)
          );
          typingTimerRef.current = null;
        }, typingSpeed);
      } else {
        setIsTyping(false);
      }
    }

    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
    };
  }, [isTyping, displayedText, currentMessage, isMessageChanging, isMobile]);

  // Handle manual navigation - memoized
  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      setIsMessageChanging(true);

      // Clear any existing timeout
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
      }

      // Wait for animation to complete
      navigateTimeoutRef.current = setTimeout(
        () => {
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
          navigateTimeoutRef.current = null;
        },
        isMobile ? 400 : 300 // Match the slide animation timing
      );
    },
    [finnyMessages.length, isMobile]
  );

  // Memoized handler for clicking progress indicators
  const handleProgressClick = useCallback(
    (index: number) => {
      setIsMessageChanging(true);

      // Clear any existing timeout
      if (progressClickTimeoutRef.current) {
        clearTimeout(progressClickTimeoutRef.current);
      }

      progressClickTimeoutRef.current = setTimeout(
        () => {
          setCurrentMessageIndex(index);
          setDisplayedText("");
          setIsMessageChanging(false);
          setIsTyping(true);
          progressClickTimeoutRef.current = null;
        },
        isMobile ? 400 : 300 // Match the slide animation timing
      );
    },
    [isMobile]
  );

  // Optimized rotation through Finny messages - ensure typing completes first
  useEffect(() => {
    // Clear any existing interval
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current);
      rotationIntervalRef.current = null;
    }

    // On mobile, keep the message static to reduce motion in the hero
    if (isMobile) return;

    // Don't start rotation if typing is in progress (desktop only)
    if (isTyping) return;

    rotationIntervalRef.current = setInterval(() => {
      // Double-check typing state before rotating
      if (isTyping) return;

      setIsMessageChanging(true);

      // Clear any existing timeout
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
      }

      // Wait for animation to complete
      rotationTimeoutRef.current = setTimeout(
        () => {
          setCurrentMessageIndex((prev) => (prev + 1) % finnyMessages.length);
          setDisplayedText("");
          setIsMessageChanging(false);
          setIsTyping(true);
          rotationTimeoutRef.current = null;
        },
        isMobile ? 400 : 300 // Longer transition for mobile slide animation
      );
    }, 1000);

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
        rotationTimeoutRef.current = null;
      }
    };
  }, [currentMessageIndex, finnyMessages.length, isMobile, isTyping]);

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) {
        clearTimeout(typingTimerRef.current);
        typingTimerRef.current = null;
      }
      if (navigateTimeoutRef.current) {
        clearTimeout(navigateTimeoutRef.current);
        navigateTimeoutRef.current = null;
      }
      if (progressClickTimeoutRef.current) {
        clearTimeout(progressClickTimeoutRef.current);
        progressClickTimeoutRef.current = null;
      }
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current);
        rotationIntervalRef.current = null;
      }
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
        rotationTimeoutRef.current = null;
      }
    };
  }, []);

  // Start initial typing on component mount
  useEffect(() => {
    setIsTyping(true);
  }, []);

  // Optimized mobile detection with debouncing
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;

    const checkMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768); // md breakpoint
      }, 150); // Debounce resize events
    };

    // Initial check
    setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Auto-scroll to typing animation on mobile - optimized
  useEffect(() => {
    if (isMobile && isTyping && chatMessagesRef.current) {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        chatMessagesRef.current?.scrollTo({
          top: chatMessagesRef.current.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [isMobile, isTyping]);

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
    <section className="min-h-[100svh] flex flex-col justify-center pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 md:pb-12 px-4 md:px-6 lg:px-8 relative">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* On mobile, chat demo comes first; on desktop, keep text on the left */}
          <div className="text-center sm:text-left order-2 lg:order-1 lg:pl-0">
            <div className="inline-flex items-center gap-2 bg-zinc-800/30 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-zinc-300 border border-zinc-700/30 mb-5 sm:mb-6 md:mb-8 lg:mb-10 mx-auto sm:mx-0 animate-fade-in-up hero-animate-1">
              <div className="h-1.5 w-1.5 rounded-full bg-[#4A90E2] animate-pulse"></div>
              <span className="bg-gradient-to-r from-[#4A90E2] via-blue-500 to-blue-400 text-transparent bg-clip-text">
                AI-native financial guidance
              </span>
            </div>

            <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-snug sm:leading-tight mb-5 sm:mb-6 md:mb-8 lg:mb-10 relative animate-fade-in-up hero-animate-2 max-w-xl mx-auto sm:mx-0">
              <span className="relative inline-block">
                Stop guessing. <br className="md:block hidden" />
                <span className="absolute -inset-1 bg-[#4A90E2]/20 blur-2xl rounded-lg"></span>
              </span>
              <span className="relative inline-block md:mt-2">
                <span className="absolute -inset-1 bg-gradient-to-r from-[#4A90E2]/20 via-indigo-400/20 to-mint-400/20 blur-2xl rounded-lg"></span>
                <span className="relative bg-gradient-to-r from-[#4A90E2] via-indigo-400 to-mint-400 text-transparent bg-clip-text animate-shimmer">
                  Start making money decisions that feel right.
                </span>
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-md sm:max-w-xl mb-6 sm:mb-7 md:mb-8 lg:mb-10 mx-auto sm:mx-0 animate-fade-in-up hero-animate-3">
              Make smarter moves without overthinking every decision.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto sm:mx-0 animate-fade-in-up hero-animate-4 mb-4 sm:mb-6">
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
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="h-10 sm:h-12 px-4 sm:px-6 bg-[#4A90E2] hover:bg-[#3A7BC9] text-white font-medium rounded-lg transition-colors"
                >
                  Get Early Access
                </Button>
              </form>
            </div>

            <div className="text-xs sm:text-sm text-[#4A90E2] font-medium mx-auto sm:mx-0 animate-fade-in-up hero-animate-5">
              Join 500+ people on our waitlist to get early access
            </div>
          </div>

          {/* On mobile, chat demo comes first; on desktop, keep chat on the right */}
          <div className="flex flex-col items-center lg:items-end relative mt-2 sm:mt-4 lg:mt-0 lg:pl-12 order-1 lg:order-2 animate-fade-in-scale hero-animate-4 pb-2 lg:pb-0">
            {/* Mobile category indicators - REMOVED completely for phones */}

            <div
              className="relative w-full max-w-sm sm:max-w-sm md:max-w-md h-[180px] sm:h-[240px] md:h-[380px] lg:h-[450px] mx-auto lg:mr-0 lg:ml-auto opacity-95 sm:opacity-100"
              ref={chatContainerRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Glow background effects - toned down on mobile to reduce visual noise */}
              <div className="absolute -inset-px sm:-inset-0.5 bg-gradient-to-r from-[#4A90E2]/20 sm:from-[#4A90E2]/30 to-blue-500/20 sm:to-blue-500/30 rounded-2xl blur-sm sm:blur-md"></div>
              <div className="hidden sm:block absolute -top-6 -left-6 w-32 h-32 bg-[#4A90E2]/10 rounded-full blur-xl"></div>
              <div className="hidden sm:block absolute -bottom-6 -right-6 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>

              {/* Chat interface container */}
              <div
                className={`relative bg-zinc-900/60 border border-zinc-700/50 rounded-2xl overflow-hidden h-full flex flex-col ${
                  isMobile ? "backdrop-blur-sm" : "backdrop-blur-xl"
                }`}
              >
                {/* Chat header */}
                <div
                  className={`bg-zinc-800/50 px-3 sm:px-6 py-2.5 sm:py-4 border-b border-zinc-700/30 flex items-center justify-between ${
                    isMobile ? "backdrop-blur-none" : "backdrop-blur-sm"
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FinnyAvatar size="lg" priority />
                    <div>
                      <div className="font-medium text-zinc-200 text-xs sm:text-sm md:text-base">
                        Finny
                      </div>
                      <div className="text-[10px] sm:text-xs text-zinc-400 flex items-center gap-1">
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
                <div
                  ref={chatMessagesRef}
                  className={`flex-1 overflow-auto ${
                    isMobile
                      ? "px-2.5 py-2 flex items-center justify-center"
                      : "px-3 sm:px-6 py-2.5 sm:py-4"
                  }`}
                >
                  {/* Mobile: Show only one concise message */}
                  {isMobile ? (
                    <div className="w-full flex flex-col items-center justify-center h-full">
                      <div className="w-full max-w-[90%]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentMessageIndex}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="bg-blue-600/20 border border-blue-500/30 rounded-2xl px-4 py-3.5 text-sm text-zinc-200 text-center backdrop-blur-none"
                          >
                            <p className="leading-relaxed">
                              {displayedText || finnyMessages[currentMessageIndex]}
                            </p>
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* System welcome message */}
                      <div className="bg-zinc-800/50 px-3 sm:px-4 py-2 rounded-lg text-center text-xs text-zinc-500 mb-3 sm:mb-4">
                        Today • Conversation with Finny
                      </div>

                      {/* Previous message bubble */}
                      <div className="flex gap-2 mb-3 sm:mb-6">
                        <FinnyAvatar size="md" />
                        <div className="max-w-[85%] sm:max-w-[80%]">
                          <div
                            className={`bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-zinc-200 ${
                              isMobile ? "backdrop-blur-none" : "backdrop-blur-sm"
                            }`}
                          >
                            <p>
                              Hello! I'm Finny, your AI money coach. I'll help you
                              manage your money better.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Current animated message bubble */}
                      <div className="flex gap-2">
                        <FinnyAvatar size="md" />
                        <div className="max-w-[85%] sm:max-w-[80%]">
                          <AnimatePresence mode="wait">
                            <motion.div
                              key={currentMessageIndex}
                              initial={
                                isMobile
                                  ? { opacity: 0, x: 50 }
                                  : { opacity: 0, y: 10 }
                              }
                              animate={
                                isMobile
                                  ? { opacity: 1, x: 0 }
                                  : { opacity: 1, y: 0 }
                              }
                              exit={
                                isMobile
                                  ? { opacity: 0, x: -50 }
                                  : { opacity: 0, y: -10 }
                              }
                              transition={{
                                duration: isMobile ? 0.4 : 0.3,
                                ease: isMobile ? "easeInOut" : "easeOut",
                              }}
                              className={`bg-blue-600/20 border border-blue-500/30 rounded-2xl rounded-tl-none px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm md:text-base text-zinc-200 ${
                                isMobile ? "backdrop-blur-none" : "backdrop-blur-sm"
                              }`}
                            >
                              {isTyping && !isMobile && (
                                <div className="flex items-center mb-1.5">
                                  <span className="text-xs text-zinc-500 flex items-center gap-1">
                                    <span className="h-1 w-1 bg-zinc-500 rounded-full animate-pulse"></span>
                                    Typing...
                                  </span>
                                </div>
                              )}
                              <p>
                                {displayedText}
                                {isTyping && !isMobile && (
                                  <span className="inline-block w-1.5 h-4 bg-zinc-400 ml-1 animate-pulse"></span>
                                )}
                              </p>
                              {/* Keep quick actions for larger screens; hide on the smallest viewports to reduce clutter */}
                              {!isTyping && (
                                <div className="hidden sm:flex flex-wrap justify-end gap-1.5 sm:gap-2 mt-2">
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
                          <div className="hidden sm:flex text-xs text-zinc-500 ml-2 mt-1 items-center gap-2">
                            {!isTyping && (
                              <span className="text-xs text-zinc-600">
                                {responseTime}s response time
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
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
                      onClick={() => handleProgressClick(index)}
                    ></motion.div>
                  ))}
                </div>

                {/* Swipe indicator for mobile - hidden to reduce clutter */}
                <div className="sm:hidden text-center text-[10px] text-zinc-500/70 py-1">
                  Swipe to change messages
                </div>

                {/* Glow effects */}
                <div className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-b from-[#4A90E2]/10 to-transparent pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none"></div>
                <div className="hidden sm:block absolute -top-10 -right-10 w-40 h-40 bg-[#4A90E2]/10 rounded-full blur-xl pointer-events-none"></div>
                <div className="hidden sm:block absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-xl pointer-events-none"></div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 text-center mt-2 sm:mt-3 md:mt-4 w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto lg:mr-0 lg:ml-auto animate-fade-in-up hero-animate-5">
              Built to give you clarity and control.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
