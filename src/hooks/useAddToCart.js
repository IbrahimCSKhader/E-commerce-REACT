import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, Count }) => {
      return axiosInstance.post("/Carts", {
        productId,
        Count,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}
