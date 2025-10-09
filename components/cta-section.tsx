"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function CtaSection() {
  const [email, setEmail] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("CTA form submitted");

    // Improved email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      console.log("Invalid email in CTA");
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

    // Handle form submission
    console.log("Email submitted from CTA:", email);

    // Show the custom notification IMMEDIATELY
    setNotificationMessage("You're on the waitlist! We'll be in touch soon.");
    setShowNotification(true);

    // Hide notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);

    // Show toast notification immediately
    toast({
      title: "You're on the list!",
      description: "We'll notify you when early access is available.",
      duration: 7000,
    });

    // Store in localStorage immediately
    try {
      const storedEmails = JSON.parse(
        localStorage.getItem("waitlistEmails") || "[]"
      );
      storedEmails.push({
        email,
        timestamp: new Date().toISOString(),
        source: "cta",
      });
      localStorage.setItem("waitlistEmails", JSON.stringify(storedEmails));
      console.log("CTA email stored in localStorage");
    } catch (err) {
      console.error("Error storing CTA email in localStorage:", err);
    }

    // Attempt to send to the server in the background (non-blocking)
    try {
      fetch(
        "https://script.google.com/macros/s/AKfycbyYvw7_bBsuirrctEjf02yyoJ_GDMh2EJA1oLnKI6txtdJiBx4cr5hgrIC4fffeE1rg/exec",
        {
          method: "POST",
          mode: "no-cors", // This allows the request to be sent cross-origin
          headers: {
            "Content-Type": "text/plain", // Changed from application/json due to no-cors restrictions
          },
          body: JSON.stringify({ email: email, source: "cta" }),
        }
      )
        .then((response) => {
          console.log("CTA response received:", response);
          // With no-cors, we can't actually read the response content
          console.log(
            "CTA email submitted successfully (no-cors mode, can't confirm server response)"
          );
        })
        .catch((error) => {
          console.error("Error sending CTA form to Google Script:", error);
          // Log that we'll rely on localStorage since the remote endpoint failed
          console.log("Using localStorage as backup for the CTA submission");
        });
    } catch (err) {
      console.error("Error in CTA fetch operation:", err);
    }

    setEmail("");
  };

  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#0a0c14] to-[#050509] relative">
      {/* Custom notification overlay */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-8 flex justify-center z-50"
          >
            <div className="bg-zinc-900/90 backdrop-blur-md border border-zinc-700/50 rounded-lg px-10 py-4 shadow-xl max-w-lg text-center relative">
              <button
                onClick={() => setShowNotification(false)}
                className="absolute top-3 right-3 text-zinc-400 hover:text-white transition-colors py-1.5 pr-1.5 pl-3 rounded-full hover:bg-zinc-800/50"
              >
                <svg
                  width="15"
                  height="15"
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
              <div className="bg-gradient-to-r from-[#4A90E2] to-blue-500 h-1 w-full absolute top-0 left-0 rounded-t-lg"></div>
              <div className="flex items-center justify-center">
                <span className="mr-3 text-[#4A90E2] flex-shrink-0">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="bg-[#4A90E2]/20 p-0.5 rounded-full"
                  >
                    <path
                      d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <p className="text-zinc-100 text-sm font-medium pr-6">
                  {notificationMessage}
                </p>
              </div>
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
                onChange={(e) => {
                  console.log("CTA email input changed:", e.target.value);
                  setEmail(e.target.value);
                }}
                required
              />
              <Button
                type="submit"
                className="h-12 px-6 bg-[#4A90E2] hover:bg-[#3A7BC9] text-white font-medium rounded-lg transition-colors"
                onClick={() => console.log("CTA join button clicked")}
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
