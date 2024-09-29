/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Logo from "@/components/commons/Logo";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { CiSettings } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineDashboard } from "react-icons/md";
import { GoGraph } from "react-icons/go";
import { GrMoney } from "react-icons/gr";
import { RiMenu4Line } from "react-icons/ri";
import useGeneralStore from "@/hooks/generalStore";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import {
  getPrefLangCookie,
  GoogleTranslate,
} from "@/components/commons/GoogleTranslate";

export default function Header() {
  const { logout } = useAuth();
  const showDashMobileNav = useGeneralStore(
    (state: any) => state.showDashMobileNav
  );
  const setShowDashMobileNav = useGeneralStore(
    (state: any) => state.setShowDashMobileNav
  );

  return (
    <aside className="rounded-r-md shadow-md bg-gray-100 w-screen z-50 fixed top-0 left-0 md:w-[74px] lg:w-[234px] p-2 md:h-screen space-y-4 justify-between">
      <div className="flex items-center justify-between md:justify-normal md:flex-col md:items-start md:space-y-8">
        <Logo />
        <div className="w-full space-y-2.5 hidden md:flex flex-col">
          <Link
            href={"/dashboard"}
            className="w-full flex gap-2 items-center text-xs p-2 rounded-md hover:bg-white"
          >
            <MdOutlineDashboard className="w-5 h-5" />
            <span className="md:hidden lg:flex">Dashboard</span>
          </Link>
          <Link
            href={"/dashboard/transactions"}
            className="w-full flex gap-2 items-center text-xs p-2 rounded-md hover:bg-white"
          >
            <GoGraph className="w-5 h-5" />
            <span className="md:hidden lg:flex">Transactions</span>
          </Link>
          <Link
            href={"/dashboard/financing"}
            className="w-full flex gap-2 items-center text-xs p-2 rounded-md hover:bg-white"
          >
            <GrMoney className="w-5 h-5" />
            <span className="md:hidden lg:flex">Financing</span>
          </Link>
        </div>
        <Button
          onClick={() => setShowDashMobileNav(!showDashMobileNav)}
          className="flex md:hidden"
        >
          <RiMenu4Line className="w-6 h-6" />
        </Button>
      </div>

      {showDashMobileNav && <MobileNavConcept state={setShowDashMobileNav} />}

      <div className="border-t p-2 md:py-6 absolute bottom-0 left-0 right-0 space-y-2 w-full hidden md:flex md:flex-col">
        <Link
          href={"/dashboard/settings"}
          className=" rounded-md duration-300 ease-in-out transition-all w-full p-2.5 hover:bg-foreground hover:text-background text-xs flex flex-row items-center gap-2.5"
        >
          <CiSettings className="w-5 h-5" />
          <span className="md:hidden lg:flex">Settings</span>
        </Link>
        <Button
          onClick={() => logout()}
          className="bg-transparent shadow-none text-foreground text-left justify-start rounded-md duration-300 ease-in-out transition-all w-full p-2.5 hover:bg-foreground hover:text-background text-xs flex flex-row items-center gap-2.5"
        >
          <IoIosLogOut className="w-5 h-5" />
          <span className="md:hidden lg:flex">Logout</span>
        </Button>
        <GoogleTranslate />
      </div>
    </aside>
  );
}

import { useIsMounted, useOnClickOutside } from "usehooks-ts";
const MobileNavConcept = ({ state }: { state: any }) => {
  const { logout } = useAuth();
  const ref = React.useRef(null);
  const isMounted = useIsMounted();

  const handleClickOutside = () => {
    state(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div
      ref={ref}
      className="z-50 rounded-md border-t-2 border-t-yellow-600 md:hidden flex flex-col p-4 fixed top-14 left-4 right-4 bg-gray-100 shadow gap-4"
    >
      <div className="flex flex-col items-start space-y-2">
        <Link
          href={"/dashboard"}
          className="w-full flex gap-2 items-center text-xs p-2 rounded-md hover:bg-white"
        >
          <MdOutlineDashboard className="w-5 h-5" />
          <span className="md:hidden lg:flex">Dashboard</span>
        </Link>
        <Link
          href={"/dashboard/transactions"}
          className="w-full flex gap-2 items-center text-xs p-2 rounded-md hover:bg-white"
        >
          <GoGraph className="w-5 h-5" />
          <span className="md:hidden lg:flex">Transactions</span>
        </Link>
        <Link
          href={"/dashboard/financing"}
          className="w-full flex gap-2 items-center text-xs p-2 rounded-md hover:bg-white"
        >
          <GrMoney className="w-5 h-5" />
          <span className="md:hidden lg:flex">Financing</span>
        </Link>
      </div>
      <Separator />
      <div className="space-y-2 flex flex-col">
        <Link
          href={"/dashboard/settings"}
          className=" rounded-md duration-300 ease-in-out transition-all w-full p-2.5 hover:bg-foreground hover:text-background text-xs flex flex-row items-center gap-2.5"
        >
          <CiSettings className="w-5 h-5" />
          <span className="md:hidden lg:flex">Settings</span>
        </Link>
        <Button
          onClick={() => logout()}
          className="bg-transparent shadow-none text-foreground text-left justify-start rounded-md duration-300 ease-in-out transition-all w-full p-2.5 hover:bg-foreground hover:text-background text-xs flex flex-row items-center gap-2.5"
        >
          <IoIosLogOut className="w-5 h-5" />
          <span className="md:hidden lg:flex">Logout</span>
        </Button>
        {useIsMounted() && <GoogleTranslate />}
      </div>
    </div>
  );
};
