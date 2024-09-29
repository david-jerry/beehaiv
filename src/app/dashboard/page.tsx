"use client"

import { Button } from "@/components/ui/button";
import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { TbCreditCardPay, TbCreditCardRefund } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import TransferForm from "./Form";
import { MyChart } from "./Chart";
import Transactions, { columns } from "./Transactions";
import Cards from "./Cards";
import { Metadata } from "next";
import { useIsMounted } from "usehooks-ts";

/**
 * The Dashboard component in TypeScript React renders a dashboard layout with various sections and
 * components.
 * @returns The `Dashboard` component is being returned. It contains a section with various elements
 * such as headings, grids, cards, buttons, charts, and forms arranged in a dashboard layout.
 */
export default function Dashboard() {
  const isMounted = useIsMounted();
  return (
    <section className="flex flex-col items-start gap-6 pt-6 lg:pt-0 pb-4 ">
      <h1 className="text-3xl font-bold w-full">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full h-fit">
        <div className="md:col-span-3 lg:col-span-2 xl:col-span-3 w-full space-y-4 flex flex-col">
          <div className="h-fit relative rounded-md overflow-hidden p-4 bg-yellow-600 flex flex-col w-full">
            <div className="rounded-full w-32 aspect-square absolute -bottom-16 -right-16 z-0 bg-gray-300/60"></div>
            <div className="rounded-full w-28 aspect-square absolute -bottom-16 -right-16 z-0 bg-gray-300/60"></div>
            <div className="rounded-full w-20 aspect-square absolute -bottom-16 -right-16 z-0 bg-gray-300/60"></div>
            <div className="relative z-20 flex flex-col space-y-6 w-full">
              <strong className="text-2xl font-bold">Unlimited Cashback</strong>
              <span className="flex text-sm">
                Instant 2% bonus on all your spend to your account
              </span>
              <Button type="button" className="uppercase px-6 w-fit">
                download app
              </Button>
            </div>
          </div>

          {isMounted() &&
            <MyChart />
          }

          <Transactions columns={columns} />
        </div>
        <div className="overflow-hidden flex flex-col space-y-4 md:col-span-3 lg:col-span-2 xl:col-span-1 w-full">
          <div className="grid grid-col-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
            <div className="bg-gray-100 border border-gray-300 w-full flex flex-col p-4 rounded-md space-y-4">
              <div className="flex items-center justify-between">
                <strong className="flex font-bold text-xs">Cards</strong>
                <Button variant={"link"}>
                  <PiDotsThreeOutlineVerticalFill />
                </Button>
              </div>
              <div className="flex items-center overflow-x-auto scrollbar-hide gap-4 w-full p-4 pl-0">
                <Cards />
              </div>

              <div className="grid-cols-4 gap-4 w-full grid">
                <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-purple-600 shadow-none">
                  <TbCreditCardPay className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-purple-600" />
                  <span className="text-[10px] flex text-gray-400">Send</span>
                </Button>
                <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-green-600 shadow-none">
                  <TbCreditCardRefund className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-green-600" />
                  <span className="text-[10px] flex text-gray-400">
                    Receive
                  </span>
                </Button>
                <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-yellow-600 shadow-none">
                  <LiaFileInvoiceDollarSolid className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-yellow-600" />
                  <span className="text-[10px] flex text-gray-400">
                    Invoice
                  </span>
                </Button>
                <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-blue-600 shadow-none">
                  <AiOutlineAppstoreAdd className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-blue-600" />
                  <span className="text-[10px] flex text-gray-400">More</span>
                </Button>
              </div>
            </div>
            <div className="bg-gray-100 border border-gray-300 w-full flex flex-col p-4 rounded-md space-y-4">
              <TransferForm />
            </div>
          </div>{" "}
        </div>
      </div>
    </section>
  );
}
