"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";
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

const formSchema = z.object({
  firstName: z.string().min(2).max(255),
  lastName: z.string().min(2).max(255),
  phone: z
    .string()
    .min(2)
    .max(14)
    .regex(/^\+\d{1,3}\d{10}$/, {
      message:
        "Phone number must start with +(country code) and be followed by 10 digits.",
    }),
});

export default function BasicForm() {
  const basicData: BasicInfoProps = useGeneralStore(
    (state: any) => state.basicData
  );
  const setBasicData = useGeneralStore((state: any) => state.setBasicData);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: basicData ? basicData.firstName : "",
      lastName: basicData ? basicData.lastName : "",
      phone: basicData ? basicData.phone : "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.info(values);
    setBasicData(values);
    router.push("/accounts/onboarding/business-detail");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">First name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="John"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Last name</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Personal phone number</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="tel"
                  placeholder="+18903748590"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Continue</Button>
      </form>
    </Form>
  );
}
