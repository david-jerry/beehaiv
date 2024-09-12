/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function Tools() {
  return (
    <section className="w-screen bg-background py-16 space-y-14">
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <strong className="font-bold text-4xl">
            A new way to run your business
          </strong>
          <p>BeeHaiv is a financial technology company, not a bank</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Up to 2% cashback</strong>
          <p>
            Earn $400 bonus cashback after you spend $10,000 within 90 of
            account opening{" "}
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">No credit checks</strong>
          <p>No personal credit check or founder guarantees</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">
            Control spending with custom limits
          </strong>
          <p>
            Set custom daily, weekly, monthly, and per-transaction limits for
            each card you issue
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Zero annual fees</strong>
          <p>Zero annual fees on your BeeHaiv card</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Save on global spend</strong>
          <p>
            Save an average of 2%† on fees when spending in select foreign
            currencies{" "}
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Apple pay and more</strong>
          <p>Add your card to Apple or Google Pay and start tapping to pay</p>
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
            <strong className="text-4xl">Issue unlimited cards</strong>
            <p>
              Issue virtual physical cards at no additional cost. Assign
              individual virtual cards to make cancellation easy and reduce
              unauthorized transactions.
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
              src={"/cashback/cashback-cards.svg"}
              alt="cashback cards"
              width={720}
              height={480}
            />
          </div>
          <div className="md:order-2 flex flex-col justify-center space-y-8">
            <strong className="text-4xl">
              Full visibility into your teams spending
            </strong>
            <p>
              Securely issue cards to employees without sharing card numbers.
              Monitor employee spend and receipt compliance effortlessly
            </p>
          </div>
          <div className="md:order-1 w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/cashback/cashback-visibility.svg"}
              alt="available balance"
              width={720}
              height={480}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <strong className="text-4xl">
              Earn unlimited cashback up to 2% on every purchase
            </strong>
            <p>
              Earn straightforward cashback on every purchase instead of a
              confusing points system. There are no limits to the amount of
              cashback you can earn with your BeeHaiv card.
            </p>
          </div>
          <div className="w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/cashback/unlimited-cashback.svg"}
              alt="cashback cards"
              width={720}
              height={480}
            />
          </div>
          <div className="md:order-2 flex flex-col justify-center space-y-8">
            <strong className="text-4xl">
              Go global with a borderless card
            </strong>
            <p>
              Save an average of 2%† on currency conversion fees when spending
              in select currencies including CAD, EUR, GBP and more.{" "}
            </p>
          </div>
          <div className="md:order-1 w-full lg:aspect-video overflow-hidden rounded-md">
            <Image
              src={"/cashback/borderless.svg"}
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
