import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useAddToCart(onSuccessNavigate) {
  return useMutation({
    mutationFn: async ({ productId, count }) => {
      return axiosInstance.post("/Carts", {
        ProductId: productId,
        Count: count,
      });
    },
    onSuccess: () => {
      if (onSuccessNavigate) {
        onSuccessNavigate();
      }
    },
  });
}
