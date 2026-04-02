"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function About() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Parallax effect for photo
    ScrollTrigger.create({
      trigger: ".about-section",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      onUpdate: (self) => {
        const photo = document.querySelector(".about-photo");
        if (photo) {
          gsap.set(photo, { y: -self.progress * 200 });
        }
      },
    });

    // Text reveal animations
    ScrollTrigger.create({
      trigger: ".about-section",
      start: "top center",
      onEnter: () => {
        // Header fade + Y(16)→0
        gsap.fromTo(
          ".about-header",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
        );

        // Body text delay 0.15s after header
        gsap.fromTo(
          ".about-body",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.15, ease: "power2.out" }
        );
      },
    });
  }, []);

  return (
    <section className="about-section relative bg-[#0a0a0a] w-full h-[900px] overflow-hidden">
      {/* Left Side - Photo */}
      <div className="absolute left-0 top-0 w-[760px] h-[900px] bg-[#141414] overflow-hidden">
        {/* Photo placeholder with gradient overlay */}
        <div className="about-photo absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0f1217] to-[#0d0d12]" />

        {/* Photo annotation */}
        <div className="absolute left-6 bottom-[60px] bg-[#0f0f0f] border border-[#2e2e2e] border-solid px-4 py-[10px] rounded-[4px]">
          <p className="font-inter font-medium text-[10px] text-[#808080] leading-normal">
            📷 unsplash: 4hbJ-eymZ1o
          </p>
          <p className="font-inter font-normal text-[10px] text-[#595959] leading-normal">
            Developer workspace · Florian Olivo
          </p>
        </div>
      </div>

      {/* Right Side - Text Content */}
      <div className="absolute left-[880px] top-0 right-0 flex flex-col justify-center px-0 h-full">
        {/* Label */}
        <p className="font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1.4px] uppercase mb-9">
          ABOUT
        </p>

        {/* Main heading */}
        <div className="about-header font-inter font-bold text-[64px] leading-[1.12] text-[#f2f2f2] tracking-[-1.28px] mb-16">
          <p className="mb-0">AIと自動化で、</p>
          <p className="mb-0">開発の常識を</p>
          <p className="mb-0">塗り替える。</p>
        </div>

        {/* Body text */}
        <div className="about-body font-inter font-normal text-[17px] leading-[1.75] text-[#6a6a6a] max-w-[500px]">
          <p className="mb-0">Notion・GitHub・各種APIを連携し、</p>
          <p className="mb-0">タスク管理から実装・運用までを一気通貫で自動化。</p>
          <p className="mb-0">スピード感のある開発と、クオリティを両立させます。</p>
        </div>
      </div>
    </section>
  );
}