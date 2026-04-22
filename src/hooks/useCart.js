import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
import useAuthStore from "../store/AuthStore";

export default function useCart(lang = i18n?.language) {
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);

  const fetchCart = async () => {
    const res = await axiosInstance.get("Carts");
    return res.data;
  };

  const query = useQuery({
    queryKey: ["carts", lang],
    queryFn: fetchCart,
    staleTime: 5 * 60 * 1000,
    enabled: hasHydrated && !!token,
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
