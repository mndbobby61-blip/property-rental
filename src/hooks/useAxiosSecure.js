"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

/**
 * Favorites, Bookings, Property add/update/delete, Admin route — সব এখন
 * থেকে এই hook ব্যবহার করবে, axiosPublic না। প্রতিটা রিকোয়েস্টের আগে
 * Better Auth-এর /api/auth/token থেকে ফ্রেশ JWT তুলে Authorization header-এ বসায়।
 */
export default function useAxiosSecure() {
  const router = useRouter();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(async (config) => {
    const { data } = await authClient.token();
    if (data?.token) {
      config.headers.authorization = `Bearer ${data.token}`;
    }
    return config;
  });
  

  axiosSecure.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
        await logOut();
        router.push("/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
}