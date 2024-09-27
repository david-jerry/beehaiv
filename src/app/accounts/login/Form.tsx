"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useFormStatus } from "react-dom";
import { z } from "zod";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/AuthContext";
import ErrorMessage from "@/components/commons/ErrorMessage";
import { usePathname, useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(1, "You must provide a password"),
});

export default function LoginForm() {
  const pathname = usePathname();
  const router = useRouter();
  const { login, error, user, getUser } = useAuth();
  const [pending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      async () => getUser();
    }
    if (user && !user.first_name && token) {
      router.push("/accounts/onboarding/basic");
    } else if (user && !user.address && token) {
      router.push("/accounts/onboarding/business-detail");
    } else if (user && !user.business_profiles && token) {
      router.push("/accounts/onboarding/complete");
    }
  }, [user, getUser, router]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => await login(values));
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 flex flex-col"
      >
        {error && <ErrorMessage message={error} />}
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
                  placeholder="johndoe@mail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Password</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={pending} type="submit">
          {pending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
}
