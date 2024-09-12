/* eslint-disable react/no-unescaped-entities */
import Testimonial from "@/components/commons/Testimonial";
import Customers from "@/components/home/Customers";
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "About Us - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function About() {
  return (
    <>
      <section className="w-screen pt-24 flex flex-col items-center justify-center text-center space-y-6 min-h-[70vh]">
        <div className="container h-full flex flex-col items-center justify-center space-y-8">
          <h1 className="text-5xl lg:text-7xl font-bold">
            Beehaiv exists to save your business money
          </h1>
          <Separator className="w-8 bg-foreground" />
          <p className="text-sm lg:text-lg">
            BeeHaiv believes you deserve the majority of the returns on your
            money. When you win, Beehaiv wins
          </p>
        </div>
      </section>
      <section className="w-screen py-16 bg-background space-y-6">
        <div className="flex flex-col items-center md:flex-row space-x-4 container w-full md:justify-between">
          <div className="space-y-4 flex flex-col items-center">
            <h2 className="text-5xl md:text-8xl font-bold">$25M+</h2>
            <p>Expected 2024 interest paid by our Partner Banks</p>
          </div>
          <Separator
            orientation="vertical"
            className="hidden md:block md:h-44"
          />
          <Separator className="md:hidden" />
          <div className="space-y-4 flex flex-col items-center">
            <h2 className="text-5xl md:text-8xl font-bold">$1B+</h2>
            <p>BeeHaiv Technologies assets on platform</p>
          </div>
          <Separator
            orientation="vertical"
            className="hidden md:block md:h-44"
          />
          <Separator className="md:hidden" />
          <div className="space-y-4 flex flex-col items-center">
            <h2 className="text-5xl md:text-8xl font-bold">1,025+</h2>
            <p>Businesses with funded accounts through BeeHaiv</p>
          </div>
        </div>
        <div className="container py-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <Separator className="w-40" />
            <span className="text-4xl md:text-5xl font-bold block">
              We believe the majority of the economics belong to you, the
              customer.
            </span>
          </div>
          <div className="space-y-4">
            <p className="text-sm">
              Financial services have always felt a icky to us. That's why we
              started BeeHaiv.
              <br />
              <br />
              We're building this company with what we call a "Midwestern
              Mentality." We don't believe in fancy offices. We don't believe in
              having a big headcount because it impresses people at cocktail
              parties.
              <br />
              <br />
              We care about keeping our costs low at BeeHaiv, so that we can
              hopefully pass back better and better savings to our customers.
              Because at the end of the day, that's all that matters to your
              business.
              <br />
              <br />
              We're so grateful for the opportunity to serve you. If we can ever
              be of assistance or make your experience better, please let us
              know.
            </p>
          </div>
        </div>
      </section>
      <section className="w-screen py-16">
        <div className="container space-y-8">
          <strong className="block text-4xl font-bold">Our Customers</strong>
          <Separator className="bg-foreground" />
          <Customers />
        </div>
      </section>
      <Testimonial />
    </>
  );
}
