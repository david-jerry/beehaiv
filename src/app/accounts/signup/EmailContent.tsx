import {
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Button,
} from "@react-email/components";

import * as React from "react";

interface AWSVerifyEmailProps {
  verificationCode?: string;
}

const baseUrl = process.env.BASE_URL ? `${process.env.BASE_URL}` : "";

export default function VerifyEmail({ verificationCode }: AWSVerifyEmailProps) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              background: "hsl(var(--background))",
              foreground: "hsl(var(--foreground))",
              card: {
                DEFAULT: "hsl(var(--card))",
                foreground: "hsl(var(--card-foreground))",
              },
              popover: {
                DEFAULT: "hsl(var(--popover))",
                foreground: "hsl(var(--popover-foreground))",
              },
              primary: {
                DEFAULT: "hsl(var(--primary))",
                foreground: "hsl(var(--primary-foreground))",
              },
              secondary: {
                DEFAULT: "hsl(var(--secondary))",
                foreground: "hsl(var(--secondary-foreground))",
              },
              muted: {
                DEFAULT: "hsl(var(--muted))",
                foreground: "hsl(var(--muted-foreground))",
              },
              accent: {
                DEFAULT: "hsl(var(--accent))",
                foreground: "hsl(var(--accent-foreground))",
              },
              destructive: {
                DEFAULT: "hsl(var(--destructive))",
                foreground: "hsl(var(--destructive-foreground))",
              },
              border: "hsl(var(--border))",
              input: "hsl(var(--input))",
              ring: "hsl(var(--ring))",
              chart: {
                "1": "hsl(var(--chart-1))",
                "2": "hsl(var(--chart-2))",
                "3": "hsl(var(--chart-3))",
                "4": "hsl(var(--chart-4))",
                "5": "hsl(var(--chart-5))",
              },
            },
          },
        },
      }}
    >
      <Head />
      <Preview>Beehaiv Email Verification</Preview>
      <body
        className={
          "bg-background text-foreground w-full h-full flex flex-col items-center justify-center"
        }
      >
        <Container
          className={"container bg-gray-100 mx-auto p-4 rounded-lg shadow-lg"}
        >
          <Section className={"w-full"}>
            <Section
              className={
                "w-full p-4 bg-gray-800 text-background flex items-center justify-center"
              }
            >
              <Img
                src={`${baseUrl}/logo.svg`}
                className="w-16"
                width="75"
                height="45"
                alt="Beehaiv's Logo"
              />
            </Section>
            <Section className={"p-4"}>
              <Heading className={"text-xl font-bold"}>
                Verify your email address
              </Heading>
              <Text className={"text-sm font-normal"}>
                Thanks for starting the new Beehaiv account creation process. We
                want to make sure it&apos;s really you. Please enter the following
                verification code when prompted. If you don&apos;t want to
                complete your account creation, you can ignore this message.
              </Text>
              <Section
                className={
                  "w-fit mx-auto p-4 text-center flex flex-col items-center justify-center"
                }
              >
                <Text className={"font-bold text-sm"}>Verification code</Text>

                <Text className={"font-bold text-xl"}>{verificationCode}</Text>
                <Text className={"text-sm font-normal"}>
                  (This code is valid for 15 minutes)
                </Text>
              </Section>
            </Section>
            <hr />
            <Section className={"text-sm"}>
              <Text className={"font-normal"}>
                You can copy click this link also to{" "}
              </Text>
              <Section className="py-4">
                <Button
                  href={`${baseUrl}/accounts/confirm-code?code=${verificationCode}`}
                  target="_blank"
                  className={
                    "text-background bg-foreground rounded-lg p-2 font-semibold w-full"
                  }
                >
                  Complete Verification.
                </Button>
              </Section>
            </Section>
          </Section>
          <hr />
          <Text className={"py-2 text-[11px]"}>
            This message was produced and distributed by Beehaiv Technology..
            All rights reserved. This is a test project of{" "}
            <Link
              href="https://beehaiv.jeremiahedavid.online"
              target="_blank"
              className={"text-blue-600 underline"}
            >
              Beehaiv Technology Inc.
            </Link>
            .
          </Text>
        </Container>
      </body>
    </Tailwind>
  );
}
