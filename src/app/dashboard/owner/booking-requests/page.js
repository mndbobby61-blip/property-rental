"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Check, X } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

export default function BookingRequestsPage() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosPublic
      .get(`/booking-requests/${user.email}`)
      .then((res) => setBookings(res.data))
      .catch((err) => console.error("Failed to load booking requests:", err))
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  const handleStatusChange = async (id, status) => {
    try {
      await axiosPublic.patch(`/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, bookingStatus: status } : b)));
      toast.success(`Booking ${status}`);
    } catch (err) {
      toast.error("Could not update booking");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">Booking Requests</h1>

      {bookings.length === 0 ? (
        <p className="text-blueprint-slate text-sm">No booking requests yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blueprint-charcoal/10 text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Tenant</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Property</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Amount</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Status</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-blueprint-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-blueprint-charcoal">
                    {b.tenantName}
                    <br />
                    <span className="text-xs text-blueprint-slate">{b.tenantEmail}</span>
                  </td>
                  <td className="px-4 py-3 text-blueprint-charcoal">{b.propertyTitle}</td>
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
                    {b.bookingStatus === "pending" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusChange(b._id, "approved")}
                          className="text-green-600 hover:text-green-800"
                          aria-label="Approve"
                        >
                          <Check size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusChange(b._id, "rejected")}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Reject"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
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