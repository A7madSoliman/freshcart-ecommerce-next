import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ResponsiveNav from "@/components/Navbar/ResponsiveNav";
import Footer from "@/components/Footer/Footer";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/AuthContext";
import AOSProvider from "@/components/AOSProvider/AOSProvider";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import ReactQueryProvider from "@/components/ReactQueryProvider/ReactQueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart — Fashion & Tech Store",
    template: "%s | FreshCart",
  },
  description:
    "Modern e-commerce built with Next.js, React Query, and Tailwind CSS. Browse products, manage cart, checkout, orders, and wishlist.",
  applicationName: "FreshCart",
  metadataBase: new URL("https://freshcart-ecommerce-nextjs.vercel.app/"),
  keywords: [
    "FreshCart",
    "ecommerce",
    "next.js",
    "react",
    "react query",
    "tailwind",
    "fashion",
    "electronics",
    "cart",
    "checkout",
    "wishlist",
  ],
  authors: [{ name: "FreshCart" }],
  creator: "FreshCart",
  openGraph: {
    title: "FreshCart — Fashion & Tech Store",
    description:
      "Shop curated fashion and electronics. Cart, checkout, orders, and wishlist experience built with Next.js.",
    url: "https://freshcart-ecommerce-nextjs.vercel.app/",
    siteName: "FreshCart",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <ReactQueryProvider>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
          >
            <ResponsiveNav />
            <main role="main" className="flex-1">
              <AOSProvider />
              {children}
              <Toaster position="top-left" richColors />
            </main>
            <ScrollToTop />
            <Footer />
          </body>
        </ReactQueryProvider>
      </AuthProvider>
    </html>
  );
}
