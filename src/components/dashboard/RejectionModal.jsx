"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function RejectionModal({ onClose, onSubmit }) {
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(feedback);
  };

  return (
    <div className="fixed inset-0 bg-blueprint-ink/60 flex items-center justify-center z-[100] px-4">
      <div className="bg-white rounded-sm max-w-md w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-blueprint-slate hover:text-blueprint-charcoal"
        >
          <X size={20} />
        </button>

        <h2 className="font-display text-xl font-medium text-blueprint-charcoal mb-4">
          Reject Property
        </h2>

        <form onSubmit={handleSubmit}>
          <label className="text-xs font-mono uppercase text-blueprint-slate mb-1.5 block">
            Rejection Feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
            rows={4}
            placeholder="Explain why this property is being rejected..."
            className="w-full border border-blueprint-charcoal/15 rounded-sm px-3 py-2.5 text-sm mb-4"
          />
          <button
            type="submit"
            className="w-full bg-red-500 text-white font-medium text-sm py-3 rounded-sm hover:bg-red-600 transition-colors"
          >
            Confirm Rejection
          </button>
        </form>
      </div>
    </div>
  );
}