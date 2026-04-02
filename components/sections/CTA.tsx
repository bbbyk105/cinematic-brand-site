"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function CTA() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Text and button animations on scroll enter
    ScrollTrigger.create({
      trigger: ".cta-section",
      start: "top center",
      onEnter: () => {
        // Headline fade + Y(24)→0 · 0.6s
        gsap.fromTo(
          ".cta-headline",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
        );

        // Button fade + scale(0.96)→1 · delay 0.2s
        gsap.fromTo(
          ".cta-button",
          { opacity: 0, scale: 0.96 },
          { opacity: 1, scale: 1, duration: 0.6, delay: 0.2, ease: "power2.out" }
        );

        // Works link with additional delay
        gsap.fromTo(
          ".cta-works-link",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.4, delay: 0.4, ease: "power2.out" }
        );
      },
    });

    // Hover effect for the main CTA button
    const ctaButton = document.querySelector(".cta-button");
    if (ctaButton) {
      ctaButton.addEventListener("mouseenter", () => {
        gsap.to(ctaButton, {
          scale: 1.02,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      ctaButton.addEventListener("mouseleave", () => {
        gsap.to(ctaButton, {
          scale: 1,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    }

    // Hover effect for works link
    const worksLink = document.querySelector(".cta-works-link");
    if (worksLink) {
      const arrow = worksLink.querySelector(".works-arrow");

      worksLink.addEventListener("mouseenter", () => {
        if (arrow) {
          gsap.to(arrow, {
            x: 4,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });

      worksLink.addEventListener("mouseleave", () => {
        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });
    }
  }, []);

  return (
    <section className="cta-section relative bg-[#0a0a0a] w-full h-[520px] px-20 py-20 overflow-hidden">
      {/* Top border */}
      <div className="absolute left-20 top-0 w-[calc(100%-160px)] h-[1px] bg-[#2a2a2a]" />

      {/* Content Container */}
      <div className="flex flex-col justify-center h-full">
        {/* Main Headline */}
        <div className="cta-headline mb-16">
          <h2 className="font-inter font-bold text-[80px] text-[#f2f2f2] tracking-[-2.4px] leading-[1.1]">
            一緒に、未来を<br />
            自動化しませんか。
          </h2>
        </div>

        {/* CTA Actions */}
        <div className="flex items-center space-x-12">
          {/* Primary CTA Button with Gradient */}
          <button className="cta-button bg-gradient-to-r from-[#0066ff] to-[#8833ff] text-white px-6 py-3 rounded-[6px] font-inter font-medium text-[14px] hover:shadow-lg transition-all duration-200">
            Get in Touch
          </button>

          {/* Works Link */}
          <a
            href="#"
            className="cta-works-link font-inter font-normal text-[14px] text-[#6a6a6a] leading-normal hover:text-[#f2f2f2] transition-colors duration-200"
          >
            実績を見る <span className="works-arrow">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}