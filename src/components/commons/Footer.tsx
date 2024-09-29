"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import Logo from "./Logo";

/* The above code is a TypeScript React component for a website footer. It includes sections for
different categories such as Products, Financing, BeeHaiv For, Resources, and Legal. Each section
contains links related to the respective category. Additionally, there is a copyright notice, a
separator component, and a disclaimer section at the end of the footer. The footer is styled using
Tailwind CSS classes for layout and design. */
export default function Footer() {
  return (
    <>
    <section className="h-fit w-screen bg-foreground text-background !overflow-hidden">
      <div className="overflow-hidden container py-24 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 w-full space-y-8 xl:space-y-0 gap-4">
          <div className="flex flex-col space-y-4 items-start">
            <h6 className="text-lg font-bold">Products</h6>
            <div className="grid grid-cols-2 lg:grid-cols-1 text-sm gap-2.5">
              <div className="space-y-2">
                <Link className="block" href="">
                  Business Checking
                </Link>
                <Link className="block" href="">
                  Unlimited Cashback Cards
                </Link>
                <Link className="block" href="">
                  International Payouts
                </Link>
              </div>
              <div className="space-y-2">
                <Link className="block" href="">
                  Global Treasury
                </Link>
                <Link className="block" href="">
                  Runway Tracker
                </Link>
                <Link className="block" href="">
                  Business Loans
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-start">
            <h6 className="text-lg font-bold">Financing</h6>
            <div className="grid grid-cols-2 lg:grid-cols-1 text-sm gap-2.5">
              <div className="space-y-2">
                <Link className="block" href="">
                  Founder Mortgages
                </Link>
                <Link className="block" href="">
                  Venture Debt
                </Link>
                <Link className="block" href="">
                  SBA Loans
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-start">
            <h6 className="text-lg font-bold">BeeHaiv For</h6>
            <div className="grid grid-cols-2 lg:grid-cols-1 text-sm gap-2.5">
              <div className="space-y-2">
                <Link className="block" href="">
                  Businesses
                </Link>
                <Link className="block" href="">
                  Funds
                </Link>
                <Link className="block" href="">
                  Startups
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-start">
            <h6 className="text-lg font-bold">Resources</h6>
            <div className="grid grid-cols-2 lg:grid-cols-1 text-sm gap-2.5">
              <div className="space-y-2">
                <Link className="block" href="">
                  About
                </Link>
                <Link className="block" href="">
                  Help Center
                </Link>
                <Link className="block" href="">
                  Customer Stories
                </Link>
              </div>
              <div className="space-y-2">
                <Link className="block" href="">
                  Blog
                </Link>
                <Link className="block" href="">
                  Comparison
                </Link>
                <Link className="block" href="">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-4 items-start">
            <h6 className="text-lg font-bold">Legal</h6>
            <div className="grid grid-cols-2 lg:grid-cols-1 text-sm gap-2.5">
              <div className="space-y-2">
                <Link className="block" href="">
                  Privacy Policy
                </Link>
                <Link className="block" href="">
                  Terms of Service
                </Link>
                <Link className="block" href="">
                  Data Processing Agreement
                </Link>
              </div>
              <div className="space-y-2">
                <Link className="block" href="">
                  Cookie Policy
                </Link>
                <Link className="block" href="">
                  FirstBank Customer Agreement
                </Link>
                <Link className="block" href="">
                  FirstBank Privacy Policy
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 lg:pt-14 flex flex-col items-start lg:flex-row lg:items-center gap-4 lg:justify-between w-full">
          <Logo />
          <p className="text-xs w-fit">
            Copyright © 2024 BeeHaiv Technologies Inc | All Rights Reserved
          </p>
        </div>

        <Separator />

        <div className="text-xs space-y-3.5 pt-6">
          <p>
            *Disclaimer: BeeHaiv Advisory LLC is a registered investment
            adviser. Registration as an investment adviser does not imply any
            level of skill or training.
          </p>

          <p>
            For accounts opened through Atomic Brokerage LLC: BeeHaiv Advisory
            LLC has an engagement with Atomic Brokerage LLC (“Atomic
            Brokerage”), a registered broker-dealer and member of FINRA and SIPC
            , to bring you the opportunity to open a brokerage account.
            Brokerage services for customers of BeeHaiv Advisory LLC are
            provided by Atomic Brokerage. For more details about Atomic
            Brokerage, please see the Form CRS, General Disclosures, and the
            Privacy Policy. Check the background of Atomic Brokerage on FINRA’s
            BrokerCheck.
          </p>

          <p>
            For subadvisory services for accounts opened through Atomic Invest
            LLC: BeeHaiv Advisory LLC has an engagement with Atomic Invest, LLC
            (“Atomic Invest”), an SEC-registered investment adviser, to bring
            you the opportunity to open an investment advisory account.
            Investment advisory services are provided by Atomic Invest.
            Companies which are engaged by Atomic Invest receive compensation of
            0% to 0.85% annualized, payable monthly, based upon assets under
            management for each referred client who establishes an account with
            Atomic Invest (i.e., exact payment will differ). Atomic Invest also
            shares a percentage of compensation received from margin interest
            and free cash interest earned by customers with BeeHaiv Advisory
            LLC. BeeHaiv Advisory LLC is not a client of Atomic Invest, but our
            engagement with Atomic invest gives us an incentive to refer you to
            Atomic Invest instead of another investment adviser. This conflict
            of interest affects our ability to provide you with unbiased,
            objective information about the services of Atomic Invest. This
            could mean that the services of another investment adviser with whom
            we are not engaged could be more appropriate for you than Atomic
            invest. Advisory services through Atomic Invest are designed to
            assist clients in achieving a favorable outcome in their investment
            portfolio. They are not intended to provide tax advice or financial
            planning with respect to every aspect of a client&apos;s financial
            situation and do not include investments that clients may hold
            outside of Atomic Invest. For more details about Atomic Invest,
            please see the Form CRS, Form ADV Part 2A, the Privacy Policy, and
            other disclosures. Brokerage services for Atomic Invest are provided
            by Pershing Advisor Solutions LLC (“PAS”), a registered
            broker-dealer and member of FINRA and SIPC.
          </p>

          <p>
            Neither Atomic Invest nor Atomic Brokerage, nor any of their
            affiliates, is a bank. Investments in securities are Not FDIC
            insured, Not Bank Guaranteed, and May Lose Value. Investing involves
            risk, including the possible loss of principal. Before investing,
            consider your investment objectives and the fees and expenses
            charged by Atomic Brokerage and/or Atomic Invest.
          </p>

          <p>
            ~5% Treasury Bill yield is sourced from treasurydirect.gov June 2024
            12-week U.S. Treasury Bill auction. T-Bill yield is an annualized
            rate when held to maturity. T-Bills are purchased at a discount to
            par, $1,000, with the price being subject to market fluctuation. The
            amount of T-Bills available at a particular yield will depend upon
            the sellers offer size
          </p>

          <p>
            **Disclaimer: The interest rate and annual percentage yield may
            change at any time and without prior notice. Interest rates and
            yields are effective as per the date on the applicable rate sheet.
            See applicable terms and restrictions and refer to the applicable
            rate sheet for additional information. BeeHaiv Technologies is a
            financial technology company, not an FDIC-insured depository
            institution, bank or credit union, and your account at BeeHaiv is
            not, itself, an FDIC-insured product.
          </p>

          <p>
            By opening a Maximum Checking account through BeeHaiv and if you
            choose to receive banking services provided by Third Coast Bank SSB,
            you deposit your funds into a deposit account at Third Coast Bank
            SSB. If you also hold funds in a sweep program with Third Coast Bank
            SSB, Third Coast Bank SSB sweeps those funds into deposit accounts
            across a network of FDIC-insured banks, for up to the current SMDIA
            of $250,000 per eligible depositor, per receiving bank, for each
            ownership capacity or category, including any other balances you may
            hold at that receiving bank directly or indirectly through other
            intermediaries, including broker-dealers. Third Coast Bank SSB uses
            a third-party vendor and agent to help administer this sweep
            process. Visit Third Coast Bank SSB for a list of the banks and
            savings associations with which we/Third Coast Bank SSB have a
            business relationship for the placement of deposits at receiving
            banks, and into which your deposits may be placed (subject to
            applicable terms with you, and any opt-outs by Third Coast Bank or
            you). The current maximum deposit insurance amount for your funds is
            up to $50 Million in FDIC insurance through the sweep network of
            Third Coast Bank, subject to change at any time with notice from
            BeeHaiv and/or pursuant to applicable law. Terms and restrictions
            apply. Subject to applicable rate sheet. Interest rate on checking
            products quoted in Annual Percentage Yield (APY). Interest rates and
            yields are effective as per the date on the applicable rate sheet.
            See applicable terms and conditions and refer to the applicable rate
            sheet for additional information.
          </p>

          <p>
            Deposit placement through an IntraFi service is subject to the
            terms, conditions, and disclosures in applicable agreements.
            Deposits that are placed through an IntraFi service at FDIC-insured
            banks in IntraFi&apos;s network are eligible for FDIC deposit insurance
            coverage at the network banks. The depositor may exclude banks from
            eligibility to receive its funds. To meet the conditions for
            pass-through FDIC deposit insurance, deposit accounts at
            FDIC-insured banks in IntraFi&apos;s network that hold deposits placed
            using an IntraFi service are titled, and deposit account records are
            maintained, in accordance with FDIC regulations for pass-through
            coverage. Although deposits are placed in increments that do not
            exceed the FDIC standard maximum deposit insurance amount (&quot;SMDIA&quot;)
            at any one bank, a depositor&apos;s balances at the institution that
            places deposits may be uninsured. The depositor must make any
            necessary arrangements to protect such balances consistent with
            applicable law and must determine whether placement through an
            IntraFi service satisfies any restrictions on its deposits. IntraFi,
            ICS, and IntraFi Cash Service are registered service marks of
            IntraFi LLC.
          </p>
        </div>
      </div>
    </section>
    </>
  );
}
