"use client";

import { useEffect } from "react";
import { useFadeInOnScroll } from "@/hooks/useScrollTrigger";
import { gsap } from "@/lib/gsap";

export default function HomePage() {
  // Hero section word-by-word reveal animation
  useEffect(() => {
    if (typeof window === "undefined") return;

    const heroTitle = document.querySelector(".hero-title");
    if (!heroTitle) return;

    // Split text into words for animation
    const words = heroTitle.textContent?.split(" ") || [];
    heroTitle.innerHTML = words
      .map((word) => `<span class="word opacity-0">${word}</span>`)
      .join(" ");

    // Animate words with stagger
    gsap.to(".word", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: "power2.out",
      delay: 0.3,
    });

    // Animate other hero elements
    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hero-scroll",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.0, ease: "power2.out" }
    );

    gsap.fromTo(
      ".hero-3d",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  // Fade in animations for other sections
  useFadeInOnScroll(".fade-in");

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="mx-auto max-w-[1920px] px-[56px] md:px-[56px] sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-150px)]">
            {/* Left: Text Content */}
            <div className="lg:max-w-none">
              <p className="hero-subtitle font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1.4px] uppercase mb-6">
                AI Agent Development & Automation
              </p>

              <h1 className="hero-title font-inter font-bold text-[64px] md:text-[104px] leading-[0.9] text-[#f2f2f2] tracking-[-3.12px] mb-8">
                Automate. Elevate. Deliver.
              </h1>

              <p className="hero-scroll font-inter font-normal text-[10px] text-[#2c2c2c] tracking-[1px] absolute bottom-8 left-[56px]">
                ↓ scroll to explore
              </p>
            </div>

            {/* Right: 3D Visual Placeholder */}
            <div className="hero-3d flex items-center justify-center lg:justify-end">
              <div className="relative w-[280px] h-[280px] lg:w-[400px] lg:h-[400px]">
                {/* 3D Ring System - Placeholder for now */}
                <div className="absolute inset-0 border-2 border-[#1a1a1a] rounded-full animate-spin-slow"></div>
                <div className="absolute inset-4 border border-[#2a2a2a] rounded-full animate-spin-reverse-slow"></div>
                <div className="absolute inset-8 border border-[#3a3a3a] rounded-full animate-spin-slow"></div>
                <div className="absolute inset-12 border border-[#4a4a4a] rounded-full animate-spin-reverse-slow"></div>

                {/* Center dot */}
                <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-[#5e6ad2] rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>

                {/* SPLINE annotation */}
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#141414] border border-[#5e6ad2] px-3 py-2 rounded text-[10px] font-inter font-medium text-[#5e6ad2] tracking-[1.5px]">
                    3D: SPLINE
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Placeholder sections for future content */}
      <section className="fade-in py-20 border-t border-[#1a1a1a]">
        <div className="mx-auto max-w-[1920px] px-[56px] md:px-[56px] sm:px-6">
          <div className="text-center">
            <h2 className="font-inter font-bold text-[48px] text-[#f2f2f2] mb-6">
              Coming Soon
            </h2>
            <p className="font-inter font-normal text-[16px] text-[#6a6a6a] max-w-2xl mx-auto">
              追加のセクション（About、Services、News、CTA）は後続のタスクで実装予定です。
              現在は共通レイアウト（Header・Footer）とGSAP ScrollTriggerの基盤が完成しています。
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}