"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import useGeneralStore from "@/hooks/generalStore";

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

/**
 * The `GetStartedForm` function is a TypeScript React component that handles a form submission to set
 * a user's email and navigate to a signup page.
 * @returns The `GetStartedForm` component is being returned. It is a form component that allows users
 * to input their email address and submit the form to set the email in the state and then navigate to
 * the `"/accounts/signup"` route. The form includes an input field for the email address and a "Get
 * Started" button for submission.
 */
export default function GetStartedForm() {
  const setGetStartedEmail = useGeneralStore(
    (state: any) => state.setGetStartedEmail
  );
  const router = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data.email);
    setGetStartedEmail(data.email);
    router.replace("/accounts/signup")
  };
  return (
    <Form {...form}>
      <form className="py-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <>
              <FormItem className="flex border space-y-0 space-x-4 border-gray-300 rounded-md p-2 items-center justify-between w-full">
                <FormControl>
                  <Input
                    {...field}
                    className="shadow-none focus:placeholder:text-foreground placeholder:text-gray-400 !border-0 !focus:border-transparent !focus:ring-0 !focus:border-0 !focus:outline-none focus:outline-0"
                    placeholder="What is your work email?"
                  />
                </FormControl>
                <Button
                  className="whitespace-nowrap hover:bg-yellow-600 hover:text-foreground duration-300 ease-in-out transition-colors"
                  type="submit"
                >
                  Get Started
                </Button>
              </FormItem>
              <FormMessage />
            </>
          )}
        />
      </form>
    </Form>
  );
}
