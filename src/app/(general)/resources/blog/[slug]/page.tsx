"use client";

import React from "react";
import posts from "@/data/Blog.json";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import Link from "next/link";
import { IoChevronBack } from "react-icons/io5";
import { FacebookShare, LinkedinShare, TwitterShare } from "react-share-kit";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { IoCopy } from "react-icons/io5";
import { Button } from "@/components/ui/button";
// import type { Metadata, ResolvingMetadata } from "next";

// type Props = {
//   params: { id: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// export async function generateMetadata(
//   { params, searchParams }: Props,
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   // read route params
//   const id = params.id;

//   // fetch data
//   const product = await fetch(`https://.../${id}`).then((res) => res.json());

//   // optionally access and extend (rather than replace) parent metadata
//   const previousImages = (await parent).openGraph?.images || [];

//   return {
//     title: product.title,
//     openGraph: {
//       images: ["/some-specific-page-image.jpg", ...previousImages],
//     },
//   };
// }

export default function BlogDetail({ params }: { params: { slug: string } }) {
  const slug = params.slug;
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [domain, setDomain] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setDomain(window.location.origin); // e.g., "http://localhost:3000" or "https://yourdomain.com"
    }
  }, []);

  // Find the blog post based on the slug
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    return <div>Loading...</div>;
  }

  const shareUrl = `${domain}/resources/blog/${slug}`;

  return (
    <section className="w-screen py-24 bg-background">
      <div className="container space-y-8">
        <article className="space-y-12">
          <Link
            href={"/resources/blog"}
            className="flex flex-row items-center space-x-2.5 uppercase text-sm hover:space-x-4 duration-300 ease-in-out transition-all"
          >
            <IoChevronBack className="w-4 h-4" />
            <span className="flex">blog</span>
          </Link>
          <div className="flex flex-col space-y-4">
            <h1 className="font-bold text-4xl">{post.title}</h1>
            <div className="flex items-center flex-col text-sm md:flex-row md:justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="flex flex-col space-y-2">
                  <strong className="semibold uppercase">written by</strong>
                  <span>{post.author}</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <strong className="semibold uppercase">published on</strong>
                  <span>
                    {new Date(post.publishedDate).toLocaleDateString("en-US", {
                      //   weekday: "long", // "Monday"
                      year: "numeric", // "2024"
                      month: "short", // "Sep"
                      day: "numeric", // "6"
                    })}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() =>
                    copyToClipboard(`${domain}/resources/blog/${slug}`)
                  }
                  variant={"link"}
                  className="border-0 hover:bg-transparent text-foreground"
                >
                  <IoCopy className="w-6 h-6" />
                  <span className="sr-only">copy ${post.title} link</span>
                </Button>
                <div className="flex flex-row space-x-4">
                  <FacebookShare
                    size={32}
                    round={true}
                    windowWidth={920}
                    className="!w-4 !h-4"
                    url={shareUrl}
                    quote={post.title}
                  />
                  <TwitterShare
                    size={32}
                    round={true}
                    windowWidth={920}
                    className="!w-4 !h-4"
                    url={shareUrl}
                  />
                  <LinkedinShare
                    size={32}
                    round={true}
                    windowWidth={920}
                    className="!w-4 !h-4"
                    url={shareUrl}
                  />
                </div>
              </div>
            </div>
          </div>
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={900}
            className="w-full object-cover"
          />
          <ReactMarkdown
            className="prose max-w-none"
            remarkPlugins={[remarkGfm]}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>
    </section>
  );
}
