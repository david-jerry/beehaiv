"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/accounts/login");
    }

    if(user && !user.first_name) {
      router.push("/accounts/onboarding")
    }
  }, [user, router]);

  return user ? children : null;
};

export default ProtectedRoute;