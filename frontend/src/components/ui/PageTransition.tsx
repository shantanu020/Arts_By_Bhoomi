"use client";

import { ReactNode } from "react";

// Simplified PageTransition: No fade between pages
export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
