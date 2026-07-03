"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu, X, Compass } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { restaurantConfig } from '@/data/menu';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, isClient } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Menu', href: '/menu' },
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/contact' },
    { name: 'Feedback', href: '/feedback' },
    { name: 'Staff', href: '/staff' },
  ];

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href.startsWith('/#')) return pathname === '/' && typeof window !== 'undefined' && window.location.hash === href.substring(1);
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-accent/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-accent shadow-md group-hover:scale-105 transition-all duration-300">
              <Compass className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-primary block leading-none">
                {restaurantConfig.name}
              </span>
              <span className="text-[10px] text-accent font-medium tracking-widest uppercase block mt-0.5">
                Digital Ordering
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`font-sans text-sm font-semibold tracking-wide uppercase transition-colors duration-200 hover:text-accent ${
                  isActive(link.href) ? 'text-accent border-b-2 border-accent pb-1' : 'text-dark-muted'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Cart Icon & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <Link href="/menu" className="relative p-2 text-primary hover:text-accent transition-colors duration-200 group">
              <ShoppingBag className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
              {isClient && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-cream animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-md text-primary hover:text-accent focus:outline-none transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass-panel border-t border-accent/10 animate-fadeInUp">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-md font-sans text-base font-semibold tracking-wide uppercase ${
                  isActive(link.href)
                    ? 'text-accent bg-primary/5'
                    : 'text-dark hover:text-accent hover:bg-primary/5'
                } transition-all duration-200`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
