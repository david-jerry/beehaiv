/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import {
  getCookiesConsent,
  createCookiesConsent,
} from "@/actions/cookies-action";
import { MdArrowBackIosNew } from "react-icons/md";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";

/* The above code is defining a TypeScript schema using the `zod` library for a form object. The schema
specifies the shape of the form object with the following properties: */
const FormSchema = z.object({
  key: z.string().min(4, "You must provide a key").default("consent"),
  essential: z.boolean().default(true),
  performanceAndFunctionalityCookies: z.boolean().default(false),
  analyticsCookies: z.boolean().default(false),
  advertisingCookies: z.boolean().default(false),
  socialNetworkCookies: z.boolean().default(false),
  unclassifiedCookies: z.boolean().default(false),
});

export default function Cookies() {
  const [showConsent, setShowConsent] = React.useState(false);
  const [consentPreference, setConsentPreference] = React.useState(false);
  const [showCookiePolicy, setShowCookiePolicy] = React.useState(false);
  const [saveChanges, setSaveChanges] = React.useState(false);

  const togglePolicy = () => {
    setConsentPreference(false);
    setShowCookiePolicy((prevState) => !prevState);
  };

  const togglePreference = () => {
    setShowCookiePolicy(false);
    setConsentPreference((prevState) => !prevState);
  };

  const closePolicyOrPreferenceModal = () => {
    setShowCookiePolicy(false);
    setConsentPreference(false);
  };

  const checkConsent = async () => {
    const consentData = await getCookiesConsent("consent");
    if (!consentData.error || consentData.data !== undefined) {
      setShowConsent(false);
    } else {
      setShowConsent(true);
    }
  };

  const acceptConsent = async (
    key: string = "consent",
    essentialCookies: boolean = true,
    performanceAndFunctionalityCookies: boolean = true,
    analyticsCookies: boolean = true,
    advertisingCookies: boolean = true,
    socialNetworkCookies: boolean = true,
    unclassifiedCookies: boolean = true
  ) => {
    const value = {
      essentialCookies,
      performanceAndFunctionalityCookies,
      analyticsCookies,
      advertisingCookies,
      socialNetworkCookies,
      unclassifiedCookies,
    };
    const data = {
      key,
      value: JSON.stringify(value),
    };
    console.log(data);
    const consentData = await createCookiesConsent(data);
    console.log(consentData);

    if (!consentData.error) {
      setShowConsent(false);
    } else {
      setShowConsent(true);
    }
  };

  const declineConsent = async () => {
    const value = {
      essentialCookies: true,
      performanceAndFunctionalityCookies: false,
      analyticsCookies: false,
      advertisingCookies: false,
      socialNetworkCookies: false,
    };
    const data = {
      key: "consent",
      value: JSON.stringify(value),
    };
    console.log(data);
    const consentData = await createCookiesConsent(data);
    console.log(consentData);

    if (!consentData.error) {
      setShowConsent(false);
    } else {
      setShowConsent(true);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      key: "consent",
      essential: true,
    },
  });

  React.useEffect(() => {
    checkConsent();
  }, []);

  return (
    <section
      className={`${!showConsent && "hidden"} ${
        (consentPreference || showCookiePolicy) && "h-screen bg-foreground/30"
      } fixed w-screen z-50 bottom-0 left-0 right-0 p-4 lg:p-8`}
    >
      <div
        className={`duration-300 ease-in-out transition-all max-h-full ${
          showConsent && !showCookiePolicy && !consentPreference
            ? "h-fit"
            : "h-full relative  pt-16"
        } container p-8 rounded-lg flex flex-col md:flex-row space-y-6 lg:space-y-0 lg:space-x-6 bg-white shadow-xl`}
      >
        {showConsent && (showCookiePolicy || consentPreference) && (
          <>
            <button
              onClick={closePolicyOrPreferenceModal}
              className="cursor-pointer p-4 absolute z-30 top-6 lg:left-[calc(32px_+_36px)] hover:scale-95 transition-all duration-300 ease-in-out"
            >
              <MdArrowBackIosNew className="w-6 h-6" />
            </button>
          </>
        )}

        {showConsent && !showCookiePolicy && !consentPreference && (
          <>
            <p className="text-xs font-normal leading-5">
              We use essential cookies to make our site work. With your consent
              we may also use non-essential cookies to improve user experience
              and analyze website traffic. By clicking &quot;Accept&quot;, you
              agree to our website&lsquo;s cookie use as described in our{" "}
              <button
                onClick={togglePolicy}
                className="underline cursor-pointer p-0"
              >
                Cookie Policy.
              </button>{" "}
              You can change your cookie settings at any time by clicking{" "}
              <button
                onClick={togglePreference}
                className="underline cursor-pointer p-0"
              >
                &quot;Preferences&quot;.
              </button>
            </p>
            <div className="flex items-center flex-col md:flex-row flex-grow md:space-x-4 md:px-4">
              <button
                onClick={togglePreference}
                className="order-3 md:order-1 w-full md:max-w-[120px] min-w-[118px] flex-none font-semibold text-xs border-foreground border hover:scale-95 duration-200 ease-in-out hover:shadow rounded py-2 px-4"
              >
                Preferences
              </button>
              <button
                onClick={() => acceptConsent()}
                className="mb-2.5 md:mb-0 order-1 md:order-2 w-full md:max-w-[120px] min-w-[118px] flex-none font-semibold text-xs bg-foreground text-background hover:scale-95 duration-200 ease-in-out hover:shadow border-foreground border rounded py-2 px-4"
              >
                Accept
              </button>
              <button
                onClick={declineConsent}
                className="mb-2.5 md:mb-0 order-2 md:order-3 w-full md:max-w-[120px] min-w-[118px] flex-none font-semibold text-xs bg-foreground text-background hover:scale-95 duration-200 ease-in-out hover:shadow border-foreground border rounded py-2 px-4"
              >
                Decline
              </button>
            </div>
          </>
        )}

        {showConsent &&
          showCookiePolicy &&
          !consentPreference &&
          CookiePolicy()}

        {showConsent &&
          !showCookiePolicy &&
          consentPreference &&
          CookiePreferences({
            togglePolicy,
            togglePreference,
            acceptConsent,
            declineConsent,
            saveChanges,
            setSaveChanges,
            form,
          })}
      </div>
    </section>
  );
}

function CookiePolicy() {
  return (
    <div className="overflow-y-auto h-full w-full container p-4 lg:p-8 rounded-lg flex flex-col space-y-4 scrollbar-thumb-black">
      <h2 className="font-bold text-xl lg:text-2xl uppercase">COOKIE POLICY</h2>
      <strong className="block font-bold text-gray-600 text-xs lg:text-sm pt-4 pb-8">
        Last updated August 26, 2024
      </strong>

      <p className="text-xs lg:text-sm">
        This Cookie Policy explains how BeeHaiv Technologies Inc. ("
        <strong>Company</strong>," "<strong>we</strong>," "<strong>us</strong>,"
        and "<strong>our</strong>") uses cookies and similar technologies to
        recognize you when you visit our website at{" "}
        <Link
          target="_blank"
          className="underline text-yellow-600"
          href="https://beehaiv.com"
        >
          https://beehaiv.com
        </Link>{" "}
        ("
        <strong>Website</strong>"). It explains what these technologies are and
        why we use them, as well as your rights to control our use of them.
      </p>

      <p className="text-xs lg:text-sm">
        In some cases we may use cookies to collect personal information, or
        that becomes personal information if we combine it with other
        information.
      </p>

      <h3 className="text-lg font-bold">What are cookies?</h3>

      <p className="text-xs lg:text-sm">
        Cookies are small data files that are placed on your computer or mobile
        device when you visit a website. Cookies are widely used by website
        owners in order to make their websites work, or to work more
        efficiently, as well as to provide reporting information.
      </p>

      <p className="text-xs lg:text-sm">
        Cookies set by the website owner (in this case, BeeHaiv Technologies
        Inc.) are called "first-party cookies." Cookies set by parties other
        than the website owner are called "third-party cookies." Third-party
        cookies enable third-party features or functionality to be provided on
        or through the website (e.g., advertising, interactive content, and
        analytics). The parties that set these third-party cookies can recognize
        your computer both when it visits the website in question and also when
        it visits certain other websites.
      </p>

      <h3 className="text-lg font-bold">Why do we use cookies?</h3>

      <p className="text-xs lg:text-sm">
        We use first- and third-party cookies for several reasons. Some cookies
        are required for technical reasons in order for our Website to operate,
        and we refer to these as "essential" or "strictly necessary" cookies.
        Other cookies also enable us to track and target the interests of our
        users to enhance the experience on our Online Properties. Third parties
        serve cookies through our Website for advertising, analytics, and other
        purposes. This is described in more detail below.
      </p>

      <h3 className="text-lg font-bold">How can I control cookies?</h3>

      <p className="text-xs lg:text-sm">
        You have the right to decide whether to accept or reject cookies. You
        can exercise your cookie rights by setting your preferences in the
        Cookie Consent Manager. The Cookie Consent Manager allows you to select
        which categories of cookies you accept or reject. Essential cookies
        cannot be rejected as they are strictly necessary to provide you with
        services.
      </p>
      <p className="text-xs lg:text-sm">
        The Cookie Consent Manager can be found in the notification banner and
        on our website. If you choose to reject cookies, you may still use our
        website though your access to some functionality and areas of our
        website may be restricted. You may also set or amend your web browser
        controls to accept or refuse cookies.
      </p>
      <p className="text-xs lg:text-sm">
        The specific types of first- and third-party cookies served through our
        Website and the purposes they perform are described in the table below
        (please note that the specific cookies served may vary depending on the
        specific Online Properties you visit):{" "}
      </p>

      <h3 className="text-lg font-bold">
        How can I control cookies on my browser?
      </h3>

      <p className="text-xs lg:text-sm">
        As the means by which you can refuse cookies through your web browser
        controls vary from browser to browser, you should visit your browser's
        help menu for more information. The following is information about how
        to manage cookies on the most popular browsers:
      </p>
      <ul className="text-sm list-disc list-inside">
        <li className="text-yellow-600">
          <Link href="https://support.google.com/chrome/answer/95647#zippy=%2Callow-or-block-cookies">
            Chrome
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
            Internet Explorer
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop?redirectslug=enable-and-disable-cookies-website-preferences&redirectlocale=en-US">
            Firefox
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="https://support.apple.com/en-ie/guide/safari/sfri11471/mac">
            Safari
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="https://support.microsoft.com/en-us/windows/microsoft-edge-browsing-data-and-privacy-bb8174ba-9d73-dcf2-9b4a-c582b4e640dd">
            Edge
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="https://help.opera.com/en/latest/web-preferences/">
            Opera
          </Link>
        </li>
      </ul>
      <p className="text-xs lg:text-sm">
        In addition, most advertising networks offer you a way to opt out of
        targeted advertising. If you would like to find out more information,
        please visit:
      </p>

      <ul className="text-sm list-disc list-inside">
        <li className="text-yellow-600">
          <Link href="http://www.aboutads.info/choices/">
            Digital Advertising Alliance
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="https://youradchoices.ca/">
            Digital Advertising Alliance of Canada
          </Link>
        </li>
        <li className="text-yellow-600">
          <Link href="http://www.youronlinechoices.com/">
            European Interactive Digital Advertising Alliance
          </Link>
        </li>
      </ul>

      <h3 className="text-lg font-bold">
        What about other tracking technologies, like web beacons?
      </h3>

      <p className="text-xs lg:text-sm">
        Cookies are not the only way to recognize or track visitors to a
        website. We may use other, similar technologies from time to time, like
        web beacons (sometimes called "tracking pixels" or "clear gifs"). These
        are tiny graphics files that contain a unique identifier that enables us
        to recognize when someone has visited our Website or opened an email
        including them. This allows us, for example, to monitor the traffic
        patterns of users from one page within a website to another, to deliver
        or communicate with cookies, to understand whether you have come to the
        website from an online advertisement displayed on a third-party website,
        to improve site performance, and to measure the success of email
        marketing campaigns. In many instances, these technologies are reliant
        on cookies to function properly, and so declining cookies will impair
        their functioning.
      </p>

      <h3 className="text-lg font-bold">
        Do you use Flash cookies or Local Shared Objects?
      </h3>

      <p className="text-xs lg:text-sm">
        Websites may also use so-called "Flash Cookies" (also known as Local
        Shared Objects or "LSOs") to, among other things, collect and store
        information about your use of our services, fraud prevention, and for
        other site operations.
      </p>

      <p className="text-xs lg:text-sm">
        If you do not want Flash Cookies stored on your computer, you can adjust
        the settings of your Flash player to block Flash Cookies storage using
        the tools contained in the Website Storage Settings Panel. You can also
        control Flash Cookies by going to the Global Storage Settings Panel and
        following the instructions (which may include instructions that explain,
        for example, how to delete existing Flash Cookies (referred to
        "information" on the Macromedia site), how to prevent Flash LSOs from
        being placed on your computer without your being asked, and (for Flash
        Player 8 and later) how to block Flash Cookies that are not being
        delivered by the operator of the page you are on at the time).
      </p>

      <p className="text-xs lg:text-sm">
        Please note that setting the Flash Player to restrict or limit
        acceptance of Flash Cookies may reduce or impede the functionality of
        some Flash applications, including, potentially, Flash applications used
        in connection with our services or online content.
      </p>

      <h3 className="text-lg font-bold">Do you serve targeted advertising?</h3>

      <p className="text-xs lg:text-sm">
        Third parties may serve cookies on your computer or mobile device to
        serve advertising through our Website. These companies may use
        information about your visits to this and other websites in order to
        provide relevant advertisements about goods and services that you may be
        interested in. They may also employ technology that is used to measure
        the effectiveness of advertisements. They can accomplish this by using
        cookies or web beacons to collect information about your visits to this
        and other sites in order to provide relevant advertisements about goods
        and services of potential interest to you. The information collected
        through this process does not enable us or them to identify your name,
        contact details, or other details that directly identify you unless you
        choose to provide these.
      </p>

      <h3 className="text-lg font-bold">
        How often will you update this cookie policy?
      </h3>

      <p className="text-xs lg:text-sm">
        We may update this Cookie Policy from time to time in order to reflect,
        for example, changes to the cookies we use or for other operational,
        legal, or regulatory reasons. Please therefore revisit this Cookie
        Policy regularly to stay informed about our use of cookies and related
        technologies. <br />
        <br />
        The date at the top of this Cookie Policy indicates when it was last
        updated.
      </p>
    </div>
  );
}

function CookiePreferences({
  togglePolicy,
  togglePreference,
  acceptConsent,
  declineConsent,
  saveChanges,
  setSaveChanges,
  form,
}: {
  togglePolicy: () => void;
  togglePreference: () => void;
  acceptConsent: (
    key?: string,
    essential?: boolean,
    performanceAndFunctionalityCookies?: boolean,
    analyticsCookies?: boolean,
    advertisingCookies?: boolean,
    socialNetworkCookies?: boolean,
    unclassifiedCookies?: boolean
  ) => Promise<void>;
  declineConsent: () => Promise<void>;
  saveChanges: boolean;
  setSaveChanges: any;
  form: UseFormReturn<
    {
      key: string;
      essential: boolean;
      performanceAndFunctionalityCookies: boolean;
      analyticsCookies: boolean;
      advertisingCookies: boolean;
      socialNetworkCookies: boolean;
      unclassifiedCookies: boolean;
    },
    any,
    undefined
  >;
}) {
  const returnDefault = () => {
    setSaveChanges(false);
  };

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      await acceptConsent(
        data.key,
        data.essential,
        data.performanceAndFunctionalityCookies,
        data.analyticsCookies,
        data.advertisingCookies,
        data.socialNetworkCookies,
        data.unclassifiedCookies
      );
    } catch (error: any) {}
  };

  const [
    performanceAndFunctionalityCookies,
    analyticsCookies,
    advertisingCookies,
    socialNetworkCookies,
    unclassifiedCookies,
  ] = form.watch([
    "performanceAndFunctionalityCookies",
    "analyticsCookies",
    "advertisingCookies",
    "socialNetworkCookies",
    "unclassifiedCookies",
  ]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative h-full w-full max-w-full container p-4 lg:p-8 rounded-lg flex flex-col space-y-2 scrollbar-thumb-black"
      >
        <h2 className=" max-w-3xl mx-auto h-fit font-bold text-base uppercase">
          COOKIE PREFERENCE
        </h2>
        <p className="max-w-3xl mx-auto h-fit text-[11px] lg:text-[12px] py-1.5">
          We use essential cookies to make our site work. With your consent we
          may also use non-essential cookies to improve user experience and
          analyze website traffic. By clicking &quot;Accept&quot;, you agree to
          our website&lsquo;s cookie use as described in our{" "}
          <button
            onClick={togglePolicy}
            className="underline cursor-pointer p-0 font-semibold"
          >
            Cookie Policy.
          </button>{" "}
          You can change your cookie settings at any time by clicking{" "}
          <button
            onClick={togglePreference}
            className="underline cursor-pointer p-0 font-semibold"
          >
            &quot;Preferences&quot;.
          </button>
        </p>

        {/* body */}
        <div className=" max-w-3xl mx-auto w-full h-full overflow-y-auto py-1.5 lg:pt-14 lg:pb-24 space-y-4 pr-4">
          <FormField
            control={form.control}
            name="essential"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Essential Cookies</FormLabel>
                  <FormDescription className='text-[11px] lg:font-xs text-gray-600 leading-normal tracking-normal'>
                    These cookies are necessary to the core functionality of our
                    website and some of its features, such as access to secure
                    areas.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Separator className="my-3" />
          <FormField
            control={form.control}
            name="performanceAndFunctionalityCookies"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel> Performance and Functionality Cookies</FormLabel>
                  <FormDescription className='text-[11px] lg:font-xs text-gray-600 leading-normal tracking-normal'>
                    These cookies are used to enhance the performance and
                    functionality of our websites but are nonessential to their
                    use. However, without these cookies, certain functionality
                    (like videos) may become unavailable.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Separator className="my-3" />
          <FormField
            control={form.control}
            name="analyticsCookies"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Analytics and Customization Cookies</FormLabel>
                  <FormDescription className='text-[11px] lg:font-xs text-gray-600 leading-normal tracking-normal'>
                    These cookies collect information that can help us
                    understand how our websites are being used. This information
                    can also be used to measure effectiveness in our marketing
                    campaigns or to curate a personalized site experience for
                    you.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Separator className="my-3" />
          <FormField
            control={form.control}
            name="advertisingCookies"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Advertising Cookies</FormLabel>
                  <FormDescription className='text-[11px] lg:font-xs text-gray-600 leading-normal tracking-normal'>
                    These cookies are used to make advertising messages more
                    relevant to you. They prevent the same ad from continuously
                    reappearing, ensure that ads are properly displayed for
                    advertisers, and in some cases select advertisements that
                    are based on your interests.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Separator className="my-3" />
          <FormField
            control={form.control}
            name="socialNetworkCookies"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Social Networking Cookies</FormLabel>
                  <FormDescription className='text-[11px] lg:font-xs text-gray-600 leading-normal tracking-normal'>
                    These cookies enable you to share our website's content
                    through third-party social networks and other websites.
                    These cookies may also be used for advertising purposes.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
          <Separator className="my-3" />
          <FormField
            control={form.control}
            name="unclassifiedCookies"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Unclassified Cookies</FormLabel>
                  <FormDescription className='text-[11px] lg:font-xs text-gray-600 leading-normal tracking-normal'>
                    These are cookies that have not yet been categorised. We are
                    in the process of classifying these cookies with the help of
                    their providers.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        {/* preference footer */}
        <footer className=" max-w-3xl mx-auto w-full h-fit lg:p-4 border rounded flex items-center justify-between lg:justify-end gap-4">
          {performanceAndFunctionalityCookies ||
          analyticsCookies ||
          advertisingCookies ||
          socialNetworkCookies ||
          unclassifiedCookies ? (
            <>
              <Button
                type="button"
                onClick={returnDefault}
                className="font-semibold text-sm bg-foreground text-background py-2 px-6 rounded hover:scale-95 duration-200 ease-in-out transition-all"
              >
                Discard Changes
              </Button>
              <Button
                type="submit"
                className="font-semibold text-sm bg-foreground text-background py-2 px-6 rounded hover:scale-95 duration-200 ease-in-out transition-all"
              >
                Save and Exit
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                onClick={declineConsent}
                className="font-semibold text-sm bg-foreground text-background py-2 px-6 rounded hover:scale-95 duration-200 ease-in-out transition-all"
              >
                Decline All
              </Button>
              <Button
                type="button"
                onClick={() => acceptConsent()}
                className="font-semibold text-sm bg-foreground text-background py-2 px-6 rounded hover:scale-95 duration-200 ease-in-out transition-all"
              >
                Accept All
              </Button>
            </>
          )}
        </footer>
      </form>
    </Form>
  );
}
