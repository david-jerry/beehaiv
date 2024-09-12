/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Tools() {
  return (
    <section className="w-screen bg-background py-16 space-y-14">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
        <div className="space-y-4">
          <strong className="text-base font-bold">
            Send directly from your dashboard
          </strong>
          <p>
            Send money internationally from the same flow as domestic transfers{" "}
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Local payment rails</strong>
          <p>Pay your employees and vendors in their local currency</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">
            Control spending with custom limits
          </strong>
          <p>Set custom initiators and approvers international transfers </p>
        </div>
      </div>

      <div className="container space-y-12">
        <Separator className="mt-6 mb-6" />

        <div className="space-y-4">
          <strong className="font-bold text-4xl">
            Operate globally with international payouts
          </strong>
          <p>BeeHaiv is a financial technology company, not a bank</p>
          <Separator className="w-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <strong className="text-4xl">
              Foreign exchange without hassle
            </strong>
            <p>
              Send money internationally without having to manually convert
              currencies. Start with USD and send 40+ currencies, including GBP,
              EUR, CAD, AUD, JPY, INR, and SGD around the world.
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
              src={"/payout/exchange.svg"}
              alt="cashback cards"
              width={720}
              height={480}
            />
          </div>
          <div className="md:order-2 flex flex-col justify-center space-y-8">
            <strong className="text-4xl">Never leave your dashboard</strong>
            <p>
              Keep everything in one place. Send money internationally using the
              same platform that you use to send money domestically.{" "}
            </p>
          </div>
          <div className="md:order-1 w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/payout/dashboard.svg"}
              alt="available balance"
              width={720}
              height={480}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <strong className="text-4xl">Enterprise grade security</strong>
            <p>
              Set up granular access controls for each user on your account.
              Create spend controls, limits, and multi-person approvals for
              payments.{" "}
            </p>
          </div>
          <div className="w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/payout/security.svg"}
              alt="cashback cards"
              width={720}
              height={480}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
