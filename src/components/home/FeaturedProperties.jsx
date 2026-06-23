"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionTitle from "../shared/SectionTitle";
import PropertyCard from "../property/PropertyCard";

/**
 * TEMP MOCK DATA — Phase 5/backend integration-এ এটা বদলে যাবে:
 *   const res = await axiosPublic.get("/properties?status=approved&limit=6");
 * তখন নিচের `properties` array-টা সরিয়ে res.data বসাবে। বাকি JSX অপরিবর্তিত থাকবে।
 */
const properties = [
  { _id: "1", title: "Sunny 2-Bed Apartment", location: "Gulshan 2, Dhaka", type: "Apartment", price: 28000, beds: 2, baths: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=800" },
  { _id: "2", title: "Quiet Family House", location: "Bashundhara R/A, Dhaka", type: "House", price: 45000, beds: 4, baths: 3, image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800" },
  { _id: "3", title: "Modern Studio Unit", location: "Banani, Dhaka", type: "Studio", price: 16000, beds: 1, baths: 1, image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800" },
  { _id: "4", title: "Shared Room near Campus", location: "Mohammadpur, Dhaka", type: "Room", price: 7000, beds: 1, baths: 1, image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800" },
  { _id: "5", title: "Compact Office Space", location: "Dhanmondi, Dhaka", type: "Office", price: 32000, beds: 0, baths: 1, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800" },
  { _id: "6", title: "Riverside Duplex", location: "Uttara, Dhaka", type: "House", price: 52000, beds: 3, baths: 2, image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800" },
];

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

export default function FeaturedProperties() {
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