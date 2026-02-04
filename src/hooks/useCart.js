import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
export default function useCart(lang = i18n?.language) {
  const fetchCart = async () => {
    const res = await axiosInstance.get("/Carts");
    return res.data; // { items: [], cartTotal: number }
  };

  const query = useQuery({
    queryKey: ["carts", lang],
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
