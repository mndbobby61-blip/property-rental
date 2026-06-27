"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Check, X, Trash2, Pencil } from "lucide-react";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";
import RejectionModal from "@/components/dashboard/RejectionModal";

const statusStyles = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminAllPropertiesPage() {
  const axiosSecure = useAxiosSecure();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rejectingId, setRejectingId] = useState(null);

 useEffect(() => {
  axiosSecure
    .get("/properties/all")
    .then((res) => {
      console.log("SUCCESS:", res.data);
      setProperties(res.data);
    })
    .catch((err) => {
      console.log("STATUS:", err.response?.status);
      console.log("DATA:", err.response?.data);
      console.log("FULL:", err);
    })
    .finally(() => setLoading(false));
}, [axiosSecure]);

  const handleApprove = async (id) => {
    try {
      await axiosSecure.patch(`/properties/${id}/status`, { status: "approved" });
      setProperties((prev) => prev.map((p) => (p._id === id ? { ...p, status: "approved" } : p)));
      toast.success("Property approved");
    } catch (err) {
      toast.error("Could not approve");
    }
  };

  const handleRejectSubmit = async (feedback) => {
    try {
      await axiosSecure.patch(`/properties/${rejectingId}/status`, {
        status: "rejected",
        rejectionFeedback: feedback,
      });
      setProperties((prev) =>
        prev.map((p) =>
          p._id === rejectingId ? { ...p, status: "rejected", rejectionFeedback: feedback } : p
        )
      );
      toast.success("Property rejected");
      setRejectingId(null);
    } catch (err) {
      toast.error("Could not reject");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted");
    } catch (err) {
      toast.error("Could not delete");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">All Properties</h1>

      {properties.length === 0 ? (
        <p className="text-blueprint-slate text-sm">No properties yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blueprint-charcoal/10 text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Title</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Owner</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Price</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Status</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="border-b border-blueprint-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-blueprint-charcoal">{p.title}</td>
                  <td className="px-4 py-3 text-blueprint-slate">{p.ownerEmail || "—"}</td>
                  <td className="px-4 py-3 font-mono text-blueprint-ink">
                    ৳{Number(p.price).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-mono px-2 py-1 rounded-sm ${
                        statusStyles[p.status] || statusStyles.pending
                      }`}
                    >
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 items-center">
                      {p.status !== "approved" && (
                        <button
                          onClick={() => handleApprove(p._id)}
                          className="text-green-600 hover:text-green-800"
                          aria-label="Approve"
                        >
                          <Check size={16} />
                        </button>
                      )}
                      {p.status !== "rejected" && (
                        <button
                          onClick={() => setRejectingId(p._id)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Reject"
                        >
                          <X size={16} />
                        </button>
                      )}
                      <Link
                        href={`/dashboard/owner/update-property/${p._id}`}
                        className="text-blueprint-slate hover:text-blueprint-ink"
                        aria-label="Edit property"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-blueprint-slate hover:text-blueprint-charcoal"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {rejectingId && <RejectionModal onClose={() => setRejectingId(null)} onSubmit={handleRejectSubmit} />}
    </div>
  );
}