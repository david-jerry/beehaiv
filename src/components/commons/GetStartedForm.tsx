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

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
});

export default function GetStartedForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "johndoe@mail.com",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data.email);
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
