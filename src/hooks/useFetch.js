import React from "react";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
export default function UseFetch(queryKey, url) {
  const fetchProducts = async () => {
    const res = await axiosInstance.get(url);
    return Array.isArray(res.data.response.data) ? res.data.response.data : [];
  };
  const query = useQuery({
    queryKey: [queryKey],
    staleTime: 5 * 60 * 1000,
    queryFn: fetchProducts,
  });
  return query;
}
