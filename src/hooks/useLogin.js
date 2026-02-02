import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../API/axiosInstance";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import { jwtDecode } from "jwt-decode";

const loginRequest = async (credentials) => {
  const res = await axiosInstance.post("Auth/Account/Login", credentials);

  const accessToken = res.data.accessToken;
  const decoded = jwtDecode(accessToken);

  const user = {
    id: decoded[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
    ],
    name: decoded["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
    email:
      decoded[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
      ],
    role: decoded[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ],
    exp: decoded.exp,
  };
  console.log("Decoded JWT:", user);

  return {
    accessToken,
    user,
  };
};

export default function useLogin() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: ({ accessToken, user }) => {
      login(accessToken, user);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  });

  return { loginMutation };
}
