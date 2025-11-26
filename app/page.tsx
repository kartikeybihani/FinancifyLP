"use client";

import { useEffect, useState } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SparkMomentSection from "@/components/spark-moment-section";
import HowItWorksSection from "@/components/how-it-works-section";
import ChatUISection from "@/components/chat-ui-section";
import { PricingDemo } from "@/components/pricing-demo";
import CtaSection from "@/components/cta-section";
import ParticleBackground from "@/components/particle-background";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { getStoredSourceData } from "@/lib/source-tracking";

export default function Home() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Ensure scroll position is at top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    // You can add your form submission logic here
    setIsContactOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  const handleWaitlistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Waitlist form submitted");

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!waitlistEmail || !emailRegex.test(waitlistEmail)) {
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
        (entry: any) =>
          entry.email.toLowerCase() === waitlistEmail.toLowerCase()
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

    // Get source tracking data
    const sourceData = getStoredSourceData();
    const trackingSource = sourceData?.source || "pricing";

    // Store in localStorage
    try {
      const storedEmails = JSON.parse(
        localStorage.getItem("waitlistEmails") || "[]"
      );
      storedEmails.push({
        email: waitlistEmail,
        timestamp: new Date().toISOString(),
        source: trackingSource,
        sourceData: sourceData || null,
      });
      localStorage.setItem("waitlistEmails", JSON.stringify(storedEmails));
      console.log(
        "Waitlist email stored in localStorage with source:",
        trackingSource
      );
    } catch (err) {
      console.error("Error storing waitlist email in localStorage:", err);
    }

    // Send to server
    try {
      fetch(
        "https://script.google.com/macros/s/AKfycbyYvw7_bBsuirrctEjf02yyoJ_GDMh2EJA1oLnKI6txtdJiBx4cr5hgrIC4fffeE1rg/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({
            email: waitlistEmail,
            source: trackingSource,
            sourceData: sourceData || null,
          }),
        }
      ).catch((error) => {
        console.error("Error sending waitlist form to Google Script:", error);
      });
    } catch (err) {
      console.error("Error in waitlist fetch operation:", err);
    }

    toast({
      title: "You're on the list!",
      description: "We'll notify you when early access is available.",
      duration: 7000,
    });

    setIsWaitlistOpen(false);
    setWaitlistEmail("");
  };

  return (
    <main className="relative min-h-screen bg-zinc-900 text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Header onContactClick={() => setIsContactOpen(true)} />
        <section id="top" className="scroll-mt-20">
          <HeroSection />
        </section>
        <SparkMomentSection />
        <HowItWorksSection />
        <ChatUISection />
        <PricingDemo onJoinWaitlist={() => setIsWaitlistOpen(true)} />
        <CtaSection />
      </div>

      <footer className="relative z-10 border-t border-blue-800/20 py-8 text-center text-blue-100/40 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Financify. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a
              href="https://www.notion.so/Terms-Conditions-for-Financify-20d42b8a217980cea19ceda310df47c1?source=copy_link"
              className="hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Terms
            </a>
            <a
              href="https://www.notion.so/Privacy-Policy-for-Financify-20d42b8a2179800682afdf5dc000fcdd?source=copy_link"
              className="hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Privacy
            </a>
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-blue-300 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      <Dialog open={isContactOpen} onOpenChange={setIsContactOpen}>
        <DialogContent className="sm:max-w-[500px] fixed left-[50%] bottom-4 top-auto rounded-3xl sm:bottom-auto sm:top-[45%] bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 text-white shadow-2xl data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom">
          <DialogHeader>
            <DialogTitle className="text-white">Contact Us</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Send us a message and we'll get back to you ASAP.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-zinc-300"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium text-zinc-300"
              >
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                rows={5}
                className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsContactOpen(false)}
                className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/60 backdrop-blur-sm rounded-[25px] px-6 py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="inline-flex font-medium text-white bg-[#4A90E2] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(74,144,226,0.5)] rounded-[25px] px-6 py-2.5"
              >
                Send Message
              </Button>
            </div>
          </form>
          <div className="pt-4 border-t border-zinc-700/50 mt-4">
            <p className="text-sm text-zinc-400 mb-2">Join our community</p>
            <a
              href="https://discord.gg/jUatzZgv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join our Discord community
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Waitlist Modal */}
      <Dialog open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen}>
        <DialogContent className="sm:max-w-[500px] fixed left-[50%] bottom-4 top-auto rounded-3xl sm:bottom-auto sm:top-[45%] bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 text-white shadow-2xl data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom">
          <DialogHeader>
            <DialogTitle className="text-white">Join the Waitlist</DialogTitle>
            <DialogDescription className="text-zinc-400">
              We're launching soon! Get early access to Financify.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleWaitlistSubmit} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="waitlist-email"
                className="text-sm font-medium text-zinc-300"
              >
                Email
              </label>
              <Input
                id="waitlist-email"
                type="email"
                placeholder="your.email@example.com"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                required
                className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsWaitlistOpen(false)}
                className="border-zinc-700/50 text-zinc-300 hover:bg-zinc-800/60 backdrop-blur-sm rounded-[25px] px-6 py-2.5"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="inline-flex font-medium text-white bg-[#4A90E2] hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(74,144,226,0.5)] rounded-[25px] px-6 py-2.5"
              >
                Join Waitlist
              </Button>
            </div>
          </form>
          <div className="pt-4 border-t border-zinc-700/50 mt-4">
            <p className="text-sm text-zinc-400 mb-2">
              Join the community to get early access.
            </p>
            <a
              href="https://discord.gg/jUatzZgv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              https://discord.gg/jUatzZgv
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
