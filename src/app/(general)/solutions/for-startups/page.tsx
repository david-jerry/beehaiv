import Hero from '@/components/commons/Hero';
import React from 'react'
import ForStartupHeroContent from './HeroContent';
import Tools from './Tools';

export default function ForStartups() {
  return (
    <div>
      <Hero
        image={"/for-business/forStartups.webp"}
        leftContent={<ForStartupHeroContent />}
      />
      <Tools />
    </div>
  );
}
