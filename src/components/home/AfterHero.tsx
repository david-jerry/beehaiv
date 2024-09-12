"use client";

import React from "react";
import Customers from "./Customers";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import Services from "./Services";

export default function AfterHero() {
  return (
    <section className="w-screen bg-white py-16 space-y-6">
        <Customers />
      <div className="container mx-auto pt-4 space-y-4">
        <Separator className="container" />
        <h3 className="text-4xl font-semibold tracking-wide py-6">
          One cohesive platform. All you need.
        </h3>
        <Separator className="container mb-4" />
        <Services />
      </div>
    </section>
  );
}
