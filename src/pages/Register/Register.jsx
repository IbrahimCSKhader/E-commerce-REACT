import { Box, Button, TextField, Typography } from "@mui/material";
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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
    mode: "onBlur",
  });
  const registerForm = async (values) => {
    await registerFormMutation.mutateAsync(values);
  };

  return (
    <Box p={3}>
      <Typography variant="h4" mb={2}>
        {t("auth.register")}
      </Typography>
      {serverErrors.length > 0
        ? serverErrors.map((error, index) => (
            <Typography variant="h5" key={index} color="error">
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
          label={t("auth.name")}
          {...register("fullName")}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          fullWidth
        />

        <TextField
          label={t("auth.userName")}
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
          label={t("auth.phone")}
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

        <Button variant="contained" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <CircularProgress></CircularProgress>
          ) : (
            t("auth.register")
          )}
        </Button>
      </Box>
    </Box>
  );
}
