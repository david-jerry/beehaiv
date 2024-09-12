"use server";

import { getCurrentDate } from "@/utils/global";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

// Define the accepted action types
type ActionType = "create" | "update" | "delete" | "get";
type cookieDataProp =
  | [key: string, value: any, cookie?: Partial<ResponseCookie>]
  | [option: any];

const base = process.env.API_BASE_ENDPOINT;
const cookieStore = cookies();

export const createCookiesConsent = async (cookieData: {
  key: string;
  value: any;
}) => {
  // Check if cookieData is null and return an error if so
  if (!cookieData.key || !cookieData.value) {
    return {
      error: "No cookie data to use!",
    };
  }

  try {
    cookieStore.set(cookieData.key, cookieData.value, {
      maxAge: 60 * 60 * 24 * 365,
      secure: process.env.NODE_ENV === "production",
    });

    return { message: "Cookie created successfully.", data: true };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const getCookiesConsent = async (name: string) => {
  // Check if cookieData is null and return an error if so
  if (!name) {
    return {
      error: "No cookie data found for this key!",
    };
  }

  // await deleteCookiesConsent(name);
  try {
    const consent = cookieStore.get(name);
    console.log(consent)
    if (!consent?.value) {
      return {
        error: "No saved cookie with this key name",
      };
    }
    return { message: "Cookie exists.", data: consent };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const deleteCookiesConsent = async (name: string) => {
  // Check if cookieData is null and return an error if so
  if (!name) {
    return {
      error: "You must provide a name for this cookie!",
    };
  }

  try {
    cookieStore.delete(name);
    return { message: "Cookie deleted successfully." };
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};

export const pageCount = async (page: string, ip: string) => {
  const currentDate = getCurrentDate();

  try {
    const res = await fetch(`${base}/views?date=${currentDate}`);
    if (!res.ok) {
      return {
        error: "There seems to be errors getting page insight!",
      };
    }
    const existingViewData: { message: string; data: pageDataProp[] } =
      await res.json();

    // find the page data
    const pageData: pageDataProp | null =
      existingViewData.data.find((view: pageDataProp) => view.page === page) ||
      null;

    // if there is no page data for the current date, initialize it so the ip can be added and future ips also
    if (!pageData) {
      const initData: initDataProp = {
        page,
        count: 1,
        ips: [ip],
      };
      // send the post request
      const newViewRes = await fetch(`${base}/views`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(initData),
      });

      if (!newViewRes.ok) {
        return {
          error: `Failed to initialize new page view for <strong>${page}</strong>`,
        };
      }

      const newViewData: viewJsonResponse = await newViewRes.json();

      return newViewData;
    } else {
      const newData = {
        ip,
      };
      // update the list of ips in the existing data
      const viewRes = await fetch(`${base}/views/${pageData.uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      });

      if (!viewRes.ok) {
        return {
          error: `Failed to update page view for <strong>${page}</strong>`,
        };
      }

      const newViewData: viewJsonResponse = await viewRes.json();

      return newViewData;
    }
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
};
