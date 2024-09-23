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
import { useRouter, useSearchParams } from "next/navigation";
import { verificationCodeAction } from "@/actions/auth-actions";
import { toast } from "sonner";

const formSchema = z.object({
  code: z.string().min(6).max(255),
});

export default function ConfirmCodeForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: code!,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const res = await verificationCodeAction(values);
    if (res!.error) {
      toast.error("Verification Error", {
        description: res!.error,
      });
    } else if (res!.message) {
      toast.success("Verification", {
        description: res!.message,
      });
      router.push("/accounts/onboarding");
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
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Confirmation Code</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="tel"
                  placeholder={
                    code ? code : "4ebe76e1-a4a6-4866-bdee-97ce650e97a9"
                  }
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Confirm</Button>
      </form>
    </Form>
  );
}
