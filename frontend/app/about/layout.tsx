import React from "react";

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
      <div>{children}</div>
  );
}
