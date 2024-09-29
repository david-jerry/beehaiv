"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const GetStarted = () => {
  const router = useRouter();
  const start = () => {
    router.replace("/accounts/onboarding/basic");
  };

  return (
    <Button
      onClick={start}
      type="button"
      className="w-full rounded-md text-center"
    >
      Get Started
    </Button>
  );
};

export default GetStarted;
