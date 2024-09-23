import React from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

export default function PowerfulCheckingAccount() {
  return (
    <section className="w-screen py-16 bg-background">
      <div className="container grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* heading */}
        <div className="md:col-span-2">
          <strong className="text-4xl font-bold">
            One powerful business checking account
          </strong>
          <p className="w-full">
            BeeHaiv Technologies is a financial technology company, not a bank
            or FDIC-insured depository institution. Banking services are
            provided by FirstBank, a Tennessee corporation, and by Grasshopper
            Bank, N.A. and Third Coast Bank SSB; Members FDIC. The FDIC&apos;s
            deposit insurance coverage only protects against the failure of an
            FDIC-insured bank.
          </p>
        </div>

        {/* grids */}
        <div className="p-8 flex flex-col justify-center space-y-6">
          <strong className="text-4xl text-bold">
            Say goodbye to wire fees
          </strong>
          <p>
            There&apos;s no such thing as a wire or ACH fee on BeeHaiv. Enjoy zero
            fee banking from our bank partners.
          </p>
          <ul>
            <li>Zero wire or ACH fees, both domestic and international</li>
            <li>Free check issuance and check deposits</li>
          </ul>
        </div>
        <div className="w-full aspect-square lg:p-14">
          <Image
            src="/home/services/wire-fees.svg"
            alt=""
            width={720}
            height={720}
            className="w-full rounded-md"
          />
        </div>
        <div className="lg:order-2 p-8 flex flex-col justify-center space-y-6">
          <strong className="text-4xl text-bold">Up to 5.02% APY</strong>
          <p>
            BeeHaiv partner banks pay interest on every dollar in your account
          </p>
          <ul>
            <li>
              Earn up to 5.025 APY, subject to {' '} <span className="underline">rate sheets</span>
            </li>
            <li>Interest from BeeHaiv partner banks compounds daily</li>
          </ul>
        </div>
        <div className="lg:order-1 w-full aspect-square lg:p-14">
          <Image
            src="/home/services/apy.svg"
            alt=""
            width={720}
            height={720}
            className="w-full rounded-md"
          />
        </div>
      </div>
    </section>
  );
}
