import { Box, Button, TextField, Typography } from "@mui/material";
// import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validation/RegisterSchema";
// import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
// import axiosInstance from "../../API/axiosInstance";
// import { useMutation } from "@tanstack/react-query";
// import { useNavigate } from "react-router-dom";
import useRegister from "../../hooks/useRegister";
export default function Register() {
  const { serverErrors, registerFormMutation } = useRegister();
  // const navigate = useNavigate();
  // const [serverErrors, setServerErrors] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });
  // const registerFormMutation = useMutation({
  //   mutationFn: async (values) =>
  //     await axiosInstance.post("/Auth/Account/Register", values),

  //   onSuccess: () => {
  //     navigate("/login");
  //   },

  //   onError: (err) => {
  //     console.log(err.response?.data);
  //     setServerErrors(
  //       err?.response?.data?.errors || ["Registration failed"]
  //     );
  //   },
  // });
  const registerForm = async (values) => {
    await registerFormMutation.mutateAsync(values);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Register
      </Typography>
      {serverErrors.length > 0
        ? serverErrors.map((error, index) => (
            <Typography variant="h5" key={index} color="error">
              {error}
            </Typography>
          ))
        : null}
      <Box
        component="form"
        onSubmit={handleSubmit(registerForm)}
        sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 450 }}
      >
        <TextField
          label="Full Name"
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          fullWidth
        />

        <TextField
          label="User Name"
          {...register("userName")}
          error={!!errors.userName}
          helperText={errors.userName?.message}
          fullWidth
        />

        <TextField
          label="Email"
          {...register("email")}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />

        <TextField
          label="Phone Number"
          {...register("phoneNumber")}
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber?.message}
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          {...register("password")}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? <CircularProgress></CircularProgress> : "Register"}
        </Button>
      </Box>
    </Box>
  );
}
