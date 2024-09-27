/* eslint-disable react/no-unescaped-entities */
import AccountsForm from "@/components/commons/AccountsForm";
import Link from "next/link";
import React from "react";
import BusinessForm from "./Form";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Information - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function BusinessDetail() {
  return (
    <ProtectedRoute>
      <section className="py-24 overflow-y-auto w-screen h-fit lg:h-screen flex flex-col items-center justify-center">
        <div className="container flex flex-col h-full items-center justify-center">
          <AccountsForm
            title={"Business physical address"}
            description={<Description />}
            form={<BusinessForm />}
            footer={undefined}
          />
        </div>
      </section>
    </ProtectedRoute>
  );
}

const Description = () => {
  return (
    <>
      Please provide a physical address and not a registered agent address or PO
      box.
    </>
  );
};
