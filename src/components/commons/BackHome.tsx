"use client";

import React from "react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function BackHome() {
  const router = useRouter();
  const pathname = usePathname()

  return pathname.startsWith("/accounts/") && <Button className="fixed top-4 left-4 w-fit px-6 bg-foreground text-background font-bold uppercase" onClick={() => router.replace("/")}>Home</Button>;
}
