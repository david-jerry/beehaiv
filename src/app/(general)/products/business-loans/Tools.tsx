/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Tools() {
  return (
    <section className="w-screen bg-background py-16 space-y-14">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
        <div className="space-y-4">
          <strong className="text-base font-bold">Borrow up to $250k</strong>
          <p>Options from $10k to $250k</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Risk-free application</strong>
          <p>Apply with no impact to your credit score</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">
            Quick application process
          </strong>
          <p>Apply in under 5 minutes</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Fast Funding</strong>
          <p>Receive funding in as little as 24 hours </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Lines of Credit</strong>
          <p>Borrow flexibly, repay as you go</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Term Loans</strong>
          <p>Repay with predictable monthly payments</p>
        </div>
      </div>

      <div className="container space-y-12">
        <Separator className="mt-6 mb-6" />

        <div className="space-y-4">
          <strong className="font-bold text-4xl">
            Powerful tools to help your business grow
          </strong>
          <p>BeeHaiv is a financial technology company, not a bank</p>
          <Separator className="w-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <strong className="text-4xl">Borrow on your terms</strong>
            <p>
              <strong>Lines of Credit:</strong> Draw funds whenever you need to
              and receive same day funding. Pay back only what you borrow in
              monthly increments
            </p>
            <p>
              <strong>Term Loans:</strong> Choose from multiple offer when
              you're approved for a term loan and repay with predictable monthly
              installments.
            </p>
            <span className="block text-[11px]">
              BeeHaiv Technologies is a financial technology company, not a bank
              or FDIC-insured depository institution. Banking services are
              provided by FirstBank, a Tennessee corporation, and by Grasshopper
              Bank, N.A. and Third Coast Bank SSB; Members FDIC. The FDIC's
              deposit insurance coverage only protects against the failure of an
              FDIC-insured bank.*** All screenshots provided are for
              illustrative purposes only and any performance figures displayed
              should not be considered representative of actual performance.
            </span>
          </div>
          <div className="w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/business-loans/lender-network.svg"}
              alt="available balance"
              width={720}
              height={480}
            />
          </div>
          <div className="md:order-2 flex flex-col justify-center space-y-8">
            <strong className="text-4xl">Apply with ease of mind</strong>
            <p>
              Applications for term loans and lines of credit do not impact your
              credit score. Apply in as little as 10 minutes.
            </p>
          </div>
          <div className="md:order-1 w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/business-loans/ease-apply.svg"}
              alt="available balance"
              width={720}
              height={480}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <strong className="text-4xl">Business Loan requirements</strong>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-foreground"></div>
                <p>You have a 630+ FICO score</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-foreground"></div>
                <p>You've been in business for over 12 months</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-foreground"></div>
                <p>Your business has over $8,000 in cash</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/business-loans/loan-requirements.svg"}
              alt="available balance"
              width={720}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
