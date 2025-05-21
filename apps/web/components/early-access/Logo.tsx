import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "h-12 w-auto" }: LogoProps) {
  return (
    <>
      {/* Version claire (pour le mode sombre) */}
      <Image
        src="/images/logo-blanc-edgemy.png"
        alt="Edgemy"
        width={120}
        height={50}
        className={`${className} hidden dark:block`}
        priority
      />
      {/* Version sombre (pour le mode clair) */}
      <Image
        src="/images/logo-noir-edgemy.png"
        alt="Edgemy"
        width={120}
        height={50}
        className={`${className} block dark:hidden`}
        priority
      />
    </>
  );
}