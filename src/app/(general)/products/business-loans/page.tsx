import { Metadata } from "next";
import React from "react";
import Hero from "@/components/commons/Hero";
import Testimonial from "@/components/commons/Testimonial";
import Tools from "./Tools";
import BusinessLoansHeroContent from "./HeroContent";

export const metadata: Metadata = {
  title: "Business Loans - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function BusinessLoans() {
  return (
    <>
      <Hero
        image={"/business-loans/business-loans-hero.svg"}
        leftContent={<BusinessLoansHeroContent />}
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
