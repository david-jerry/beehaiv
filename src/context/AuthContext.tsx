/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import {
  loginAction,
  logoutAction,
  refreshTokenAction,
  signupAction,
} from "@/actions/auth-actions";
import { toast } from "sonner";
import { baseUrl } from "@/utils/global";
import {
  getUserAction,
  updateUserAction,
  updateUserAddressAction,
} from "@/actions/user-actions";
import React from "react";

// Define the form schemas using Zod
const loginFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(1, "You must provide a password"),
});

const userFormSchema = z.object({
  first_name: z.string().min(2).max(255),
  last_name: z.string().min(2).max(255),
  country: z.string().min(2).max(255),
  phone_number: z
    .string()
    .min(2)
    .max(14)
    .regex(/^\+\d{1,3}\d{10}$/, {
      message:
        "Phone number must start with +(country code) and be followed by 10 digits.",
    }),
});

const userAddressSchema = z.object({
  address: z.string().min(2).max(255),
  apartment: z.string().min(2).max(14),
  city: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  zip: z.string().min(5).max(5),
});

// Define the context value type
interface AuthContextType {
  user: User | null; // Adjust `User` type based on your user object structure
  login: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
  refreshAccess: () => Promise<void>;
  getUser: () => Promise<void>;
  updateUserBio: (data: z.infer<typeof userFormSchema>) => Promise<void>;
  updateUserAddress: (data: z.infer<typeof userAddressSchema>) => Promise<void>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Replace `User` with actual user type
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setError(null);
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (error === "Token is invalid or expired") {
      async () => {
        await refreshAccess();
      };
    }

    if (
      // (user && !user.first_name) ||
      user !== null &&
      !user.first_name &&
      isDashboardRoute
    ) {
      router.replace("/accounts/onboarding/basic"); // Redirect to onboarding if necessary
    } else if (
      // (user && !user.address) ||
      user !== null &&
      !user.address &&
      isDashboardRoute
    ) {
      router.replace("/accounts/onboarding/business-detail");
    } else if (
      // (user && !user.business_profiles[0]) ||
      user !== null &&
      !user.business_profiles[0] &&
      isDashboardRoute
    ) {
      router.replace("/accounts/onboarding/complete");
    }
  }, [user, error]);

  const login = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const validatedData = loginFormSchema.parse(data);
      const resData = await loginAction(validatedData);

      if (!resData.error) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resData.data.access_token}`;
        localStorage.setItem("token", resData.data.access_token);
        toast.success("Login Successful");
        await getUser();
        setError(null);
      } else {
        setError(resData.error.message);
        toast.error(resData.error.message);
        if (resData.error.code) {
          router.replace("/accounts/confirm-code");
        }
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const register = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const validatedData = loginFormSchema.parse(data);
      const resData = await signupAction(validatedData);

      if (resData.data) {
        setError(null);
        toast.success("Registration Successful");
        router.replace("/accounts/confirm-code");
      } else {
        setError(resData.error);
        toast.error("Registration Failed", { description: resData.error });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await logoutAction()
      setUser(null);
      setError(null);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      if (pathname.startsWith("/dashboard/")) {
        router.replace("/accounts/login");
      } else {
        router.replace("/");
      }
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const refreshAccess = async () => {
    try {
      const res = await refreshTokenAction();
      if (res.data) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.data.access_token}`;
        localStorage.setItem("token", res.data.data.access_token);
        setError(null);
      } else {
        setError(res.error);
      }
    } catch (error: any) {
      setError(error.message || "Error refreshing access token");
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token && (pathname.startsWith("/dashboard/") || pathname.startsWith("/accounts/onboarding/"))) {
        router.replace("/accounts/login");
      }
      const res = await getUserAction(token!);
      console.log(res);
      if (!res!.error) {
        if (res.status === 200) {
          setUser(res.data);
          const user_data = res.data;
          if (
            user_data &&
            user_data.first_name &&
            user_data.address &&
            user_data.business_profiles[0]
          ) {
            router.refresh();
          } else if (user_data && !user_data.first_name) {
            router.replace("/accounts/onboarding/basic");
          } else if (user_data && !user_data.address) {
            router.replace("/accounts/onboarding/business-detail");
          } else if (user_data && !user_data.business_profiles[0]) {
            router.replace("/accounts/onboarding/complete");
          }
          setError(null);
        } else if (res.status === 401) {
          if (pathname.startsWith("/dashboard/") || pathname.startsWith("/accounts/onboarding/")) router.replace("/accounts/login");
        }
      } else if (res.error === "Token is invalid or expired" && user === null) {
        // setUser(null);
        setError(res.error);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        if (pathname.startsWith("/dashboard/") || pathname.startsWith("/accounts/onboarding/")) {
          router.replace("/accounts/login");
        }
      } else if (res.error === "Token is invalid or expired" && user !== null) {
        // setUser(null);
        setError(res.error);
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        await refreshAccess();
      }
    } catch (error) {
      setError("Error fetching user data");
      router.replace("/accounts/login");
    }
  };

  const updateUserBio = async (data: z.infer<typeof userFormSchema>) => {
    try {
      const validatedData = userFormSchema.parse(data);
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/accounts/login");
      }
      const resData = await updateUserAction(validatedData, user!.uid, token!);
      console.log(resData);
      if (resData.data) {
        setUser(resData.data);
        toast.success("User information updated");
        router.replace("/accounts/onboarding/business-detail");
      } else {
        setError(resData.error);
        toast.error("Error updating user information", {
          description: resData.error,
        });
      }

      // if (resData.error === "Token is invalid or expired") {
      //   await refreshAccess();
      // }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const updateUserAddress = async (data: z.infer<typeof userAddressSchema>) => {
    try {
      const validatedData = userAddressSchema.parse(data);
      const token = localStorage.getItem("token");
      if (!token) {
        router.replace("/accounts/login");
      }

      const resData = await updateUserAddressAction(
        validatedData,
        user!.uid,
        token!
      );
      if (resData.data) {
        setUser(resData.data);
        toast.success("Address updated successfully");
        router.replace("/accounts/onboarding/complete");
      } else {
        setError(resData.error);
        toast.error("Error updating address");
      }

      // if (resData.error === "Token is invalid or expired") {
      //   await refreshAccess();
      // }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        refreshAccess,
        getUser,
        updateUserBio,
        updateUserAddress,
        error,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
