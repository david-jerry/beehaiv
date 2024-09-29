import React from "react";
import {
  Tailwind,
  Head,
  Text,
  Preview,
  Container,
} from "@react-email/components";

interface EmailTemplateProps {
  MessageContent: any;
}
/**
 * The function `EmailTemplate` in TypeScript React renders an email template with a specified
 * `MessageContent` prop using Tailwind CSS styling.
 * @param {EmailTemplateProps}  - The `EmailTemplate` function is a React component that takes in a
 * prop called `MessageContent` of type `EmailTemplateProps`. The component renders a structure using
 * Tailwind CSS where it sets a custom color theme for the brand color and then displays the
 * `MessageContent` within the Tailwind component
 * @returns The `EmailTemplate` function is being returned, which takes in a prop `MessageContent` and
 * renders it within a `Tailwind` component along with some custom styling for the brand color.
 */
export default function EmailTemplate({ MessageContent }: EmailTemplateProps) {
  return (
    <Tailwind
      config={{
        theme: {
          extend: {
            colors: {
              brand: "#e2e2e2",
            },
          },
        },
      }}
    >
      <Head />
      {MessageContent}
    </Tailwind>
  );
}
