import { SignupInput } from "@/types/auth";
import { apiFetch } from "../fetcher";

export const signup = (data: SignupInput) =>
  apiFetch("/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
