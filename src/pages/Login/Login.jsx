import axios from "axios";
import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import React from "react";

export default function Login() {
  const { register, handleSubmit } = useForm({});
  const loginForm = async (values) => {
    console.log(values);
    try {
      const res = await axios.post(
        `https://knowledgeshop.runasp.net/api/Auth/Account/Login`,
        values
      );
      console.log(res);
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
        />
        <TextField
          {...register("password")}
          label="password"
          name="password"
          fullWidth
          variant="outlined"
        />
        <Button variant="contained" type="submit">
          Log in
        </Button>
      </Box>
    </Box>
  );
}
