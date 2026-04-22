import * as yup from "yup";
export const LoginSchema = yup
  .object({
    email: yup.string().email("Invalid Format").required("Email Is Required"),
    password: yup.string().required("Password Is Required"),
  })
  .required();
