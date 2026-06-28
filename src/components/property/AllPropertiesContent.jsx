"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import PropertyCard from "./PropertyCard";
import PropertyFilterBar from "./PropertyFilterBar";
import Pagination from "./Pagination";
import SectionTitle from "../shared/SectionTitle";
import Loading from "../shared/Loading";

const LIMIT = 6;

const gridVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function AllPropertiesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const axiosPublic = useAxiosPublic();

  const [properties, setProperties] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const sort = searchParams.get("sort") || "";
  const page = Number(searchParams.get("page")) || 1;

  
  const updateParams = useCallback(
    (updates) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      if (!("page" in updates)) params.set("page", "1");
      router.push(`/all-properties?${params.toString()}`);
    },
    [router, searchParams]
  );

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get("/properties", { params: { location, type, min, max, sort, page, limit: LIMIT } })
      .then((res) => {
        setProperties(res.data.properties || []);
        setTotalPages(res.data.totalPages || 1);
      })
      .catch((err) => console.error("Failed to load properties:", err))
      .finally(() => setLoading(false));
  }, [location, type, min, max, sort, page, axiosPublic]);

  return (
    <div className="bg-blueprint-paper min-h-screen py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <SectionTitle
          eyebrow="BROWSE LISTINGS"
          title="All properties"
          description="Search, filter, and sort through every approved listing on Keyspace."
        />

        <div className="mt-8">
          <PropertyFilterBar location={location} type={type} sort={sort} onChange={updateParams} />
        </div>

        <div className="mt-8">
          {loading ? (
            <Loading />
          ) : properties.length === 0 ? (
            <p className="text-center text-blueprint-slate py-20">
              No properties match your search. Try adjusting the filters.
            </p>
          ) : (
            <motion.div
              variants={gridVariants}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {properties.map((property) => (
                <motion.div key={property._id} variants={cardVariants}>
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {!loading && totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => updateParams({ page: String(newPage) })}
            />
          </div>
        )}
      </div>
    </div>
  );
}