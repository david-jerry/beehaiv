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
  pin: z.coerce.number().min(0).max(9999),
});

export default function PinForm() {
  const router = useRouter();
  const setOpenPin = useGeneralStore((state: any) => state.setOpenPin);
  const transferDetails = useGeneralStore(
    (state: any) => state.transferDetails
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: 1234,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpenPin(false);
    console.log(transferDetails);
    router.replace("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">PIN</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="number"
                  placeholder="****"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
