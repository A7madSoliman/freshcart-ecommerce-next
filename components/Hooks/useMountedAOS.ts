"use client";
import { useEffect, useState } from "react";

export function useMountedAOS() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
