import { yupResolver } from "@hookform/resolvers/yup";
import {
  Alert,
  Box,
  Button,
  Paper,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAddReview from "../../hooks/useAddReview";
import useAuthStore from "../../store/AuthStore";
import { ReviewSchema } from "../../validation/ReviewSchema";

const defaultValues = {
  rating: 5,
  comment: "",
};

export default function ProductReviewForm({ productId, i18n }) {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const { addReviewMutation, serverErrors, successMessage } = useAddReview(productId);
  const isLoggedIn = hasHydrated && Boolean(token);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ReviewSchema),
    mode: "onBlur",
    defaultValues,
  });

  const labels = {
    title: i18n.language === "ar" ? "أضف مراجعتك" : "Write a Review",
    subtitle:
      i18n.language === "ar"
        ? "شارك تقييمك وتجربتك مع هذا المنتج."
        : "Share your rating and experience with this product.",
    rating: i18n.language === "ar" ? "التقييم" : "Rating",
    comment: i18n.language === "ar" ? "التعليق" : "Comment",
    placeholder:
      i18n.language === "ar"
        ? "اكتب رأيك عن المنتج..."
        : "Write your feedback about the product...",
    submit: i18n.language === "ar" ? "إرسال المراجعة" : "Submit Review",
    loginTitle:
      i18n.language === "ar"
        ? "يجب تسجيل الدخول لإضافة مراجعة."
        : "You need to log in to add a review.",
    loginButton: i18n.language === "ar" ? "تسجيل الدخول" : "Log In",
  };

  const submitReview = async (values) => {
    try {
      await addReviewMutation.mutateAsync(values);
      reset(defaultValues);
    } catch {
      return;
    }
  };

  return (
    <Paper sx={{ p: { xs: 3, md: 4 }, height: "100%" }}>
      <Stack spacing={3}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            {labels.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.75 }}>
            {labels.subtitle}
          </Typography>
        </Box>

        {!isLoggedIn ? (
          <Alert
            severity="info"
            action={
              <Button
                color="inherit"
                size="small"
                onClick={() =>
                  navigate("/Auth/login", {
                    state: {
                      messageKey: "loginRequired",
                      from: `/products/${productId}`,
                    },
                  })
                }
              >
                {labels.loginButton}
              </Button>
            }
          >
            {labels.loginTitle}
          </Alert>
        ) : (
          <>
            {successMessage ? <Alert severity="success">{successMessage}</Alert> : null}

            {serverErrors.map((errorMessage) => (
              <Alert severity="error" key={errorMessage}>
                {errorMessage}
              </Alert>
            ))}

            <Box
              component="form"
              onSubmit={handleSubmit(submitReview)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {labels.rating}
                </Typography>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Rating
                      value={Number(field.value || 0)}
                      onChange={(_, value) => field.onChange(value ?? 0)}
                      size="large"
                    />
                  )}
                />
                {errors.rating ? (
                  <Typography variant="caption" color="error.main" display="block">
                    {errors.rating.message}
                  </Typography>
                ) : null}
              </Box>

              <TextField
                {...register("comment")}
                label={labels.comment}
                placeholder={labels.placeholder}
                multiline
                minRows={5}
                error={Boolean(errors.comment)}
                helperText={errors.comment?.message}
                fullWidth
              />

              <Button
                variant="contained"
                type="submit"
                disabled={addReviewMutation.isPending}
                sx={{ minHeight: 48, alignSelf: "flex-start", px: 3 }}
              >
                {addReviewMutation.isPending ? "..." : labels.submit}
              </Button>
            </Box>
          </>
        )}
      </Stack>
    </Paper>
  );
}
