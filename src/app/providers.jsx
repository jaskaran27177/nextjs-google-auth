"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
