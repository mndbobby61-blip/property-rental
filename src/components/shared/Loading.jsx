"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blueprint-paper gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
        className="h-12 w-12 rounded-sm border-2 border-blueprint-ink/15 border-t-blueprint-amber flex items-center justify-center"
      >
        <Compass size={20} className="text-blueprint-ink" />
      </motion.div>
      <p className="font-mono text-xs tracking-[0.2em] uppercase text-blueprint-slate">
        Surveying the page
      </p>
    </div>
  );
}