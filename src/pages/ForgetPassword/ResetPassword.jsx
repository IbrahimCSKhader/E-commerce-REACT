
import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../API/axiosInstance";
import { useNavigate } from "react-router";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import * as yup from "yup";

const ResetSchema = yup
  .object({
    code: yup.string().required("Reset code is required"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(8, "password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password Is Required"),
  })
  .required();

export default function ResetPassword() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ResetSchema),
  });

  const onSubmit = async (values) => {
    try {
      const email = localStorage.getItem("emailForReset");
      if (!email) {
        console.error("No email found for reset in localStorage");
        navigate("/Auth/forgot-password");
        return;
      }

      await axiosInstance.post("/auth/Account/ResetPassword", {
        email,
        code: values.code,
        newPassword: values.password,
      });

      // on success, navigate to login
      navigate("/Auth/login");
    } catch (error) {
      console.error("Error resetting password", error);
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
        Reset Password
      </Typography>

      <TextField
        label="Reset Code"
        fullWidth
        {...register("code")}
        error={!!errors.code}
        helperText={errors.code?.message}
      />

      <TextField
        label="New Password"
        type="password"
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        label="Confirm Password"
        type="password"
        fullWidth
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
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
          "Reset Password"
        )}
      </Button>
    </Box>
  );
}
