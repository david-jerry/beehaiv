import React from "react";
import ForBusinessHeroContent from "./HeroContent";
import Hero from "@/components/commons/Hero";
import Tools from "./Tools";

export default function ForBusiness() {
  return (
    <>
      <Hero
        image={"/for-business/forBusinesses.webp"}
        leftContent={<ForBusinessHeroContent />}
      />
      <Tools />
    </>
  );
}
