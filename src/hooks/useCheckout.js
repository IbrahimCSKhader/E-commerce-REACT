import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
import useAuthStore from "../store/AuthStore";
import { unwrapApiResponse } from "../utils/api";
import {
  appendProfileOrderHistory,
  normalizeCheckoutOrder,
} from "../utils/profileOrders";

export default function useCheckout() {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);

  return useMutation({
    mutationFn: async ({ paymentMethod }) => {
      const response = await axiosInstance.post("Checkouts", {
        PaymentMethod: paymentMethod,
      });

      return unwrapApiResponse(response.data);
    },
    onSuccess: (response, variables) => {
      const normalizedOrder = normalizeCheckoutOrder({
        response,
        orderSnapshot: variables?.orderSnapshot,
        paymentMethod: variables?.paymentMethod,
      });

      appendProfileOrderHistory(user?.id, normalizedOrder);
      queryClient.setQueryData(["carts", i18n.language], {
        items: [],
        cartTotal: 0,
      });
      queryClient.invalidateQueries({ queryKey: ["carts", i18n.language] });
    },
    onError: (error) => {
      console.error("Checkout failed:", error.response?.data || error.message);
    },
  });
}
