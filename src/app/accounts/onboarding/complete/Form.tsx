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
import { useAuth } from "@/context/AuthContext";
import { useFormStatus } from "react-dom";
import { createBusinessAction } from "@/actions/user-actions";
import { toast } from "sonner";

const formSchema = z.object({
  business_name: z.string().min(2).max(255),
  deposit_size: z.string().min(2).max(255),
  tax_id: z.string().min(2).max(14),
  asset_source_description: z.string().min(6).max(6),
  company_industry: z.string().min(2).max(255),
  website: z.string().min(2).max(255),
  description: z.string().min(5).max(255),
});

export default function BusinessForm() {
  const { pending } = useFormStatus();
  const { user } = useAuth();

  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: user?.business_profiles[0]
        ? user?.business_profiles[0].business_name
        : "",
      deposit_size: user?.business_profiles[0]
        ? user?.business_profiles[0].deposit_size
        : "",
      tax_id: user?.business_profiles[0]
        ? user?.business_profiles[0].tax_id
        : "",
      asset_source_description: user?.business_profiles[0]
        ? user?.business_profiles[0].asset_source_description
        : "",
      company_industry: user?.business_profiles[0]
        ? user?.business_profiles[0].company_industry
        : "",
      website: user?.business_profiles[0]
        ? user?.business_profiles[0].website
        : "",
      description: user?.business_profiles[0]
        ? user?.business_profiles[0].description
        : "",
    },
  });

  const backRoute = () => {
    router.push("/accounts/onboarding/business-detail");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await createBusinessAction(values);
    if (res.data) {
      toast.success("Complete", {
        description: "You have completed your onboarding process",
      });
      router.push("/dashboard");
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="business_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Legal Name *</FormLabel>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deposit_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Anticipated deposit size *
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
            name="tax_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Tax ID / EIN *</FormLabel>
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
        </div>

        <FormField
          control={form.control}
          name="asset_source_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Asset Source Description *
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
            name="company_industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Company Industry</FormLabel>
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
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Company Website</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="url"
                    placeholder="eg: https://companywebsitename.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  How did you hear about us?
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder=""
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
            disabled={pending}
          >
            Back
          </Button>
          <Button className="md:col-span-2" type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Complete Onboarding"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
