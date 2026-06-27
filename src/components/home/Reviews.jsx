"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";
import useAxiosPublic from "@/hooks/useAxiosPublic";

export default function Reviews() {
  const axiosPublic = useAxiosPublic();
  const [reviews, setReviews] = useState([]);

  // ⚠️ আগে এখানে ৪টা mock review (হার্ডকোড করা) ছিল — এখন real review collection থেকে
  // top-rated/সাম্প্রতিক ৪টা রিভিউ আনা হচ্ছে।
  useEffect(() => {
    axiosPublic
      .get("/reviews", { params: { limit: 4 } })
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  }, [axiosPublic]);

  if (reviews.length === 0) return null; // কোনো রিভিউ না থাকলে সেকশন hide

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle eyebrow="TENANT NOTES" title="What renters are saying" align="center" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review._id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-blueprint-charcoal/10 rounded-sm p-6"
            >
              <Quote size={18} className="text-blueprint-amber mb-3" />
              <p className="text-blueprint-charcoal text-sm leading-relaxed mb-5">{review.comment}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blueprint-charcoal">{review.name}</p>
                  <p className="font-mono text-xs text-blueprint-slate">
                    {new Date(review.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      className={
                        idx < review.rating
                          ? "fill-blueprint-amber text-blueprint-amber"
                          : "text-blueprint-charcoal/15"
                      }
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}