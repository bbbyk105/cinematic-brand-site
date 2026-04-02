"use client";

import { useEffect } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface NavigationItem {
  name: string;
  href: string;
}

interface Language {
  name: string;
  href: string;
  active: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavigationItem[];
  languages: Language[];
}

export function MobileMenu({ isOpen, onClose, navigation, languages }: MobileMenuProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (isOpen) {
      // メニューを開くアニメーション
      const tl = gsap.timeline();

      tl.to(".mobile-menu-overlay", {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      })
      .to(".mobile-menu-content", {
        x: 0,
        duration: 0.4,
        ease: "power3.out",
      }, "-=0.2")
      .fromTo(".mobile-menu-item", {
        y: 20,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.3,
        stagger: 0.08,
        ease: "power2.out",
      }, "-=0.2");

      // スクロールを無効にする
      document.body.style.overflow = "hidden";
    } else {
      // メニューを閉じるアニメーション
      const tl = gsap.timeline();

      tl.to(".mobile-menu-item", {
        y: -20,
        opacity: 0,
        duration: 0.2,
        stagger: 0.04,
        ease: "power2.in",
      })
      .to(".mobile-menu-content", {
        x: "100%",
        duration: 0.3,
        ease: "power3.in",
      }, "-=0.1")
      .to(".mobile-menu-overlay", {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      }, "-=0.1");

      // スクロールを有効にする
      document.body.style.overflow = "unset";
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return (
      <div className="mobile-menu-overlay fixed inset-0 z-50 opacity-0 pointer-events-none">
        <div className="mobile-menu-content fixed right-0 top-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-[#2a2a2a] shadow-xl transform translate-x-full">
          <div className="flex flex-col h-full p-6 pt-20">
            <nav className="flex-1 space-y-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="mobile-menu-item block font-inter font-normal text-[18px] text-[#f2f2f2] hover:text-[#5e6ad2] transition-colors duration-200"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Language Switcher */}
            <div className="mobile-menu-item border-t border-[#2a2a2a] pt-6">
              <div className="flex items-center space-x-4">
                {languages.map((lang, index) => (
                  <div key={lang.name} className="flex items-center">
                    <Link
                      href={lang.href}
                      className={`font-inter font-normal text-[16px] hover:text-[#5e6ad2] transition-colors duration-200 ${
                        lang.active ? "text-[#f2f2f2]" : "text-[#6a6a6a]"
                      }`}
                      onClick={onClose}
                    >
                      {lang.name}
                    </Link>
                    {index < languages.length - 1 && (
                      <span className="mx-2 text-[#6a6a6a]">/</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mobile-menu-overlay fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="mobile-menu-content fixed right-0 top-0 h-full w-full max-w-sm bg-[#0a0a0a] border-l border-[#2a2a2a] shadow-xl">
        {/* Close Button */}
        <button
          className="absolute top-6 right-6 font-inter font-normal text-[24px] text-[#f2f2f2] hover:text-[#5e6ad2] transition-colors"
          onClick={onClose}
          aria-label="メニューを閉じる"
        >
          ×
        </button>

        <div className="flex flex-col h-full p-6 pt-20">
          <nav className="flex-1 space-y-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="mobile-menu-item block font-inter font-normal text-[18px] text-[#f2f2f2] hover:text-[#5e6ad2] transition-colors duration-200"
                onClick={onClose}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Language Switcher */}
          <div className="mobile-menu-item border-t border-[#2a2a2a] pt-6">
            <div className="flex items-center space-x-4">
              {languages.map((lang, index) => (
                <div key={lang.name} className="flex items-center">
                  <Link
                    href={lang.href}
                    className={`font-inter font-normal text-[16px] hover:text-[#5e6ad2] transition-colors duration-200 ${
                      lang.active ? "text-[#f2f2f2]" : "text-[#6a6a6a]"
                    }`}
                    onClick={onClose}
                  >
                    {lang.name}
                  </Link>
                  {index < languages.length - 1 && (
                    <span className="mx-2 text-[#6a6a6a]">/</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}