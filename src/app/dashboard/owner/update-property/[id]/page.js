"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

const PROPERTY_TYPES = ["Apartment", "House", "Studio", "Room", "Office", "Land"];
const RENT_TYPES = ["Monthly", "Weekly", "Daily"];

export default function UpdatePropertyPage({ params }) {
  const router = useRouter();
  const axiosPublic = useAxiosPublic();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [propertyId, setPropertyId] = useState(null);

  useEffect(() => {
    // Next.js 15+/16-এ params Promise — await করে নেওয়া হচ্ছে
    Promise.resolve(params).then(({ id }) => {
      setPropertyId(id);
      axiosPublic
        .get(`/properties/${id}`)
        .then((res) => setProperty(res.data))
        .catch((err) => console.error("Failed to load property:", err))
        .finally(() => setLoading(false));
    });
  }, [params, axiosPublic]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const amenities = form.amenities.value
      .split(",")
      .map((a) => a.trim())
      .filter(Boolean);

    const updatedData = {
      title: form.title.value,
      description: form.description.value,
      location: form.location.value,
      type: form.type.value,
      price: Number(form.price.value),
      rentType: form.rentType.value,
      beds: Number(form.beds.value),
      baths: Number(form.baths.value),
      size: Number(form.size.value),
      amenities,
      image: form.image.value,
      extraFeatures: form.extraFeatures.value,
    };

    setSubmitting(true);
    try {
      await axiosPublic.patch(`/properties/${propertyId}`, updatedData);
      toast.success("Property updated!");
      router.push("/dashboard/owner/my-properties");
    } catch (err) {
      toast.error("Failed to update property");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  if (!property) return <p className="text-blueprint-slate text-sm">Property not found.</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-2">Update Property</h1>
      <p className="text-blueprint-slate text-sm mb-6">
        Editing will not change the current approval status.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white border border-blueprint-charcoal/10 rounded-sm p-6 max-w-3xl space-y-5"
      >
        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Property Title
          </label>
          <input
            type="text"
            name="title"
            required
            defaultValue={property.title}
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Description
          </label>
          <textarea
            name="description"
            rows={3}
            required
            defaultValue={property.description}
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              defaultValue={property.location}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Property Type
            </label>
            <select
              name="type"
              required
              defaultValue={property.type}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            >
              {PROPERTY_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Rent (Price)
            </label>
            <input
              type="number"
              name="price"
              required
              min="0"
              defaultValue={property.price}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Rent Type
            </label>
            <select
              name="rentType"
              required
              defaultValue={property.rentType}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            >
              {RENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Bedrooms
            </label>
            <input
              type="number"
              name="beds"
              required
              min="0"
              defaultValue={property.beds}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Bathrooms
            </label>
            <input
              type="number"
              name="baths"
              required
              min="0"
              defaultValue={property.baths}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
          <div>
            <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
              Size (sqft)
            </label>
            <input
              type="number"
              name="size"
              min="0"
              defaultValue={property.size}
              className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Amenities (comma separated)
          </label>
          <input
            type="text"
            name="amenities"
            defaultValue={property.amenities?.join(", ")}
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            required
            defaultValue={property.image}
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Extra Features
          </label>
          <textarea
            name="extraFeatures"
            rows={2}
            defaultValue={property.extraFeatures}
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blueprint-amber text-blueprint-ink font-medium text-sm px-6 py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60"
        >
          {submitting ? "Updating..." : "Update Property"}
        </button>
      </form>
    </div>
  );
}