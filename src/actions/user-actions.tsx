"use server";

import { z } from "zod";
import axios from "axios";
import { baseUrl, domain } from "@/utils/global";

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

const businessFormSchema = z.object({
  business_name: z.string().min(2).max(255),
  business_id: z.string().min(6).max(25),
  deposit_size: z.string().min(2).max(255),
  tax_id: z.string().min(2).max(50),
  asset_source_description: z.string().min(6).max(255),
  company_industry: z.string().min(2).max(255),
  website: z.string().min(2).max(255),
  description: z.string().min(5).max(255),
  annual_revenue: z.string().min(0),
  number_of_employees: z.string().min(0),
  founding_date: z.string().min(0),
});

export const getUserAction = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { status: res.status, data: res.data };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

// Helper function to get the token, with client-side check
export const updateUserAction = async (
  data: z.infer<typeof userFormSchema>,
  user_uid: string,
  token: string
) => {
  try {
    // Validate the data using the schema
    const validatedData = userFormSchema.parse(data);
    console.log(token);
    // Perform the request to signup a new user
    const response = await axios.patch(
      `${baseUrl}/users/${user_uid}`,
      validatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response is successful
    if (response.status === 200) {
      return {
        data: response.data,
      };
    } else {
      return {
        error: response?.data.message,
      };
    }
  } catch (error: any) {
    // Handle the error and return the message
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const updateUserAddressAction = async (
  data: z.infer<typeof userAddressSchema>,
  user_uid: string,
  token: string
) => {
  try {
    // Validate the data using the schema
    const validatedData = userAddressSchema.parse(data);

    // Perform the request to signup a new user
    const response = await axios.patch(
      `${baseUrl}/users/${user_uid}`,
      validatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // Check if the response is successful
    if (response.status === 200) {
      return {
        data: response.data,
      };
    } else {
      return {
        error: response?.data.message,
      };
    }
  } catch (error: any) {
    // Handle the error and return the message
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const createBusinessAction = async (
  data: z.infer<typeof businessFormSchema>,
  token: string
) => {
  try {
    // Validate the data using the schema
    const validatedData = businessFormSchema.parse(data);

    // Perform the request to signup a new user
    const response = await axios.post(`${baseUrl}/businesses`, validatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check if the response is successful
    if (response.status === 201) {
      return {
        data: response.data,
      };
    } else {
      return {
        error: response?.data.message,
      };
    }
  } catch (error: any) {
    // Handle the error and return the message
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const getTransactionSummaryAction = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/transactions/summary`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return {
        error: res.data.message,
      };
    }
    return { data: res.data };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const getTransactionsAction = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return {
        error: res.data.message
      }
    }
    return { data: res.data };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message,
    };
  }
}

export const getLoansAction = async (token: string) => {
  try {
    const res = await axios.get(`${baseUrl}/loans`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status !== 200) {
      return {
        error: res.data.message,
      };
    }
    return { data: res.data };
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};