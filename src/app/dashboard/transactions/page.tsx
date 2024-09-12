import React from "react";
import Transactions, { columns, data } from "../Transactions";

export default function Transaction() {
  return (
    <section className="flex flex-col items-start gap-6 py-4 w-full">
      <h1 className="text-3xl font-bold w-full">Transactions</h1>
      <Transactions columns={columns} data={data} />
    </section>
  );
}
