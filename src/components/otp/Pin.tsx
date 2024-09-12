"use client"

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PinForm from "./Form";
import useGeneralStore from "@/hooks/generalStore";

export default function OTPTransfer() {
  const openPin = useGeneralStore((state: any) => state.openPin);
  const setOpenPin = useGeneralStore((state: any) => state.setOpenPin);

  return (
    <>
      {openPin ? (
        <section className="fixed w-screen left-0 top-0 z-50 h-screen flex flex-col justify-center items-center gap-4 py-4">
          <div
            onClick={() => setOpenPin(false)}
            className="absolute bg-black/40 z-40 w-screen h-screen top-0 left-0"
          ></div>
          <Card className="bg-gray-100 w-full relative z-50 max-w-md">
            <CardHeader className="flex items-center gap-2 space-y-y-0 border-b py-4 sm:flex-row">
              <div className="grid flex-1 gap-1 text-center sm:text-left">
                <CardTitle>PIN Required</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <PinForm />
            </CardContent>
          </Card>
        </section>
      ) : (
        <></>
      )}
    </>
  );
}
