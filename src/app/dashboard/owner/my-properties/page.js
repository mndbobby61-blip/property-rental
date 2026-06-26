"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

const statusStyles = {
  approved: "bg-green-100 text-green-700",
  pending: "bg-amber-100 text-amber-700",
  rejected: "bg-red-100 text-red-700",
};

export default function MyPropertiesPage() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosPublic
      .get(`/properties/owner/${user.email}`)
      .then((res) => setProperties(res.data))
      .catch((err) => console.error("Failed to load properties:", err))
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  const handleDelete = async (id) => {
    try {
      await axiosPublic.delete(`/properties/${id}`);
      setProperties((prev) => prev.filter((p) => p._id !== id));
      toast.success("Property deleted");
    } catch (err) {
      toast.error("Could not delete");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">My Properties</h1>

      {properties.length === 0 ? (
        <p className="text-blueprint-slate text-sm">You haven&apos;t added any properties yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blueprint-charcoal/10 text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Title</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Type</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Price</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p) => (
                <tr key={p._id} className="border-b border-blueprint-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-blueprint-charcoal">{p.title}</td>
                  <td className="px-4 py-3 text-blueprint-slate">{p.type}</td>
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
                    {p.status === "rejected" && p.rejectionFeedback && (
                      <span
                        title={p.rejectionFeedback}
                        className="ml-2 text-xs text-blueprint-slate cursor-help"
                      >
                        👁️
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Delete property"
                    >
                      <Trash2 size={16} />
                    </button>
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