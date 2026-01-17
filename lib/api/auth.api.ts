import {
  AuthResponse,
  LoginInput,
  SignupInput,
  VerifyCodeInput,
} from "@/types/auth";
import { apiFetch } from "../fetcher";
import { ForgetFormData, ResetFormData } from "../schemas/auth.schema";

// Sign Up API
export const signupApi = (data: SignupInput) =>
  apiFetch<AuthResponse>("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });

//   Sign In API
export const signinApi = (data: LoginInput) =>
  apiFetch<AuthResponse>("/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });

// Forgetpassword API
export const forgetPasswordApi = (data: ForgetFormData) =>
  apiFetch<AuthResponse>("/auth/forgotPasswords", {
    method: "POST",
    body: JSON.stringify(data),
  });

//   Verify Code API
export const verifyCodeApi = (data: VerifyCodeInput) =>
  apiFetch<AuthResponse>("/auth/verifyResetCode", {
    method: "POST",
    body: JSON.stringify(data),
  });

//   Reset Password API
export const resetPasswordApi = (data: ResetFormData) =>
  apiFetch<AuthResponse>("/auth/resetPassword", {
    method: "PUT",
    body: JSON.stringify(data),
  });
