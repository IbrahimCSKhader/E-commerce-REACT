import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useFetch(queryKey, url, params = {}, options = {}) {
  const normalizedQueryKey = Array.isArray(queryKey) ? queryKey : [queryKey];

  const query = useQuery({
    queryKey: normalizedQueryKey,
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const res = await axiosInstance.get(url, { params });
      return res?.data?.response ?? null;
    },
    ...options,
  });

  return query;
}
