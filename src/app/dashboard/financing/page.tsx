import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Financing - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function Financing() {
  return (
    <section className="w-full flex flex-col gap-4 py-4">
      <h1 className="text-3xl font-bold w-full">Financing</h1>
    </section>
  );
}
