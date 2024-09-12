/* eslint-disable react/no-unescaped-entities */
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function FAQ() {
  return (
    <section className="w-screen bg-background py-24">
      <div className="container space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl lg:text-5xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="text-sm">Last updated June 17, 2024</p>
        </div>

        <div className="flex flex-col space-y-4 pt-16">
          <strong className="text-3xl font-bold">Business Checking</strong>
          <Separator />
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-bold text-xl">
                What do I need to apply for a business checking account from
                BeeHaiv banks?
              </AccordionTrigger>
              <AccordionContent className="text-sm pl-6">
                Your business must submit:
                <br />
                <br />
                — Proof of your company's formation (Articles of Incorporation,
                etc.)
                <br />
                — Proof of your federal EIN (EIN letter)
                <br />— Must have raise a minimum of $8,000 in cash
                <br />
                — The physical address from where your business operates,
                whether in the U.S. or abroad. You will also need to submit
                proof of that address (a bank statement, lease agreement, etc.).
                A virtual address is insufficient; even if your company is
                remote-first, you'll need to provide a physical address
                associated with your company.
                <br />
                — In some cases, like if you're not a U.S. citizen, you will be
                required to submit an official government ID.
                <br />— Identifying information of all beneficial owners
                <br />
                <br />
                <strong className="text-xs">
                  Some businesses may require additional information
                </strong>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="font-bold text-xl">
                Are my deposits FDIC Insured?
              </AccordionTrigger>
              <AccordionContent className="text-sm pl-6">
                BeeHaiv Technologies is a financial technology company, not a
                bank or FDIC-insured depository institution. Banking services
                are provided by FirstBank, a Tennessee corporation, and by
                Grasshopper Bank, N.A. and Third Coast Bank SSB; Members FDIC.
                The FDIC's deposit insurance coverage only protects against the
                failure of an FDIC-insured bank.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="font-bold text-xl">
                Are there any fees or minimums?
              </AccordionTrigger>
              <AccordionContent className="text-sm pl-6">
                There are zero wire, ACH, transaction fees, or minimums for
                opening a business checking account through our partner banks.
                <br />
                <br />
                <strong className="text-xs">
                  This statement only applies to BeeHaiv Technologies and does
                  not apply to advisory services.
                </strong>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="font-bold text-xl">
                How is up to 5.02% Annual Percentage Yield(APY) on s business
                checking account possible?
              </AccordionTrigger>
              <AccordionContent className="text-sm pl-6">
                Banks make money on business checking accounts, just like they
                do on savings accounts. Typically, they haven't passed back much
                of those rates, in part because interest rates haven't been high
                enough for people to notice.
                <br />
                <br />
                At BeeHaiv, we believe your business deserves the majority of
                the economics on any financial product you use, and that
                includes the business checking accounts from our partner banks.
                So, we found banks willing to pay high interest rates on these
                checking accounts for you. We hope you love using BeeHaiv!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
