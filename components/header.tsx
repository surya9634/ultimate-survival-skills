'use client';

import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 w-full z-40 bg-black border-b border-red-600">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-black px-3 py-2 font-black text-lg">USS</div>
            <span className="text-white font-black text-xl whitespace-nowrap">SURVIVAL SERIES</span>
            <span className="text-gray-600 text-sm font-mono ml-4 hidden md:inline">// ULTIMATE_EDITION</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm uppercase font-bold tracking-wide">
            <button
              onClick={() => scrollToSection('registration')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              REGISTER
            </button>
            <button
              onClick={() => scrollToSection('rules')}
              className="text-gray-400 hover:text-white transition-colors"
            >
              RULES
            </button>
          </nav>

          {/* Share Button */}
          <div className="flex items-center gap-4">
            <button className="hidden md:flex border border-gray-600 text-white px-6 py-2 text-sm uppercase font-bold hover:bg-gray-900 transition-colors items-center gap-2">
              <span>🔗</span> SHARE
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-2 pb-4 border-t border-red-600 pt-4">
            <button
              onClick={() => {
                scrollToSection('registration');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded transition-all uppercase font-bold text-sm"
            >
              Register
            </button>
            <button
              onClick={() => {
                scrollToSection('rules');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-900 rounded transition-all uppercase font-bold text-sm"
            >
              Rules
            </button>
          </nav>
        )}


      </div>
    </header>
  );
}
