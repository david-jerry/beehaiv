import Hero from '@/components/commons/Hero';
import React from 'react'
import ForFundsHeroContent from './HeroContent';
import Tools from './Tools';

export default function ForFunds() {
  return (
    <>
      <Hero
        image={"/for-business/forFunds.webp"}
        leftContent={<ForFundsHeroContent />}
      />
      <Tools />
    </>
  );
}
