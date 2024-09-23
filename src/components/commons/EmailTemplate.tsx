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
