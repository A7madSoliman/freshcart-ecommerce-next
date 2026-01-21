import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/checkout", "/orders"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const path = req.nextUrl.pathname;

  // مسجل وبيحاول يدخل login
  if (token && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // مش مسجل وبيحاول يدخل صفحة محمية
  if (!token && protectedRoutes.some((route) => path.startsWith(route))) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

/**
 * ✅ IMPORTANT
 * حدد الصفحات اللي الميدل وير يشتغل عليها
 */
export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/login"],
};
