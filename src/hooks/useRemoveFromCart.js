import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useRemoveFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (cartItemId) => {
      return axiosInstance.delete(`/Carts/${cartItemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
  });
}
