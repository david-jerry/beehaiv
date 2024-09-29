/* The above code is a TypeScript React component for a website header. It includes functionality for
both desktop and mobile navigation. Here is a breakdown of what the code is doing: */
"use client";
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect } from "react";
import Logo from "../commons/Logo";
import { Button } from "../ui/button";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";

/* The above code is a TypeScript React component for a website header. Here is a summary of what the
code is doing: */
export default function Header() {
  const setOpenSubmenu = useGeneralStore((state: any) => state.setOpenSubmenu);
  const openSubmenu = useGeneralStore((state: any) => state.openSubmenu);
  const resetMenu = useGeneralStore((state: any) => state.resetMenu);
  const setMobileNavOpened = useGeneralStore(
    (state: any) => state.setMobileNavOpened
  );
  const mobileNavOpened = useGeneralStore(
    (state: any) => state.mobileNavOpened
  );
  const content = useGeneralStore((state: any) => state.content);
  const setContent = useGeneralStore((state: any) => state.setContent);

  const [isHidden, setIsHidden] = React.useState(false);
  const [isColored, setIsColored] = React.useState(false);
  const { scrollY } = useScroll();
  const isMounted = useIsMounted()

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > 150) {
      setIsHidden(true);
      setIsColored(true);
    } else {
      setIsHidden(false);
      setIsColored(false);
    }
  });

  const toggleMenu = () => {
    if (mobileNavOpened) {
      resetMenu();
    } else {
      setMobileNavOpened(true);
    }
  };

  const returnFromSubmenuMenu = () => {
    setOpenSubmenu(false);
    setContent(null);
  };

  return (
    <>
      <motion.header
        variants={{
          hidden: {
            background: "#FFFFFF",
          },
          visible: {
            background: "transparent",
          },
        }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.25 }}
        className={`w-screen fixed top-0 left-0 right-0 z-50 ${(mobileNavOpened || isColored) && "border lg:border-0 bg-white"
          }`}
      >
        <div className="container mx-auto flex items-center justify-between py-3.5">
          <div className="flex items-center md:space-x-4 lg:space-x-6">
            {openSubmenu ? (
              <Button
                type="button"
                className="lg:hidden flex items-center space-x-1.5"
                onClick={returnFromSubmenuMenu}
              >
                <FaArrowLeft className="w-4 h-4" />
                <span className="flex w-fit">BACK</span>
              </Button>
            ) : (
              <Logo />
            )}
            <nav className="md:flex items-center md:space-x-5 hidden text-sm">
              <FlyoutLink
                FlyoutContent={ProductsFlyoutContent}
                href="/products"
              >
                Products
              </FlyoutLink>
              <FlyoutLink
                FlyoutContent={SolutionsFlyoutContent}
                href="/solutions"
              >
                Solutions
              </FlyoutLink>
              <FlyoutLink
                FlyoutContent={ResourcesFlyoutContent}
                href="/resources"
              >
                Resources
              </FlyoutLink>
            </nav>
          </div>

          <div>
            <div className="flex items-center space-x-2">
              {isMounted() &&
                <GoogleTranslate />
              }

              <Button
                type="button"
                className="bg-transparent hover:bg-transparent text-foreground shadow-none md:hidden"
                onClick={toggleMenu}
              >
                <MenuButtons opened={mobileNavOpened} />
              </Button>

              <div className="hidden md:block">
                <AccountLinks reset={resetMenu} />
              </div>
            </div>

          </div>
        </div>
      </motion.header>

      <MobileSlideInMenu
        reset={resetMenu}
        opened={mobileNavOpened}
        setContent={setContent}
        setOpenSubmenu={setOpenSubmenu}
      />

      <MobileSlideInSubMenu openSubmenu={openSubmenu}>
        {content}
      </MobileSlideInSubMenu>
    </>
  );
}

// DESKTOP NAVIGATION

// for sign in and register buttons and link
/**
 * The `AccountLinks` component in TypeScript React handles user authentication and displays different
 * links based on the user's login status.
 * @param  - The `AccountLinks` component takes a prop `reset` of type `any`. Within the component, it
 * uses the `useAuth` hook to access the `user`, `logout`, and `getUser` functions related to
 * authentication.
 * @returns The `AccountLinks` component is being returned. It conditionally renders different links
 * based on whether the `user` is null or not. If `user` is null, it displays "Sign In" and "Get
 * Started" links. If `user` is not null, it displays the user's first name or "Dashboard" and a
 * "Logout" button.
 */
const AccountLinks = ({ reset }: { reset: any }) => {
  const { user, logout, getUser } = useAuth();

  useEffect(() => {
    const check = async () => {
      await getUser();
    };

    check()
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 lg:gap-6 text-sm">

      {user === null ? (
        <>
          <FlyoutLink reset={reset} href="/accounts/login">
            Sign In
          </FlyoutLink>
          <FlyoutLink
            reset={reset}
            href={"/accounts/signup"}
            className="hover:scale-95 text-center py-2.5 min-w-[126px] w-full lg:w-fit rounded font-bold bg-foreground duration-300 ease-in-out transition-all  text-background"
          >
            Get Started
          </FlyoutLink>
        </>
      ) : (
        <>
          <FlyoutLink reset={reset} href="/dashboard">
            {user!.first_name || "Dashboard"}
          </FlyoutLink>
          <Button
            onClick={logout}
            className="hover:scale-95 text-center py-2.5 min-w-[126px] w-full lg:w-fit rounded font-bold bg-red-700 duration-300 ease-in-out transition-all text-background"
          >
            Logout
          </Button>
        </>
      )}
    </div>
  );
};

// flyout menu links with flyout content
import { IoCaretUp } from "react-icons/io5";
import { Separator } from "../ui/separator";
const FlyoutLink = ({
  children,
  reset,
  href,
  FlyoutContent,
  className,
}: {
  children: React.ReactNode;
  reset?: any;
  href: string;
  FlyoutContent?: any;
  className?: string;
}) => {
  const [open, setOpen] = React.useState(false);
  const showFlyout = open && FlyoutContent;
  const router = useRouter();

  const navigate = () => {
    if (reset) {
      reset();
    }

    router.replace(href);
  };

  return (
    <>
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className={`relative h-fit w-full text-center lg:w-fit`}
      >
        {/* link info */}
        <Button
          variant={"link"}
          className={`${className
            ? className
            : "group relative whitespace-nowrap hover:bg-transparent"
            }`}
          onClick={navigate}
        >
          {children}
          {/* TODO: underline animation on hover */}
          <span
            className={`absolute -bottom-2 -left-2 -right-2 h-1 origin-center ${!showFlyout ? "scale-x-0" : "scale-x-100"
              } rounded-full bg-yellow-600 transition-transform duration-300 ease-out`}
          />
        </Button>

        {/* TODO: Render Flyout Content Here */}
        {showFlyout && (
          <div className="absolute top-10 -translate-x-1/2 left-1/2 text-left">
            {/* to ensure the hover state stays open */}
            <div className="absolute -top-8 left-1/2 right-0 h-6 w-16 bg-transparent -translate-x-1/2 translate-y-1/2" />
            {/* triangle pointer */}
            <IoCaretUp className="absolute left-1/2 -top-7 text-white h-6 w-6 -translate-x-1/2 translate-y-1/2" />
            <FlyoutContent />
          </div>
        )}
      </div>
    </>
  );
};

// link content
import { PiBankBold } from "react-icons/pi";
import { GiBank } from "react-icons/gi";
import { MdOutlineWallet } from "react-icons/md";
import { MdHomeWork } from "react-icons/md";
import { GiWorld } from "react-icons/gi";
import { GiTwoCoins } from "react-icons/gi";
const ProductsFlyoutContent = () => {
  const resetMenu = useGeneralStore((state: any) => state.resetMenu);
  const reset = () => {
    resetMenu();
  };

  return (
    <div className="pt-16 md:pt-4 md:absolute md:-left-44 md:top-0 bg-white p-4 md:px-8 overflow-y-auto md:overflow-y-hidden md:shadow-xl min-h-24 h-screen md:h-fit w-full md:max-w-3xl lg:max-w-4xl md:w-screen md:min-w-96 rounded-md overflow-hidden grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2 text-sm font-semibold space-y-2.5">
        <span className="text-sm block">Products</span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            onClick={reset}
            href={"/products/business-checking"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <PiBankBold className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">Business Checking</span>
              <p className="text-xs font-normal">
                Access up to 5.02%** Annual Percentage Yield from BeeHaiv's
                partner banks
              </p>
            </div>
          </Link>
          <Link
            onClick={reset}
            href={"/products/business-loans"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <GiBank className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">Business Loans</span>
              <p className="text-xs font-normal">
                Apply for up to $250k in financing without impacting your credit
                score through our lending partners
              </p>
            </div>
          </Link>
          <Link
            onClick={reset}
            href={"/products/cashback-cards"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <MdOutlineWallet className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">Cashback Cards</span>
              <p className="text-xs font-normal">
                Earn up to 2% cashback and create unlimited virtual and physical
                cards with custom spend limits
              </p>
            </div>
          </Link>
          <Link
            onClick={reset}
            href={"/products/international-payments"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <GiWorld className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">
                International Payments
              </span>
              <p className="text-xs font-normal">
                Send 40+ currencies internationally on you BeeHaiv Dashboard
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="md:col-span-1 text-sm font-semibold space-y-2.5">
        <span className="text-sm block">Financing</span>
        <Link
          onClick={reset}
          href={"/products/founder-mortgage"}
          className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
        >
          <MdHomeWork className="w-6 h-6 flex-none" />
          <div className="flex flex-col">
            <span className="flex text-base w-fit">Founder Mortgage</span>
            <p className="text-xs font-normal">
              Apply for a founder-friendly mortgage from BeeHaiv's network of
              mortgage providers
            </p>
          </div>
        </Link>
        <Link
          onClick={reset}
          href={"/products/sba-loans"}
          className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
        >
          <GiTwoCoins className="w-6 h-6 flex-none" />
          <div className="flex flex-col">
            <span className="flex text-base w-fit">SBA Loans</span>
            <p className="text-xs font-normal">
              Apply for SBA loans from BeeHaiv's SBA loan marketplace
            </p>
          </div>
        </Link>
      </div>
      <div className="md:col-span-3 text-[10px] leading-snug">
        <Separator className="mb-4" />
        BeeHaiv Technologies is a financial technology company, not a bank or
        SBA FDIC-insured depository institution. BeeHaiv is not a lender,
        broker, SBA lender, bank or credit union. Lending services are subject
        to credit approval from BeeHaiv's partners. BeeHaiv Advisory LLC is a
        registered investment adviser. Registration as an investment adviser
        does not imply any level of skill or training.
      </div>
    </div>
  );
};

import { RiBriefcase2Fill } from "react-icons/ri";
import { LiaCoinsSolid } from "react-icons/lia";
import { MdOutlineRocketLaunch } from "react-icons/md";
const SolutionsFlyoutContent = () => {
  const resetMenu = useGeneralStore((state: any) => state.resetMenu);
  const close = () => {
    resetMenu();
  };

  return (
    <div className="font-semibold pt-16  space-y-6 md:pt-4 md:absolute md:-left-[15.5rem] md:top-0 bg-white p-4 md:px-8 overflow-y-auto md:overflow-y-hidden md:shadow-xl min-h-24 h-screen md:h-fit w-full md:max-w-3xl lg:max-w-4xl md:w-screen md:min-w-96 rounded-md overflow-hidden flex flex-col">
      <div className="h-full md:h-fit">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            onClick={close}
            href={"/solutions/for-business"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2 h-fit"
          >
            <RiBriefcase2Fill className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">For Business</span>
              <p className="text-xs font-normal">
                Get business checking account through BeeHaiv's partner banks
                with free wires, ACH and up to 5.02% APY**
              </p>
            </div>
          </Link>
          <Link
            onClick={close}
            href={"/solutions/for-funds"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2 h-fit"
          >
            <LiaCoinsSolid className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">For Funds</span>
              <p className="text-xs font-normal">
                Onboard your funds and management entities all from one log-in
                with BeeHaiv's multi-entity dashboard
              </p>
            </div>
          </Link>
          <Link
            onClick={close}
            href={"/solutions/for-startups"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2 h-fit"
          >
            <MdOutlineRocketLaunch className="w-6 h-6 flex-none" />
            <div className="flex flex-col">
              <span className="flex text-base w-fit">For Startups</span>
              <p className="text-xs font-normal">
                Earn up to 2% cashback and create unlimited virtual and physical
                cards with custom spend limits
              </p>
            </div>
          </Link>
        </div>
      </div>
      <div className="md:col-span-3 text-[10px] leading-snug">
        <Separator className="mb-4" />
        Access exclusive perks with our partners like Puzzle for accounting and
        AngelList for cap table management
      </div>
    </div>
  );
};

import posts from "@/data/Blog.json";
const ResourcesFlyoutContent = () => {
  const resetMenu = useGeneralStore((state: any) => state.resetMenu);
  const filteredPosts = useFilteredPosts(posts, true, 2);
  const close = () => {
    resetMenu();
  };

  return (
    <div className="pt-16 md:pt-4 md:absolute md:-left-80 md:top-0 bg-white p-4 md:px-8 overflow-y-auto md:overflow-y-hidden md:shadow-xl min-h-24 h-screen md:h-fit w-full md:max-w-3xl lg:max-w-4xl md:w-screen md:min-w-96 rounded-md overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 border-b pb-2 md:border-b-0 md:border-r md:pr-1.5">
          <Link
            onClick={close}
            href={"/resources/about"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <span className="flex font-semibold text-base w-fit">About</span>
          </Link>
          <Link
            onClick={close}
            href={"/resources/help-center"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <span className="flex font-semibold text-base w-fit">
              Help Center
            </span>
          </Link>
          <Link
            onClick={close}
            href={"/resources/customer-stories"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <span className="flex font-semibold text-base w-fit">
              Customer Stories
            </span>
          </Link>
          <Link
            onClick={close}
            href={"/resources/blog"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <span className="flex font-semibold text-base w-fit">Blog</span>
          </Link>
          <Link
            onClick={close}
            href={"/resources/faq"}
            className="min-w-60 hover:bg-gray-100 duration-300 p-2 rounded-md flex items-start space-x-2"
          >
            <span className="flex font-semibold text-base w-fit">FAQ</span>
          </Link>
        </div>

        <div className="space-y-3 md:col-span-2">
          <span className="flex uppercase text-sm">featured</span>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {filteredPosts.map((post, index) => (
              <Link
                href={`/resources/blog/${post.slug}`}
                key={index}
                className="flex flex-col w-full space-y-2"
              >
                <Image
                  className="w-full max-h-32 object-cover hover:scale-95 duration-300 ease-in-out"
                  src={post.image}
                  alt={post.title}
                  width={450}
                  height={220}
                />
                <strong className="text-sm">{post.title}</strong>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// MOBILE NAVIGATION

// Menu button toggle
import { RiMenu4Line } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
const MenuButtons = ({ opened }: { opened: boolean }) => {
  return (
    <>
      {!opened ? (
        <RiMenu4Line className="w-6 h-6" />
      ) : (
        <MdOutlineClose className="w-6 h-6" />
      )}
    </>
  );
};

// initial navigation slide in
import { FaChevronRight } from "react-icons/fa6";
import Image from "next/image";
import useGeneralStore from "@/hooks/generalStore";
import { useRouter } from "next/navigation";
import { useFilteredPosts } from "@/hooks/usePosts";
import { useAuth } from "@/context/AuthContext";
import { getPrefLangCookie, GoogleTranslate } from "../commons/GoogleTranslate";
import { useIsMounted } from "usehooks-ts";

const MobileSlideInMenu = ({
  opened,
  reset,
  setContent,
  setOpenSubmenu,
}: {
  opened: boolean;
  reset: any;
  setContent: any;
  setOpenSubmenu: any;
}) => {
  const setSubMenuContent = (content: any) => {
    setOpenSubmenu(true);
    setContent(content);
  };
  return (
    <>
      <aside
        className={`z-10 h-screen flex flex-col fixed top-0 left-0 right-0 origin-right ${!opened ? "scale-x-0" : "scale-x-100 lg:scale-x-0"
          } transition-transform duration-300 ease-out bg-white px-4`}
      >
        {opened && (
          <>
            <div className="h-full py-24 space-y-4">
              <Button
                onClick={() => setSubMenuContent(<ProductsFlyoutContent />)}
                className="w-full bg-transparent shadow-none flex items-center justify-between"
                variant={"secondary"}
                type="button"
              >
                <span className="flex w-fit font-bold text-base">Products</span>
                <FaChevronRight className="w-5 h-5" />
              </Button>

              <Separator />

              <Button
                onClick={() => setSubMenuContent(<SolutionsFlyoutContent />)}
                className="w-full bg-transparent shadow-none flex items-center justify-between"
                variant={"secondary"}
                type="button"
              >
                <span className="flex w-fit font-bold text-base">
                  Solutions
                </span>
                <FaChevronRight className="w-5 h-5" />
              </Button>

              <Separator />

              <Button
                onClick={() => setSubMenuContent(<ResourcesFlyoutContent />)}
                className="w-full bg-transparent shadow-none flex items-center justify-between"
                variant={"secondary"}
                type="button"
              >
                <span className="flex w-fit font-bold text-base">
                  Resources
                </span>
                <FaChevronRight className="w-5 h-5" />
              </Button>
              <Separator />
            </div>

            <div className="border-t w-screen absolute bottom-0 left-0 right-0 p-4">
              <AccountLinks reset={reset} />
            </div>
          </>
        )}
      </aside>
    </>
  );
};

// sub menu slide in depending on the details
const MobileSlideInSubMenu = ({
  openSubmenu,
  children,
}: {
  openSubmenu: boolean;
  children: React.ReactNode;
}) => {
  return (
    <>
      <aside
        className={`z-20 h-screen flex flex-col fixed top-0 left-0 right-0 origin-right ${!openSubmenu ? "scale-x-0" : "scale-x-100 lg:scale-x-0"
          } transition-transform duration-300 ease-out bg-white pt-6`}
      >
        {children}
      </aside>
    </>
  );
};
