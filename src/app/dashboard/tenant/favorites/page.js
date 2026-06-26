"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

export default function FavoritesPage() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosPublic
      .get(`/favorites/${user.email}`)
      .then((res) => setFavorites(res.data))
      .catch((err) => console.error("Failed to load favorites:", err))
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  const handleRemove = async (favoriteId) => {
    try {
      await axiosPublic.delete(`/favorites/${favoriteId}`);
      setFavorites((prev) => prev.filter((f) => f.favoriteId !== favoriteId));
      toast.success("Removed from favorites");
    } catch (err) {
      toast.error("Could not remove");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">My Favorites</h1>

      {favorites.length === 0 ? (
        <p className="text-blueprint-slate text-sm">You haven&apos;t added any favorites yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blueprint-charcoal/10 text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Property</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Location</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Price</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {favorites.map((f) => (
                <tr key={f._id} className="border-b border-blueprint-charcoal/5 last:border-0">
                  <td className="px-4 py-3 text-blueprint-charcoal">
                    <Link href={`/property/${f._id}`} className="hover:text-blueprint-amber">
                      {f.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-blueprint-slate">{f.location}</td>
                  <td className="px-4 py-3 font-mono text-blueprint-ink">
                    ৳{Number(f.price).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleRemove(f.favoriteId)}
                      className="text-red-500 hover:text-red-700"
                      aria-label="Remove favorite"
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