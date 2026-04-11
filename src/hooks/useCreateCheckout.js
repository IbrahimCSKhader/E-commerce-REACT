import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";

const createCheckout = async (paymentMethod) => {
  const res = await axiosInstance.post("/Checkouts", {
    PaymentMethod: paymentMethod,
  });
  return res.data;
};

export default function useCreateCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCheckout,
    onSuccess: () => {
      // Invalidate cart after successful checkout
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (error) => {
      console.error("Checkout failed:", error.response?.data || error.message);
    },
  });
}
