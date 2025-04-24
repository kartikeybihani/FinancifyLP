"use client"

import { motion } from "framer-motion"

export default function GoalPlanningSection() {
  return (
    <section className="py-24 px-4 md:px-6 lg:px-8 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 bg-zinc-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-zinc-300 border border-zinc-700/50">
              <span className="h-2 w-2 rounded-full bg-purple-400"></span>
              <span>Personalized Planning</span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span className="block">Your dreams.</span>
              <span className="block mt-1 bg-gradient-to-r from-purple-400 via-pink-500 to-amber-400 text-transparent bg-clip-text">
                Your timeline.
              </span>
              <span className="block mt-1">Your journey.</span>
            </h2>

            <p className="text-lg text-zinc-300 max-w-xl">
              Financify doesn't just tell you what to do—it helps you craft a personalized roadmap that aligns with your
              unique goals and values. From emergency funds to dream homes, visualize your entire financial journey in
              one place.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="bg-zinc-800/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-zinc-700/50">
                <div className="text-2xl font-bold text-purple-400">93%</div>
                <div className="text-sm text-zinc-400">of users achieve their first financial goal</div>
              </div>

              <div className="bg-zinc-800/50 backdrop-blur-sm px-5 py-3 rounded-lg border border-zinc-700/50">
                <div className="text-2xl font-bold text-amber-400">2.5x</div>
                <div className="text-sm text-zinc-400">faster savings rate than traditional methods</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            {/* Placeholder for user's custom iPhone mockup showing goals timeline */}
            <div className="relative">
              <div className="w-[320px] h-[650px] bg-zinc-900/40 border-2 border-dashed border-zinc-700 rounded-[40px] flex items-center justify-center">
                <div className="text-center p-6">
                  <p className="text-zinc-400 mb-2">Your goals timeline screen here</p>
                  <p className="text-xs text-zinc-500">Replace with your custom goals timeline screenshot</p>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-xl"></div>

              {/* Floating elements */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3, ease: "easeInOut" }}
                className="absolute -top-4 -left-20 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  <span className="text-sm font-medium">Goal achieved</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [5, -5, 5] }}
                transition={{ repeat: Number.POSITIVE_INFINITY, duration: 3.5, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-16 bg-zinc-800/80 backdrop-blur-sm border border-zinc-700/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium">On track</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute top-1/4 left-0 w-full h-1/2 bg-gradient-to-r from-purple-900/10 via-transparent to-amber-900/10 transform -skew-y-6 -z-10"></div>
    </section>
  )
}
