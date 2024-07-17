"use client";

import LayoutProvider from "@/components/providers/LayoutProvider";
import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <NextUIProvider>
        <LayoutProvider>
          {children}
          <ToastContainer />
        </LayoutProvider>
      </NextUIProvider>
    </SessionProvider>
  );
}
