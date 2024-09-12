import Hero from "@/components/commons/Hero";
import PayoutHeroContent from "./PayoutHeroContent";
import Tools from "./Tools";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "International Payouts - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};
export default function InternationalPayouts() {
  return (
    <>
      <Hero
        image={"/cashback/borderless.svg"}
        leftContent={<PayoutHeroContent />}
      />
      <Tools />
    </>
  );
}
