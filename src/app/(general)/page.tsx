import AfterHero from "@/components/home/AfterHero";
import Hero from "@/components/commons/Hero";
import PowerfulCheckingAccount from "@/components/home/PowerfulCheckingAccount";
import Technologies from "@/components/home/Technologies";
import Testimonial from "@/components/commons/Testimonial";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-screen">
      <Hero />
      <AfterHero />
      <Testimonial />
      <Technologies />
      <PowerfulCheckingAccount />
    </main>
  );
}
