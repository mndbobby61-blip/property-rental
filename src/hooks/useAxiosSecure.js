"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});


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