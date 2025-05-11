import React from "react";
import { Navbar } from "@/components/navbar/Navbar";
import {  Toaster } from "sonner";

export default function JobsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Toaster position="top-center" />
    <div className="bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 py-4 flex justify-center">
        <Navbar />
      </div>
      <div className="mt-4">{children}</div>
    </div>
    </>
  );
}
