/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import React from "react";
import HeroContent from "../home/HeroContent";

export default function Hero({
  image = "/BgHero.jpg",
  leftContent = <HeroContent />,
}: {
  image?: string;
  leftContent?: any;
}) {
  return (
    <section className="w-screen lg:h-screen pt-24 md:pt-40 lg:pt-32 flex flex-col justify-center">
      <div className="lg:h-max gap-4 md:container md:mx-auto w-full md:w-auto grid grid-cols-1 lg:grid-cols-2">
        {leftContent}

        <div className="w-full md:rounded-md overflow-hidden">
          <Image
            priority
            src={image}
            alt="hero"
            width={720}
            height={720}
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
