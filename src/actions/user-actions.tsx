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
  country: z.string().min(2).max(255),
  address: z.string().min(2).max(255),
  apartment: z.string().min(2).max(14),
  city: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  zip: z.string().min(5).max(5),
});

const businessFormSchema = z.object({
  business_name: z.string().min(2).max(255),
  deposit_size: z.string().min(2).max(255),
  tax_id: z.string().min(2).max(14),
  asset_source_description: z.string().min(6).max(6),
  company_industry: z.string().min(2).max(255),
  website: z.string().min(2).max(255),
  description: z.string().min(5).max(255),
});

export const updateUserAction = async (data: z.infer<typeof userFormSchema>, user_uid: string) => {
  try {
    // Validate the data using the schema
    const validatedData = userFormSchema.parse(data);

    // Perform the request to signup a new user
    const response = await axios.post(
      `${baseUrl}/users/${user_uid}`,
      validatedData
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
  user_uid: string
) => {
  try {
    // Validate the data using the schema
    const validatedData = userAddressSchema.parse(data);

    // Perform the request to signup a new user
    const response = await axios.post(
      `${baseUrl}/users/${user_uid}`,
      validatedData
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
) => {
  try {
    // Validate the data using the schema
    const validatedData = businessFormSchema.parse(data);

    // Perform the request to signup a new user
    const response = await axios.post(
      `${baseUrl}/businesses`,
      validatedData
    );

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
