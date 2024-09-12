/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import GetStartedForm from "@/components/commons/GetStartedForm";

export default function BusinessLoansHeroContent() {
  return (
    <div className="px-6 md:px-0 flex flex-col space-y-4 lg:pr-6 lg:h-full justify-center">
      <h2 className="text-5xl lg:text-7xl font-bold text-center md:text-left">
        Business Loans to fuel your growth
      </h2>
      <p className="text-sm md:text-sm">
        Easily apply for up to $2500k in financing without impacting your credit
        score.
      </p>

      <GetStartedForm />

      <p className="text-[11px] md:text-xs">
        BeeHaiv does not issue loans or make credit decisions in connection with
        loans. All loans are subject to credit approval. Your terms may vary.
        Loans are issued by Kanmon, a licensed lender. California Loans are made
        pursuant to a Department of Financial Protection and Innovation
        California Lenders Law License.
      </p>
    </div>
  );
}
