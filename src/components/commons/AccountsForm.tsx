import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AccountsForm({
  title,
  description,
  form,
  footer,
}: {
  title: string;
  description?: any;
  form: any;
  footer: any;
}) {
  return (
    <Card className="md:min-w-md max-w-2xl w-full flex flex-col items-center space-y-4 md:space-y-8">
      <CardHeader className="flex flex-col items-center text-center">
        <CardTitle className="text-2xl md:text-4xl py-2.5">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="w-full">{form}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  );
}
