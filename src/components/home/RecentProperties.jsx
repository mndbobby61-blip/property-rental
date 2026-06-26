"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";
import PropertyCard from "../property/PropertyCard";
import useAxiosPublic from "@/hooks/useAxiosPublic";

function timeAgo(date) {
  const diffMs = Date.now() - new Date(date).getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Added today";
  if (days === 1) return "Added 1d ago";
  return `Added ${days}d ago`;
}

export default function RecentProperties() {
  const axiosPublic = useAxiosPublic();
  const [properties, setProperties] = useState([]);

  // ⚠️ আগে এখানে mock data ছিল (_id: "7", "8", "9") — এখন real backend থেকে আনা হচ্ছে।
  useEffect(() => {
    axiosPublic
      .get("/properties", { params: { limit: 3 } })
      .then((res) => setProperties(res.data.properties || []))
      .catch((err) => console.error("Failed to load recent properties:", err));
  }, [axiosPublic]);

  if (properties.length === 0) return null;

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="JUST LISTED" title="Recently added properties" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {properties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              badge={property.createdAt ? timeAgo(property.createdAt) : undefined}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}