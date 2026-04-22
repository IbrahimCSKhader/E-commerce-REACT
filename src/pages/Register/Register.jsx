import { Alert, Box, Button, Paper, Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { RegisterSchema } from "../../validation/RegisterSchema";
import CircularProgress from "@mui/material/CircularProgress";
import useRegister from "../../hooks/useRegister";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t } = useTranslation();
  const { serverErrors, registerFormMutation } = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });

  const registerForm = async (values) => {
    await registerFormMutation.mutateAsync(values);
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
          <Typography variant="overline" color="primary.main" sx={{ fontWeight: 800 }}>
            Knowledge Shop
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, mt: 1 }}>
            {t("auth.register")}
          </Typography>
        </Box>

        {serverErrors.length > 0
          ? serverErrors.map((errorMessage) => (
              <Alert severity="error" key={errorMessage}>
                {errorMessage}
              </Alert>
            ))
          : null}

        <Box
          component="form"
          onSubmit={handleSubmit(registerForm)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label={t("register.fullName")}
            {...register("fullName")}
            error={!!errors.fullName}
            helperText={errors.fullName?.message}
            fullWidth
          />

          <TextField
            label={t("register.userName")}
            {...register("userName")}
            error={!!errors.userName}
            helperText={errors.userName?.message}
            fullWidth
          />

          <TextField
            label={t("auth.email")}
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />

          <TextField
            label={t("register.phoneNumber")}
            {...register("phoneNumber")}
            error={!!errors.phoneNumber}
            helperText={errors.phoneNumber?.message}
            fullWidth
          />

          <TextField
            label={t("auth.password")}
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />

          <Button
            variant="contained"
            type="submit"
            disabled={registerFormMutation.isPending}
            fullWidth
            sx={{ minHeight: 48 }}
          >
            {registerFormMutation.isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              t("auth.register")
            )}
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
