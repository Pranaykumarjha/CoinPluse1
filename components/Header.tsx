'use client';
import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import GlobalSearch from './GlobalSearch';
const Header = () => {
  const pathName = usePathname();
  return (
    <header>
      <div className="main-container inner">
        <Link href="/">
          <Image src="logo.svg" alt="CoinPulse Logo" width={132} height={40} />
        </Link>
        <nav>
          <Link
            href="/"
            className={cn('nav-link', {
              'is-active': pathName === '/',
              'is-home': true,
            })}
          >
            Home
          </Link>
          <GlobalSearch/>
          <Link
            href="/coins"
            className={cn('nav-link', {
              'is-active': pathName === '/coins',
              'is-home': true,
            })}
          >
            All Coins
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
