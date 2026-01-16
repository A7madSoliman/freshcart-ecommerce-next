"use client";

import { ErrorMessage } from "@/lib/helper/errormessage";
import { SignupFormData, signupSchema } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Key, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Register() {
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
    console.log(data);
  };
  return (
    <section className="max-w-[80%] mt-[13vh] mx-auto mb-4">
      <div className="rounded-lg p-8 mt-10 border border-blue-950 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-950 mb-6 text-center">
          REGISTER NOW
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            {/* <label className="block mb-2 font-medium text-gray-600">Name</label> */}
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
              <ErrorMessage
                show={touchedFields.name}
                message={errors.name?.message}
              />
            </div>
          </div>

          {/* Email */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                name="email"
                id="email"
                type="email"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Phone
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                name="phone"
                id="phone"
                type="tel"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                name="password"
                id="password"
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
          </div>

          {/* Repassword */}
          <div className="mt-4">
            <label className="block mb-2 font-medium text-gray-600">
              Confirm Password
            </label>
            <div className="relative">
              <Key
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-500"
                size={18}
              />
              <input
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-950 outline-none"
                name="rePassword"
                id="rePassword"
                type={showConfirmPassword ? " text" : "password"}
              />
              <button
                onClick={() => setShowConfirmPassowrd(!showConfirmPassword)}
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-950 cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}

          <button
            disabled={isSubmitting}
            className="mt-6 w-full flex items-center justify-center  bg-blue-950 text-white py-3 rounded-lg cursor-pointer"
          >
            Register
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-blue-950 ">
          <p className="text-blue-950">
            Do you have an account?{" "}
            <Link
              className="text-blue-600 font-semibold  cursor-pointer"
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
