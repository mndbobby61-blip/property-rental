"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "./SearchBar";


const bannerImages = [
  "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1600",
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=1600",
];

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
  const [currentImage, setCurrentImage] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % bannerImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-blueprint-ink overflow-hidden">
      
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentImage}
            src={bannerImages[currentImage]}
            alt=""
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-blueprint-ink/40" />
      </div>

      
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #8FB8D9 1px, transparent 1px), linear-gradient(to bottom, #8FB8D9 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {bannerImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentImage(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === currentImage ? "w-6 bg-blueprint-amber" : "w-1.5 bg-blueprint-paper/40"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative max-w-6xl mx-auto px-6 pt-28 pb-24 md:pt-36 md:pb-32"
      >
        <motion.div
          variants={item}
          className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-blueprint-line border border-blueprint-line/30 rounded-sm px-3 py-1.5 mb-8 bg-blueprint-ink/40"
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