import {
  Alert,
  Box,
  Button,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoginSchema } from "../../validation/LoginValidation";
import useLogin from "../../hooks/useLogin";

export default function Login() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const redirectTo = location.state?.from || "/home";
  const { loginMutation, serverErrors } = useLogin(redirectTo);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onBlur",
  });

  const pageMessages = {
    registerSuccess:
      i18n.language === "ar"
        ? "تم إنشاء الحساب بنجاح. يرجى تأكيد البريد الإلكتروني قبل تسجيل الدخول."
        : "Account created successfully. Please confirm your email before logging in.",
    loginRequired:
      i18n.language === "ar"
        ? "الرجاء تسجيل الدخول أولاً للمتابعة."
        : "Please log in first to continue.",
    passwordResetSuccess:
      i18n.language === "ar"
        ? "تم تغيير كلمة المرور بنجاح. يمكنك تسجيل الدخول الآن."
        : "Password reset successfully. You can log in now.",
    resetCodeSent:
      i18n.language === "ar"
        ? "تم إرسال رمز إعادة التعيين. أدخل الرمز وكلمة المرور الجديدة لإكمال العملية."
        : "A reset code was sent. Enter the code and your new password to continue.",
  };

  const infoMessage =
    location.state?.messageKey && pageMessages[location.state.messageKey]
      ? pageMessages[location.state.messageKey]
      : "";

  const loginForm = async (values) => {
    await loginMutation.mutateAsync(values);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
        backgroundColor: "background.paper",
      }}
    >
      <Stack spacing={3}>
        <Box textAlign="center">
          <Typography
            variant="overline"
            color="primary.main"
            sx={{ fontWeight: 800 }}
          >
            Knowledge Shop
          </Typography>
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: 800, mt: 1 }}
          >
            {t("auth.login")}
          </Typography>
        </Box>

        {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null}

        {serverErrors.map((errorMessage) => (
          <Alert severity="error" key={errorMessage}>
            {errorMessage}
          </Alert>
        ))}

        <Box
          component="form"
          onSubmit={handleSubmit(loginForm)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            {...register("email")}
            label={t("auth.email")}
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            {...register("password")}
            label={t("auth.password")}
            type="password"
            fullWidth
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            variant="contained"
            type="submit"
            disabled={loginMutation.isPending}
            fullWidth
            sx={{ minHeight: 48 }}
          >
            {loginMutation.isPending ? "..." : t("auth.login")}
          </Button>

          <Typography variant="body2" textAlign="center">
            <Link component={RouterLink} to="/Auth/forgot-password">
              {t("auth.forgotPassword")}
            </Link>
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );
}
