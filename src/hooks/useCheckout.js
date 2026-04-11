import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

export default function useCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ paymentMethod }) => {
      const res = await axiosInstance.post("/Checkouts", {
        PaymentMethod: paymentMethod,
      });
      return res.data;
    },
    onSuccess: (response) => {
      // Clear cart cache after successful checkout
      queryClient.setQueryData(["carts"], { items: [], cartTotal: 0 });
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      console.error("Checkout failed:", error.response?.data || error.message);
    },
  });
}
