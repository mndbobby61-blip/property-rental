"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";
import PropertyCard from "../property/PropertyCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function FeaturedProperties() {
  const axiosPublic = useAxiosPublic();
  const [properties, setProperties] = useState([]);

  // ⚠️ আগে এখানে mock data ছিল (_id: "1", "2"...) — এখন real backend থেকে আনা হচ্ছে।
  useEffect(() => {
    axiosPublic
      .get("/properties", { params: { limit: 6 } })
      .then((res) => setProperties(res.data.properties || []))
      .catch((err) => console.error("Failed to load featured properties:", err));
  }, [axiosPublic]);

  if (properties.length === 0) return null; // ডাটা না এলে সেকশনটা hide থাকবে

  return (
    <section className="bg-blueprint-paper py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionTitle
            eyebrow={`${properties.length} LISTINGS SHOWN`}
            title="Featured places to stay"
            description="A snapshot of approved listings, picked fresh from across the platform."
          />
          <Link
            href="/all-properties"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blueprint-ink hover:text-blueprint-amber transition-colors shrink-0"
          >
            View all properties <ArrowRight size={15} />
          </Link>
        </div>

        <motion.div
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {properties.map((property) => (
            <motion.div key={property._id} variants={cardVariants}>
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}