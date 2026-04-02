"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { StackMarquee } from "@/components/sections/StackMarquee";
import { NewsPreview } from "@/components/sections/NewsPreview";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // ScrollTrigger scene transitions with pin + scrub
    const sections = document.querySelectorAll(".cinematic-section");

    sections.forEach((section, index) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
        scrub: 1,
        onEnter: () => {
          // Smooth scene transition
          gsap.fromTo(section,
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
          );
        },
        onLeave: () => {
          gsap.to(section, { opacity: 0.8, duration: 0.3 });
        },
        onEnterBack: () => {
          gsap.to(section, { opacity: 1, duration: 0.3 });
        }
      });
    });

    // Mobile fallback - disable pin on small screens
    const handleResize = () => {
      if (window.innerWidth < 768) {
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.pin) {
            st.disable();
          }
        });
      } else {
        ScrollTrigger.getAll().forEach(st => {
          if (st.vars.pin) {
            st.enable();
          }
        });
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className="relative">
      {/* Hero Section - Scene 01 */}
      <div className="cinematic-section">
        <Hero />
      </div>

      {/* About Section - Scene 02 */}
      <div className="cinematic-section">
        <About />
      </div>

      {/* Services Section - Scene 03 */}
      <div className="cinematic-section">
        <Services />
      </div>

      {/* Stack Marquee - Scene 04 */}
      <div className="cinematic-section">
        <StackMarquee />
      </div>

      {/* News Preview - Scene 05 */}
      <div className="cinematic-section">
        <NewsPreview />
      </div>

      {/* CTA Section - Scene 06 */}
      <div className="cinematic-section">
        <CTA />
      </div>

      {/* Footer will be handled by layout */}
    </main>
  );
}