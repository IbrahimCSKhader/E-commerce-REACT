import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

export default function useAddToCart() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);

  return useMutation({
    mutationFn: async ({ productId, Count }) => {
      if (!token) {
        const authError = new Error("Please log in first.");
        authError.code = "AUTH_REQUIRED";
        throw authError;
      }

      return axiosInstance.post("Carts", {
        productId,
        Count: Count ?? 1,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts", i18n.language] });
    },
    onError: (error) => {
      if (error?.code === "AUTH_REQUIRED" || error?.response?.status === 401) {
        navigate("/Auth/login", {
          state: {
            messageKey: "loginRequired",
          },
        });
      }
    },
  });
}
