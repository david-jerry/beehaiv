import React from "react";
import GetStartedForm from "@/components/commons/GetStartedForm";

export default function HeroContent() {
  return (
    <div className="px-6 md:px-0 flex flex-col space-y-4 lg:pr-6 lg:h-full justify-center">
      <h2 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
        The corporate card designed for savings
      </h2>
      <p className="text-sm md:text-sm">
        Earn unlimited cashback up to 2% on every purchase with no annual fees,
        no minimums and no credit checks.{" "}
      </p>

      <GetStartedForm />

      <p className="text-[11px] md:text-xs">
        BeeHaiv is a financial technology company, not a bank. The BeeHaiv
        Commercial Card is issued by Community Federal Savings Bank, Member
        FDIC, pursuant to a license from VISA U.S.A. Inc. Payment services are
        provided through Airwallex US, LLC{" "}
      </p>
    </div>
  );
}
