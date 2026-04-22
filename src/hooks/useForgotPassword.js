import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import { extractApiErrors } from "../utils/api";

export default function useForgotPassword() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email) => {
      const response = await axiosInstance.post("Auth/Account/SendCode", {
        email,
      });

      return response.data;
    },
    onMutate: () => {
      setServerErrors([]);
    },
    onSuccess: (_, email) => {
      localStorage.setItem("emailForReset", email);
      navigate("/Auth/reset-password", {
        replace: true,
        state: {
          messageKey: "resetCodeSent",
        },
      });
    },
    onError: (error) => {
      setServerErrors(extractApiErrors(error, "Failed to send reset code."));
    },
  });

  return {
    forgotPasswordMutation,
    serverErrors,
  };
}
