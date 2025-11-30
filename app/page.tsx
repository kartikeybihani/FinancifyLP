"use client";

import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useReducer,
  Suspense,
} from "react";
import dynamic from "next/dynamic";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import ParticleBackground from "@/components/particle-background";

// Lazy load below-the-fold components for code splitting
const SparkMomentSection = dynamic(
  () => import("@/components/spark-moment-section"),
  {
    ssr: true,
  }
);
const HowItWorksSection = dynamic(
  () => import("@/components/how-it-works-section"),
  {
    ssr: true,
  }
);
const ChatUISection = dynamic(() => import("@/components/chat-ui-section"), {
  ssr: true,
});
const PricingDemo = dynamic(
  () =>
    import("@/components/pricing-demo").then((mod) => ({
      default: mod.PricingDemo,
    })),
  {
    ssr: true,
  }
);
const CtaSection = dynamic(() => import("@/components/cta-section"), {
  ssr: true,
});
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
import {
  submitToGoogleScript,
  initFailedRequestProcessor,
} from "@/lib/google-scripts-api";
import { motion, AnimatePresence } from "framer-motion";

// Consolidated form state reducer
type FormState = {
  name: string;
  email: string;
  message: string;
};

type NotificationState = {
  show: boolean;
  message: string;
};

type SubmissionState = {
  isSubmitting: boolean;
  isSuccess: boolean;
};

type AppState = {
  isContactOpen: boolean;
  isWaitlistOpen: boolean;
  waitlistEmail: string;
  notification: NotificationState;
  contactForm: FormState;
  submission: SubmissionState;
};

type AppAction =
  | { type: "SET_CONTACT_OPEN"; payload: boolean }
  | { type: "SET_WAITLIST_OPEN"; payload: boolean }
  | { type: "SET_WAITLIST_EMAIL"; payload: string }
  | { type: "SET_NOTIFICATION"; payload: NotificationState }
  | { type: "SET_FORM_DATA"; payload: Partial<FormState> }
  | { type: "SET_SUBMISSION"; payload: Partial<SubmissionState> }
  | { type: "RESET_FORM" }
  | { type: "RESET_SUBMISSION" };

const initialState: AppState = {
  isContactOpen: false,
  isWaitlistOpen: false,
  waitlistEmail: "",
  notification: { show: false, message: "" },
  contactForm: { name: "", email: "", message: "" },
  submission: { isSubmitting: false, isSuccess: false },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_CONTACT_OPEN":
      return { ...state, isContactOpen: action.payload };
    case "SET_WAITLIST_OPEN":
      return { ...state, isWaitlistOpen: action.payload };
    case "SET_WAITLIST_EMAIL":
      return { ...state, waitlistEmail: action.payload };
    case "SET_NOTIFICATION":
      return { ...state, notification: action.payload };
    case "SET_FORM_DATA":
      return {
        ...state,
        contactForm: { ...state.contactForm, ...action.payload },
      };
    case "SET_SUBMISSION":
      return {
        ...state,
        submission: { ...state.submission, ...action.payload },
      };
    case "RESET_FORM":
      return { ...state, contactForm: { name: "", email: "", message: "" } };
    case "RESET_SUBMISSION":
      return {
        ...state,
        submission: { isSubmitting: false, isSuccess: false },
      };
    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const notificationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const submitTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Ensure scroll position is at top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
    // Initialize failed request processor
    initFailedRequestProcessor();
  }, []);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current)
        clearTimeout(notificationTimeoutRef.current);
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Validation for all fields first
      if (
        !state.contactForm.name ||
        !state.contactForm.email ||
        !state.contactForm.message
      ) {
        toast({
          title: "Missing fields",
          description: "Please fill in all fields.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(state.contactForm.email)) {
        toast({
          title: "Invalid email",
          description: "Please enter a valid email address.",
          variant: "destructive",
          duration: 3000,
        });
        return;
      }

      // Set loading state
      dispatch({
        type: "SET_SUBMISSION",
        payload: { isSubmitting: true, isSuccess: false },
      });

      // Send to Google Script with retry logic
      submitToGoogleScript({
        type: "contact",
        name: state.contactForm.name.trim(),
        email: state.contactForm.email.trim(),
        message: state.contactForm.message.trim(),
      });

      // Simulate loading for better UX (minimum 1 second)
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current);
      submitTimeoutRef.current = setTimeout(() => {
        dispatch({
          type: "SET_SUBMISSION",
          payload: { isSubmitting: false, isSuccess: true },
        });
        submitTimeoutRef.current = null;
      }, 1000);
    },
    [state.contactForm]
  );

  // Memoized form input handlers
  const handleFormDataChange = useCallback((field: keyof FormState) => {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      dispatch({ type: "SET_FORM_DATA", payload: { [field]: e.target.value } });
    };
  }, []);

  const handleWaitlistEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: "SET_WAITLIST_EMAIL", payload: e.target.value });
    },
    []
  );

  const handleWaitlistSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!state.waitlistEmail || !emailRegex.test(state.waitlistEmail)) {
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
            entry.email.toLowerCase() === state.waitlistEmail.toLowerCase()
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
          email: state.waitlistEmail,
          timestamp: new Date().toISOString(),
          source: trackingSource,
          sourceData: sourceData || null,
        });
        localStorage.setItem("waitlistEmails", JSON.stringify(storedEmails));
      } catch (err) {
        console.error("Error storing waitlist email:", err);
      }

      // Send to server with retry logic
      submitToGoogleScript({
        type: "waitlist",
        email: state.waitlistEmail,
        source: trackingSource,
        sourceData: sourceData || null,
      });

      // Show success notification
      dispatch({
        type: "SET_NOTIFICATION",
        payload: {
          show: true,
          message: "🎉 You're on the waitlist! We'll be in touch soon.",
        },
      });
      if (notificationTimeoutRef.current)
        clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = setTimeout(() => {
        dispatch({
          type: "SET_NOTIFICATION",
          payload: { show: false, message: "" },
        });
        notificationTimeoutRef.current = null;
      }, 3000);

      dispatch({ type: "SET_WAITLIST_OPEN", payload: false });
      dispatch({ type: "SET_WAITLIST_EMAIL", payload: "" });
    },
    [state.waitlistEmail]
  );

  return (
    <main className="relative min-h-screen bg-zinc-900 text-white overflow-hidden">
      <ParticleBackground />

      {/* Custom notification overlay */}
      <AnimatePresence>
        {state.notification.show && (
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
                    {state.notification.message}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">
                    We'll send you an email when we're ready for you.
                  </p>
                </div>
              </div>
              <button
                onClick={() =>
                  dispatch({
                    type: "SET_NOTIFICATION",
                    payload: { show: false, message: "" },
                  })
                }
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

      <div className="relative z-10">
        <Header
          onContactClick={() =>
            dispatch({ type: "SET_CONTACT_OPEN", payload: true })
          }
        />
        <section id="top" className="scroll-mt-20">
          <HeroSection />
        </section>
        <Suspense fallback={null}>
          <SparkMomentSection />
        </Suspense>
        <Suspense fallback={null}>
          <HowItWorksSection />
        </Suspense>
        <Suspense fallback={null}>
          <ChatUISection />
        </Suspense>
        <Suspense fallback={null}>
          <PricingDemo
            onJoinWaitlist={() =>
              dispatch({ type: "SET_WAITLIST_OPEN", payload: true })
            }
          />
        </Suspense>
        <Suspense fallback={null}>
          <CtaSection />
        </Suspense>
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
              onClick={() =>
                dispatch({ type: "SET_CONTACT_OPEN", payload: true })
              }
              className="hover:text-blue-300 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </footer>

      <Dialog
        open={state.isContactOpen}
        onOpenChange={(open) => {
          dispatch({ type: "SET_CONTACT_OPEN", payload: open });
          if (!open) {
            // Reset states when modal closes
            dispatch({ type: "RESET_SUBMISSION" });
            dispatch({ type: "RESET_FORM" });
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px] fixed left-[50%] bottom-4 top-auto rounded-3xl sm:bottom-auto sm:top-[45%] bg-zinc-900/80 backdrop-blur-xl border border-zinc-700/50 text-white shadow-2xl data-[state=open]:animate-slide-in-from-bottom data-[state=closed]:animate-slide-out-to-bottom">
          <DialogHeader>
            <DialogTitle className="text-white">Contact Us</DialogTitle>
            <DialogDescription className="text-zinc-400">
              Send us a message and we'll get back to you ASAP.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!state.submission.isSubmitting &&
                !state.submission.isSuccess && (
                  <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
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
                        value={state.contactForm.name}
                        onChange={handleFormDataChange("name")}
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
                        value={state.contactForm.email}
                        onChange={handleFormDataChange("email")}
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
                        value={state.contactForm.message}
                        onChange={handleFormDataChange("message")}
                        required
                        rows={5}
                        className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-blue-500/20"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          dispatch({
                            type: "SET_CONTACT_OPEN",
                            payload: false,
                          });
                          dispatch({ type: "RESET_SUBMISSION" });
                          dispatch({ type: "RESET_FORM" });
                        }}
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
                  </motion.div>
                )}
            </AnimatePresence>

            {/* Loading and Success Indicator */}
            <AnimatePresence mode="wait">
              {(state.submission.isSubmitting ||
                state.submission.isSuccess) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    {state.submission.isSubmitting &&
                      !state.submission.isSuccess && (
                        <motion.div
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.8, opacity: 0 }}
                          className="flex flex-col items-center space-y-4"
                        >
                          <div className="relative w-12 h-12">
                            <div className="absolute inset-0 border-4 border-blue-500/20 rounded-full"></div>
                            <motion.div
                              className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            ></motion.div>
                          </div>
                          <p className="text-base text-zinc-300 font-medium">
                            We'll get back to you ASAP.
                          </p>
                        </motion.div>
                      )}

                    {state.submission.isSuccess && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                        }}
                        className="flex flex-col items-center space-y-3"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.1,
                          }}
                          className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center"
                        >
                          <motion.svg
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-green-500"
                          >
                            <motion.path
                              d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </motion.svg>
                        </motion.div>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                          className="text-sm text-green-400 font-semibold"
                        >
                          Message sent successfully!
                        </motion.p>
                        <motion.p
                          initial={{ y: 10, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-xs text-zinc-400 text-center max-w-xs"
                        >
                          We'll get back to you soon.
                        </motion.p>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
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
      <Dialog
        open={state.isWaitlistOpen}
        onOpenChange={(open) =>
          dispatch({ type: "SET_WAITLIST_OPEN", payload: open })
        }
      >
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
                value={state.waitlistEmail}
                onChange={handleWaitlistEmailChange}
                required
                className="bg-zinc-800/60 backdrop-blur-sm border-zinc-700/50 text-white placeholder:text-zinc-500 focus:border-blue-500/50 focus:ring-blue-500/20"
              />
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() =>
                  dispatch({ type: "SET_WAITLIST_OPEN", payload: false })
                }
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
