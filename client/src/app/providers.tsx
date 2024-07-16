"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";

export default function Providers({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <NextUIProvider>
        {children}
        <ToastContainer />
      </NextUIProvider>
    </SessionProvider>
  );
}
