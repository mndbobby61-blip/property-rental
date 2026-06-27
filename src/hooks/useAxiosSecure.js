import axios from "axios";

const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;