import * as yup from "yup";
export const LoginSchema = yup
  .object({
    email: yup.string().email("Invalid Format").required("Email Is Required"),
    password: yup
      .string()
      .required("Password Is Required")
      .min(8, "password must be at least 8 characters")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[a-z]/, "Must contain at least one lowercase letter")
      .matches(/\d/, "Must contain at least one number")
      .matches(/[@$!%*?&]/, "Must contain at least one special character"),
  })
  .required();