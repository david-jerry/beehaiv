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
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useFormStatus } from "react-dom";
import { createBusinessAction } from "@/actions/user-actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  business_name: z.string().min(2).max(255),
  business_id: z.string().min(6).max(25),
  deposit_size: z.string().min(2).max(255),
  tax_id: z.string().min(2).max(50),
  asset_source_description: z.string().min(6).max(255),
  company_industry: z.string().min(2).max(255),
  website: z.string().min(2).max(255),
  description: z.string().min(5).max(255),
  annual_revenue: z.string().min(0),
  number_of_employees: z.string().min(0),
  founding_date: z.string().min(0),
});

export default function BusinessForm() {
  const [pending, startTransition] = React.useTransition();
  const { user, logout } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      business_name: user?.business_profiles[0]
        ? user?.business_profiles[0].business_name
        : "",
      deposit_size: user?.business_profiles[0]
        ? user?.business_profiles[0].deposit_size
        : "",
      tax_id: user?.business_profiles[0]
        ? user?.business_profiles[0].tax_id
        : "",
      asset_source_description: user?.business_profiles[0]
        ? user?.business_profiles[0].asset_source_description
        : "Company Revenue",
      company_industry: user?.business_profiles[0]
        ? user?.business_profiles[0].company_industry
        : "",
      website: user?.business_profiles[0]
        ? user?.business_profiles[0].website
        : "",
      description: user?.business_profiles[0]
        ? user?.business_profiles[0].description
        : "",
    },
  });

  const backRoute = () => {
    router.replace("/accounts/onboarding/business-detail");
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const token = localStorage.getItem("token");
    console.log(token);

    if (!token) {
      router.replace("/accounts/login");
    }
    startTransition(async () => {
      const res = await createBusinessAction(values, token!);
      if (res.data) {
        toast.success("Complete", {
          description: "You have completed your onboarding process",
        });
        router.replace("/dashboard");
      } else if (res.error === "Token is invalid or expired") {
        toast.error("Error", {
          description: res.error,
        });
        await logout()
        router.replace("/accounts/login")
      } else {
        toast.error("Error", {
          description: res.error,
        });
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
          name="business_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Legal Name *</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="text"
                  placeholder="-"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="business_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">Business ID *</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  type="text"
                  placeholder="-"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="deposit_size"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  Anticipated deposit size *
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Deposit Size" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="less than $10,000">
                      less than $10,000
                    </SelectItem>
                    <SelectItem value="less than $50,000">
                      less than $50,000
                    </SelectItem>
                    <SelectItem value="less than $100,000">
                      less than $100,000
                    </SelectItem>
                    <SelectItem value="less than $500,000">
                      less than $500,000
                    </SelectItem>
                    <SelectItem value="more than $500,000">
                      more than $500,000
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tax_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Tax ID / EIN *</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder="-"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="asset_source_description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs">
                Asset Source Description *
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Company Revenue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Company Revenue">
                    Company Revenue
                  </SelectItem>
                  <SelectItem value="Investor Capital (VC funding, LP Funding, etc.)">
                    Investor Capital (VC funding, LP Funding, etc.)
                  </SelectItem>
                  <SelectItem value="Bootstrapped (Self-Funded)">
                    Bootstrapped (Self-Funded)
                  </SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          <FormField
            control={form.control}
            name="company_industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Company Industry</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Industry" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Accounting">Accounting</SelectItem>
                    <SelectItem value="Airlines/Aviation">
                      Airlines/Aviation
                    </SelectItem>
                    <SelectItem value="Alternative Dispute Resolution">
                      Alternative Dispute Resolution
                    </SelectItem>
                    <SelectItem value="Alternative Medicine">
                      Alternative Medicine
                    </SelectItem>
                    <SelectItem value="Animation">Animation</SelectItem>
                    <SelectItem value="Apparel/Fashion">
                      Apparel/Fashion
                    </SelectItem>
                    <SelectItem value="Architecture/Planning">
                      Architecture/Planning
                    </SelectItem>
                    <SelectItem value="Arts/Crafts">Arts/Crafts</SelectItem>
                    <SelectItem value="Automotive">Automotive</SelectItem>
                    <SelectItem value="Aviation/Aerospace">
                      Aviation/Aerospace
                    </SelectItem>
                    <SelectItem value="Banking/Mortgage">
                      Banking/Mortgage
                    </SelectItem>
                    <SelectItem value="Biotechnology/Greentech">
                      Biotechnology/Greentech
                    </SelectItem>
                    <SelectItem value="Broadcast Media">
                      Broadcast Media
                    </SelectItem>
                    <SelectItem value="Building Materials">
                      Building Materials
                    </SelectItem>
                    <SelectItem value="Business Supplies/Equipment">
                      Business Supplies/Equipment
                    </SelectItem>
                    <SelectItem value="Capital Markets/Hedge Fund/Private Equity">
                      Capital Markets/Hedge Fund/Private Equity
                    </SelectItem>
                    <SelectItem value="Chemicals">Chemicals</SelectItem>
                    <SelectItem value="Civic/Social Organization">
                      Civic/Social Organization
                    </SelectItem>
                    <SelectItem value="Civil Engineering">
                      Civil Engineering
                    </SelectItem>
                    <SelectItem value="Commercial Real Estate">
                      Commercial Real Estate
                    </SelectItem>
                    <SelectItem value="Computer Games">
                      Computer Games
                    </SelectItem>
                    <SelectItem value="Computer Hardware">
                      Computer Hardware
                    </SelectItem>
                    <SelectItem value="Computer Networking">
                      Computer Networking
                    </SelectItem>
                    <SelectItem value="Computer Software/Engineering">
                      Computer Software/Engineering
                    </SelectItem>
                    <SelectItem value="Computer/Network Security">
                      Computer/Network Security
                    </SelectItem>
                    <SelectItem value="Construction">Construction</SelectItem>
                    <SelectItem value="Consumer Electronics">
                      Consumer Electronics
                    </SelectItem>
                    <SelectItem value="Consumer Goods">
                      Consumer Goods
                    </SelectItem>
                    <SelectItem value="Consumer Services">
                      Consumer Services
                    </SelectItem>
                    <SelectItem value="Cosmetics">Cosmetics</SelectItem>
                    <SelectItem value="Dairy">Dairy</SelectItem>
                    <SelectItem value="Defense/Space">Defense/Space</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="E-Learning">E-Learning</SelectItem>
                    <SelectItem value="Education Management">
                      Education Management
                    </SelectItem>
                    <SelectItem value="Electrical/Electronic Manufacturing">
                      Electrical/Electronic Manufacturing
                    </SelectItem>
                    <SelectItem value="Entertainment/Movie Production">
                      Entertainment/Movie Production
                    </SelectItem>
                    <SelectItem value="Environmental Services">
                      Environmental Services
                    </SelectItem>
                    <SelectItem value="Events Services">
                      Events Services
                    </SelectItem>
                    <SelectItem value="Executive Office">
                      Executive Office
                    </SelectItem>
                    <SelectItem value="Facilities Services">
                      Facilities Services
                    </SelectItem>
                    <SelectItem value="Farming">Farming</SelectItem>
                    <SelectItem value="Financial Services">
                      Financial Services
                    </SelectItem>
                    <SelectItem value="Fine Art">Fine Art</SelectItem>
                    <SelectItem value="Fishery">Fishery</SelectItem>
                    <SelectItem value="Food Production">
                      Food Production
                    </SelectItem>
                    <SelectItem value="Food/Beverages">
                      Food/Beverages
                    </SelectItem>
                    <SelectItem value="Fundraising">Fundraising</SelectItem>
                    <SelectItem value="Furniture">Furniture</SelectItem>
                    <SelectItem value="Gambling/Casinos">
                      Gambling/Casinos
                    </SelectItem>
                    <SelectItem value="Glass/Ceramics/Concrete">
                      Glass/Ceramics/Concrete
                    </SelectItem>
                    <SelectItem value="Government Administration">
                      Government Administration
                    </SelectItem>
                    <SelectItem value="Government Relations">
                      Government Relations
                    </SelectItem>
                    <SelectItem value="Graphic Design/Web Design">
                      Graphic Design/Web Design
                    </SelectItem>
                    <SelectItem value="Health/Fitness">
                      Health/Fitness
                    </SelectItem>
                    <SelectItem value="Higher Education/Acadamia">
                      Higher Education/Acadamia
                    </SelectItem>
                    <SelectItem value="Hospital/Health Care">
                      Hospital/Health Care
                    </SelectItem>
                    <SelectItem value="Hospitality">Hospitality</SelectItem>
                    <SelectItem value="Human Resources/HR">
                      Human Resources/HR
                    </SelectItem>
                    <SelectItem value="Import/Export">Import/Export</SelectItem>
                    <SelectItem value="Individual/Family Services">
                      Individual/Family Services
                    </SelectItem>
                    <SelectItem value="Industrial Automation">
                      Industrial Automation
                    </SelectItem>
                    <SelectItem value="Information Services">
                      Information Services
                    </SelectItem>
                    <SelectItem value="Information Technology/IT">
                      Information Technology/IT
                    </SelectItem>
                    <SelectItem value="Insurance">Insurance</SelectItem>
                    <SelectItem value="International Affairs">
                      International Affairs
                    </SelectItem>
                    <SelectItem value="International Trade/Development">
                      International Trade/Development
                    </SelectItem>
                    <SelectItem value="Internet">Internet</SelectItem>
                    <SelectItem value="Investment Banking/Venture">
                      Investment Banking/Venture
                    </SelectItem>
                    <SelectItem value="Investment Management/Hedge Fund/Private Equity">
                      Investment Management/Hedge Fund/Private Equity
                    </SelectItem>
                    <SelectItem value="Judiciary">Judiciary</SelectItem>
                    <SelectItem value="Law Enforcement">
                      Law Enforcement
                    </SelectItem>
                    <SelectItem value="Law Practice/Law Firms">
                      Law Practice/Law Firms
                    </SelectItem>
                    <SelectItem value="Legal Services">
                      Legal Services
                    </SelectItem>
                    <SelectItem value="Legislative Office">
                      Legislative Office
                    </SelectItem>
                    <SelectItem value="Leisure/Travel">
                      Leisure/Travel
                    </SelectItem>
                    <SelectItem value="Library">Library</SelectItem>
                    <SelectItem value="Logistics/Procurement">
                      Logistics/Procurement
                    </SelectItem>
                    <SelectItem value="Luxury Goods/Jewelry">
                      Luxury Goods/Jewelry
                    </SelectItem>
                    <SelectItem value="Machinery">Machinery</SelectItem>
                    <SelectItem value="Management Consulting">
                      Management Consulting
                    </SelectItem>
                    <SelectItem value="Maritime">Maritime</SelectItem>
                    <SelectItem value="Market Research">
                      Market Research
                    </SelectItem>
                    <SelectItem value="Marketing/Advertising/Sales">
                      Marketing/Advertising/Sales
                    </SelectItem>
                    <SelectItem value="Mechanical or Industrial Engineering">
                      Mechanical or Industrial Engineering
                    </SelectItem>
                    <SelectItem value="Media Production">
                      Media Production
                    </SelectItem>
                    <SelectItem value="Medical Equipment">
                      Medical Equipment
                    </SelectItem>
                    <SelectItem value="Medical Practice">
                      Medical Practice
                    </SelectItem>
                    <SelectItem value="Mental Health Care">
                      Mental Health Care
                    </SelectItem>
                    <SelectItem value="Military Industry">
                      Military Industry
                    </SelectItem>
                    <SelectItem value="Mining/Metals">Mining/Metals</SelectItem>
                    <SelectItem value="Motion Pictures/Film">
                      Motion Pictures/Film
                    </SelectItem>
                    <SelectItem value="Museums/Institutions">
                      Museums/Institutions
                    </SelectItem>
                    <SelectItem value="Music">Music</SelectItem>
                    <SelectItem value="Nanotechnology">
                      Nanotechnology
                    </SelectItem>
                    <SelectItem value="Newspapers/Journalism">
                      Newspapers/Journalism
                    </SelectItem>
                    <SelectItem value="Non-Profit/Volunteering">
                      Non-Profit/Volunteering
                    </SelectItem>
                    <SelectItem value="Oil/Energy/Solar/Greentech">
                      Oil/Energy/Solar/Greentech
                    </SelectItem>
                    <SelectItem value="Online Publishing">
                      Online Publishing
                    </SelectItem>
                    <SelectItem value="Other Industry">
                      Other Industry
                    </SelectItem>
                    <SelectItem value="Outsourcing/Offshoring">
                      Outsourcing/Offshoring
                    </SelectItem>
                    <SelectItem value="Package/Freight Delivery">
                      Package/Freight Delivery
                    </SelectItem>
                    <SelectItem value="Packaging/Containers">
                      Packaging/Containers
                    </SelectItem>
                    <SelectItem value="Paper/Forest Products">
                      Paper/Forest Products
                    </SelectItem>
                    <SelectItem value="Performing Arts">
                      Performing Arts
                    </SelectItem>
                    <SelectItem value="Pharmaceuticals">
                      Pharmaceuticals
                    </SelectItem>
                    <SelectItem value="Philanthropy">Philanthropy</SelectItem>
                    <SelectItem value="Photography">Photography</SelectItem>
                    <SelectItem value="Plastics">Plastics</SelectItem>
                    <SelectItem value="Political Organization">
                      Political Organization
                    </SelectItem>
                    <SelectItem value="Primary/Secondary Education">
                      Primary/Secondary Education
                    </SelectItem>
                    <SelectItem value="Printing">Printing</SelectItem>
                    <SelectItem value="Professional Training">
                      Professional Training
                    </SelectItem>
                    <SelectItem value="Program Development">
                      Program Development
                    </SelectItem>
                    <SelectItem value="Public Relations/PR">
                      Public Relations/PR
                    </SelectItem>
                    <SelectItem value="Public Safety">Public Safety</SelectItem>
                    <SelectItem value="Publishing Industry">
                      Publishing Industry
                    </SelectItem>
                    <SelectItem value="Railroad Manufacture">
                      Railroad Manufacture
                    </SelectItem>
                    <SelectItem value="Ranching">Ranching</SelectItem>
                    <SelectItem value="Real Estate/Mortgage">
                      Real Estate/Mortgage
                    </SelectItem>
                    <SelectItem value="Recreational Facilities/Services">
                      Recreational Facilities/Services
                    </SelectItem>
                    <SelectItem value="Religious Institutions">
                      Religious Institutions
                    </SelectItem>
                    <SelectItem value="Renewables/Environment">
                      Renewables/Environment
                    </SelectItem>
                    <SelectItem value="Research Industry">
                      Research Industry
                    </SelectItem>
                    <SelectItem value="Restaurants">Restaurants</SelectItem>
                    <SelectItem value="Retail Industry">
                      Retail Industry
                    </SelectItem>
                    <SelectItem value="Security/Investigations">
                      Security/Investigations
                    </SelectItem>
                    <SelectItem value="Semiconductors">
                      Semiconductors
                    </SelectItem>
                    <SelectItem value="Shipbuilding">Shipbuilding</SelectItem>
                    <SelectItem value="Sporting Goods">
                      Sporting Goods
                    </SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="Staffing/Recruiting">
                      Staffing/Recruiting
                    </SelectItem>
                    <SelectItem value="Supermarkets">Supermarkets</SelectItem>
                    <SelectItem value="Telecommunications">
                      Telecommunications
                    </SelectItem>
                    <SelectItem value="Textiles">Textiles</SelectItem>
                    <SelectItem value="Think Tanks">Think Tanks</SelectItem>
                    <SelectItem value="Tobacco">Tobacco</SelectItem>
                    <SelectItem value="Translation/Localization">
                      Translation/Localization
                    </SelectItem>
                    <SelectItem value="Transportation">
                      Transportation
                    </SelectItem>
                    <SelectItem value="Utilities">Utilities</SelectItem>
                    <SelectItem value="Venture Capital/VC">
                      Venture Capital/VC
                    </SelectItem>
                    <SelectItem value="Veterinary">Veterinary</SelectItem>
                    <SelectItem value="Warehousing">Warehousing</SelectItem>
                    <SelectItem value="Wholesale">Wholesale</SelectItem>
                    <SelectItem value="Wine/Spirits">Wine/Spirits</SelectItem>
                    <SelectItem value="Wireless">Wireless</SelectItem>
                    <SelectItem value="Writing/Editing">
                      Writing/Editing
                    </SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Company Website</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="url"
                    placeholder="eg: https://website.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="annual_revenue"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Annual Revenue</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="tel"
                    placeholder="2,000,000"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="number_of_employees"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Number of Employees</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="tel"
                    placeholder="4"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="founding_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">Date Founded</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="date"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs">
                  How did you hear about us?
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    type="text"
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-col-1 md:grid-cols-3 gap-6">
          <Button
            onClick={backRoute}
            className=""
            variant={"outline"}
            type="button"
            disabled={pending}
          >
            Back
          </Button>
          <Button className="md:col-span-2" type="submit" disabled={pending}>
            {pending ? "Submitting..." : "Complete Onboarding"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
