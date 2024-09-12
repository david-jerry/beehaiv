import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import Cookies from "@/components/commons/Cookies";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeeHaiv - A Convenient way to banking with interest",
  description: "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
        <Cookies />
      </body>
    </html>
  );
}
