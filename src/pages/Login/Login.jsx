import { Box, Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginSchema } from "../../validation/LoginValidation";
import { Link as RouterLink } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useTranslation } from "react-i18next";
export default function Login() {
  const { t, i18n } = useTranslation();
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
        {t("auth.login")}
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
          label={t("auth.email")}
          name="email"
          fullWidth
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password")}
          label={t("auth.password")}
          name="password"
          fullWidth
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {t("auth.login")}
        </Button>
        <Typography variant="body2">
          <Link component={RouterLink} to="/auth/forgot-password">
            {t("auth.forgotPassword")}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
