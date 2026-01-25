import { Facebook, Instagram, Twitch } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-14 pb-10">
      <div className="mx-auto w-full max-w-6xl px-4">
        {/* top grid */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 md:grid-cols-4">
          {/* 1st part */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Company</h2>
            <ul className="space-y-2">
              {["About Us", "Careers", "Blogs", "Gift Cards", "Magazine"].map(
                (t) => (
                  <li key={t}>
                    <Link
                      href="#"
                      className="text-sm font-medium text-gray-700 hover:text-blue-950 transition"
                    >
                      {t}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* 2nd part */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Support</h2>
            <ul className="space-y-2">
              {[
                "Contact",
                "Legal Notice",
                "Privacy",
                "Terms & Conditions",
                "Sitemap",
              ].map((t) => (
                <li key={t}>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-blue-950 transition"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3rd part */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">
              Other Services
            </h2>
            <ul className="space-y-2">
              {[
                "Delivery",
                "Returns",
                "Affiliate Program",
                "Partnerships",
                "FAQs",
              ].map((t) => (
                <li key={t}>
                  <Link
                    href="#"
                    className="text-sm font-medium text-gray-700 hover:text-blue-950 transition"
                  >
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 4th part */}
          <div className="space-y-4">
            <h2 className="text-base font-bold text-gray-900">Contact Us</h2>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500">Our Mobile Number</p>
              <p className="mt-1 text-sm font-bold text-blue-950">
                +201014215587
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-4">
              <p className="text-xs text-gray-500">Our Email</p>
              <p className="mt-1 text-sm font-bold text-blue-950 break-all">
                ahmadsoliman283@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* bottom section */}
        <div className="mt-10 border-t border-gray-200 pt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-left text-sm text-gray-600">
            Copyright © 2026 FreshCart. All rights reserved
          </p>

          <div className="flex items-center justify-center sm:justify-end gap-3 text-gray-600">
            <span className="text-sm">Social:</span>

            <Link
              href="#"
              aria-label="Facebook"
              className="h-10 w-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition"
            >
              <Facebook className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              aria-label="Twitch"
              className="h-10 w-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition"
            >
              <Twitch className="h-5 w-5" />
            </Link>

            <Link
              href="#"
              aria-label="Instagram"
              className="h-10 w-10 rounded-xl border border-gray-200 bg-white flex items-center justify-center hover:bg-gray-50 transition"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
