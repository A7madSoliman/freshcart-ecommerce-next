import { Facebook, Instagram, Twitch } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="pt-16 pb-16 bg-gray-100">
      <div className="w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 items-start">
        {/* 1st part */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold">Company</h2>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            About Us
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Careers
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Blogs
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Gift Cards
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Magazine
          </p>
        </div>

        {/* 2nd part */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold">Support</h2>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Contact
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Legal Notice
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Privacy
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Terms & Conditions
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Sitemap
          </p>
        </div>

        {/* 3rd part */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold">Other Services</h2>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Delivery
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Returns
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Affiliate Program
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            Partnerships
          </p>
          <p className="text-gray-800 font-medium cursor-pointer text-sm hover:text-blue-950">
            FAQs
          </p>
        </div>

        {/* 4th part */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold">Contact Us</h2>
          <div className="mt-6">
            <p className="text-sm text-gray-600">Our Mobile Number</p>
            <p className="text-base font-bold text-blue-950 mt-1">
              +201014215587
            </p>
          </div>
          <div className="mt-6">
            <p className="text-sm text-gray-600">Our Email</p>
            <p className="text-base font-bold text-blue-950 mt-1">
              ahmadsoliman283@gmail.com
            </p>
          </div>
        </div>
      </div>

      {/* bottom section */}
      <div className="mt-8 w-[80%] mx-auto border-t pt-8 flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
        <p className="text-center md:text-left">
          Copyright © 2024 Webdev. All rights reserved
        </p>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <span>Social :</span>
          <Link href="#" className="text-gray-500 hover:text-blue-800">
            <Facebook />
          </Link>
          <Link href="#" className="text-gray-500 hover:text-gray-800">
            <Twitch />
          </Link>
          <Link href="#" className="text-gray-500 hover:text-rose-800">
            <Instagram />
          </Link>
        </div>
      </div>
    </footer>
  );
}
