"use client";

import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Wallet, Building2, CalendarCheck } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

function SummaryCard({ icon: Icon, label, value }) {
  return (
    <div className="bg-white border border-blueprint-charcoal/10 rounded-sm p-5 flex items-center gap-4">
      <div className="h-11 w-11 rounded-sm bg-blueprint-amber/15 border border-blueprint-amber/30 flex items-center justify-center shrink-0">
        <Icon size={18} className="text-blueprint-amber" />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-wide text-blueprint-slate mb-1">{label}</p>
        <p className="font-display text-2xl font-medium text-blueprint-charcoal">{value}</p>
      </div>
    </div>
  );
}

export default function OwnerDashboardHome() {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;
    axiosPublic
      .get(`/owner-stats/${user.email}`)
      .then((res) => setStats(res.data))
      .catch((err) => console.error("Failed to load owner stats:", err))
      .finally(() => setLoading(false));
  }, [user, axiosPublic]);

  if (loading) return <Loading />;
  if (!stats) return <p className="text-blueprint-slate text-sm">Could not load dashboard stats.</p>;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">Dashboard Home</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <SummaryCard
          icon={Wallet}
          label="Total Earnings"
          value={`৳${Number(stats.totalEarnings).toLocaleString()}`}
        />
        <SummaryCard icon={Building2} label="Total Properties" value={stats.totalProperties} />
        <SummaryCard icon={CalendarCheck} label="Total Bookings" value={stats.totalBookings} />
      </div>

      <div className="bg-white border border-blueprint-charcoal/10 rounded-sm p-5">
        <p className="font-mono text-xs uppercase tracking-wide text-blueprint-slate mb-4">
          Monthly Earnings (Last 12 Months)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={stats.monthlyEarnings}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1F2A3315" />
            <XAxis dataKey="month" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Line type="monotone" dataKey="earnings" stroke="#E8A23D" strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}