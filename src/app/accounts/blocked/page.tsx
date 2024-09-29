/* eslint-disable @next/next/no-img-element */
import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import Image from "next/image";
import React from "react";

export const metadata: Metadata = {
  title: "User Blocked - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function Blocked() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="shadow w-fit p-4 rounded-lg bg-white text-foreground flex flex-col space-y-6">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/user-account-block-illustration-download-in-svg-png-gif-file-formats--suspension-restricted-access-locked-blocked-pack-science-technology-illustrations-7706451.png?f=webp"
          width={480}
          height={480}
          className="object-fill mx-auto"
          alt="Blocked user"
        />
        <h1 className="text-2xl font-bold text-center">Account Restricted</h1>
        <Separator />
        <div className="text-sm space-y-2 max-w-md p-6">
          <p>
            Your account has been temporarily restricted due to suspicious
            access from an unknown IP address.
          </p>
          <p>For your security, we recommend:</p>
          <ul className="pl-6 font-semibold text-xs">
            <li>- Checking your recent login activity.</li>
            <li>- Changing your password immediately.</li>
            <li>- Enabling two-factor authentication for added security.</li>
            <li>- Mailing our support line for assistance</li>
          </ul>
          <p className="text-[12px] pt-4">
            We apologize for any inconvenience this may cause. Please contact
            our support team if you have any questions.
          </p>
        </div>
      </div>
    </section>
  );
}
