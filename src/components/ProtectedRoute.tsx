"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if the token is in localStorage (or cookies, if preferred)
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/accounts/login"); // Redirect if no token
      } else {
        // Set the Authorization header with the token for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Try to fetch the user data if it's not already loaded
        if (!user) {
          await getUser(); // Fetch the user from API
        }

        if (user && user.is_blocked) {
          router.push("/accounts/blocked")
        }
      }
    };

    checkAuth();
  }, [user, getUser, router]);

  return user ? children : null;
};

export default ProtectedRoute;
