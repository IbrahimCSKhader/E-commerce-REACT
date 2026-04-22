import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../API/axiosInstance";
import useAuthStore from "../store/AuthStore";
import { buildUserFromToken, extractAccessToken } from "../utils/auth";
import { extractApiErrors } from "../utils/api";

const loginRequest = async (credentials) => {
  const response = await axiosInstance.post("Auth/Account/Login", credentials);
  const accessToken = extractAccessToken(response.data);

  if (!accessToken) {
    throw new Error(
      response.data?.message || "Login failed. Missing access token.",
    );
  }

  return {
    accessToken,
    user: buildUserFromToken(accessToken),
  };
};

export default function useLogin(redirectTo = "/home") {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const [serverErrors, setServerErrors] = useState([]);

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onMutate: () => {
      setServerErrors([]);
    },
    onSuccess: ({ accessToken, user }) => {
      login(accessToken, user);
      navigate(redirectTo, { replace: true });
    },
    onError: (error) => {
      setServerErrors(extractApiErrors(error, "Login failed."));
    },
  });

  return {
    loginMutation,
    serverErrors,
  };
}
