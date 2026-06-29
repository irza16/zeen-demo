'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Search, ShoppingBag, X } from 'lucide-react';

const links = [
  { href: '/products?category=All', label: 'New In' },
  { href: '/products', label: 'Drops' },
  { href: '/products?category=Festive', label: 'Collections' },
  { href: '#about', label: 'About' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur-xl">
      <div className="border-b border-border/70 bg-blush/70 px-4 py-2 text-center text-[11px] tracking-[0.2em] text-rose sm:text-xs">
        ✨ New Eid drop every Friday · Free delivery above PKR 5,000 ✨
      </div>

      <nav className="container-page">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="font-display text-2xl italic text-ink sm:text-3xl">
            Aesco.pk
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Search"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-ink transition-transform duration-300 hover:scale-[1.03]"
            >
              <Search className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="focus-ring hidden h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-ink transition-transform duration-300 hover:scale-[1.03] sm:flex"
            >
              <ShoppingBag className="h-4 w-4" />
            </button>
            <Link
              href="/products"
              className="focus-ring hidden rounded-full bg-rose px-5 py-3 text-sm font-medium text-white shadow-[0_12px_28px_rgba(201,133,106,0.28)] transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Shop Now
            </Link>
            <button
              type="button"
              className="focus-ring flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/80 text-ink transition-transform duration-300 hover:scale-[1.03] lg:hidden"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
            >
              {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="border-t border-border pb-5 lg:hidden">
            <div className="flex flex-col gap-3 pt-4">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="rounded-2xl border border-border bg-white/80 px-4 py-3 text-sm font-medium text-ink"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/products"
                className="rounded-full bg-rose px-4 py-3 text-center text-sm font-medium text-white shadow-[0_12px_28px_rgba(201,133,106,0.28)]"
                onClick={() => setIsOpen(false)}
              >
                Shop Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
