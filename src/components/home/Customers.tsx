import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPeopleGroup } from "react-icons/fa6";

export default function Customers() {
  return (
    <div className="group container duration-300 ease-in-out transition-all relative mx-auto h-fit py-3.5 lg:py-8">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div className="w-full h-16 grayscale hover:grayscale-0">
          <Image
            src={"/customers/dryloft.svg"}
            width={286}
            height={74}
            alt="dryloft"
            className="h-16 w-full object-cover object-center"
          />
        </div>
        <div className="w-full h-16 grayscale hover:grayscale-0">
          <Image
            src={"/customers/banco-pichincha.svg"}
            width={286}
            height={74}
            alt="dryloft"
            className="h-full object-center object-contain"
          />
        </div>
        <div className="w-full h-16 grayscale hover:grayscale-0">
          <Image
            src={"/customers/goizueta-business-school.svg"}
            width={286}
            height={74}
            alt="dryloft"
            className="!h-16 w-full object-center"
          />
        </div>
        <div className="w-full h-16 grayscale hover:grayscale-0">
          <Image
            src={"/customers/inform-excom.svg"}
            width={286}
            height={74}
            alt="dryloft"
            className="h-full object-center object-cover"
          />
        </div>
        <div className="w-full h-16 grayscale hover:grayscale-0">
          <Image
            src={"/customers/senzor.svg"}
            width={286}
            height={74}
            alt="dryloft"
            className="h-full object-center object-fill"
          />
        </div>
        <div className="w-full h-16 grayscale hover:grayscale-0">
          <Image
            src={"/customers/dojo.svg"}
            width={286}
            height={74}
            alt="dryloft"
            className="h-full object-center object-fill"
          />
        </div>
      </div>
      <Link
        href="/resources/customers-stories"
        className="items-center justify-center hidden duration-300 ease-in-out transition-all group-hover:flex flex-col h-full text-black group-hover:backdrop-blur absolute left-0 top-0 right-0 bottom-0 bg-transparent group-hover:bg-gray-200/5"
      >
        <FaPeopleGroup className="w-6 h-6" />
        <span className="flex w-fit mx-auto">Customers</span>
      </Link>
    </div>
  );
}
