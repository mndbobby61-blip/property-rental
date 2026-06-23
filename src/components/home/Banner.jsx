"use client";

import { motion } from "framer-motion";
import SearchBar from "./SearchBar";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Banner() {
  return (
    <section className="relative bg-blueprint-ink overflow-hidden">
      {/* faint blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #8FB8D9 1px, transparent 1px), linear-gradient(to bottom, #8FB8D9 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-32"
      >
        {/* title-block style tag, like the corner stamp on an architectural drawing */}
        <motion.div
          variants={item}
          className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-blueprint-line border border-blueprint-line/30 rounded-sm px-3 py-1.5 mb-8"
        >
          <span>Keyspace Survey</span>
          <span className="text-blueprint-line/40">•</span>
          <span>Approved Listings Only</span>
        </motion.div>

        <motion.h1
          variants={item}
          className="font-display text-4xl md:text-6xl font-medium text-blueprint-paper leading-[1.1] max-w-3xl"
        >
          Find a home that's already been{" "}
          <span className="italic text-blueprint-amber">checked.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl text-blueprint-line text-base md:text-lg leading-relaxed"
        >
          Every listing on Keyspace is reviewed by our team before it reaches you —
          verified owners, real photos, and pricing that matches what you'll actually pay.
        </motion.p>

        <motion.div variants={item} className="mt-10">
          <SearchBar />
        </motion.div>
      </motion.div>
    </section>
  );
}