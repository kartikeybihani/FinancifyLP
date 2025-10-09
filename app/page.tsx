"use client";

import { useEffect } from "react";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SparkMomentSection from "@/components/spark-moment-section";
import HowItWorksSection from "@/components/how-it-works-section";
import ChatUISection from "@/components/chat-ui-section";
import { PricingDemo } from "@/components/pricing-demo";
import CtaSection from "@/components/cta-section";
import ParticleBackground from "@/components/particle-background";

export default function Home() {
  // Ensure scroll position is at top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="relative min-h-screen bg-zinc-900 text-white overflow-hidden">
      <ParticleBackground />

      <div className="relative z-10">
        <Header />
        <section id="top" className="scroll-mt-20">
          <HeroSection />
        </section>
        <SparkMomentSection />
        <HowItWorksSection />
        <ChatUISection />
        <PricingDemo />
        <CtaSection />
      </div>

      <footer className="relative z-10 border-t border-blue-800/20 py-8 text-center text-blue-100/40 text-sm bg-[#0c1018]/80">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Financify. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-blue-300 transition-colors">
              Terms
            </a>
            <a href="#" className="hover:text-blue-300 transition-colors">
              Privacy
            </a>
            <a
              href="https://www.linkedin.com/in/kbihani"
              className="hover:text-blue-300 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
