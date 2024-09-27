/* eslint-disable react/no-unescaped-entities */
import AccountsForm from "@/components/commons/AccountsForm";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";
import ConfirmCodeForm from "./Form";

export const metadata: Metadata = {
  title: "Verify Email Code - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function ConfirmCode() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="container flex flex-col h-full items-center justify-center">
        <AccountsForm
          title={"Verify your email address"}
          description={<Description />}
          form={<ConfirmCodeForm />}
          footer={<Footer />}
        />
      </div>
    </section>
  );
}
const Description = () => {
  return <>Please check your email for the verification code</>;
};
const Footer = () => {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <Link className="text-xs underline" href={"/accounts/login"}>
        Back to sign in
      </Link>
      <p className="text-xs text-gray-400">
        By clicking “Reset password", you certify that you are 18 years of age
        or older, has read and agree to be bound by BeeHaiv's Terms of Service
        and the linked terms of Third Coast Bank SSB; Member FDIC and
        Grasshopper Bank N.A.; Member FDIC and FirstBank, a Tennessee
        Corporation; Member FDIC, already signed up and acknowledges the Privacy
        Policy.
      </p>
    </div>
  );
};
