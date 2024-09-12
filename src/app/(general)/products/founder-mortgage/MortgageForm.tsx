"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FaArrowRight } from "react-icons/fa";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FormSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z
    .string()
    .regex(/^\+?\d{10,15}$/, "Invalid phone number")
    .min(1, "Phone number is required"), // Optional if phone number is not required
  companyName: z
    .string()
    .min(1, "Company name is required")
    .max(255, "Company name is too long"),
  rangeOfCompanyAssets: z.enum(["Less than $1M", "$1-5M", "$5-10M", "$10M+"], {
    required_error: "Please select an option",
  }), // Adjust options as needed
  howYouHeardAboutUs: z.string().optional(),
});

export default function MortgageForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      phone: "",
      companyName: "",
      rangeOfCompanyAssets: "$1-5M",
      howYouHeardAboutUs: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form
        className="py-6 grid grid-cols-1 md:grid-cols-2 gap-9"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className="justify-between w-full flex flex-col col-span-2 md:col-span-1">
              <FormControl>
                <Input
                  {...field}
                  type="tel"
                  className="shadow-none focus:placeholder:text-foreground placeholder:text-gray-400"
                  placeholder="Phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="justify-between w-full flex flex-col col-span-2 md:col-span-1">
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="shadow-none focus:placeholder:text-foreground placeholder:text-gray-400"
                  placeholder="What is your work email?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem className="justify-between w-full flex flex-col col-span-2 md:col-span-1">
              <FormControl>
                <Input
                  {...field}
                  className="shadow-none focus:placeholder:text-foreground placeholder:text-gray-400"
                  placeholder="What is your company name?"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rangeOfCompanyAssets"
          render={({ field }) => (
            <FormItem className="justify-between w-full flex flex-col col-span-2 md:col-span-1">
              <FormControl>
                <Input
                  {...field}
                  className="shadow-none focus:placeholder:text-foreground placeholder:text-gray-400"
                  placeholder="Phone number"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="howYouHeardAboutUs"
          render={({ field }) => (
            <>
              <FormItem className="col-span-2 justify-between w-full">
                <FormControl>
                  <Textarea
                    {...field}
                    className="h-36 shadow-none focus:placeholder:text-foreground placeholder:text-gray-400 "
                    placeholder="How did you hear about us?"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </>
          )}
        />

        <div className="col-span-2">
          <Button
            className="ml-auto flex items-center gap-4 whitespace-nowrap hover:bg-yellow-600 hover:text-foreground duration-300 ease-in-out transition-colors"
            type="submit"
          >
            <span className="flex w-fit">Submit</span>
            <FaArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
