import { Alert, Box, Button, CircularProgress, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { LoginSchema } from "../../validation/LoginValidation";
import useForgotPassword from "../../hooks/useForgotPassword";

export default function ForgetPassword() {
  const { t, i18n } = useTranslation();
  const { forgotPasswordMutation, serverErrors } = useForgotPassword();
  const forgotPasswordSchema = LoginSchema.pick(["email"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const onSubmit = async (values) => {
    await forgotPasswordMutation.mutateAsync(values.email);
  };

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
        <Box textAlign="center">
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {t("auth.forgotPassword")}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {i18n.language === "ar"
              ? "سنرسل لك رمز إعادة تعيين إلى البريد الإلكتروني الذي أدخلته."
              : "We will send a reset code to the email address you enter."}
          </Typography>
        </Box>

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
            label={t("auth.email")}
            fullWidth
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={forgotPasswordMutation.isPending}
            sx={{ minHeight: 48 }}
            fullWidth
          >
            {forgotPasswordMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("auth.sendReset")
            )}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
