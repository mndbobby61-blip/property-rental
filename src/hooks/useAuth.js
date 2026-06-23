"use client";

export default function useAuth() {
  // আপাতত সবসময় logged-out ধরে নিচ্ছি।
  // টেস্ট করার জন্য সাময়িকভাবে user: { email: "test@test.com" } বসিয়ে দেখতে পারো।
  return {
    user: null,
    loading: false,
  };
}