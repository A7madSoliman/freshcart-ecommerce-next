import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  rePassword: z.string().min(6),
  phone: z.string().min(10),
});

export type SignupFormData = z.infer<typeof signupSchema>;
