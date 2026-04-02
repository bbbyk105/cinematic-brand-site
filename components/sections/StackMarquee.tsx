"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const techStack = [
  "Next.js",
  "TypeScript",
  "Notion API",
  "OpenAI",
  "GSAP",
  "Vercel",
  "Supabase",
  "GitHub Actions",
  "Figma",
  "Blender"
];

export function StackMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !marqueeRef.current) return;

    const marquee = marqueeRef.current;
    const firstSet = marquee.children[0] as HTMLElement;
    const secondSet = marquee.children[1] as HTMLElement;

    if (!firstSet || !secondSet) return;

    // Measure the width of one set
    const setWidth = firstSet.offsetWidth;

    // Set initial positions
    gsap.set([firstSet, secondSet], { x: 0 });

    // Create infinite loop animation (40px/s speed)
    tl.current = gsap.timeline({ repeat: -1 });

    const duration = setWidth / 40; // 40px per second

    tl.current.to([firstSet, secondSet], {
      x: -setWidth,
      duration: duration,
      ease: "none"
    });

    // Set up second set to loop
    tl.current.set([firstSet, secondSet], { x: 0 }, 0);

    // Hover pause functionality
    const handleMouseEnter = () => {
      gsap.to(tl.current, { timeScale: 0.1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(tl.current, { timeScale: 1, duration: 0.3 });
    };

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
      tl.current?.kill();
    };
  }, []);

  const renderTechStack = () => (
    <div className="flex items-center whitespace-nowrap">
      {techStack.map((tech, index) => (
        <div key={index} className="flex items-center">
          <span className="font-inter font-normal text-[14px] text-[#6a6a6a] tracking-[0.28px]">
            {tech}
          </span>
          {index < techStack.length - 1 && (
            <span className="mx-5 font-inter font-normal text-[14px] text-[#2a2a2a]">
              ·
            </span>
          )}
        </div>
      ))}
      {/* Add separator before next loop */}
      <span className="mx-5 font-inter font-normal text-[14px] text-[#2a2a2a]">
        ·
      </span>
    </div>
  );

  return (
    <section className="relative bg-[#0e0e0e] w-full h-40 overflow-hidden">
      {/* Label */}
      <div className="absolute left-20 top-5 z-10">
        <p className="font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1px]">
          TECH STACK — ∞ scroll marquee (GSAP)
        </p>
      </div>

      {/* Marquee Container */}
      <div className="absolute left-0 top-[68px] w-full overflow-hidden">
        <div ref={marqueeRef} className="flex">
          {/* First set */}
          <div className="flex-shrink-0 pl-20">
            {renderTechStack()}
          </div>

          {/* Second set (for seamless loop) */}
          <div className="flex-shrink-0">
            {renderTechStack()}
          </div>
        </div>
      </div>
    </section>
  );
}