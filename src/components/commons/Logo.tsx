import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Logo() {
  return (
    <Link className="flex items-center w-fit" href="/">
      <Image
        className="h-12 w-12 block"
        src="/logo.svg"
        alt="beehaiv logo"
        width={102}
        height={24}
      />
      <strong className="hidden lg:flex text-xl font-bold w-fit">
        BeeHaiv
      </strong>
    </Link>
  );
}
