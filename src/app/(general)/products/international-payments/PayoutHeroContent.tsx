import React from "react";
import GetStartedForm from "@/components/commons/GetStartedForm";

export default function PayoutHeroContent() {
  return (
    <div className="px-6 md:px-0 flex flex-col space-y-4 lg:pr-6 lg:h-full justify-center">
      <h2 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
        International money transfers
      </h2>
      <p className="text-sm md:text-sm">
        Send 40+ currencies, including GBP, EUR, CAD, AUD, JPY, INR, and SGD,
        internationally on your BeeHaiv dashboard.{" "}
      </p>

      <GetStartedForm />

      <p className="text-[11px] md:text-xs">
        The payment services mentioned on this page are provided through
        Airwallex US,{" "}
      </p>
    </div>
  );
}
