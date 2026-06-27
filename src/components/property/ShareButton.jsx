"use client";
import { Share2, Check } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ShareButton({ propertyId, title }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = `${window.location.origin}/property/${propertyId}`;
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard!");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 px-4 py-2 border border-blueprint-line rounded-lg hover:bg-blueprint-paper transition-colors text-sm text-blueprint-slate"
    >
      {copied ? <Check size={16} className="text-green-600" /> : <Share2 size={16} />}
      {copied ? "Copied!" : "Share"}
    </button>
  );
}