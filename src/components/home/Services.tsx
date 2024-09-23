import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";

export default function Services() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="flex flex-col space-y-3 w-full">
        <strong className="font-bold block">Corporate Cards</strong>
        <p className="font-normal">
          Earn unlimited cashback up to 2% on every purchase. No fees or credit
          check required.
        </p>
        <div className="w-full aspect-square">
          <Image
            src={"/commons/debit-cards.svg"}
            width={480}
            height={480}
            className="w-full object-cover"
            alt="debit-cards"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <strong className="font-bold block">Free wires, ACH, and checks</strong>
        <p className="font-normal">
          Create fee-free scheduled and recurring payments by ACH and wire, and
          free checks.
        </p>
        <div className="w-full aspect-square">
          <Image
            src={"/commons/wires.svg"}
            width={480}
            height={480}
            className="w-full object-cover"
            alt="debit-cards"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <strong className="font-bold block">Invoicing</strong>
        <p className="font-normal">
          Create custom-branded invoices with your company&apos;s logo and
          colors.
        </p>
        <div className="w-full aspect-square">
          <Image
            src={"/commons/invoicing.svg"}
            width={480}
            height={480}
            className="w-full object-cover"
            alt="debit-cards"
          />
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        BeeHaiv Technologies is a financial technology company, not a bank. The
        BeeHaiv Commercial Card is issued by Community Federal Savings Bank,
        pursuant to a license from VISA U.S.A. Inc. Banking services are
        provided by FirstBank, a Tennessee corporation, and by Grasshopper Bank,
        N.A. and Third Coast Bank SSB; Members FDIC.
      </div>
      <div className="w-full">
        <Separator />
      </div>
      <div className="w-full hidden md:flex">
        <Separator />
      </div>
      <div className="w-full hidden lg:flex">
        <Separator />
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <strong className="font-bold block">Corporate Cards</strong>
        <p className="font-normal">
          Earn unlimited cashback up to 2% on every purchase. No fees or credit
          check required.
        </p>
        <div className="w-full aspect-square">
          <Image
            src={"/commons/finance.svg"}
            width={480}
            height={480}
            className="w-full object-cover"
            alt="debit-cards"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <strong className="font-bold block">Integrations</strong>
        <p className="font-normal">
          Create fee-free scheduled and recurring payments by ACH and wire, and
          free checks.
        </p>
        <div className="w-full aspect-square">
          <Image
            src={"/commons/Integrations.svg"}
            width={480}
            height={480}
            className="w-full object-cover"
            alt="debit-cards"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-3 w-full">
        <strong className="font-bold block">Spend Controls</strong>
        <p className="font-normal">
          Create custom-branded invoices with your company&apos;s logo and
          colors.
        </p>
        <div className="w-full aspect-square">
          <Image
            src={"/commons/spend-controls.svg"}
            width={480}
            height={480}
            className="w-full object-cover"
            alt="debit-cards"
          />
        </div>
      </div>
      <div className="md:col-span-2 lg:col-span-3">
        BeeHaiv is a financial technology company, not a lender. BeeHaiv does
        not issue loans or make credit decisions in connection with loans. All
        loans are subject to credit approval from BeeHaiv&apos;s bank or credit
        partners. SBA loans are provided by a network of vendors and subject to
        their approval. Your terms may vary.
      </div>
    </div>
  );
}
