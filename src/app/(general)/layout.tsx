import Footer from "@/components/commons/Footer";
import Subscription from "@/components/commons/Subscription";
import Header from "@/components/header/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      {children}
      <Subscription />
      <Footer />
    </>
  );
}
