import { z } from "zod";

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

export type SignupFormData = z.infer<typeof signupSchema>;
