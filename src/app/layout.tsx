import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Cookies from "@/components/commons/Cookies";
import { AuthProvider } from "@/context/AuthContext";
import BackHome from "@/components/commons/BackHome";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BeeHaiv - A Convenient way to banking with interest",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`relative ${inter.className} w-screen overflow-x-hidden`}
        >
          <BackHome />
          {children}
          <Toaster />
          <Cookies />
        </body>
      </html>
    </AuthProvider>
  );
}
