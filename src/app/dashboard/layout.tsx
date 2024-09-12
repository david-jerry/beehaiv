import Footer from "@/components/commons/Footer";
import Subscription from "@/components/commons/Subscription";
import Header from "@/app/dashboard/Header";
import OTPTransfer from "@/components/otp/Pin";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="w-screen pl-0 md:pl-[74px] lg:pl-[234px] ">
      <Header />
      <div className="w-full px-4 md:px-6 min-h-screen">{children}</div>
      <OTPTransfer />
    </section>
  );
}
