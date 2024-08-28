import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Streamer",
  description: "An open-source streaming platform for everyone",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
