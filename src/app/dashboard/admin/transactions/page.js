"use client";

import { useState, useEffect } from "react";
import useAxiosPublic from "@/hooks/useAxiosPublic";
import Loading from "@/components/shared/Loading";

export default function TransactionsPage() {
  const axiosPublic = useAxiosPublic();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosPublic
      .get("/transactions")
      .then((res) => setTransactions(res.data))
      .catch((err) => console.error("Failed to load transactions:", err))
      .finally(() => setLoading(false));
  }, [axiosPublic]);

  if (loading) return <Loading />;

  return (
    <div>
      <h1 className="font-display text-2xl font-medium text-blueprint-charcoal mb-6">Transactions</h1>

      {transactions.length === 0 ? (
        <p className="text-blueprint-slate text-sm">No transactions yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white border border-blueprint-charcoal/10 rounded-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-blueprint-charcoal/10 text-left">
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Transaction ID</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Property</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Tenant</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Owner</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Amount</th>
                <th className="px-4 py-3 font-mono text-xs uppercase text-blueprint-slate">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t) => (
                <tr key={t.transactionId} className="border-b border-blueprint-charcoal/5 last:border-0">
                  <td className="px-4 py-3 font-mono text-xs text-blueprint-slate">
                    {String(t.transactionId).slice(-8)}
                  </td>
                  <td className="px-4 py-3 text-blueprint-charcoal">{t.propertyName}</td>
                  <td className="px-4 py-3 text-blueprint-slate">{t.tenantName}</td>
                  <td className="px-4 py-3 text-blueprint-slate">{t.ownerName}</td>
                  <td className="px-4 py-3 font-mono text-blueprint-ink">
                    ৳{Number(t.amount).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 font-mono text-blueprint-slate text-xs">
                    {new Date(t.date).toLocaleDateString()}
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