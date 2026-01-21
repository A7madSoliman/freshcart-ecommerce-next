"use client";

import { resetPasswordApi } from "@/lib/api/auth.api";
import { setToken } from "@/lib/auth/token";
import { ResetFormData, resetPasswordSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPassword() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, touchedFields, errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      newPassword: "",
    },
  });

  const onsubmit = async (data: ResetFormData) => {
    try {
      const res = await resetPasswordApi(data);
      setToken(res.token);
      toast.success("New password setted successfully");
      router.push("/");
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
          RESET PASSWORD
        </h2>
        <form onSubmit={handleSubmit(onsubmit)} noValidate>
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

          {/*New Password */}
          <div className="mt-4">
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                autoComplete="current-password"
                aria-invalid={!!errors.newPassword}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-950 cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${touchedFields.newPassword && errors.newPassword ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              <p className="text-red-500 text-sm">
                {errors.newPassword?.message}
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            disabled={isSubmitting}
            className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-950 text-white py-3 rounded-lg transition hover:bg-blue-900 disabled:opacity-60 cursor-pointer"
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "SUBMIT"}
          </button>
        </form>
      </div>
    </section>
  );
}
