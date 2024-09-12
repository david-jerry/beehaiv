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
  country: z.string().min(2).max(255),
  companyAddress: z.string().min(2).max(255),
  apartment: z.string().min(2).max(14),
  city: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  zip: z.string().min(5).max(5),
});

export default function BusinessForm() {
  const basicData: BasicInfoProps = useGeneralStore(
    (state: any) => state.basicData
  );
  const setBasicData = useGeneralStore((state: any) => state.setBasicData);

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: basicData ? basicData.country : "",
      companyAddress: basicData ? basicData.companyAddress : "",
      apartment: basicData ? basicData.apartment : "",
      city: basicData ? basicData.city : "",
      state: basicData ? basicData.state : "",
      zip: basicData ? basicData.zip : "",
    },
  });

  const backRoute = () => {
    router.push("/accounts/onboarding/basic");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.info(values);
    setBasicData(values);
    router.push("/accounts/onboarding/complete");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Country or territory</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="text"
                  placeholder="country"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Company physical address</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="text"
                  placeholder="-"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apartment"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Apartment, suite or floor</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="text"
                  placeholder="-"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">City</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="city"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">State/Province</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="province / state"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zip"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Zip Code or Postal Code</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="number"
                    placeholder="90201"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-col-1 md:grid-cols-3 gap-6">
          <Button
            onClick={backRoute}
            className=""
            variant={"outline"}
            type="button"
          >
            Back
          </Button>
          <Button className="md:col-span-2" type="submit">
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
