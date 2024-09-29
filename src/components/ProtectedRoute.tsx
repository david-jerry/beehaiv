/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import Logo from "./commons/Logo";

const ProtectedRoute = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user, getUser, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      // Check if the token is in localStorage (or cookies, if preferred)
      const token = localStorage.getItem("token");

      if (user === null && token === null) {
        await logout(); // Redirect if no token
      } else if (token !== null) {
        // Set the Authorization header with the token for axios
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        // Try to fetch the user data if it's not already loaded
        if (user === null && token !== null) {
          console.log("Token Exists, but user is null");
          await getUser(); // Fetch the user from API
        }

        if (user !== null && user.is_blocked) {
          router.replace("/accounts/blocked");
        }
      }
    };

    checkAuth();
  }, []);

  return user ? children : <Loading />;
};

export default ProtectedRoute;

const Loading = () => {
  return (
    <section className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="w-fit h-fit animate-pulse">
        <Logo />
      </div>
    </section>
  );
};
