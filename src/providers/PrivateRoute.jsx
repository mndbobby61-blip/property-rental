"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import Loading from "@/components/shared/Loading";

/**
 * ⚠️ ফিক্স: আগে `if (!user) return null;` ছিল — মানে session ক্ষণিকের জন্য
 * refresh/flicker হলে পুরো পেজ blank দেখাতো। এখন সবসময় Loading দেখাবে
 * (কখনো খালি/blank না), যতক্ষণ না redirect সম্পূর্ণ হয়।
 */
export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <Loading />;

  return children;
}