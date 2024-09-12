/* eslint-disable react/no-unescaped-entities */
import AccountsForm from "@/components/commons/AccountsForm";
import Link from "next/link";
import React from "react";
import BusinessForm from "./Form";

export default function BusinessDetail() {
  return (
    <section className="py-24 overflow-y-auto w-screen h-fit lg:h-screen flex flex-col items-center justify-center">
      <div className="container flex flex-col h-full items-center justify-center">
        <AccountsForm
          title={"Business Details"}
          description={<Description />}
          form={<BusinessForm />}
          footer={undefined}
        />
      </div>
    </section>
  );
}

const Description = () => {
  return (
    <>
      Please provide a valid information about your business.
    </>
  );
};
