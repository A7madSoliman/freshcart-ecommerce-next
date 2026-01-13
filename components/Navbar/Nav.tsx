"use client";

import { navlinks } from "@/constant/constant";
import { Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [navBg, setNavBg] = useState(false);

  //   Handle Bg Nav When Scroll
  useEffect(() => {
    const handleNavBg = () => {
      if (window.scrollY >= 90) setNavBg(true);
      if (window.scrollY < 90) setNavBg(false);
    };
    window.addEventListener("scroll", handleNavBg);
    return () => window.removeEventListener("scroll", handleNavBg);
  }, []);

  return (
    <div
      className={` ${navBg ? "bg-blue-950 shadow-md" : "fixed"}
       transition-all duration-200 h-[12vh] z-50
     fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center flex-col">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-xl md:text-2xl text-white uppercase font-bold">
            FreshCart
          </h1>
        </div>

        {/* Navlinks */}
        <div className="hidden lg:flex items-center space-x-10">
          {navlinks.map((link) => {
            return (
              <Link href={link.url} key={link.id}>
                <p
                  className="relative text-white text-base font-medium w-fit
                 block after:block after:content-[''] after:absolute after:h-0.5
                  after:bg-yellow-300 after:w-full after:scale-x-0
                   hover:after:scale-x-100 after:transition duration-300
                    after:origin-center"
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-5">
          <Link className="relative" href="/cart">
            <ShoppingCart className="w-7 h-7 text-white cursor-pointer" />
            <span className="absolute -top-3 -right-3 bg-rose-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              0
            </span>
          </Link>
          <button
            className="md:px-8 md:py-2.5 px-6 py-2 text-black text-base bg-white
             hover:bg-gray-300
           transition-all duration-200 rounded-lg"
          >
            LOG IN
          </button>

          {/* burger menu */}
          <Menu className="w-10 h-10 text-white lg:hidden cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
