/* eslint-disable react/no-unescaped-entities */
import AccountsForm from "@/components/commons/AccountsForm";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import GetStarted from "./GetStarted";
import ProtectedRoute from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Welcome to BeeHaiv - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function Welcome() {
  return (
    <ProtectedRoute>
      <section className="w-screen h-screen flex flex-col items-center justify-center">
        <div className="container flex flex-col h-full items-center justify-center">
          <AccountsForm
            title={"Welcome to BeeHaiv"}
            description={<Description />}
            form={<GetStarted />}
            footer={<Footer />}
          />
        </div>
      </section>
    </ProtectedRoute>
  );
}

const Description = () => {
  return (
    <>
      We're excited for the opportunity to serve you. The entire process should
      take less than 7 minutes. Let's begin.
    </>
  );
};
const Footer = () => {
  return (
    <div className="bg-gray-100 flex flex-row items-start space-x-3 rounded-md p-2.5">
      <div className="flex flex-col items-start space-y-4">
        <strong>Have any questions?</strong>
        <p className="text-xs text-gray-400">
          Press the icon in the bottom right corner of your screen at any point
          to be connected with a member on our team.
        </p>
      </div>
    </div>
  );
};
