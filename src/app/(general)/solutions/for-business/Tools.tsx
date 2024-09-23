import React from "react";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Customers from "@/components/home/Customers";
import { SelectSeparator } from "@/components/ui/select";

export default function Tools() {
  return (
    <section className="w-screen bg-background py-16 space-y-14">
      <Customers />
      <div className="container">
        <SelectSeparator />
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-14">
        <div className="flex flex-col md:col-span-2 lg:col-span-3">
          <strong className="font-bold text-4xl">
            A new way to run your business
          </strong>
          <p>BeeHaiv is a financial technology company, not a bank</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Up to 5.02% APY</strong>
          <p>
            Earn interest with no minimum balance, monthly fees, or lockups
            subject to rate sheets
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Zero transaction fees</strong>
          <p>Say goodbye to wire, ACH, and account maintenance fees</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Multi-entity accounts</strong>
          <p>Manage banking for multiple businesses from one dashboard</p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Integrations</strong>
          <p>
            Seamlessly integrate with your payroll, accounting, and expense
            software
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">Spend Controls</strong>
          <p>
            Set custom initiators and approvers for wires, ACHs, checks, and
            other transfers
          </p>
        </div>
        <div className="space-y-4">
          <strong className="text-base font-bold">
            Check deposits and issuance
          </strong>
          <p>Digitally deposit and issue checks directly from your dashboard</p>
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
            <strong className="text-4xl">
              Domestic and International wires
            </strong>
            <p>
              Send and receive wires in the US internationally without any fees.
              Transfer between your accounts at the same bank instantly
            </p>
            <span className="block text-[11px]">
              BeeHaiv Technologies is a financial technology company, not a bank
              or FDIC-insured depository institution. Banking services are
              provided by FirstBank, a Tennessee corporation, and by Grasshopper
              Bank, N.A. and Third Coast Bank SSB; Members FDIC. The FDIC&apos;s
              deposit insurance coverage only protects against the failure of an
              FDIC-insured bank.*** All screenshots provided are for
              illustrative purposes only and any performance figures displayed
              should not be considered representative of actual performance.
            </span>
          </div>
          <div className="w-full lg:aspect-video overflow-hidden">
            <Image
              src={"/business-checking/available-balance.svg"}
              alt="available balance"
              width={720}
              height={480}
            />
          </div>
          <div className="md:order-2 flex flex-col justify-center space-y-8">
            <strong className="text-4xl">
              Access all your businesses from one dashboard
            </strong>
            <p>
              Manage all of your businesses with only one login. Transfer money
              between them with ease.
            </p>
          </div>
          <div className="md:order-1 w-full lg:aspect-video overflow-hidden">
            <Image
              src={"/business-checking/acme-corp.svg"}
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
