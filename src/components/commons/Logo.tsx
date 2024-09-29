"use client"

import Image from 'next/image';
import React from 'react'
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';

/**
 * The `Logo` function returns a JSX element representing the logo of a website called BeeHaiv.
 * @returns The `Logo` component is being returned, which consists of a link (`<Link>`) containing an
 * image (`<Image>`) and a strong element (`<strong>`) with the text "BeeHaiv".
 */
export default function Logo() {
  const router = useRouter();

  const goHome = () => {
    router.replace("/");
  }

  return (
    <Button variant="link" className="background-transparent border-0 focus:border-0 focus:background-transparent flex items-center w-fit" onClick={goHome}>
      <Image
        className="h-12 w-12 block"
        src="/logo.svg"
        alt="beehaiv logo"
        width={102}
        height={24}
      />
      <strong className="notranslate hidden lg:flex text-xl font-bold w-fit">
        BeeHaiv
      </strong>
    </Button>
  );
}
