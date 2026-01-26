"use client";

import { signupApi } from "@/lib/api/auth.api";
import { setToken } from "@/lib/auth/token";
import { SignupFormData, signupSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Eye,
  EyeOff,
  Key,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function RegisterClient() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassowrd] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      const res = await signupApi(data);
      setToken(res.token);
      toast.success("Account created successfully");
      router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong ");
      }
    }
  };
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-6 sm:p-8 border border-blue-900 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-950 mb-6 text-center">
          REGISTER NOW
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                placeholder="Name"
                id="name"
                type="text"
                {...register("name")}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.name && errors.name
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            </div>
          </div>

          {/* Email */}
          <div>
            <div className="relative mt-4">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                placeholder="Email"
                id="email"
                type="email"
                {...register("email")}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.email && errors.email
                  ? "max-h-20 opacity-100 mt-1"
                  : " max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>
          </div>

          {/* Phone */}
          <div>
            <div className="relative mt-4">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                placeholder="Phone"
                id="phone"
                type="tel"
                {...register("phone")}
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.phone && errors.phone
                  ? "max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{errors.phone?.message}</p>
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
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                placeholder="Password"
                id="password"
                {...register("password")}
                type={showPassword ? "text" : "password"}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-950 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.password && errors.password
                  ? "max-h-20 opacity-100  mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div>
          </div>

          {/* Repassword */}
          <div className="mt-4">
            <div className="relative">
              <Key
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                placeholder="Confirm Password"
                id="rePassword"
                type={showConfirmPassword ? "text" : "password"}
                {...register("rePassword")}
              />
              <button
                onClick={() => setShowConfirmPassowrd(!showConfirmPassword)}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-950 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.rePassword && errors.rePassword
                  ? " max-h-20 opacity-100 mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">
                {errors.rePassword?.message}
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-950 text-white py-3 rounded-lg transition hover:bg-blue-900 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? <Loader2 className="animate-spin " /> : "Register"}
          </button>
        </form>
        <div className="mt-6 text-center pt-4 border-t border-blue-950">
          <p className="text-sm sm:text-base text-blue-950">
            Do you have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
