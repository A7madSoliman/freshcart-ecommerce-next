"use client";

import { useAuth } from "@/lib/auth/AuthContext";
import { navlinks } from "@/lib/constant";
import { useCartQuery } from "@/lib/Hooks/useCart";
import { useWishlistQuery } from "@/lib/Hooks/useWishlist";
import { Heart, Loader2, LogOut, Menu, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Props = {
  openNav: () => void;
};

export default function Nav({ openNav }: Props) {
  const pathname = usePathname();
  const { isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  const { data: cartData, isLoading: cartLoading } = useCartQuery();
  const { data: wishlistData, isLoading: wishlistLoading } = useWishlistQuery();

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => setScrolled(window.scrollY >= 90);
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    } else {
      setScrolled(true);
    }
  }, [pathname]);

  const navClass =
    pathname === "/"
      ? scrolled
        ? "bg-blue-950 shadow-md"
        : "bg-transparent"
      : "bg-blue-950 shadow-md";

  // badge number
  const cartCount = isLoggedIn ? (cartData?.numOfCartItems ?? 0) : 0;

  // wishlist count
  const wishlistCount = useMemo(() => {
    if (!isLoggedIn) return 0;
    return wishlistData?.count ?? wishlistData?.data?.length ?? 0;
  }, [isLoggedIn, wishlistData]);

  const wishlistActive = wishlistCount > 0;

  return (
    <div
      className={`${navClass} transition-all duration-200 h-[12vh] z-50 fixed w-full`}
    >
      <div className="flex items-center h-full justify-between w-[90%] xl:w-[80%] mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center flex-col">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <h1 className=" hidden lg:flex text-xl md:text-2xl text-white uppercase font-bold">
            FreshCart
          </h1>
        </Link>

        {/* Navlinks */}
        <div className="hidden lg:flex items-center space-x-10">
          {navlinks.map((link) => {
            const isActive = pathname === link.url;
            return (
              <Link href={link.url} key={link.id}>
                <p
                  className={`relative text-base font-medium w-fit block
                    after:block after:content-[''] after:absolute after:h-0.5
                    after:bg-yellow-300 after:w-full after:scale-x-0
                    hover:after:scale-x-100 after:transition after:duration-300 after:origin-center
                    ${isActive ? "text-yellow-300 after:scale-x-100" : "text-white"}
                  `}
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-5">
          {/* ✅ Wishlist */}
          <Link className="relative" href="/wishlist" aria-label="Wishlist">
            <Heart
              className={[
                "w-7 h-7 cursor-pointer transition",
                wishlistActive ? "text-red-500 fill-red-500" : "text-white/90",
                wishlistActive ? "animate-pulse" : "",
              ].join(" ")}
            />

            {/* Badge */}
            <span
              className={[
                "absolute -top-3 -right-3 w-5 h-5 rounded-full text-xs flex items-center justify-center",
                wishlistActive
                  ? "bg-red-500 text-white"
                  : "bg-white/20 text-white",
              ].join(" ")}
            >
              {isLoggedIn && wishlistLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                wishlistCount
              )}
            </span>
          </Link>

          {/* ✅ Cart */}
          <Link className="relative" href="/cart" aria-label="Cart">
            <ShoppingCart className="w-7 h-7 text-white cursor-pointer" />
            <span className="absolute -top-3 -right-3 bg-rose-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center">
              {isLoggedIn && cartLoading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                cartCount
              )}
            </span>
          </Link>

          {!isLoggedIn ? (
            <Link
              href="/login"
              className="md:px-8 md:py-2.5 px-6 py-2 text-black bg-white rounded-lg hover:bg-gray-300 transition"
            >
              LOG IN
            </Link>
          ) : (
            <button
              onClick={logout}
              className="md:px-8 md:py-2.5 px-6 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition cursor-pointer"
              aria-label="Logout"
            >
              <LogOut />
            </button>
          )}

          <Menu
            onClick={openNav}
            className="w-10 h-10 text-white lg:hidden cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
