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
import { resetPasswordAction } from "@/actions/auth-actions";
import { toast } from "sonner";

const formSchema = z.object({
  email: z.string().min(2).max(50),
});

export default function ForgotPasswordForm() {
  const [pending, startTransition] = React.useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await resetPasswordAction(values);
      if (res.data) {
        toast.success("Email Sent", {
          description: "A password reset code has been sent to your email",
        });
      } else {
        toast.error("Reset Email Failed", {
          description: res.error,
        });
      }
      form.reset();
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="email"
                  placeholder="example@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending ? "Submitting..." : "Reset password"}
        </Button>
      </form>
    </Form>
  );
}
