"use client";

import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Loading from "@/components/shared/Loading";

const ROLES = ["tenant", "owner", "admin"];

export default function AllUsersPage() {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/users/all")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to load users:", err))
      .finally(() => setLoading(false));
  }, [axiosSecure]);

  const handleRoleChange = async (id, role) => {
    try {
      await axiosSecure.patch(`/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u._id === id ? { ...u, role } : u)));
      toast.success("Role updated");
    } catch (err) {
      toast.error("Could not update role");
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">All Users</h1>

      <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-blueprint-charcoal/10 text-left">
              <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Name</th>
              <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Email</th>
              <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b border-blueprint-charcoal/5 last:border-0">
                <td className="px-4 py-3 text-blueprint-charcoal">{u.name}</td>
                <td className="px-4 py-3 text-blueprint-slate">{u.email}</td>
                <td className="px-4 py-3">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className="border border-blueprint-charcoal/15 rounded-sm px-2 py-1.5 text-sm"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}