/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import React from "react";
import GetStartedForm from "@/components/commons/GetStartedForm";

export default function BusinessCheckingHeroContent() {
  return (
    <div className="px-6 md:px-0 flex flex-col space-y-4 lg:pr-6 lg:h-full justify-center">
      <h2 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
        Access a high-interest checking account
      </h2>
      <p className="text-sm md:text-sm">
        Apply in 10 minutes. Access up to 5.02% Annual Percentage Yield on a
        checking account through our partner banks, subject to rate sheets.**
      </p>

      <GetStartedForm />

      <p className="text-[11px] md:text-xs">
        BeeHaiv Technologies is a financial technology company, not a bank or
        FDIC-insured depository institution. Banking services are provided by
        FirstBank, a Tennessee corporation, and by Grasshopper Bank, N.A. and
        Third Coast Bank SSB; Members FDIC. The FDIC's deposit insurance
        coverage only protects against the failure of an FDIC-insured bank.***
        All screenshots provided are for illustrative purposes only and any
        performance figures displayed should not be considered representative of
        actual performance.
      </p>
    </div>
  );
}
