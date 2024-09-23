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
