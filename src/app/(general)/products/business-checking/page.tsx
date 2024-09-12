import { Metadata } from "next";
import React from "react";
import Hero from "@/components/commons/Hero";
import BusinessCheckingHeroContent from "./HeroContent";
import Testimonial from "@/components/commons/Testimonial";
import Tools from "./Tools";

export const metadata: Metadata = {
  title: "Business Checking - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function BusinessChecking() {
  return (
    <>
      <Hero
        image={"/business-checking/business-checking-hero.svg"}
        leftContent={<BusinessCheckingHeroContent />}
      />
      <Tools />
      <Testimonial
        image="/business-checking/circle.svg"
        ceo={"/business-checking/circle-ceo.png"}
        name={"Chris Troelstra, Head of Finance at Circle"}
        testimonial={`"Unmatched yield and security for a checking account. Easy to schedule wires, run payroll and connect credit cards. Saves me the hidden opportunity cost of running our business out of a yield-less operating account."`}
      />
    </>
  );
}
