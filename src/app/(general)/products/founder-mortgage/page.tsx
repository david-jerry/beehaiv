/* eslint-disable react/no-unescaped-entities */
import MortgageForm from "./MortgageForm";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Founder Mortgages - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};
export default function FounderMortgages() {
  return (
    <section className="w-screen lg:h-screen pb-20 pt-24 md:pt-40 lg:pt-32 bg-gray-200 lg:flex lg:flex-col lg:justify-center">
      <div className="lg:h-max gap-14 md:gap-8 container md:mx-auto w-full md:w-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="px-6 md:px-0 flex flex-col space-y-10 lg:pr-6 lg:h-full justify-center">
          <h2 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
            Mortgages for Founders
          </h2>
          <p className="text-sm md:text-sm">
            Our Founder Mortgage Marketplace introduces founders to banks and
            lenders that can compete to offer founder-friendly mortgages.† Let's
            see if we can help you.
          </p>

          <p className="text-[11px] md:text-xs">
            †BeeHaiv is not a mortgage lender or broker or depository, bank or
            credit union, and does not receive direct financial compensation in
            connection with the making of any mortgage loan through the
            Mortgages for Founders program. Mortgage lending services are
            subject to credit and other approvals.
          </p>
        </div>

        <div className="w-full  md:rounded-md overflow-hidden text-foreground rounded-md bg-background p-8">
          <MortgageForm />
        </div>
      </div>
    </section>
  );
}
