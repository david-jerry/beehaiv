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
import { useAuth } from "@/context/AuthContext";

const formSchema = z.object({
  address: z.string().min(2).max(255),
  apartment: z.string().min(2).max(14),
  city: z.string().min(2).max(255),
  state: z.string().min(2).max(255),
  zip: z.string().min(5).max(5),
});

export default function BusinessForm() {
  const [pending, startTransition] = React.useTransition();
  const { user, updateUserAddress } = useAuth();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: user
        ? user.address
        : "",
      apartment: user
        ? user.apartment
        : "",
      city: user ? user.city : "",
      state: user ? user.state : "",
      zip: user ? user.zip : "",
    },
  });

  const backRoute = () => {
    router.replace("/accounts/onboarding/basic");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => await updateUserAddress(values));
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Company physical address
              </FormLabel>
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
              <FormLabel className="text-xs">
                Apartment, suite or floor
              </FormLabel>
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
                <FormLabel className="text-xs">
                  Zip Code or Postal Code
                </FormLabel>
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
            type="button" disabled={pending}
          >
            Back
          </Button>
          <Button disabled={pending} className="md:col-span-2" type="submit">
            {pending ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
