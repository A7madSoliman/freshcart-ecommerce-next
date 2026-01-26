"use client";

import { forgetPasswordApi } from "@/lib/api/auth.api";
import { setToken } from "@/lib/auth/token";
import { ForgetFormData, forgetSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ForgotpasswordClient() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { touchedFields, errors, isSubmitting },
  } = useForm<ForgetFormData>({
    resolver: zodResolver(forgetSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgetFormData) => {
    try {
      const res = await forgetPasswordApi(data);
      setToken(res.token);
      toast.success("Send code successfully");
      router.push("/verify-code");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-6 sm:p-8 border border-blue-900 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-950 mb-6 text-center">
          FORGET PASSWORD
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
                type="email"
                placeholder="Email"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
              />
            </div>
            <div
              className={`overflow-hidden transition-all duration-300 ${touchedFields.email && errors.email ? "max-h-20 opacity-100 mt-1" : "max-h-0 opacity-0"}`}
            >
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
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
