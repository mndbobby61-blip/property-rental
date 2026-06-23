"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";

/**
 * TEMP MOCK DATA — পরে এটা backend থেকে আসবে:
 *   const res = await axiosPublic.get("/reviews?limit=4");
 */
const reviews = [
  {
    name: "Nusrat Jahan",
    email: "nusrat.j@example.com",
    date: "May 12, 2026",
    rating: 5,
    comment:
      "Moved into a 2-bed in Bashundhara within two weeks of signing up. The listing photos matched the actual flat exactly — first time that's happened for me.",
  },
  {
    name: "Tanvir Ahmed",
    email: "tanvir.ahmed@example.com",
    date: "April 28, 2026",
    rating: 5,
    comment:
      "Paid the booking fee through Stripe and had a confirmation in minutes. My landlord communication has been smooth ever since.",
  },
  {
    name: "Priya Sarkar",
    email: "priya.sarkar@example.com",
    date: "April 9, 2026",
    rating: 4,
    comment:
      "Liked being able to favorite a few places and compare them side by side before booking a viewing. Saved me a lot of back-and-forth.",
  },
  {
    name: "Rakibul Hasan",
    email: "rakibul.h@example.com",
    date: "March 22, 2026",
    rating: 5,
    comment:
      "As a tenant who's been scammed before on Facebook groups, the 'approved listing' badge actually meant something here.",
  },
];

export default function Reviews() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow="TENANT NOTES"
          title="What renters are saying"
          align="center"
        />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reviews.map((review, i) => (
            <motion.div
              key={review.email}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="border border-blueprint-charcoal/10 rounded-sm p-6"
            >
              <Quote size={18} className="text-blueprint-amber mb-3" />
              <p className="text-blueprint-charcoal text-sm leading-relaxed mb-5">
                {review.comment}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blueprint-charcoal">{review.name}</p>
                  <p className="font-mono text-xs text-blueprint-slate">{review.date}</p>
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