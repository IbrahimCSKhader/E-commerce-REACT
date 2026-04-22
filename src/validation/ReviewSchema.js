import * as yup from "yup";

export const ReviewSchema = yup.object({
  rating: yup
    .number()
    .typeError("Rating is required")
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
  comment: yup
    .string()
    .trim()
    .required("Comment is required")
    .max(1000, "Comment is too long"),
});
