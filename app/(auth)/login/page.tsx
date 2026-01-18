"use client";

import { signinApi } from "@/lib/api/auth.api";
import { useAuth } from "@/lib/auth/AuthContext";
import { setToken } from "@/lib/auth/token";
import { SigninFormData, signinSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SigninFormData) => {
    try {
      const res = await signinApi(data);
      login(res.token);
      toast.success("Login successfully");
      router.replace("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // const searchParams = useSearchParams();
  // const redirectTo = searchParams.get("redirect") || "/";
  // router.push(redirectTo);

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-6 sm:p-8 border border-blue-900 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-950 mb-6 text-center">
          LOGIN
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mt-4">
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${touchedFields.email && errors.email ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                {...register("password")}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="current-password"
                aria-invalid={!!errors.password}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-950"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${touchedFields.password && errors.password ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
          </div>

          {/* Forget Password */}
          <div className="flex justify-end mt-2">
            <Link
              href="/forgot-password"
              className="text-blue-600 text-sm hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-950 text-white py-3 rounded-lg transition hover:bg-blue-900 disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center pt-4 border-t border-blue-950">
          <p className="text-sm sm:text-base text-blue-950">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
