import axios from "axios";

const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
});

/**
 * যেসব রিকোয়েস্টে টোকেন লাগে না — যেমন POST /users (register), GET /properties (public listing) —
 * সেগুলোর জন্য এই hook ব্যবহার করবে।
 */
export default function useAxiosPublic() {
  return axiosPublic;
}