import {
  ForgetFormData,
  ResetFormData,
  SigninFormData,
  SignupFormData,
  VerifyFormData,
} from "@/lib/schemas/auth.schema";

export type SignupInput = SignupFormData;
export type LoginInput = SigninFormData;
export type ForgetPasswordInput = ForgetFormData;
export type VerifyCodeInput = VerifyFormData;
export type ResetPasswordInput = ResetFormData;
export interface AuthResponse {
  message: string;
  token: string;
}
