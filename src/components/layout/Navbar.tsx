import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            BandayGlam
          </Link>

          {/* Main Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="nav-link">Products</Link>
            <Link href="/design" className="nav-link">Design Lab</Link>
            <Link href="/templates" className="nav-link">Templates</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/design" className="btn-primary">
              Start Designing
            </Link>
          </div>

          {/* Mobile menu button */}
          <button className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
} 