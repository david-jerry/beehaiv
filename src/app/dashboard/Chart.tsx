/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Area, AreaChart, Bar, CartesianGrid, XAxis } from "recharts";
import { TbCreditCardRefund, TbCreditCardPay } from "react-icons/tb";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { getTransactionSummaryAction } from "@/actions/user-actions";
import { useAuth } from "@/context/AuthContext";
import { useIsMounted } from "usehooks-ts";

interface DataProps {
  date: string;
  debits: string;
  deposits: number;
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  debits: {
    label: "Debits",
    color: "#ca8a04",
    icon: TbCreditCardPay,
  },
  deposits: {
    label: "Deposits",
    color: "#000000",
    icon: TbCreditCardRefund,
  },
} satisfies ChartConfig;

export function MyChart() {
  const { user, refreshAccess, setError } = useAuth();
  const [timeRange, setTimeRange] = React.useState("90d");
  const [data, setData] = React.useState<DataProps[]>([]);
  const isMounted = useIsMounted();

  React.useEffect(() => {
    if (!isMounted) return;

    const token = localStorage.getItem("token");
    if (user && token) {
      const fetchTransactions = async () => {
        await refreshAccess();
        const res = await getTransactionSummaryAction(token);
        if (res.data) {
          setData(res.data);
          setError(null);
        } else if (res.error) {
          setData([]);
          setError(res.error);
        }
      };
      fetchTransactions();
    }
  }, []);

  const filteredData = React.useMemo(() => {
    if (!isMounted) return [];

    const timeRangeDaysMap: Record<"30d" | "7d" | "180d" | "1y" | "2y", number> = {
      "30d": 30,
      "7d": 7,
      "180d": 180,
      "1y": 360,
      "2y": 720,
    };

    const daysToSubtract = timeRangeDaysMap[timeRange as keyof typeof timeRangeDaysMap] || 90;
    const now = new Date();
    now.setDate(now.getDate() - daysToSubtract);

    return data.filter((item) => new Date(item.date) >= now);
  }, [data, timeRange, isMounted]);

  // Render nothing if not mounted to prevent server-side issues
  if (!isMounted) return null;

  return (
    <Card className="bg-gray-100 ">
      <CardHeader className="flex items-center gap-2 space-y-y-0 border-b py-4 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Expenses Chart</CardTitle>
          <CardDescription>
            Showing total visitors for the last {timeRange}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[160px] rounded-lg sm:ml-auto" aria-label="Select a value">
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="2y" className="rounded-lg">Last 2 years</SelectItem>
            <SelectItem value="1y" className="rounded-lg">Last 1 year</SelectItem>
            <SelectItem value="180d" className="rounded-lg">Last 6 months</SelectItem>
            <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
            <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
            <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-debits)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-debits)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-deposits)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-deposits)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              minTickGap={32}
              axisLine={false}
              tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
            />
            <Bar dataKey="debits" fill="var(--color-debits)" />
            <Bar dataKey="deposits" fill="var(--color-deposits)" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  labelFormatter={(value) => new Date(value).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "2-digit" })}
                  formatter={(value, name) => (
                    <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                      {chartConfig[name as keyof typeof chartConfig]?.label || name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {(chartConfig[name as keyof typeof chartConfig]?.label !== "date" || name !== "date") &&
                          new Intl.NumberFormat("en-US", {
                            style: "currency",
                            currency: "USD",
                          }).format(Number(value))}
                      </div>
                    </div>
                  )}
                  indicator="line"
                />
              }
            />
            <Area dataKey="deposits" type="natural" fill="url(#fillMobile)" stroke="var(--color-deposits)" stackId="a" />
            <Area dataKey="debits" type="natural" fill="url(#fillDesktop)" stroke="var(--color-debits)" stackId="a" />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
