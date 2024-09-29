"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useTransition, Suspense } from "react";
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
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordVerifyCodeAction } from "@/actions/auth-actions";
import { toast } from "sonner";

// Define the form schema
const formSchema = z.object({
  new_password: z.string().min(6).max(255),
  confirm_new_password: z.string().min(6).max(255),
});

// This component will retrieve the search parameters and pass them to the form
function SearchParamsFormWrapper() {
  const searchParams = useSearchParams();
  const code = searchParams.get("token");

  return <ConfirmCodeForm code={code!} />;
}

// The actual form component receives the code from the wrapper
function ConfirmCodeForm({ code }: { code: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const res = await resetPasswordVerifyCodeAction(values, code);
      if (res!.error) {
        toast.error("Reset Error", {
          description: res!.error,
        });
      } else if (res!.data) {
        toast.success("Reset Successful", {
          description: res.data,
        });
        router.replace("/accounts/login");
      }
    });
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
          name="new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">New Password</FormLabel>
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
        <FormField
          control={form.control}
          name="confirm_new_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Confirm Password</FormLabel>
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
          {pending ? "Submitting..." : "Confirm"}
        </Button>
      </form>
    </Form>
  );
}

// Wrapping the whole form inside Suspense
export default function SuspenseConfirmCodeForm() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsFormWrapper />
    </Suspense>
  );
}

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import React from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useRouter, useSearchParams } from "next/navigation";
// import { verificationCodeAction } from "@/actions/auth-actions";
// import { toast } from "sonner";

// const formSchema = z.object({
//   code: z.string().min(6).max(255),
// });

// export default function ConfirmCodeForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const code = searchParams.get("code");
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       code: code!,
//     },
//   });

//   const onSubmit = async (values: z.infer<typeof formSchema>) => {
//     const res = await verificationCodeAction(values);
//     if (res!.error) {
//       toast.error("Verification Error", {
//         description: res!.error,
//       });
//     } else if (res!.message) {
//       toast.success("Verification", {
//         description: res!.message,
//       });
//       router.replace("/accounts/onboarding");
//     }
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="w-full space-y-6 flex flex-col"
//       >
//         <FormField
//           control={form.control}
//           name="code"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel className="text-xs">Confirmation Code</FormLabel>
//               <FormControl>
//                 <Input
//                   className="w-full"
//                   type="tel"
//                   placeholder={
//                     code ? code : "4ebe76e1-a4a6-4866-bdee-97ce650e97a9"
//                   }
//                   {...field}
//                 />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Confirm</Button>
//       </form>
//     </Form>
//   );
// }
