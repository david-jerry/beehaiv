import React from "react";

export default function Blocked() {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="shadow w-fit p-4 rounded-lg bg-white text-foreground flex flex-col space-y-6">
        <h1 className="text-2xl font-bold">Account Restricted</h1>
        <div className="text-sm">
          <p>
            Your account has been temporarily restricted due to suspicious
            access from an unknown IP address.
          </p>
          <p>For your security, we recommend:</p>
          <ul>
            <li>Checking your recent login activity.</li>
            <li>Changing your password immediately.</li>
            <li>Enabling two-factor authentication for added security.</li>
            <li>Mailing our support line for assistance</li>
          </ul>
          <p>
            We apologize for any inconvenience this may cause. Please contact
            our support team if you have any questions.
          </p>
        </div>
      </div>
    </section>
  );
}
