"use client";

import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { loginAction, signupAction } from "@/actions/auth-actions";
import React from "react";
import { toast } from "sonner";
import { baseUrl } from "@/utils/global";

// Define the form schema using Zod
const loginFormSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(1, "You must provide a password"),
});

// Define the context value type
interface AuthContextType {
  user: User | null; // You can replace `any` with a more specific user type
  login: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
  logout: () => Promise<void>;
  register: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
  refreshAccess: () => Promise<void>;
  getUser: () => Promise<void>;
  error: string | null;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [user, setUser] = useState<User | null>(null); // Replace `any` with a specific user type if available
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const validatedData = loginFormSchema.parse(data);
      const resData: any = await loginAction(validatedData);

      if (!resData.data.error) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resData.access_token}`;
        localStorage.setItem("token", resData.access_token);
        setUser(resData.user);
        toast("Authorization", {
          description: "You have successfully ben authorized into your account",
        });
        if (
          resData.user.first_name.length > 0 &&
          resData.user.last_name.length > 0
        ) {
          router.push("/dashboard");
        } else {
          router.push("/accounts/onboarding");
        }
      } else {
        setError(resData.data.error.message);
        if (resData.data.error.code) {
          router.push("/accounts/confirm-code");
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
        toast.success("Registration Successful", {
          description: resData!.data.message,
        });
        setUser(resData.data.user);
        router.push("/accounts/confirm-code");
      } else {
        toast.success("Registration Failed", {
          description: resData!.error.message,
        });
        setError(resData.error.message);
        router.refresh();
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const logout = async () => {
    if (user) {
      await axios.get(`${baseUrl}/auth/logout`);
      setUser(null);
      delete axios.defaults.headers.common["Authorization"];
    }
    router.push("/");
  };

  const refreshAccess = async () => {
    const res = await axios.get(`${baseUrl}/auth/refresh-token`);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${res.data.access_token}`;
    localStorage.setItem("token", res.data.access_token);
  };

  const getUser = async () => {
    const res = await axios.get(`${baseUrl}/users/me`);

    if (res.status === 200) {
      setUser(res.data);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, refreshAccess, getUser, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Optional: Create a custom hook for easier access to the context
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
