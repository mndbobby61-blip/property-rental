"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { MapPin, BedDouble, Bath, Maximize, Heart, CalendarCheck, Star, Quote } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "../shared/Loading";
import ErrorPage from "../shared/ErrorPage";
import BookingModal from "./BookingModal";

export default function PropertyDetailsContent({ id }) {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [favoriting, setFavoriting] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  useEffect(() => {
    setLoading(true);
    axiosPublic
      .get(`/properties/${id}`)
      .then((res) => setProperty(res.data))
      .catch((err) => {
        console.error("Failed to load property:", err.response?.status, err.response?.data || err.message);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, [id, axiosPublic]);

  const loadReviews = () => {
    axiosPublic
      .get(`/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error("Failed to load reviews:", err));
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  if (loading) return <Loading />;

  if (error || !property) {
    return (
      <ErrorPage
        code="404"
        title="Property not found"
        message="This listing may have been removed, or the link is incorrect."
      />
    );
  }

  const handleFavoriteClick = async () => {
    setFavoriting(true);
    try {
      const res = await axiosPublic.post("/favorites", { email: user.email, propertyId: id });
      if (res.data.insertedId === null) {
        toast("Already in your favorites");
      } else {
        toast.success("Added to favorites!");
      }
    } catch (err) {
      toast.error("Could not add to favorites");
    } finally {
      setFavoriting(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please write a comment");
      return;
    }
    setSubmittingReview(true);
    try {
      await axiosPublic.post("/reviews", {
        propertyId: id,
        name: user.name,
        email: user.email,
        rating,
        comment,
      });
      toast.success("Review submitted!");
      setComment("");
      setRating(5);
      loadReviews();
    } catch (err) {
      toast.error("Could not submit review");
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <>
      <div className="bg-blueprint-paper min-h-screen py-12">
        <div className="max-w-5xl mx-auto px-6">
          <div className="relative aspect-[16/9] rounded-sm overflow-hidden mb-8">
            <img src={property.image} alt={property.title} className="h-full w-full object-cover" />
            <span className="absolute top-4 right-4 bg-blueprint-paper/95 text-blueprint-charcoal font-mono text-xs uppercase tracking-wide px-3 py-1.5 rounded-sm">
              {property.type}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10">
            <div>
              <div className="flex items-center gap-1.5 text-blueprint-slate text-sm mb-2">
                <MapPin size={15} />
                <span>{property.location}</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-medium text-blueprint-charcoal mb-4">
                {property.title}
              </h1>

              <div className="flex items-center gap-6 text-blueprint-slate text-sm mb-6 pb-6 border-b border-blueprint-charcoal/10">
                <span className="flex items-center gap-1.5">
                  <BedDouble size={16} /> {property.beds} Beds
                </span>
                <span className="flex items-center gap-1.5">
                  <Bath size={16} /> {property.baths} Baths
                </span>
                {property.size && (
                  <span className="flex items-center gap-1.5">
                    <Maximize size={16} /> {property.size} sqft
                  </span>
                )}
              </div>

              <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-slate mb-3">
                Description
              </h2>
              <p className="text-blueprint-charcoal text-sm leading-relaxed mb-8">
                {property.description || "No description provided."}
              </p>

              {property.amenities?.length > 0 && (
                <>
                  <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-slate mb-3">
                    Amenities
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {property.amenities.map((a) => (
                      <span
                        key={a}
                        className="text-xs font-mono bg-blueprint-charcoal/5 text-blueprint-charcoal px-3 py-1.5 rounded-sm"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                </>
              )}

              <h2 className="font-mono text-xs tracking-[0.15em] uppercase text-blueprint-slate mb-3 mt-10">
                Reviews ({reviews.length})
              </h2>

              <form onSubmit={handleReviewSubmit} className="bg-white border border-blueprint-charcoal/10 rounded-sm p-4 mb-6">
                <div className="flex items-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => setRating(n)}>
                      <Star
                        size={18}
                        className={n <= rating ? "fill-blueprint-amber text-blueprint-amber" : "text-blueprint-charcoal/20"}
                      />
                    </button>
                  ))}
                </div>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                  placeholder="Write your review..."
                  className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm mb-3"
                />
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="bg-blueprint-amber text-blueprint-ink font-medium text-sm px-5 py-2.5 rounded-sm hover:bg-blueprint-amber/90 transition-colors disabled:opacity-60"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>

              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r._id} className="border border-blueprint-charcoal/10 rounded-sm p-4">
                    <Quote size={16} className="text-blueprint-amber mb-2" />
                    <p className="text-blueprint-charcoal text-sm leading-relaxed mb-3">{r.comment}</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blueprint-charcoal">{r.name}</p>
                        <p className="font-mono text-xs text-blueprint-slate">
                          {r.email} · {new Date(r.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <Star
                            key={idx}
                            size={13}
                            className={idx < r.rating ? "fill-blueprint-amber text-blueprint-amber" : "text-blueprint-charcoal/15"}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:sticky lg:top-24 h-fit border border-blueprint-charcoal/10 rounded-sm p-6 bg-white">
              <p className="font-mono text-2xl text-blueprint-ink font-semibold mb-1">
                ৳{Number(property.price).toLocaleString()}
                <span className="text-blueprint-slate text-sm font-normal">/{property.rentType}</span>
              </p>
              <p className="text-blueprint-slate text-xs mb-6">Booking fee charged via Stripe</p>

              <button
                onClick={() => setShowModal(true)}
                className="w-full flex items-center justify-center gap-2 bg-blueprint-amber text-blueprint-ink font-medium text-sm py-3 rounded-sm hover:bg-blueprint-amber/90 transition-colors mb-3"
              >
                <CalendarCheck size={16} /> Book Property
              </button>

              <button
                onClick={handleFavoriteClick}
                disabled={favoriting}
                className="w-full flex items-center justify-center gap-2 border border-blueprint-charcoal/15 text-blueprint-charcoal font-medium text-sm py-3 rounded-sm hover:bg-blueprint-charcoal/5 transition-colors disabled:opacity-60"
              >
                <Heart size={16} /> {favoriting ? "Adding..." : "Add to Favorites"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && <BookingModal property={property} onClose={() => setShowModal(false)} />}
    </>
  );
}