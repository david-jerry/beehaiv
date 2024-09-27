"use server";

import { z } from "zod";
import axios from "axios";
import { baseUrl, domain } from "@/utils/global";
import { Resend } from "resend";
import { v4 as uuidv4 } from "uuid";
import VerifyEmail from "@/app/accounts/login/EmailContent";
import WelcomeEmail from "@/app/accounts/confirm-code/WelcomeEmail";
import { headers } from "next/headers";
import PasswordResetEmail from "@/app/accounts/forgot-password/PasswordResetEmailContent";

const resend = new Resend(process.env.RESEND_API);

const IP = async () => {
  const FALLBACK_IP_ADDRESS = "0.0.0.0";
  const forwardedFor = headers().get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0] ?? FALLBACK_IP_ADDRESS;
  }

  return headers().get("x-real-ip") ?? FALLBACK_IP_ADDRESS;
};

const loginFormSchema = z.object({
  email: z.string().email().min(2).max(250),
  password: z.string().min(1, "You must provide a password"),
});

const passwordResetFormSchema = z.object({
  email: z.string().email().min(2).max(250),
});

const newPasswordFormSchema = z.object({
  new_password: z.string().min(6).max(255),
  confirm_new_password: z.string().min(6).max(255),
});

const signUpFormSchema = z.object({
  email: z.string().email().min(2).max(250),
  password: z.string().min(1, "You must provide a password"),
});

const verificationFormSchema = z.object({
  code: z.string().min(6).max(255),
});

const pinFormSchema = z.object({
  pin: z.coerce.number().min(0).max(9999),
});

export const loginAction = async (data: z.infer<typeof loginFormSchema>) => {
  try {
    // Validate input data against schema
    const validatedData = loginFormSchema.parse(data);

    // Perform login request
    const res = await axios.post(`${baseUrl}/auth/login`, validatedData);
    console.log("Axios Response", res.data);

    // If a verification code is returned, send an email with the code
    if (res.data.code) {
      await resend.emails.send({
        from: "[Beehaiv Technologies] - Email Verification <authority@beehaiv.jeremiahedavid.online>",
        to: validatedData.email,
        subject: "Re:Email Verification",
        text: `Copy this code: ${res.data.code} to verify your email address or click this link <a href="https://${res.data.user.domain}/${res.data.code}">Complete Verification</a>`,
        react: VerifyEmail({ verificationCode: res.data.code }),
      });

      return {
        error: res.data,
      };
    }

    // Return successful login data
    return {
      data: res.data,
    };
  } catch (err: any) {
    // Handle error and log response
    console.log("Axios Error", err.response?.data || err.message);

    return {
      error: err.response?.data || err.message,
    };
  }
};

export const verificationCodeAction = async (
  data: z.infer<typeof verificationFormSchema>
) => {
  try {
    // Validate the data using the schema
    const validatedData = verificationFormSchema.parse(data);

    // Perform the request to verify the email code
    const response = await axios.get(
      `${baseUrl}/auth/verify-email/${validatedData.code}`
    );

    console.log(response.data);

    // Check if the response is successful
    if (response.data.status === 200) {
      const userEmail = response.data.user.email;

      // Send welcome email via Resend
      await resend.emails.send({
        from: "Beehaiv <authority@beehaiv.jeremiahedavid.online>",
        to: userEmail,
        subject: "Welcome to Beehaiv",
        text: `Welcome`,
        react: WelcomeEmail({ userFirstname: userEmail }),
      });

      return {
        data: response.data.message,
        verified_already: response.data.verified_already,
      };
    } else {
      return {
        error: response?.data?.message,
      };
    }
  } catch (error: any) {
    // Handle the error and return the message
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const signupAction = async (data: z.infer<typeof signUpFormSchema>) => {
  try {
    // Validate the data using the schema
    const validatedData = signUpFormSchema.parse(data);
    const ip_address = await IP();
    const extractedIp = ip_address.split(":").pop();

    // Perform the request to signup a new user
    const response = await axios.post(
      `${baseUrl}/auth/signup?domain=${encodeURIComponent(
        domain
      )}&ip_address=${encodeURIComponent(extractedIp!)}`,
      validatedData
    );

    // Check if the response is successful
    if (response.status === 201 || response.status === 200) {
      const userEmail = validatedData.email;
      const code = response.data.code;

      // Send welcome email via Resend
      const regEmail = await resend.emails.send({
        from: "[Beehaiv Technologies] - Email Verification <authority@beehaiv.jeremiahedavid.online>",
        to: userEmail,
        subject: "Email Verification",
        text: `Verify your email address with this code ${code}`,
        react: VerifyEmail({ verificationCode: code }),
      });

      if (regEmail.error) {
        return {
          error: regEmail.error.message,
        };
      }

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

export const transferPinAction = async (
  data: z.infer<typeof pinFormSchema>
) => {
  try {
    // Validate the data using the schema
    const validatedData = pinFormSchema.parse(data);
    const token = localStorage.get("token");

    // Perform the request to signup a new user
    const response = await axios.post(
      `${baseUrl}/auth/transfer-pin`,
      { transfer_pin: validatedData.pin },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          ip_address: IP,
        },
      }
    );

    // Check if the response is successful
    if (response.status === 200) {
      return {
        data: response.data.message,
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

export const resetPasswordAction = async (
  data: z.infer<typeof passwordResetFormSchema>
) => {
  try {
    const validatedData = passwordResetFormSchema.parse(data);

    const response = await axios.post(
      `${baseUrl}/auth/password-reset-request?domain=${encodeURIComponent(
        domain
      )}`,
      validatedData
    );
    if (response.status !== 200) {
      return {
        error: response?.data?.message,
      };
    }
    await resend.emails.send({
      from: "[Beehaiv Technologies] - Password Reset Request <authority@beehaiv.jeremiahedavid.online>",
      to: validatedData.email,
      subject: "Reset Password",
      text: `Copy this code: ${response.data.password_reset_code} to reset your password `,
      react: PasswordResetEmail({
        verificationCode: response.data.password_reset_code,
      }),
    });
    return {
      data: response.data.message,
    };
  } catch (error: any) {
    // Handle the error and return the message
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const resetPasswordVerifyCodeAction = async (
  data: z.infer<typeof newPasswordFormSchema>,
  code: string
) => {
  try {
    const validatedData = newPasswordFormSchema.parse(data);

    const response = await axios.post(
      `${baseUrl}/auth/password-reset-confirm/${code}`,
      validatedData
    );
    if (response.status !== 200) {
      return {
        error: response?.data?.message,
      };
    }
    return {
      data: response.data.message,
    };
  } catch (error: any) {
    // Handle the error and return the message
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const refreshTokenAction = async () => {
  try {
    const res = await axios.get(`${baseUrl}/auth/refresh-token`);
    if (res.status === 200) {
      return { data: res };
    } else {
      return {
        error: res.data.message
      }
    }
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};

export const logoutAction = async () => {
  try {
    await axios.get(`${baseUrl}/auth/logout`);
  } catch (error: any) {
    return {
      error: error.response?.data?.message || error.message,
    };
  }
};
