"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import Image from "next/image";

type Message = {
  id: number;
  sender: "user" | "finny";
  text: string;
};

export default function ChatUISection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const controls = useAnimation();

  const conversation: Message[] = [
    {
      id: 1,
      sender: "user",
      text: "I want to save for a trip to Hawaii this fall",
    },
    {
      id: 2,
      sender: "finny",
      text: "Great! I'll track this monthly",
    },
    {
      id: 3,
      sender: "finny",
      text: "For $2,000 by October? Save $250/month. Added to your plan!",
    },
  ];

  const chatSuggestions = [
    "How much should I save each month?",
    "What's my spending breakdown?",
    "When can I retire?",
    "Help me budget for a new car",
  ];

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Set up intersection observer to detect when section is in view
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          controls.start("visible");
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of the section is visible
    );

    observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls, hasAnimated]);

  // Scroll to bottom of messages - optimized for mobile
  useEffect(() => {
    if (messagesEndRef.current) {
      const messageContainer = messagesEndRef.current.parentElement;
      if (messageContainer) {
        // Use requestAnimationFrame for better performance on mobile
        requestAnimationFrame(() => {
          messageContainer.scrollTop = messageContainer.scrollHeight;
        });
      }
    }
  }, [messages]);

  // Animate conversation with delays - optimized for mobile
  useEffect(() => {
    if (!isInView) return;

    const displayMessages = async () => {
      // Reset messages
      setMessages([]);

      // Show typing cursor animation before first message
      setShowCursor(true);
      await new Promise((resolve) =>
        setTimeout(resolve, isMobile ? 800 : 1200)
      );
      setShowCursor(false);

      // Add user message
      await new Promise((resolve) => setTimeout(resolve, isMobile ? 100 : 200));
      setMessages([conversation[0]]);

      // Show typing indicator
      await new Promise((resolve) => setTimeout(resolve, isMobile ? 400 : 800));
      setTyping(true);

      // Add first bot response after delay
      await new Promise((resolve) => setTimeout(resolve, isMobile ? 300 : 500));
      setTyping(false);
      setMessages((prev) => [...prev, conversation[1]]);

      // Show typing indicator again
      await new Promise((resolve) => setTimeout(resolve, isMobile ? 300 : 500));
      setTyping(true);

      // Add second bot response after delay
      await new Promise((resolve) => setTimeout(resolve, isMobile ? 300 : 500));
      setTyping(false);
      setMessages((prev) => [...prev, conversation[2]]);
    };

    displayMessages();
  }, [isInView, isMobile]);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 md:px-6 lg:px-8 relative"
      id="chat-section"
    >
      {/* Enhanced background styling similar to hero section */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/5 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#4A90E2]/5 to-transparent opacity-40"></div>
      <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-xl"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-xl"></div>

      <div className="container mx-auto max-w-4xl relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Conversations that feel
            <span className="bg-gradient-to-r from-[#4A90E2] to-blue-400 text-transparent bg-clip-text ml-2">
              human
            </span>
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-lg">
            Financify combines AI intelligence with emotional understanding to
            help you navigate your financial growth.
          </p>
        </div>

        <motion.div
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.6 },
            },
          }}
          className={`bg-[#142042]/80 rounded-2xl border border-zinc-700/50 p-6 md:p-8 max-w-xl mx-auto shadow-xl relative overflow-hidden ${
            isMobile ? "backdrop-blur-sm" : "backdrop-blur-2xl"
          }`}
        >
          {/* Chat header */}
          <div className="flex items-center justify-between pb-3 border-b border-zinc-700/40 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-gradient-to-br from-[#4A90E2] to-blue-600 flex items-center justify-center shrink-0">
                <Image
                  src="/mascot1.jpg"
                  alt="Finny Mascot"
                  width={28}
                  height={28}
                  className="w-full h-full object-cover scale-x-[-1]"
                />
              </div>
              <div>
                <h3 className="font-medium text-sm">Finny</h3>
                <p className="text-xs text-zinc-400">Your financial coach</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-1.5 w-1.5 rounded-full bg-green-400"></div>
              <span className="text-xs text-zinc-400">Online 24/7 for you</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="space-y-4 min-h-[250px] max-h-[300px] overflow-y-auto pr-2">
            <AnimatePresence>
              {showCursor && (
                <motion.div
                  className="flex justify-end"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm bg-[#4A90E2]/25 border border-[#4A90E2]/40 text-white rounded-tr-none shadow-lg shadow-[#4A90E2]/10 ${
                      isMobile ? "backdrop-blur-none" : "backdrop-blur-md"
                    }`}
                  >
                    <p className="flex items-center">
                      <span className="inline-block mr-0.5 h-4 w-[1px] bg-white animate-pulse"></span>
                    </p>
                  </div>
                </motion.div>
              )}

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: isMobile ? 0.2 : 0.3 }}
                >
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                      message.sender === "user"
                        ? "bg-[#4A90E2]/25 border border-[#4A90E2]/40 text-white rounded-tr-none shadow-lg shadow-[#4A90E2]/10"
                        : "bg-zinc-800/60 border border-zinc-700/40 text-white rounded-tl-none shadow-lg shadow-zinc-800/10"
                    } ${isMobile ? "backdrop-blur-none" : "backdrop-blur-md"}`}
                  >
                    <p>{message.text}</p>
                  </div>
                </motion.div>
              ))}

              {typing && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div
                    className={`bg-zinc-800/60 border border-zinc-700/40 text-white rounded-2xl rounded-tl-none px-3 py-2 shadow-lg shadow-zinc-800/10 ${
                      isMobile ? "backdrop-blur-none" : "backdrop-blur-md"
                    }`}
                  >
                    <div className="flex gap-1 items-center h-5">
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                        style={{ animationDelay: isMobile ? "100ms" : "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce"
                        style={{ animationDelay: isMobile ? "200ms" : "300ms" }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Chat suggestions */}
          <div className="mt-4 mb-4 flex flex-wrap gap-2">
            {chatSuggestions.map((suggestion, index) => (
              <button
                key={index}
                className={`text-xs bg-zinc-800/60 hover:bg-zinc-700/70 text-zinc-300 px-2 py-1 rounded-full border border-zinc-700/40 transition-colors shadow-sm text-[11px] ${
                  isMobile ? "backdrop-blur-none" : "backdrop-blur-sm"
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Chat input */}
          <div className="mt-2 flex gap-2 border-t border-zinc-700/40 pt-3">
            <input
              type="text"
              placeholder="Ask Finny anything about your finances..."
              className={`flex-1 bg-zinc-800/40 border border-zinc-700/40 rounded-full px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-purple-500/50 shadow-inner ${
                isMobile ? "backdrop-blur-none" : "backdrop-blur-sm"
              }`}
              disabled
            />
            <button className="w-7 h-7 rounded-full bg-[#4A90E2] flex items-center justify-center">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
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

          {/* Decorative elements */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#4A90E2]/20 via-blue-400/10 to-blue-500/20 rounded-2xl blur-xl opacity-60"></div>
          <div className="absolute top-0 left-0 right-0 h-60 bg-gradient-to-b from-[#4A90E2]/15 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-indigo-500/15 to-transparent"></div>

          {/* Additional glass morphism effect */}
          <div
            className={`absolute inset-0 bg-white/5 rounded-2xl opacity-20 pointer-events-none ${
              isMobile ? "backdrop-blur-none" : "backdrop-blur-md"
            }`}
          ></div>
        </motion.div>
      </div>
    </section>
  );
}
