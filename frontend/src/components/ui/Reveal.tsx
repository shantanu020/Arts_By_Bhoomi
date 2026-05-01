"use client";

import { ReactNode } from "react";

// Passthrough - No animations, accepts any props to avoid compilation errors
export default function Reveal({ children, ...props }: { children: ReactNode; [key: string]: any }) {
  return <>{children}</>;
}
