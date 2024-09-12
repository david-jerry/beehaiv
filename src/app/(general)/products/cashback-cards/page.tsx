import { Metadata } from "next";
import React from "react";
import Hero from "@/components/commons/Hero";
import Testimonial from "@/components/commons/Testimonial";
import Tools from "./Tools";
import HeroContent from "./HeroContent";

export const metadata: Metadata = {
  title: "Cashback Card - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function CashBack() {
  return (
    <>
      <Hero image={"/commons/debit-cards.svg"} leftContent={<HeroContent />} />
      <Tools />
      <Testimonial
        image=""
        ceo={"/cashback/ceo.jpg"}
        name={"Robert Breedlove"}
        testimonial={`"BeeHaiv's borderless business card with unlimited cashback up to 2% offers not only great returns but also seamless integration with our accounts, enhancing our spending power while keeping everything transparent and under control."`}
      />
    </>
  );
}
