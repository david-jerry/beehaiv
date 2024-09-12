import { Button } from "@/components/ui/button";
import React from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa6";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { TbCreditCardPay, TbCreditCardRefund } from "react-icons/tb";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { AiOutlineAppstoreAdd } from "react-icons/ai";

import TransferForm from "./Form";
import { MyChart } from "./Chart";
import Transactions, { columns } from "./Transactions";
import { transactions } from "@/data/Transactions";

export default function Dashboard() {
  return (
    <section className="flex flex-col items-start gap-6 py-4">
      <h1 className="text-3xl font-bold w-full">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
        <div className="md:col-span-2 lg:col-span-3 w-full space-y-4">
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

          <MyChart />

          <Transactions columns={columns} data={transactions} />
        </div>
        <div className="overflow-hidden flex flex-col space-y-4 md:col-span-2 lg:col-span-1 w-full">
          <div className="bg-gray-100 border border-gray-300 w-full flex flex-col p-4 rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <strong className="flex font-bold text-xs">Cards</strong>
              <Button variant={"link"}>
                <PiDotsThreeOutlineVerticalFill />
              </Button>
            </div>
            <div className="flex items-center overflow-x-auto scrollbar-hide gap-4 w-full p-4 pl-0">
              <div className="flex-none relative rounded-md overflow-hidden hover:shadow hover:scale-105 bg-yellow-600 w-[90%] aspect-video text-white duration-200 ease-in-out">
                <Image
                  src={"/card/background-2.jpeg"}
                  alt="card-background"
                  width={780}
                  height={460}
                  className="w-full h-full object-cover absolute z-0"
                />
                <div className="w-full h-full absolute left-0 top-0 bg-black/10 z-10"></div>
                <FaRegCreditCard className="absolute top-4 left-4 z-10" />
                <div className="absolute bottom-0 left-0 right-0 flex bg-black/40 flex-col p-4 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs flex w-fit">
                      1234 5678 2345 7890
                    </span>
                    <span className="text-xs flex w-fit">03/26</span>
                  </div>
                  <Separator />
                  <span className="text-semibold">
                    $ <span>10,000</span>
                  </span>
                </div>
              </div>{" "}
              <div className="flex-none relative rounded-md overflow-hidden hover:shadow hover:scale-105 bg-yellow-600 w-[90%] aspect-video text-white duration-200 ease-in-out">
                <Image
                  src={"/card/background-3.jpeg"}
                  alt="card-background"
                  width={780}
                  height={460}
                  className="w-full h-full object-cover absolute z-0"
                />
                <div className="w-full h-full absolute left-0 top-0 bg-black/10 z-10"></div>
                <FaRegCreditCard className="absolute top-4 left-4 z-10" />
                <div className="absolute bottom-0 left-0 right-0 flex bg-black/40 flex-col p-4 gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs flex w-fit">
                      1234 5678 2345 7890
                    </span>
                    <span className="text-xs flex w-fit">03/26</span>
                  </div>
                  <Separator />
                  <span className="text-semibold">
                    $ <span>10,000</span>
                  </span>
                </div>
              </div>
            </div>

            <div className="grid-cols-4 gap-4 w-full grid">
              <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-purple-600 shadow-none">
                <TbCreditCardPay className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-purple-600" />
                <span className="text-[10px] flex text-gray-400">Send</span>
              </Button>
              <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-green-600 shadow-none">
                <TbCreditCardRefund className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-green-600" />
                <span className="text-[10px] flex text-gray-400">Receive</span>
              </Button>
              <Button className="flex flex-col items-center space-y-2 h-fit bg-transparent hover:bg-transparent text-yellow-600 shadow-none">
                <LiaFileInvoiceDollarSolid className="border border-gray-400 rounded-md p-1.5 w-7 h-7 text-yellow-600" />
                <span className="text-[10px] flex text-gray-400">Invoice</span>
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
        </div>
      </div>
    </section>
  );
}
