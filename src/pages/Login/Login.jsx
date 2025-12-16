import axios from "axios";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validation/LoginValidation";
import { Link as RouterLink } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });
  const loginForm = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(
        `https://knowledgeshop.runasp.net/api/Auth/Account/Login`,
        values
      );
      if (res.status === 200) {
        console.log(res);
        localStorage.setItem("token", res.data.accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box className="login-form">
      <Typography variant="h1" component="h1">
        Login page
      </Typography>

      <Box
        onSubmit={handleSubmit(loginForm)}
        variant="form"
        component="form"
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column ",
          gap: 2,
        }}
      >
        <TextField
          {...register("email")}
          label="email"
          name="email"
          fullWidth
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label="password"
          name="password"
          fullWidth
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          Log in
        </Button>
        <Typography variant="body2">
          <Link component={RouterLink} to="/auth/forgot-password">
            Forgot password?
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
