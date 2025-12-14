import { Box, Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validation/RegisterSchema";
import React, { useState } from "react";

export default function Register() {
  const [serverErrors, setServerErrors] = useState([]);
const {
  register,
  handleSubmit,
  formState: { errors, isSubmitting },
} = useForm({
  resolver: yupResolver(RegisterSchema),
  mode: "onBlur",
});

  const registerForm = async (values) => {
    console.log(values);
    try {
      const response = await axios.post(
        "https://knowledgeshop.runasp.net/api/Auth/Account/Register",
        values
      );
      console.log(response.data);
    } catch (err) {
      console.log(err?.response?.data || err.message);
      setServerErrors(err?.response?.data.errors || ["An unexpected error occurred."]);
    }
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        Register
      </Typography>
    {serverErrors.length > 0  ?
       serverErrors.map((error, index) => (
        <Typography variant="h5"  key={index} color="error">
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
          Register
        </Button>
      </Box>
    </Box>
  );
}
