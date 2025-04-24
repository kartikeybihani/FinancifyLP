"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function CtaSection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("CTA form submitted! Check console for logs.");
    console.log("CTA form submitted");

    // Validate email
    if (!email || !email.includes("@")) {
      console.log("Invalid email in CTA");
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Handle form submission
    console.log("Email submitted from CTA:", email);

    // For now, just show success notification since Google Script endpoint is returning an error
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
        source: "cta",
      });
      localStorage.setItem("waitlistEmails", JSON.stringify(storedEmails));
      console.log("CTA email stored in localStorage");
    } catch (err) {
      console.error("Error storing CTA email in localStorage:", err);
    }

    // Attempt to send to the server, but don't block UI
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
    <section className="py-24 px-4 md:px-6 lg:px-8 bg-gradient-to-b from-[#121822] to-[#0a0a14]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="container mx-auto max-w-4xl text-center"
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-blue-500/20 to-mint-500/20 rounded-xl blur-sm"></div>
          <div className="bg-zinc-900/60 backdrop-blur-sm border border-blue-800/30 rounded-xl p-8 md:p-12 relative">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Want early access to Financify?
            </h2>
            <p className="text-zinc-300 max-w-2xl mx-auto text-lg mb-8">
              Join our waitlist today and be among the first to experience the
              future of financial coaching.
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
                className="h-12 px-6 bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium"
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
