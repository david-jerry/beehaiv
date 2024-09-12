import { Metadata } from "next";
import React from "react";
import SBALoanForm from "./SBALoanForm";

export const metadata: Metadata = {
  title: "SBA Loans - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function SbaLoans() {
  return (
    <section className="w-screen lg:h-screen pb-20 pt-24 md:pt-40 lg:pt-32 bg-gray-200 lg:flex lg:flex-col lg:justify-center">
      <div className="lg:h-max gap-14 md:gap-8 container md:mx-auto w-full md:w-auto grid grid-cols-1 lg:grid-cols-2">
        <div className="px-6 md:px-0 flex flex-col space-y-10 lg:pr-6 lg:h-full justify-center">
          <h2 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
            SBA Loans
          </h2>
          <p className="text-sm md:text-sm">
            Get the funding you need to grow your business with an SBA loan.
          </p>

          <p className="text-[11px] md:text-xs">
            † BeeHaiv does not issue loans or make credit decisions in
            connection with loans. All loans are subject to credit approval.
            Your terms may vary. Loans are provided by a network of SBA lenders.
          </p>
        </div>

        <div className="w-full  md:rounded-md overflow-hidden text-foreground rounded-md bg-background p-8">
          <SBALoanForm />
        </div>
      </div>
    </section>
  );
}
