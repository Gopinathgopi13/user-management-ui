import * as Yup from "yup";
import { EMAIL_REGEX, PASSWORD_REGEX } from "./constant";

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .matches(EMAIL_REGEX, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(
      PASSWORD_REGEX,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character",
    )
    .required("Password is required"),
});

export const createUserSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  role_id: Yup.string().required("Role is required"),
});

export const updateUserSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  role_id: Yup.string().required("Role is required"),
  status: Yup.string().oneOf(["active", "inactive"]).required("Status is required"),
});
