"use client";

import { useEffect } from "react";
import AOS from "aos";
import { usePathname } from "next/navigation";

export default function AOSProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      AOS.init({
        duration: 700,
        once: true,
        offset: 80,
        easing: "ease-out",
      });
    });

    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    AOS.refreshHard();
  }, [pathname]);

  return null;
}
