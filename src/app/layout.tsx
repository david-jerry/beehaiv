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

/**
 * The RootLayout component in TypeScript React renders children within an AuthProvider, BackHome
 * component, Toaster component, and Cookies component.
 * @param  - The `RootLayout` function is a React component that serves as the root layout for your
 * application. It takes a single parameter, an object with a `children` property of type
 * `React.ReactNode`. The `children` prop represents the content that will be rendered within the
 * layout.
 * @returns The `RootLayout` function is returning a JSX structure that includes an `AuthProvider`
 * component wrapping the content. Inside the `html` tag with the language set to "en", there is a
 * `body` tag with a className attribute that includes the classes "relative", `${inter.className}`,
 * "w-screen", and "overflow-x-hidden".
 */
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
