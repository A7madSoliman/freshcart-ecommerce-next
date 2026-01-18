import { z } from "zod";
// Sign up Schema
export const signupSchema = z
  .object({
    name: z.string().trim().min(3, "Name must be at least 3 characters"),

    email: z.string().trim().email("Invalid email address"),

    password: z.string().min(6, "Password must be at least 6 characters"),

    rePassword: z.string().min(6, "Password confirmation is required"),

    phone: z.string().regex(/^01[0-9]{9}$/, "Invalid phone number format"),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
  });

// Sign in Schema
export const signinSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Forget Schema
export const forgetSchema = z.object({
  email: z.string().email(),
});

// Verify Code
export const verifyCodeSchema = z.object({
  resetCode: z.string().length(6),
});

// Reset Password
export const resetPasswordSchema = z.object({
  email: z.string().email(),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
export type SigninFormData = z.infer<typeof signinSchema>;
export type ForgetFormData = z.infer<typeof forgetSchema>;
export type VerifyFormData = z.infer<typeof verifyCodeSchema>;
export type ResetFormData = z.infer<typeof resetPasswordSchema>;
