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
  legalName: z.string().min(2).max(255),
  depositSize: z.string().min(2).max(255),
  assetSourceDescription: z.string().min(2).max(14),
  taxId: z.string().min(6).max(6),
  companyIndustry: z.string().min(2).max(255),
  companyWebsite: z.string().min(2).max(255),
  howFoundUs: z.string().min(5).max(255),
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
      legalName: basicData ? basicData.legalName : "",
      depositSize: basicData ? basicData.depositSize : "",
      taxId: basicData ? basicData.taxId : "",
      assetSourceDescription: basicData ? basicData.assetSourceDescription : "",
      companyIndustry: basicData ? basicData.companyIndustry : "",
      companyWebsite: basicData ? basicData.companyWebsite : "",
      howFoundUs: basicData ? basicData.howFoundUs : "",
    },
  });

  const backRoute = () => {
    router.push("/accounts/onboarding/business-detail");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.info(values);
    setBasicData(values);
    console.info(basicData)
    router.push("/dashboard");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="legalName"
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
            name="depositSize"
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
            name="taxId"
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
          name="assetSourceDescription"
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
            name="companyIndustry"
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
            name="companyWebsite"
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
            name="howFoundUs"
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
