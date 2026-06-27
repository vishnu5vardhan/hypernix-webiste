import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hypernix | Internal Systems for Growing Businesses",
  description: "Internal systems for growing companies outgrowing memory, calls, and follow-ups.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
