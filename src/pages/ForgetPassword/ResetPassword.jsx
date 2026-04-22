import { Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import useResetPassword from "../../hooks/useResetPassword";

const resetSchema = yup
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { resetPasswordMutation, serverErrors } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetSchema),
  });

  const onSubmit = async (values) => {
    const email = localStorage.getItem("emailForReset");

    if (!email) {
      navigate("/Auth/forgot-password", { replace: true });
      return;
    }

    await resetPasswordMutation.mutateAsync({
      email,
      code: values.code,
      password: values.password,
    });
  };

  const infoMessage =
    location.state?.messageKey === "resetCodeSent"
      ? i18n.language === "ar"
        ? "أدخل الرمز الذي وصلك عبر البريد الإلكتروني ثم كلمة المرور الجديدة."
        : "Enter the code you received by email and then your new password."
      : "";

  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 3, md: 4 },
        borderRadius: 5,
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" textAlign="center" sx={{ fontWeight: 800 }}>
          {t("auth.resetPassword")}
        </Typography>

        {infoMessage ? <Alert severity="info">{infoMessage}</Alert> : null}

        {serverErrors.map((errorMessage) => (
          <Alert severity="error" key={errorMessage}>
            {errorMessage}
          </Alert>
        ))}

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <TextField
            label={t("auth.resetCode")}
            fullWidth
            {...register("code")}
            error={!!errors.code}
            helperText={errors.code?.message}
          />

          <TextField
            label={t("auth.newPassword")}
            type="password"
            fullWidth
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <TextField
            label={t("auth.confirmPassword")}
            type="password"
            fullWidth
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={resetPasswordMutation.isPending}
            sx={{ minHeight: 48 }}
            fullWidth
          >
            {resetPasswordMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("auth.resetPassword")
            )}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
