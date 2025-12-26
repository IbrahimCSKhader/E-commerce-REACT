import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validation/LoginValidation";
import { Link as RouterLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const { loginMutation } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });
  const loginForm = async (values) => {
    loginMutation.mutate(values);
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
