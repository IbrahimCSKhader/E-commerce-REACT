import React, { useState } from "react";
import axiosInstance from "../API/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function useRegister(){
 const [serverErrors, setServerErrors] = useState([]);
 const navigate = useNavigate();

 

const registerFormMutation = useMutation({
  mutationFn: async (values) =>
    await axiosInstance.post("/Auth/Account/Register", values),

  onSuccess: () => {
    navigate("/login");
  },

  onError: (err) => {
    console.log(err.response?.data);
    setServerErrors(
      err?.response?.data?.errors || ["Registration failed"]
    );
  },
});
return {
    serverErrors,registerFormMutation
}
}