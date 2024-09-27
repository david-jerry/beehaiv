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
import { PiBankDuotone } from "react-icons/pi";
import { GrUserManager } from "react-icons/gr";
import { CiBarcode } from "react-icons/ci";
import { SiMastercard } from "react-icons/si";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import useGeneralStore from "@/hooks/generalStore";
import { useAuth } from "@/context/AuthContext";
import { getCard } from "@/hooks/usePosts";

const formSchema = z.object({
  recipient_bank_name: z.string().min(0),
  amount: z.coerce.number().gte(10).positive(),
  recipient_account_number: z
    .string()
    .min(1, "You must provide a recipient account number"),
  recipient_name: z
    .string()
    .min(1, "You must provide a recipient account name"),
  sort_code: z.string().optional(),
});

export default function TransferForm() {
  const [domestic, setDomestic] = React.useState(true);
  const [step, setStep] = React.useState(0);
  const setOpenPin = useGeneralStore((state: any) => state.setOpenPin);
  const [data, setData] = React.useState<any[]>([]);
  const { user } = useAuth();

  const cards = getCard(user!);

  React.useEffect(() => {
    setData(cards);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipient_bank_name: "",
      amount: 10,
      recipient_account_number: "",
      recipient_name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setOpenPin(true);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <strong className="flex font-bold text-base">Quick Transfers</strong>
      </div>

      <div className="grid grid-cols-2 rounded-md overflow-hidden border w-full items-stretch">
        <Button
          onClick={() => setDomestic(!domestic)}
          variant={domestic ? "default" : "outline"}
          className="rounded-r-none"
        >
          Domestic
        </Button>
        <Button
          onClick={() => setDomestic(!domestic)}
          variant={!domestic ? "default" : "outline"}
          className="rounded-l-none"
        >
          International
        </Button>
      </div>

      {step === 0 && (
        <div className="w-full p-2 rounded-md border border-gray-300">
          <Select>
            <SelectTrigger className="shadow-none justify-between h-fit w-full flex items-center py-1.5 appearance-none border-0 focus:ring-0 focus:outline-0 focus:outline-none">
              <span className="text-xs flex items-center">
                <SiMastercard className="h-5 w-5" />
                <span className="flex w-fit">Debit</span>
              </span>
              <Separator orientation="vertical" className="h-9 bg-gray-300" />
              <SelectValue
                className="font-bold text-base w-fit gap-2 space-x-2"
                placeholder={"Select a debit card"}
              />
            </SelectTrigger>
            <SelectContent>
              {data.map((card, index) => (
                <SelectItem key={index} value={card.bank_id} className="w-full">
                  <span className="text-xs flex flex-col justify-center items-center">
                    <span className="text-xs">
                      **** {card.card_number.slice(-4)}
                    </span>
                    {/* <span className="flex w-fit">Manuel Inc.</span> */}
                  </span>
                  <span className="flex font-bold text-sm w-fit">
                    ${card.bal}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 flex flex-col"
        >
          {step === 0 && (
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem className="-space-y-1.5">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch h-fit">
                    <FormLabel className="absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-gray-200 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-10 pb-[13.5px] pt-4 text-sm text-foreground focus:border focus:border-foreground focus:outline-none focus:ring-0"
                        type="number"
                        min="0"
                        step=".01"
                        {...field}
                      />
                    </FormControl>
                    <div className="absolute left-1 top-[54%] -translate-y-1/2 bg-gray-200 py-1 px-2.5 text-gray-400 peer-placeholder-shown:text-300 peer-focus:text-gray-400">
                      $
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {step === 1 && (
            <>
              <FormField
                control={form.control}
                name="recipient_bank_name"
                render={({ field }) => (
                  <FormItem className="-space-y-1.5">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch h-fit">
                      <FormLabel className="absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-gray-200 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground">
                        Bank Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-10 pb-[13.5px] pt-4 text-sm text-foreground focus:border focus:border-foreground focus:outline-none focus:ring-0"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute left-1 top-[54%] -translate-y-1/2 bg-gray-200 py-1 px-2.5 text-gray-400 peer-placeholder-shown:text-300 peer-focus:text-gray-400">
                        <PiBankDuotone />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient_account_number"
                render={({ field }) => (
                  <FormItem className="-space-y-1.5">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch h-fit">
                      <FormLabel className="absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-gray-200 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground">
                        Account Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-10 pb-[13.5px] pt-4 text-sm text-foreground focus:border focus:border-foreground focus:outline-none focus:ring-0"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute left-1 top-[54%] -translate-y-1/2 bg-gray-200 py-1 px-2.5 text-gray-400 peer-placeholder-shown:text-300 peer-focus:text-gray-400">
                        <PiBankDuotone />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="recipient_name"
                render={({ field }) => (
                  <FormItem className="-space-y-1.5">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch h-fit">
                      <FormLabel className="absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-gray-200 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground">
                        Recipient Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-10 pb-[13.5px] pt-4 text-sm text-foreground focus:border focus:border-foreground focus:outline-none focus:ring-0"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <div className="absolute left-1 top-[54%] -translate-y-1/2 bg-gray-200 py-1 px-2.5 text-gray-400 peer-placeholder-shown:text-300 peer-focus:text-gray-400">
                        <GrUserManager />
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          {!domestic && step === 2 && (
            <FormField
              control={form.control}
              name="sort_code"
              render={({ field }) => (
                <FormItem className="-space-y-1.5">
                  <div className="relative mb-4 flex w-full flex-wrap items-stretch h-fit">
                    <FormLabel className="absolute top-1 left-2 z-10 origin-[0] -translate-y-4 scale-75 transform cursor-text select-none bg-gray-200 px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-foreground">
                      Sort Code
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pl-10 pb-[13.5px] pt-4 text-sm text-foreground focus:border focus:border-foreground focus:outline-none focus:ring-0"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <div className="absolute left-1 top-[54%] -translate-y-1/2 bg-gray-200 py-1 px-2.5 text-gray-400 peer-placeholder-shown:text-300 peer-focus:text-gray-400">
                      <CiBarcode />
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="flex items-center gap-2 w-full content-stretch">
            {step > 0 && (
              <Button
                className="w-full"
                onClick={() => setStep(step - 1)}
                variant={"outline"}
                type="button"
              >
                Back
              </Button>
            )}
            {step === 0 && (
              <Button
                className="w-full"
                onClick={() => setStep(step + 1)}
                type="button"
              >
                To Recipient
              </Button>
            )}
            {step > 0 && !domestic && (
              <Button
                className="w-full"
                onClick={() => setStep(step + 1)}
                type="button"
              >
                Provide SortCode
              </Button>
            )}
            {domestic && step === 1 && (
              <Button className="w-full" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
}
