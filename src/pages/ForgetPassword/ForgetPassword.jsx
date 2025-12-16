import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../API/axiosInstance";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { LoginSchema } from "../../validation/LoginValidation";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const ForgotPasswordSchema = LoginSchema.pick(["email"]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ForgotPasswordSchema),
  });

  const onSubmit = async (values) => {
      console.log("SUBMIT CLICKED");

    try {

      await axiosInstance.post("Auth/Account/SendCode", {
        email: values.email,
      });

      localStorage.setItem("emailForReset", values.email);

      console.log("NAVIGATE NOW");
navigate("/Auth/reset-password");
    } catch (error) {
      console.error("Error sending reset email", error);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        mt: 4,
        width: 400,
        mx: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" textAlign="center">
        Forgot Password
      </Typography>

      <TextField
        label="Email"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <Button
        type="submit"
        variant="contained"
        disabled={isSubmitting}
        sx={{ height: 45 }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Send Reset Code"
        )}
      </Button>
    </Box>
  );
}
