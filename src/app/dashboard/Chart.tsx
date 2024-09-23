"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { TbCreditCardRefund, TbCreditCardPay } from "react-icons/tb";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
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

import { type ChartConfig } from "@/components/ui/chart";

const data = [
  {
    date: "2024-04-01",
    debits: 222,
    deposits: 150,
    debitsFormats: "$222.00",
    depositsFormat: "$150.00",
  },
  {
    date: "2024-04-02",
    debits: 97,
    deposits: 180,
    debitsFormats: "$97.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-04-03",
    debits: 167,
    deposits: 120,
    debitsFormats: "$167.00",
    depositsFormat: "$120.00",
  },
  {
    date: "2024-04-04",
    debits: 242,
    deposits: 260,
    debitsFormats: "$242.00",
    depositsFormat: "$260.00",
  },
  {
    date: "2024-04-05",
    debits: 373,
    deposits: 290,
    debitsFormats: "$373.00",
    depositsFormat: "$290.00",
  },
  {
    date: "2024-04-06",
    debits: 301,
    deposits: 340,
    debitsFormats: "$301.00",
    depositsFormat: "$340.00",
  },
  {
    date: "2024-04-07",
    debits: 245,
    deposits: 180,
    debitsFormats: "$245.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-04-08",
    debits: 409,
    deposits: 320,
    debitsFormats: "$409.00",
    depositsFormat: "$320.00",
  },
  {
    date: "2024-04-09",
    debits: 59,
    deposits: 110,
    debitsFormats: "$59.00",
    depositsFormat: "$110.00",
  },
  {
    date: "2024-04-10",
    debits: 261,
    deposits: 190,
    debitsFormats: "$261.00",
    depositsFormat: "$190.00",
  },
  {
    date: "2024-04-11",
    debits: 327,
    deposits: 350,
    debitsFormats: "$327.00",
    depositsFormat: "$350.00",
  },
  {
    date: "2024-04-12",
    debits: 292,
    deposits: 210,
    debitsFormats: "$292.00",
    depositsFormat: "$210.00",
  },
  {
    date: "2024-04-13",
    debits: 342,
    deposits: 380,
    debitsFormats: "$342.00",
    depositsFormat: "$380.00",
  },
  {
    date: "2024-04-14",
    debits: 137,
    deposits: 220,
    debitsFormats: "$137.00",
    depositsFormat: "$220.00",
  },
  {
    date: "2024-04-15",
    debits: 120,
    deposits: 170,
    debitsFormats: "$120.00",
    depositsFormat: "$170.00",
  },
  {
    date: "2024-04-16",
    debits: 138,
    deposits: 190,
    debitsFormats: "$138.00",
    depositsFormat: "$190.00",
  },
  {
    date: "2024-04-17",
    debits: 446,
    deposits: 360,
    debitsFormats: "$446.00",
    depositsFormat: "$360.00",
  },
  {
    date: "2024-04-18",
    debits: 364,
    deposits: 410,
    debitsFormats: "$364.00",
    depositsFormat: "$410.00",
  },
  {
    date: "2024-04-19",
    debits: 243,
    deposits: 180,
    debitsFormats: "$243.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-04-20",
    debits: 89,
    deposits: 150,
    debitsFormats: "$89.00",
    depositsFormat: "$150.00",
  },
  {
    date: "2024-04-21",
    debits: 137,
    deposits: 200,
    debitsFormats: "$137.00",
    depositsFormat: "$200.00",
  },
  {
    date: "2024-04-22",
    debits: 224,
    deposits: 170,
    debitsFormats: "$224.00",
    depositsFormat: "$170.00",
  },
  {
    date: "2024-04-23",
    debits: 138,
    deposits: 230,
    debitsFormats: "$138.00",
    depositsFormat: "$230.00",
  },
  {
    date: "2024-04-24",
    debits: 387,
    deposits: 290,
    debitsFormats: "$387.00",
    depositsFormat: "$290.00",
  },
  {
    date: "2024-04-25",
    debits: 215,
    deposits: 250,
    debitsFormats: "$215.00",
    depositsFormat: "$250.00",
  },
  {
    date: "2024-04-26",
    debits: 75,
    deposits: 130,
    debitsFormats: "$75.00",
    depositsFormat: "$130.00",
  },
  {
    date: "2024-04-27",
    debits: 383,
    deposits: 420,
    debitsFormats: "$383.00",
    depositsFormat: "$420.00",
  },
  {
    date: "2024-04-28",
    debits: 122,
    deposits: 180,
    debitsFormats: "$122.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-04-29",
    debits: 315,
    deposits: 240,
    debitsFormats: "$315.00",
    depositsFormat: "$240.00",
  },
  {
    date: "2024-04-30",
    debits: 454,
    deposits: 380,
    debitsFormats: "$454.00",
    depositsFormat: "$380.00",
  },
  {
    date: "2024-05-01",
    debits: 165,
    deposits: 220,
    debitsFormats: "$165.00",
    depositsFormat: "$220.00",
  },
  {
    date: "2024-05-02",
    debits: 293,
    deposits: 310,
    debitsFormats: "$293.00",
    depositsFormat: "$310.00",
  },
  {
    date: "2024-05-03",
    debits: 247,
    deposits: 190,
    debitsFormats: "$247.00",
    depositsFormat: "$190.00",
  },
  {
    date: "2024-05-04",
    debits: 385,
    deposits: 420,
    debitsFormats: "$385.00",
    depositsFormat: "$420.00",
  },
  {
    date: "2024-05-05",
    debits: 481,
    deposits: 390,
    debitsFormats: "$481.00",
    depositsFormat: "$390.00",
  },
  {
    date: "2024-05-06",
    debits: 498,
    deposits: 520,
    debitsFormats: "$498.00",
    depositsFormat: "$520.00",
  },
  {
    date: "2024-05-07",
    debits: 388,
    deposits: 300,
    debitsFormats: "$388.00",
    depositsFormat: "$300.00",
  },
  {
    date: "2024-05-08",
    debits: 149,
    deposits: 210,
    debitsFormats: "$149.00",
    depositsFormat: "$210.00",
  },
  {
    date: "2024-05-09",
    debits: 227,
    deposits: 180,
    debitsFormats: "$227.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-05-10",
    debits: 293,
    deposits: 330,
    debitsFormats: "$293.00",
    depositsFormat: "$330.00",
  },
  {
    date: "2024-05-11",
    debits: 335,
    deposits: 270,
    debitsFormats: "$335.00",
    depositsFormat: "$270.00",
  },
  {
    date: "2024-05-12",
    debits: 197,
    deposits: 240,
    debitsFormats: "$197.00",
    depositsFormat: "$240.00",
  },
  {
    date: "2024-05-13",
    debits: 197,
    deposits: 160,
    debitsFormats: "$197.00",
    depositsFormat: "$160.00",
  },
  {
    date: "2024-05-14",
    debits: 448,
    deposits: 490,
    debitsFormats: "$448.00",
    depositsFormat: "$490.00",
  },
  {
    date: "2024-05-15",
    debits: 473,
    deposits: 380,
    debitsFormats: "$473.00",
    depositsFormat: "$380.00",
  },
  {
    date: "2024-05-16",
    debits: 338,
    deposits: 400,
    debitsFormats: "$338.00",
    depositsFormat: "$400.00",
  },
  {
    date: "2024-05-17",
    debits: 499,
    deposits: 420,
    debitsFormats: "$499.00",
    depositsFormat: "$420.00",
  },
  {
    date: "2024-05-18",
    debits: 315,
    deposits: 350,
    debitsFormats: "$315.00",
    depositsFormat: "$350.00",
  },
  {
    date: "2024-05-19",
    debits: 235,
    deposits: 180,
    debitsFormats: "$235.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-05-20",
    debits: 177,
    deposits: 230,
    debitsFormats: "$177.00",
    depositsFormat: "$230.00",
  },
  {
    date: "2024-05-21",
    debits: 82,
    deposits: 140,
    debitsFormats: "$82.00",
    depositsFormat: "$140.00",
  },
  {
    date: "2024-05-22",
    debits: 81,
    deposits: 120,
    debitsFormats: "$81.00",
    depositsFormat: "$120.00",
  },
  {
    date: "2024-05-23",
    debits: 252,
    deposits: 290,
    debitsFormats: "$252.00",
    depositsFormat: "$290.00",
  },
  {
    date: "2024-05-24",
    debits: 294,
    deposits: 220,
    debitsFormats: "$294.00",
    depositsFormat: "$220.00",
  },
  {
    date: "2024-05-25",
    debits: 201,
    deposits: 250,
    debitsFormats: "$201.00",
    depositsFormat: "$250.00",
  },
  {
    date: "2024-05-26",
    debits: 213,
    deposits: 170,
    debitsFormats: "$213.00",
    depositsFormat: "$170.00",
  },
  {
    date: "2024-05-27",
    debits: 420,
    deposits: 460,
    debitsFormats: "$420.00",
    depositsFormat: "$460.00",
  },
  {
    date: "2024-05-28",
    debits: 233,
    deposits: 190,
    debitsFormats: "$233.00",
    depositsFormat: "$190.00",
  },
  {
    date: "2024-05-29",
    debits: 78,
    deposits: 130,
    debitsFormats: "$78.00",
    depositsFormat: "$130.00",
  },
  {
    date: "2024-05-30",
    debits: 340,
    deposits: 280,
    debitsFormats: "$340.00",
    depositsFormat: "$280.00",
  },
  {
    date: "2024-05-31",
    debits: 178,
    deposits: 230,
    debitsFormats: "$178.00",
    depositsFormat: "$230.00",
  },
  {
    date: "2024-06-01",
    debits: 178,
    deposits: 200,
    debitsFormats: "$178.00",
    depositsFormat: "$200.00",
  },
  {
    date: "2024-06-02",
    debits: 470,
    deposits: 410,
    debitsFormats: "$470.00",
    depositsFormat: "$410.00",
  },
  {
    date: "2024-06-03",
    debits: 103,
    deposits: 160,
    debitsFormats: "$103.00",
    depositsFormat: "$160.00",
  },
  {
    date: "2024-06-04",
    debits: 439,
    deposits: 380,
    debitsFormats: "$439.00",
    depositsFormat: "$380.00",
  },
  {
    date: "2024-06-05",
    debits: 88,
    deposits: 140,
    debitsFormats: "$88.00",
    depositsFormat: "$140.00",
  },
  {
    date: "2024-06-06",
    debits: 294,
    deposits: 250,
    debitsFormats: "$294.00",
    depositsFormat: "$250.00",
  },
  {
    date: "2024-06-07",
    debits: 323,
    deposits: 370,
    debitsFormats: "$323.00",
    depositsFormat: "$370.00",
  },
  {
    date: "2024-06-08",
    debits: 385,
    deposits: 320,
    debitsFormats: "$385.00",
    depositsFormat: "$320.00",
  },
  {
    date: "2024-06-09",
    debits: 438,
    deposits: 480,
    debitsFormats: "$438.00",
    depositsFormat: "$480.00",
  },
  {
    date: "2024-06-10",
    debits: 155,
    deposits: 200,
    debitsFormats: "$155.00",
    depositsFormat: "$200.00",
  },
  {
    date: "2024-06-11",
    debits: 92,
    deposits: 150,
    debitsFormats: "$92.00",
    depositsFormat: "$150.00",
  },
  {
    date: "2024-06-12",
    debits: 492,
    deposits: 420,
    debitsFormats: "$492.00",
    depositsFormat: "$420.00",
  },
  {
    date: "2024-06-13",
    debits: 81,
    deposits: 130,
    debitsFormats: "$81.00",
    depositsFormat: "$130.00",
  },
  {
    date: "2024-06-14",
    debits: 426,
    deposits: 380,
    debitsFormats: "$426.00",
    depositsFormat: "$380.00",
  },
  {
    date: "2024-06-15",
    debits: 307,
    deposits: 350,
    debitsFormats: "$307.00",
    depositsFormat: "$350.00",
  },
  {
    date: "2024-06-16",
    debits: 371,
    deposits: 310,
    debitsFormats: "$371.00",
    depositsFormat: "$310.00",
  },
  {
    date: "2024-06-17",
    debits: 475,
    deposits: 520,
    debitsFormats: "$475.00",
    depositsFormat: "$520.00",
  },
  {
    date: "2024-06-18",
    debits: 107,
    deposits: 170,
    debitsFormats: "$107.00",
    depositsFormat: "$170.00",
  },
  {
    date: "2024-06-19",
    debits: 341,
    deposits: 290,
    debitsFormats: "$341.00",
    depositsFormat: "$290.00",
  },
  {
    date: "2024-06-20",
    debits: 408,
    deposits: 450,
    debitsFormats: "$408.00",
    depositsFormat: "$450.00",
  },
  {
    date: "2024-06-21",
    debits: 169,
    deposits: 210,
    debitsFormats: "$169.00",
    depositsFormat: "$210.00",
  },
  {
    date: "2024-06-22",
    debits: 317,
    deposits: 270,
    debitsFormats: "$317.00",
    depositsFormat: "$270.00",
  },
  {
    date: "2024-06-23",
    debits: 480,
    deposits: 530,
    debitsFormats: "$480.00",
    depositsFormat: "$530.00",
  },
  {
    date: "2024-06-24",
    debits: 132,
    deposits: 180,
    debitsFormats: "$132.00",
    depositsFormat: "$180.00",
  },
  {
    date: "2024-06-25",
    debits: 141,
    deposits: 190,
    debitsFormats: "$141.00",
    depositsFormat: "$190.00",
  },
  {
    date: "2024-06-26",
    debits: 434,
    deposits: 380,
    debitsFormats: "$434.00",
    depositsFormat: "$380.00",
  },
  {
    date: "2024-06-27",
    debits: 448,
    deposits: 490,
    debitsFormats: "$448.00",
    depositsFormat: "$490.00",
  },
  {
    date: "2024-06-28",
    debits: 149,
    deposits: 200,
    debitsFormats: "$149.00",
    depositsFormat: "$200.00",
  },
  {
    date: "2024-06-29",
    debits: 103,
    deposits: 160,
    debitsFormats: "$103.00",
    depositsFormat: "$160.00",
  },
  {
    date: "2024-06-30",
    debits: 446,
    deposits: 400,
    debitsFormats: "$446.00",
    depositsFormat: "$400.00",
  },
];

import React from "react";

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
  const [timeRange, setTimeRange] = React.useState("90d");
  const filteredData = data.filter((item) => {
    const date = new Date(item.date);
    const now = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    } else if (timeRange === "180d") {
      daysToSubtract = 180;
    } else if (timeRange === "1y") {
      daysToSubtract = 360;
    } else if (timeRange === "2y") {
      daysToSubtract = 720;
    }
    now.setDate(now.getDate() - daysToSubtract);
    return date >= now;
  });
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
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="2y" className="rounded-lg">
              Last 2 years
            </SelectItem>
            <SelectItem value="1y" className="rounded-lg">
              Last 1 year
            </SelectItem>
            <SelectItem value="180d" className="rounded-lg">
              Last 6 months
            </SelectItem>
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer config={chartConfig} className="max-h-[200px] w-full">
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-debits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-debits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-deposits)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-deposits)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={8}
              minTickGap={32}
              axisLine={false}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <Bar dataKey="debits" fill="var(--color-debits)" />
            <Bar dataKey="deposits" fill="var(--color-deposits)" />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    });
                  }}
                  formatter={(value, name) => (
                    <div className="flex min-w-[130px] items-center text-xs text-muted-foreground">
                      {chartConfig[name as keyof typeof chartConfig]?.label ||
                        name}
                      <div className="ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums text-foreground">
                        {(chartConfig[name as keyof typeof chartConfig]
                          ?.label !== 'date' ||
                          name !== 'date') &&
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
            <Area
              dataKey="deposits"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-deposits)"
              stackId="a"
            />
            <Area
              dataKey="debits"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-debits)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
