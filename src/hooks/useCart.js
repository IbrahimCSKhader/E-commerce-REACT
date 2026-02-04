import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useCart() {
  const fetchCart = async () => {
    const res = await axiosInstance.get("/Carts");
    return res.data; // { items: [], cartTotal: number }
  };

  const query = useQuery({
    queryKey: ["carts"],
    queryFn: fetchCart,
    staleTime: 5 * 60 * 1000,
  });

  return {
    items: query.data?.items ?? [],
    cartTotal: query.data?.cartTotal ?? 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
