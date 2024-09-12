import React from "react";
import { Separator } from "../ui/separator";

export default function Technologies() {
  return (
    <section className="w-screen py-16 bg-background">
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <strong className="text-4xl font-bold">
            BeeHaiv Technologies by the numbers
          </strong>
        </div>
        <div className="rounded-md overflow-hidden bg-foreground text-gray-300 aspect-video relative w-full">
          <div className="absolute bottom-6 left-6 flex-col flex items-start space-y-6">
            <strong className="block w-fit text-6xl lg:text-9xl">$1B+</strong>
            <Separator className="w-8" />
            <span className="text-base">Assets on platform</span>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
          <div className="border p-6 space-y-6 rounded-md">
            <strong className="font-black text-2xl lg:text-4xl">
              $25M+
            </strong>
            <Separator className="w-8" />
            <p>Expected 2024 interest paid by our Partner Banks</p>
          </div>
          <div className="border p-6 space-y-6 rounded-md">
            <strong className="font-black text-2xl lg:text-4xl">
              1,000+
            </strong>
            <Separator className="w-8" />
            <p>Businesses with funded accounts through BeeHaiv</p>
          </div>
        </div>
      </div>
    </section>
  );
}
