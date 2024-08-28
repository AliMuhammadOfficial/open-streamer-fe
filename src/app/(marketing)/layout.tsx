import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Streamer",
  description: "An open-source streaming platform for everyone",
};

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
