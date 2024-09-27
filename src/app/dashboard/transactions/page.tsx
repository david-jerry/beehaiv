import React from "react";
import Transactions, { columns } from "../Transactions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function Transaction() {
  return (
    <section className="flex flex-col items-start gap-6 py-4 w-full">
      <h1 className="text-3xl font-bold w-full">Transactions</h1>
      <Transactions columns={columns} />
    </section>
  );
}
