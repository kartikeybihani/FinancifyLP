"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { getStoredSourceData } from "@/lib/source-tracking";
import { submitToGoogleScript } from "@/lib/google-scripts-api";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
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

    // Check for duplicate emails
    try {
      const storedEmails = JSON.parse(
        localStorage.getItem("waitlistEmails") || "[]"
      );
      const isDuplicate = storedEmails.some(
        (entry: any) => entry.email.toLowerCase() === email.toLowerCase()
      );

      if (isDuplicate) {
        toast({
          title: "Already on the list!",
          description: "This email is already registered for early access.",
          duration: 3000,
        });
        return;
      }
    } catch (err) {
      console.error("Error checking for duplicates:", err);
    }

    // Show success notification IMMEDIATELY
    setNotificationMessage(
      "🎉 You're on the waitlist! We'll be in touch soon."
    );
    setShowNotification(true);

    // Hide notification after 3 seconds
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }
    notificationTimeoutRef.current = setTimeout(() => {
      setShowNotification(false);
      notificationTimeoutRef.current = null;
    }, 3000);

    // Get source tracking data if available
    const sourceData = getStoredSourceData();
    const trackingSource = sourceData?.source || "cta";

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
      console.error("Error storing CTA email:", err);
    }

    // Attempt to send to the server in the background (non-blocking) with retry logic
    submitToGoogleScript({
      type: "waitlist",
      email: email,
      source: trackingSource,
      sourceData: sourceData || null,
    });

    setEmail("");
  }, [email]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, []);

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 relative">
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

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-4xl text-center"
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4A90E2]/20 via-blue-500/20 to-blue-400/20 rounded-xl blur-sm"></div>
          <div className="bg-zinc-900/60 backdrop-blur-sm border border-blue-800/30 rounded-xl p-8 md:p-12 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want early access to Financify?
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg mb-8">
              Join our waitlist today and be among the first to experience the
              future of financial advising.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-zinc-800/50 border-zinc-700/30 focus:border-blue-500/50 h-12"
                value={email}
                onChange={handleEmailChange}
                required
              />
              <Button
                type="submit"
                className="h-12 px-6 bg-[#4A90E2] hover:bg-[#3A7BC9] text-white font-medium rounded-lg transition-colors"
              >
                Join the Waitlist
              </Button>
            </form>
            <p className="text-xs text-zinc-500 mt-4">
              No spam. No ads. Just clarity and control.
            </p>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-xl"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
