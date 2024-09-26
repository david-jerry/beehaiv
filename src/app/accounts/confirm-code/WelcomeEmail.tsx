import {
  Button,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
  Tailwind,
  Link,
} from "@react-email/components";
import * as React from "react";

interface KoalaWelcomeEmailProps {
  userFirstname: string;
}

const baseUrl = process.env.BASE_URL ? `${process.env.BASE_URL}` : "";

export const WelcomeEmail = ({ userFirstname }: KoalaWelcomeEmailProps) => (
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
    <Preview>
      The one financial technology to manage all your business needs.
    </Preview>
    <body style={main}>
      <Container style={container}>
        <Img
          src={`${baseUrl}/logo.svg`}
          width="85"
          height="95"
          alt="Beehaiv's logo"
          style={logo}
        />
        <Text style={paragraph}>Hi {userFirstname},</Text>
        <Text style={paragraph}>
          Welcome to Beehaiv, the one financial technology to manage all your
          business needs.
        </Text>
        <Section className={"py-4"}>
          <Button
            className={
              "bg-foreground rounded-lg p-2 w-full text-background font-semibold"
            }
            href="https://beehaiv.jeremiahedavid.online/accounts/onboarding/basic"
          >
            Get Onboard
          </Button>
        </Section>
        <Text style={paragraph}>
          Best Regards,
          <br />
          The Beehaiv team
        </Text>
        <hr style={hr} />
        <Text className={"py-2 text-[11px]"}>
          This message was produced and distributed by Beehaiv Technology.. All
          rights reserved. This is a test project of{" "}
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

WelcomeEmail.PreviewProps = {
  userFirstname: "Alan",
} as KoalaWelcomeEmailProps;

export default WelcomeEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const logo = {
  margin: "0 auto",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
};

const btnContainer = {
  textAlign: "center" as const,
};

const button = {
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
