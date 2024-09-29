"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useEffect } from "react";
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
import { useAuth } from "@/context/AuthContext";
import ErrorMessage from "@/components/commons/ErrorMessage";
import useGeneralStore from "@/hooks/generalStore";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().min(2).max(50),
  password: z.string().min(1, "You must provide a password"),
});

export default function SignUpForm() {
  const [pending, startTransition] = React.useTransition();
  const router = useRouter();
  const { login, error, register, user, getUser } = useAuth();
  const setGetStartedEmail = useGeneralStore(
    (state: any) => state.setGetStartedEmail
  );
  const getStartedEmail = useGeneralStore(
    (state: any) => state.getStartedEmail
  );

  useEffect(() => {
    const check = async () => getUser();
    const token = localStorage.getItem("token");
    if (token) {
      check()
    }
    if (user) {
      router.replace("/dashboard")
    }
    if (user && !user.first_name && token) {
      router.replace("/accounts/onboarding/basic");
    } else if (user && !user.address && token) {
      router.replace("/accounts/onboarding/business-detail");
    } else if (user && !user.business_profiles && token) {
      router.replace("/accounts/onboarding/complete");
    }
  }, [user, getUser, router]);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: getStartedEmail ? getStartedEmail : "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => await register(values));
    setGetStartedEmail(null);
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
                  placeholder="example@mail.com"
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
          {pending ? "Submitting..." : "Signup"}
        </Button>
      </form>
    </Form>
  );
}
