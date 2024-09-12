/* eslint-disable react/no-unescaped-entities */
import AccountsForm from "@/components/commons/AccountsForm";
import Link from "next/link";
import React from "react";
import SignUpForm from "./Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function Signup() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="container flex flex-col h-full items-center justify-center">
        <AccountsForm
          title={"Get started with BeeHaiv"}
          description={<Description />}
          form={<SignUpForm />}
          footer={<Footer />}
        />
      </div>
    </section>
  );
}

const Description = () => {
  return (
    <>
      Already have an account?{" "}
      <Link className="underline" href={"/accounts/login"}>
        Sign In
      </Link>
    </>
  );
};
const Footer = () => {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <p className="text-xs text-gray-400">
        By clicking “Sign up with Google” or "Sign up" above, you certify that
        you are 18 years of age or older, read and agree to be bound by
        BeeHaiv's Terms of Service and the linked terms of Third Coast Bank SSB;
        Member FDIC and Grasshopper Bank N.A.; Member FDIC and FirstBank, a
        Tennessee Corporation; Member FDIC, and acknowledge the Privacy Policy.
      </p>
    </div>
  );
};
