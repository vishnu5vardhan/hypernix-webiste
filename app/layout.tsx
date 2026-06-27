import type { Metadata } from "next";
import CustomCursor from "@/components/CustomCursor";
import BootSequence from "@/components/BootSequence";
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
      <body suppressHydrationWarning>
        <BootSequence />
        <div className="crt-bezel" aria-hidden="true"></div>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
