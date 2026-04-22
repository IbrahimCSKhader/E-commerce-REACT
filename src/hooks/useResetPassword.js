import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import { extractApiErrors } from "../utils/api";

export default function useResetPassword() {
  const navigate = useNavigate();
  const [serverErrors, setServerErrors] = useState([]);

  const resetPasswordMutation = useMutation({
    mutationFn: async ({ email, code, password }) => {
      const response = await axiosInstance.patch("Auth/Account/ResetPassword", {
        email,
        code,
        newPassword: password,
      });

      return response.data;
    },
    onMutate: () => {
      setServerErrors([]);
    },
    onSuccess: () => {
      localStorage.removeItem("emailForReset");
      navigate("/Auth/login", {
        replace: true,
        state: {
          messageKey: "passwordResetSuccess",
        },
      });
    },
    onError: (error) => {
      setServerErrors(extractApiErrors(error, "Failed to reset password."));
    },
  });

  return {
    resetPasswordMutation,
    serverErrors,
  };
}
