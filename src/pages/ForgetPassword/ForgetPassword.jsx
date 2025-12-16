import React from 'react'
import { useForm } from 'react-hook-form'
import axiosInstance from '../../API/axiosInstance' 
import { useNavigate } from 'react-router'
import { yupResolver } from '@hookform/resolvers/yup'
import { Box, TextField, Typography, Button } from '@mui/material'
import { LoginSchema } from '../../validation/LoginValidation' 
import CircularProgress from "@mui/material/CircularProgress";
export default function ForgetPassword() {
  const ForgotPassword = LoginSchema.pick(['email']);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(ForgotPassword),
  }); 

  const onSubmit = async (values) => {
    try {
      await axiosInstance.post('/auth/Account/SendCode', {
        email: values.email,
      });

      localStorage.setItem('emailForReset', values.email);
      navigate('/Auth/reset-password');
    } catch (error) {
      console.error('Error sending reset email', error);
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
  variant="contained"
  type="submit"
  disabled={isSubmitting}
  sx={{ height: 45 }}
>
  {isSubmitting ? (
    <CircularProgress size={24} color="inherit" />
  ) : (
    "Send Reset Link"
  )}
</Button>
    </Box>
  );
}
