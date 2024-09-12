import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import React from "react";
import posts from "@/data/Blog.json";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Blog - BeeHaiv Finance Tech",
  description:
    "BeeHaiv is a financial technology for businesses with no commitment and zero paper-work.",
};

export default function BlogList() {
  return (
    <>
      <section className="w-screen pt-24 flex flex-col items-center justify-center text-center space-y-6 min-h-[70vh]">
        <div className="container h-full flex flex-col items-center justify-center space-y-8">
          <p className="text-sm font-black uppercase">blog</p>
          <Separator className="w-8 bg-foreground" />
          <h1 className="text-5xl lg:text-7xl font-bold">
            Insights on finance, networks, platform, and much more.
          </h1>
        </div>
      </section>

      <section className="w-screen bg-background py-16">
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post, index) => (
            <article
              key={index}
              className={`${
                index === 0
                  ? "lg:col-span-2 md:row-span-2 lg:row-span-3 flex-col space-y-4"
                  : "space-x-4 flex-row "
              } flex overflow-hidden`}
            >
              <Link
                href={`/resources/blog/${post.slug}`}
                className="h-fit overflow-hidden rounded-md"
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1220}
                  height={900}
                  className="object-cover w-full h-full hover:scale-125 duration-300 ease-in-out transition-all"
                />
              </Link>
              <div className="h-fit flex flex-col space-y-3 flex-none">
                <span className="uppercase text-xs">article</span>
                <Link
                  href={`/resources/blog/${post.slug}`}
                  className="font-bold text-2xl"
                >
                  {post.title}
                </Link>
              </div>
              <p className="h-fit flex-none text-sm">
                {new Date(post.publishedDate).toLocaleDateString("en-US", {
                //   weekday: "long", // "Monday"
                  year: "numeric", // "2024"
                  month: "short", // "Sep"
                  day: "numeric", // "6"
                })}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
