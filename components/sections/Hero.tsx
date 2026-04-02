"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

// Assets from Figma
const img3DRingR280 = "https://www.figma.com/api/mcp/asset/189bf5c5-3fc6-49ac-80a5-b5040b2e7fe6";
const img3DRingR210 = "https://www.figma.com/api/mcp/asset/c0132367-4927-44e6-bb42-5bb7f9f96206";
const img3DRingR140 = "https://www.figma.com/api/mcp/asset/683aed0a-c0b7-49aa-8ff4-2f4cbfc05027";
const img3DRingR70 = "https://www.figma.com/api/mcp/asset/69619c6f-d9d5-4f28-b14e-0630fd57f8f3";
const img3DLatitude = "https://www.figma.com/api/mcp/asset/587d5180-cbac-42d3-ac1c-a1b6e3b391cc";
const img3DLatitude1 = "https://www.figma.com/api/mcp/asset/348b733a-3f59-40f5-a39f-8db1b4278046";
const img3DLatitude2 = "https://www.figma.com/api/mcp/asset/dbad0a32-9804-4f1f-b8aa-7a5c613c3acb";
const img3DCenter = "https://www.figma.com/api/mcp/asset/098e9110-2565-498b-aca4-01cfe2a90be4";

export function Hero() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Word-by-word reveal animation for main title
    const heroTitle = document.querySelector(".hero-main-title");
    if (heroTitle && heroTitle.textContent) {
      const text = heroTitle.textContent;
      const words = text.split(/(\s+)/); // Keep spaces

      heroTitle.innerHTML = words.map((word, index) => {
        if (word.trim() === '') return word; // Preserve spaces
        return `<span class="hero-word" style="opacity: 0; transform: translateY(20px); display: inline-block;">${word}</span>`;
      }).join('');

      // Animate words with stagger 0.05s
      gsap.to(".hero-word", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power2.out",
        delay: 0.3,
      });
    }

    // Animate subtitle
    gsap.fromTo(
      ".hero-subtitle",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );

    // Animate scroll indicator
    gsap.fromTo(
      ".hero-scroll",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 1.2, ease: "power2.out" }
    );

    // Animate 3D elements
    gsap.fromTo(
      ".hero-3d-container",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  return (
    <section className="relative bg-[#0a0a0a] w-full h-screen overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center px-14 py-7">
        <div className="font-inter font-medium text-[#f2f2f2] text-[16px] tracking-[1.28px]">
          BK
        </div>
        <div className="flex items-center space-x-6">
          <a href="#" className="font-inter font-normal text-[#6a6a6a] text-[12px] tracking-[0.36px] hover:text-[#f2f2f2] transition-colors">
            Services
          </a>
          <a href="#" className="font-inter font-normal text-[#6a6a6a] text-[12px] tracking-[0.36px] hover:text-[#f2f2f2] transition-colors">
            Works
          </a>
          <a href="#" className="font-inter font-normal text-[#6a6a6a] text-[12px] tracking-[0.36px] hover:text-[#f2f2f2] transition-colors">
            News
          </a>
          <a href="#" className="font-inter font-normal text-[#6a6a6a] text-[12px] tracking-[0.36px] hover:text-[#f2f2f2] transition-colors">
            Contact
          </a>
          <a href="#" className="font-inter font-normal text-[#6a6a6a] text-[12px] tracking-[0.36px] hover:text-[#f2f2f2] transition-colors">
            JP / EN
          </a>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="absolute inset-0 flex">
        {/* Left Side - Text Content */}
        <div className="flex-1 flex flex-col justify-center pl-14">
          {/* Subtitle */}
          <p className="hero-subtitle font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1.4px] uppercase mb-6">
            AI AGENT DEVELOPMENT & AUTOMATION
          </p>

          {/* Main Title */}
          <div className="hero-main-title font-inter font-bold text-[104px] leading-[0.9] text-[#f2f2f2] tracking-[-3.12px] mb-8">
            Automate.<br />
            Elevate.<br />
            Deliver.
          </div>
        </div>

        {/* Right Side - 3D Visual */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="hero-3d-container relative">
            {/* 3D Ring System */}
            <div className="relative w-[560px] h-[560px]">
              {/* Ring r280 */}
              <div className="absolute left-0 top-0 w-[560px] h-[560px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DRingR280} />
              </div>

              {/* Ring r210 */}
              <div className="absolute left-[70px] top-[70px] w-[420px] h-[420px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DRingR210} />
              </div>

              {/* Ring r140 */}
              <div className="absolute left-[140px] top-[140px] w-[280px] h-[280px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DRingR140} />
              </div>

              {/* Ring r70 */}
              <div className="absolute left-[210px] top-[210px] w-[140px] h-[140px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DRingR70} />
              </div>

              {/* Latitude lines */}
              <div className="absolute left-0 top-[201.6px] w-[560px] h-[156.8px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DLatitude} />
              </div>
              <div className="absolute left-0 top-[126px] w-[560px] h-[308px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DLatitude1} />
              </div>
              <div className="absolute left-0 top-[42px] w-[560px] h-[476px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DLatitude2} />
              </div>

              {/* Axes */}
              <div className="absolute left-[-20px] top-[280px] w-[600px] h-[1px] bg-[#f2f2f2] opacity-[0.06]" />
              <div className="absolute left-[280px] top-[-20px] w-[1px] h-[600px] bg-[#f2f2f2] opacity-[0.06]" />

              {/* Center point */}
              <div className="absolute left-[277.5px] top-[277.5px] w-[5px] h-[5px]">
                <img alt="" className="absolute block max-w-none w-full h-full" src={img3DCenter} />
              </div>
            </div>

            {/* 3D SPLINE annotation */}
            <div className="absolute top-[580px] left-[240px] bg-[#141414] border border-[#5e6ad2] border-solid px-[10px] py-[5px] rounded-[4px]">
              <p className="font-inter font-medium text-[10px] text-[#5e6ad2] tracking-[1.5px]">
                3D: SPLINE
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll absolute bottom-7 left-14">
        <p className="font-inter font-normal text-[10px] text-[#2c2c2c] tracking-[1px]">
          ↓ scroll to explore
        </p>
      </div>
    </section>
  );
}