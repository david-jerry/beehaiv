/* eslint-disable react/no-unescaped-entities */
import AccountsForm from '@/components/commons/AccountsForm';
import Link from 'next/link';
import React from 'react'
import LoginForm from "./Form";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sign In - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function Login() {
  return (
    <section className="py-24 overflow-y-auto w-screen h-fit lg:h-screen flex flex-col items-center justify-center">
      <div className="container flex flex-col h-full items-center justify-center">
        <AccountsForm
          title={"Sign into BeeHaiv"}
          description={<Description />}
          form={<LoginForm />}
          footer={<Footer />}
        />
      </div>
    </section>
  );
}

const Description = () => {
    return <>
    Don't have an account? {' '} <Link className='underline' href={"/accounts/signup"} >Sign Up</Link>
    </>
}
const Footer = () => {
  return (
    <div className="space-y-4 flex flex-col items-center">
      <Link
        className="underline text-xs text-center flex"
        href={"/accounts/forgot-password"}
      >
        Forgot your password?
      </Link>
      <p className="text-xs text-gray-400">
        By clicking “Sign in with Google” or "Sign in", you certify that you are
        18 years of age or older, read and agree to be bound by BeeHaiv's Terms of
        Service and the linked terms of Third Coast Bank SSB; Member FDIC and
        Grasshopper Bank N.A.; Member FDIC and FirstBank, a Tennessee
        Corporation; Member FDIC, and acknowledge the Privacy Policy.
      </p>
    </div>
  );
};