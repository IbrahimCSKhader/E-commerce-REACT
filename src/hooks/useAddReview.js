import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import i18n from "../i18n";
import useAuthStore from "../store/AuthStore";
import { extractApiErrors } from "../utils/api";

export default function useAddReview(productId) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [serverErrors, setServerErrors] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const addReviewMutation = useMutation({
    mutationFn: async ({ rating, comment }) => {
      if (!hasHydrated || !token) {
        const authError = new Error("Please log in first.");
        authError.code = "AUTH_REQUIRED";
        throw authError;
      }

      return axiosInstance.post(`Products/${productId}/reviews`, {
        Rating: rating,
        Comment: comment,
      });
    },
    onMutate: () => {
      setServerErrors([]);
      setSuccessMessage("");
    },
    onSuccess: () => {
      setSuccessMessage(
        i18n.language === "ar"
          ? "تمت إضافة المراجعة بنجاح."
          : "Your review was added successfully.",
      );
      queryClient.invalidateQueries({ queryKey: ["productsDetails"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error) => {
      if (error?.code === "AUTH_REQUIRED" || error?.response?.status === 401) {
        navigate("/Auth/login", {
          state: {
            messageKey: "loginRequired",
            from: `/products/${productId}`,
          },
        });
        return;
      }

      setServerErrors(extractApiErrors(error, "Failed to add review."));
    },
  });

  return {
    addReviewMutation,
    serverErrors,
    successMessage,
  };
}
