"use client";

import { useState } from "react";
import Link from "next/link";
import { MobileMenu } from "./MobileMenu";

const navigation = [
  { name: "Services", href: "/services" },
  { name: "Works", href: "/works" },
  { name: "News", href: "/news" },
  { name: "Contact", href: "/contact" },
];

const languages = [
  { name: "JP", href: "#", active: true },
  { name: "EN", href: "#", active: false },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-[1920px] px-[56px] md:px-[56px] sm:px-6">
          <div className="flex h-[75px] items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-inter font-medium text-[16px] text-[#f2f2f2] tracking-[1.28px] hover:opacity-80 transition-opacity"
            >
              BK
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-24">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="font-inter font-normal text-[12px] text-[#6a6a6a] tracking-[0.36px] hover:text-[#f2f2f2] transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}

              {/* Language Switcher */}
              <div className="flex items-center space-x-1 text-[12px] tracking-[0.36px]">
                {languages.map((lang, index) => (
                  <div key={lang.name} className="flex items-center">
                    <Link
                      href={lang.href}
                      className={`font-inter font-normal hover:text-[#f2f2f2] transition-colors duration-200 ${
                        lang.active ? "text-[#f2f2f2]" : "text-[#6a6a6a]"
                      }`}
                    >
                      {lang.name}
                    </Link>
                    {index < languages.length - 1 && (
                      <span className="mx-1 text-[#6a6a6a]">/</span>
                    )}
                  </div>
                ))}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden font-inter font-normal text-[22px] text-[#f2f2f2] hover:opacity-80 transition-opacity"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="メニューを開く"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navigation={navigation}
        languages={languages}
      />
    </>
  );
}