"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

export default function MyBookingsPage() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosPublic
      .get("/bookings", { params: { email: user.email } })
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to load bookings:", err))
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <p className="text-blueprint-slate text-sm">You haven&apos;t booked any properties yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blueprint-charcoal/10 text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Property</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Booking Date</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Amount</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Booking Status</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-blueprint-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-blueprint-charcoal">{b.propertyTitle}</td>
                  <td className="px-4 py-3 font-mono text-blueprint-slate">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-blueprint-ink">
                    ৳{Number(b.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-mono px-2 py-1 rounded-sm ${
                        b.bookingStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : b.bookingStatus === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-mono px-2 py-1 rounded-sm ${
                        b.paymentStatus === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-blueprint-charcoal/10 text-blueprint-slate"
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}