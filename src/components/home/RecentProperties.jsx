"use client";

import { motion } from "framer-motion";
import SectionTitle from "../shared/SectionTitle";
import PropertyCard from "../property/PropertyCard";

/**
 * Extra Section #2 — Recently Added Properties
 * TEMP MOCK DATA — পরে backend থেকে আসবে:
 *   const res = await axiosPublic.get("/properties?sort=-createdAt&limit=4");
 * Badge text (`Added Xd ago`) backend থেকে createdAt দিয়ে calculate করবে।
 */
const recentProperties = [
  { _id: "7", title: "Bright Corner Apartment", location: "Mirpur DOHS, Dhaka", type: "Apartment", price: 21000, beds: 2, baths: 1, image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800", badge: "Added 1d ago" },
  { _id: "8", title: "Furnished Studio", location: "Dhanmondi, Dhaka", type: "Studio", price: 19500, beds: 1, baths: 1, image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?q=80&w=800", badge: "Added 2d ago" },
  { _id: "9", title: "Spacious Family Home", location: "Baridhara, Dhaka", type: "House", price: 60000, beds: 4, baths: 3, image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=800", badge: "Added 3d ago" },
];

export default function RecentProperties() {
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
          {recentProperties.map((property) => (
            <PropertyCard key={property._id} property={property} badge={property.badge} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}