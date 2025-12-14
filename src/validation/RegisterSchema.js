import * as yup from "yup";
export const RegisterSchema = yup.object({
  fullName: yup.string().required("FullName Is Required"),
  email: yup.string().email("Invalid Format").required("Email Is Required"),
  userName: yup
    .string()
    .matches(/^[a-zA-Z0-9._-]+$/, "Invalid UserName")
    .min(4, "username must be at least 4 characters")
    .required("UserName Is Required"),
  phoneNumber: yup.string().required("PhoneNumber Is Required"),
  password: yup
    .string()
    .required("Password Is Required")
    .min(8, "password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain at least one uppercase letter")
    .matches(/[a-z]/, "Must contain at least one lowercase letter")
    .matches(/\d/, "Must contain at least one number")
    .matches(/[@$!%*?&]/, "Must contain at least one special character"),
});
