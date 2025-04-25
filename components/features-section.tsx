"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Real-time insights from your actual accounts",
    description:
      "Connect your accounts and get instant analysis of your spending patterns, savings opportunities, and investment potential.",
    gradient: "from-purple-500/20 to-indigo-500/20",
    borderGradient: "from-purple-500/30 to-indigo-500/30",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-purple-400"
      >
        <path d="M3 3v18h18"></path>
        <path d="m19 9-5 5-4-4-3 3"></path>
      </svg>
    ),
  },
  {
    title: "AI chat that feels like therapy, not tech",
    description:
      "Have natural conversations about your money without judgment. Ask anything and get personalized guidance that adapts to your situation.",
    gradient: "from-indigo-500/20 to-mint-500/20",
    borderGradient: "from-indigo-500/30 to-mint-500/30",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-indigo-400"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M13 8h2"></path>
        <path d="M13 12h2"></path>
      </svg>
    ),
  },
  {
    title:
      "A clean timeline that shows how your money moves across your future",
    description:
      "Visualize your financial journey with a roadmap that helps you plan for short-term needs and long-term dreams.",
    gradient: "from-mint-500/20 to-purple-500/20",
    borderGradient: "from-mint-500/30 to-purple-500/30",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-mint-400"
      >
        <path d="M12 22v-6"></path>
        <path d="M12 8V2"></path>
        <path d="M4 12H2"></path>
        <path d="M10 12H8"></path>
        <path d="M16 12h-2"></path>
        <path d="M22 12h-2"></path>
        <circle cx="12" cy="12" r="2"></circle>
      </svg>
    ),
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="py-16 sm:py-20 md:py-24 px-4 md:px-6 lg:px-8"
      id="features"
    >
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 px-2">
            Intelligent features for your
            <span className="bg-gradient-to-r from-purple-400 to-mint-400 text-transparent bg-clip-text block sm:inline sm:ml-2">
              financial future
            </span>
          </h2>
          <p className="text-zinc-300 max-w-2xl mx-auto text-base sm:text-lg px-4 sm:px-6 md:px-0">
            Financify combines cutting-edge AI with human-centered design to
            transform how you manage money.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative group cursor-pointer"
            >
              <div
                className={`absolute -inset-0.5 bg-gradient-to-r ${feature.borderGradient} opacity-0 group-hover:opacity-100 transition duration-300 blur-sm rounded-xl`}
              ></div>
              <div
                className={`relative bg-zinc-900/60 backdrop-blur-sm border border-zinc-800/50 rounded-xl p-6 sm:p-8 h-full z-10 overflow-hidden transition-all duration-300 group-hover:bg-zinc-900/80`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="bg-zinc-800/50 p-2 sm:p-3 rounded-lg inline-block mb-4 sm:mb-5">
                  {feature.icon}
                </div>

                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-400">
                  {feature.description}
                </p>

                {/* Decorative corner */}
                <div
                  className={`absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-10 rounded-full blur-xl`}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
