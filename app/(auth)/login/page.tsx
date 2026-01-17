"use client";

import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-xl p-6 sm:p-8 border border-blue-900 shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-950 mb-6 text-center">
          LOGIN
        </h2>
        <form>
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
              />
            </div>
            {/* <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.email && errors.email
                  ? "max-h-20 opacity-100 mt-1"
                  : " max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div> */}
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
            {/* <div
              className={`overflow-hidden transition-all duration-300 ${
                touchedFields.password && errors.password
                  ? "max-h-20 opacity-100  mt-1"
                  : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-red-500 text-sm">{errors.password?.message}</p>
            </div> */}
          </div>

          {/* Submit */}
          <button className="mt-6 w-full flex items-center justify-center gap-2 bg-blue-950 text-white py-3 rounded-lg transition hover:bg-blue-900 disabled:opacity-60 cursor-pointer">
            Login
          </button>
        </form>
        <div className="mt-6 text-center pt-4 border-t border-blue-950">
          <p className="text-sm sm:text-base text-blue-950">
            Have an account?{" "}
            <Link
              className="text-blue-600 font-semibold hover:underline"
              href="/register"
            >
              Register!
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
