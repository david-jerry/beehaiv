"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { z } from "zod";
import { loginAction, signupAction } from "@/actions/auth-actions";
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
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Replace `User` with actual user type
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //     // async () => {
  //     //   await getUser();
  //     // };
  //   }
  // }, []);

  useEffect(() => {
    const isDashboardRoute = pathname.startsWith("/dashboard");

    if (
      // (user && !user.first_name) ||
      user &&
      !user.first_name &&
      isDashboardRoute
    ) {
      router.push("/accounts/onboarding/basic"); // Redirect to onboarding if necessary
    } else if (
      // (user && !user.address) ||
      user &&
      !user.address &&
      isDashboardRoute
    ) {
      router.push("/accounts/onboarding/business-detail");
    } else if (
      // (user && !user.business_profiles[0]) ||
      user &&
      !user.business_profiles &&
      isDashboardRoute
    ) {
      router.push("/accounts/onboarding/complete");
    }
  }, [user, router, pathname]);

  const login = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const validatedData = loginFormSchema.parse(data);
      const resData = await loginAction(validatedData);

      if (!resData.error) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${resData.data.access_token}`;
        localStorage.setItem("token", resData.data.access_token);
        console.log(resData.data.user);
        setUser(resData.data.user);
        toast.success("Login Successful");
        if (
          resData.data.user.first_name &&
          resData.data.user.address &&
          resData.data.user.business_profiles[0]
        ) {
          router.push("/dashboard");
        } else if (!resData.data.user.first_name) {
          router.push("/accounts/onboarding/basic");
        } else if (!resData.data.user.address) {
          router.push("/accounts/onboarding/business-detail");
        } else if (!resData.data.user.business_profiles[0]) {
          router.push("/accounts/onboarding/complete");
        }
      } else {
        setError(resData.error.message);
        toast.error(resData.error.message);
        if (resData.error.code) {
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
        toast.success("Registration Successful");
        setUser(resData.data.user);
        router.push("/accounts/confirm-code");
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
      // await axios.get(`${baseUrl}/auth/logout`);
      setUser(null);
      localStorage.removeItem("token");
      delete axios.defaults.headers.common["Authorization"];
      router.push("/");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const refreshAccess = async () => {
    try {
      const res = await axios.get(`${baseUrl}/auth/refresh-token`);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.access_token}`;
      localStorage.setItem("token", res.data.access_token);
    } catch (error) {
      setError("Error refreshing access token");
    }
  };

  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/accounts/login");
      }
      const res = await getUserAction(token!);
      console.log(res);
      if (!res!.error) {
        if (res.status === 200) {
          setUser(res.data);
        } else if (res.status === 401) {
          router.push("/accounts/login");
        }
      } else if (res.error === "Token is invalid or expired") {
        setUser(null)
        localStorage.removeItem("token");
        delete axios.defaults.headers.common["Authorization"];
        router.push("/accounts/login");
      }
    } catch (error) {
      setError("Error fetching user data");
      router.push("/accounts/login");
    }
  };

  const updateUserBio = async (data: z.infer<typeof userFormSchema>) => {
    try {
      const validatedData = userFormSchema.parse(data);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/accounts/login");
      }
      const resData = await updateUserAction(validatedData, user!.uid, token!);
      console.log(resData);
      if (resData.data) {
        setUser(resData.data);
        toast.success("User information updated");
        router.push("/accounts/onboarding/business-detail");
      } else {
        setError(resData.error);
        toast.error("Error updating user information", {
          description: resData.error,
        });
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  const updateUserAddress = async (data: z.infer<typeof userAddressSchema>) => {
    try {
      const validatedData = userAddressSchema.parse(data);
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/accounts/login");
      }

      const resData = await updateUserAddressAction(
        validatedData,
        user!.uid,
        token!
      );
      if (resData.data) {
        setUser(resData.data);
        toast.success("Address updated successfully");
        router.push("/accounts/onboarding/complete");
      } else {
        setError(resData.error);
        toast.error("Error updating address");
      }
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

// "use client";

// import { createContext, useState, ReactNode } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { z } from "zod";
// import { loginAction, signupAction } from "@/actions/auth-actions";
// import React from "react";
// import { toast } from "sonner";
// import { baseUrl } from "@/utils/global";
// import {
//   updateUserAction,
//   updateUserAddressAction,
// } from "@/actions/user-actions";

// // Define the form schema using Zod
// const loginFormSchema = z.object({
//   email: z.string().min(2).max(50),
//   password: z.string().min(1, "You must provide a password"),
// });

// const userFormSchema = z.object({
//   first_name: z.string().min(2).max(255),
//   last_name: z.string().min(2).max(255),
//   country: z.string().min(2).max(255),
//   phone_number: z
//     .string()
//     .min(2)
//     .max(14)
//     .regex(/^\+\d{1,3}\d{10}$/, {
//       message:
//         "Phone number must start with +(country code) and be followed by 10 digits.",
//     }),
// });

// const userAddressSchema = z.object({
//   country: z.string().min(2).max(255),
//   address: z.string().min(2).max(255),
//   apartment: z.string().min(2).max(14),
//   city: z.string().min(2).max(255),
//   state: z.string().min(2).max(255),
//   zip: z.string().min(5).max(5),
// });

// // Define the context value type
// interface AuthContextType {
//   user: User | null; // You can replace `any` with a more specific user type
//   login: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (data: z.infer<typeof loginFormSchema>) => Promise<void>;
//   refreshAccess: () => Promise<void>;
//   getUser: () => Promise<void>;
//   updateUserBio: (data: z.infer<typeof userFormSchema>) => Promise<void>;
//   updateUserAddress: (data: z.infer<typeof userAddressSchema>) => Promise<void>;
//   error: string | null;
// }

// // Create the context with a default value
// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) => {
//   const [user, setUser] = useState<User | null>(null); // Replace `any` with a specific user type if available
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   const login = async (data: z.infer<typeof loginFormSchema>) => {
//     try {
//       const validatedData = loginFormSchema.parse(data);
//       const resData = await loginAction(validatedData);

//       if (!resData.error) {
//         axios.defaults.headers.common[
//           "Authorization"
//         ] = `Bearer ${resData.data.access_token}`;
//         localStorage.setItem("token", resData.data.access_token);
//         setUser(resData.data.user);
//         toast("Authorization", {
//           description: resData.data.message,
//         });
//         if (resData.data.user.first_name && resData.data.user.last_name) {
//           router.push("/dashboard");
//         } else {
//           router.push("/accounts/onboarding");
//         }
//       } else {
//         setError(resData.error.message);
//         if (resData.error.code) {
//           router.push("/accounts/confirm-code");
//         }
//       }
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   const register = async (data: z.infer<typeof loginFormSchema>) => {
//     try {
//       const validatedData = loginFormSchema.parse(data);
//       const resData = await signupAction(validatedData);

//       if (resData.data) {
//         toast.success("Registration Successful", {
//           description: resData!.data.message,
//         });
//         setUser(resData.data.user);
//         router.push("/accounts/confirm-code");
//       } else {
//         toast.success("Registration Failed", {
//           description: resData!.error,
//         });
//         setError(resData.error);
//         router.refresh();
//       }
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   const logout = async () => {
//     if (user) {
//       await axios.get(`${baseUrl}/auth/logout`);
//       setUser(null);
//       delete axios.defaults.headers.common["Authorization"];
//     }
//     router.push("/");
//   };

//   const refreshAccess = async () => {
//     const res = await axios.get(`${baseUrl}/auth/refresh-token`);
//     axios.defaults.headers.common[
//       "Authorization"
//     ] = `Bearer ${res.data.access_token}`;
//     localStorage.setItem("token", res.data.access_token);
//   };

//   const getUser = async () => {
//     const res = await axios.get(`${baseUrl}/users/me`);

//     if (res.status === 200) {
//       setUser(res.data);
//     }
//   };

//   const updateUserBio = async (data: z.infer<typeof userFormSchema>) => {
//     try {
//       const validatedData = userFormSchema.parse(data);
//       console.log(user);
//       const resData = await updateUserAction(validatedData, user!.uid);

//       if (resData.data) {
//         toast.success("Validation Successful", {
//           description: "You just updated your information",
//         });
//         setUser(resData.data);
//         router.push("/accounts/onboarding/business-detail");
//       } else {
//         setError(resData.error);
//         toast.error("Validation Error", {
//           description: resData.error,
//         });
//         router.refresh();
//       }
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   const updateUserAddress = async (data: z.infer<typeof userAddressSchema>) => {
//     try {
//       const validatedData = userAddressSchema.parse(data);
//       const resData = await updateUserAddressAction(validatedData, user!.uid);

//       if (resData.data) {
//         toast.success("Validation Successful", {
//           description: "We just updated your information",
//         });
//         setUser(resData.data);
//         router.push("/accounts/onboarding/complete");
//       } else {
//         toast.error("Validation Error", {
//           description: resData.error,
//         });
//         setError(resData.error);
//         router.refresh();
//       }
//     } catch (error: any) {
//       setError(error.message);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         login,
//         logout,
//         register,
//         refreshAccess,
//         getUser,
//         updateUserBio,
//         updateUserAddress,
//         error,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Optional: Create a custom hook for easier access to the context
// export const useAuth = () => {
//   const context = React.useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
