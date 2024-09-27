"use client";

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useGetCard } from "@/hooks/usePosts";
import Image from "next/image";
import React from "react";
import { FaRegCreditCard } from "react-icons/fa6";

function formatExpiryDateFromISO(isoDateString: string): string {
  // Create a Date object from the ISO date string
  const date = new Date(isoDateString);

  // Get the month (0-indexed, so add 1) and year
  const month = date.getMonth() + 1; // JavaScript months are 0-11
  const year = date.getFullYear();

  // Return formatted as "MM/YYYY"
  return `${month.toString().padStart(2, "0")}/${year}`;
}

export default function Cards() {
  const [data, setData] = React.useState<any[]>([]);
  const { user } = useAuth();

  const cards = useGetCard(user!);

  React.useEffect(() => {
    setData(cards);
  }, [cards]);

  return (
    <>
      {data.length > 0 ? (
        data.map((card, index) => (
          <div
            key={index}
            className="flex-none relative rounded-md overflow-hidden hover:shadow hover:scale-105 bg-yellow-600 w-[90%] aspect-video text-white duration-200 ease-in-out"
          >
            <Image
              src={
                index % 2 === 0
                  ? "/card/background-2.jpeg"
                  : "/card/background-3.jpeg"
              }
              alt="card-background"
              width={780}
              height={460}
              className="w-full h-full object-cover absolute z-0"
            />
            <div className="w-full h-full absolute left-0 top-0 bg-black/10 z-10"></div>
            <FaRegCreditCard className="absolute top-4 left-4 z-10" />
            <div className="absolute bottom-0 left-0 right-0 flex bg-black/40 flex-col p-4 gap-3">
              <div className="flex items-center justify-between">
                <span className="text-xs flex w-fit">{card.card_number}</span>
                <span className="text-xs flex w-fit">
                  {formatExpiryDateFromISO(card.expiration_date)}
                </span>
              </div>
              <Separator />
              <span className="text-semibold">
                $ <span>{card.bal}</span>
              </span>
            </div>
          </div>
        ))
      ) : (
        <>
          <div className="flex flex-col items-center justify-center p-4 text-center">
            No Cards Yet
          </div>
        </>
      )}
    </>
  );
}
//   <div className="flex-none relative rounded-md overflow-hidden hover:shadow hover:scale-105 bg-yellow-600 w-[90%] aspect-video text-white duration-200 ease-in-out">
//     <Image
//       src={"/card/background-2.jpeg"}
//       alt="card-background"
//       width={780}
//       height={460}
//       className="w-full h-full object-cover absolute z-0"
//     />
//     <div className="w-full h-full absolute left-0 top-0 bg-black/10 z-10"></div>
//     <FaRegCreditCard className="absolute top-4 left-4 z-10" />
//     <div className="absolute bottom-0 left-0 right-0 flex bg-black/40 flex-col p-4 gap-3">
//       <div className="flex items-center justify-between">
//         <span className="text-xs flex w-fit">1234 5678 2345 7890</span>
//         <span className="text-xs flex w-fit">03/26</span>
//       </div>
//       <Separator />
//       <span className="text-semibold">
//         $ <span>10,000</span>
//       </span>
//     </div>
//   </div>{" "}
//   <div className="flex-none relative rounded-md overflow-hidden hover:shadow hover:scale-105 bg-yellow-600 w-[90%] aspect-video text-white duration-200 ease-in-out">
//     <Image
//       src={"/card/background-3.jpeg"}
//       alt="card-background"
//       width={780}
//       height={460}
//       className="w-full h-full object-cover absolute z-0"
//     />
//     <div className="w-full h-full absolute left-0 top-0 bg-black/10 z-10"></div>
//     <FaRegCreditCard className="absolute top-4 left-4 z-10" />
//     <div className="absolute bottom-0 left-0 right-0 flex bg-black/40 flex-col p-4 gap-3">
//       <div className="flex items-center justify-between">
//         <span className="text-xs flex w-fit">1234 5678 2345 7890</span>
//         <span className="text-xs flex w-fit">03/26</span>
//       </div>
//       <Separator />
//       <span className="text-semibold">
//         $ <span>10,000</span>
//       </span>
//     </div>
//   </div>
