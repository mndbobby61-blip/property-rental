"use client";

import toast from "react-hot-toast";
import useAuth from "@/hooks/useAuth";

// Google's official multi-color "G" mark, used per Google's own sign-in button guidelines.
function GoogleIcon(props) {
  return (
    <svg viewBox="0 0 48 48" {...props}>
      <path fill="#FFC107" d="M43.6 20.5H42V20.5H24V27.5H35.3C33.7 32.1 29.4 35.5 24 35.5C17.1 35.5 11.5 29.9 11.5 23S17.1 10.5 24 10.5C27.1 10.5 29.9 11.6 32.1 13.5L37.4 8.2C34 5.1 29.3 3.2 24 3.2C12.6 3.2 3.2 12.6 3.2 24S12.6 44.8 24 44.8C34.7 44.8 44.4 37.1 44.4 24C44.4 22.8 44.2 21.6 43.6 20.5Z" />
      <path fill="#FF3D00" d="M6.3 14.7L12.6 19.3C14.3 15.1 18.8 12.1 24 12.1C27.1 12.1 29.9 13.2 32.1 15.1L37.4 9.8C34 6.7 29.3 4.8 24 4.8C16.3 4.8 9.6 9 6.3 14.7Z" />
      <path fill="#4CAF50" d="M24 44.8C29.2 44.8 33.9 42.9 37.2 39.9L31.3 35C29.4 36.4 26.9 37.2 24 37.2C18.8 37.2 14.3 34.2 12.6 30L6.3 34.8C9.6 40.6 16.3 44.8 24 44.8Z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20.5H24V27.5H35.3C34.6 29.7 33.2 31.6 31.3 33L31.3 33L37.2 37.9C40.9 34.6 44.4 29.9 44.4 24C44.4 22.8 44.2 21.6 43.6 20.5Z" />
    </svg>
  );
}

export default function SocialLogin() {
  const { googleSignIn } = useAuth();

  // ক্লিক করার সাথে সাথে ব্রাউজার Google-এর কনসেন্ট পেজে রিডাইরেক্ট হয়ে যায়,
  // তাই এখানে result আশা করার কিছু নেই — শুধু রিডাইরেক্ট ট্রিগার করা হচ্ছে।
  const handleGoogleSignIn = () => {
    googleSignIn().catch((err) => {
      toast.error(err.message || "Google sign-in failed");
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      type="button"
      className="w-full flex items-center justify-center gap-3 border border-blueprint-charcoal/15 rounded-sm py-3 text-sm font-medium text-blueprint-charcoal hover:bg-blueprint-charcoal/5 transition-colors"
    >
      <GoogleIcon className="h-4 w-4" />
      Continue with Google
    </button>
  );
}