"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const services = [
  {
    number: "01",
    titleJp: "AIエージェント開発",
    titleEn: "AI Agent Development",
    description: "LLMワークフロー設計・業務自動化エージェントの構築"
  },
  {
    number: "02",
    titleJp: "Web制作",
    titleEn: "Web Design & Development",
    description: "コーポレートサイト・LP・シネマティックブランドサイト"
  },
  {
    number: "03",
    titleJp: "EC構築",
    titleEn: "E-Commerce",
    description: "Shopify・カスタムECサイトの設計・構築・運用"
  },
  {
    number: "04",
    titleJp: "フロントエンド",
    titleEn: "Frontend Development",
    description: "Next.js・React による高品質UI実装"
  },
  {
    number: "05",
    titleJp: "業務自動化",
    titleEn: "Workflow Automation",
    description: "GAS・API連携・Notionを活用した業務フロー自動化"
  }
];

export function Services() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Stagger animation for service cards on scroll enter
    ScrollTrigger.create({
      trigger: ".services-section",
      start: "top center",
      onEnter: () => {
        gsap.fromTo(
          ".service-row",
          { opacity: 0, y: 12 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out"
          }
        );
      },
    });

    // Hover effects
    const serviceRows = document.querySelectorAll(".service-row");
    serviceRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        gsap.to(row, {
          y: -4,
          duration: 0.2,
          ease: "power2.out"
        });
        gsap.to(row.querySelector(".service-border"), {
          backgroundColor: "#5e6ad2",
          duration: 0.2,
          ease: "power2.out"
        });
      });

      row.addEventListener("mouseleave", () => {
        gsap.to(row, {
          y: 0,
          duration: 0.2,
          ease: "power2.out"
        });
        gsap.to(row.querySelector(".service-border"), {
          backgroundColor: "#2a2a2a",
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section className="services-section relative bg-[#0a0a0a] w-full h-[960px] px-20 py-20 overflow-hidden">
      {/* Top border */}
      <div className="absolute left-20 top-0 w-[calc(100%-160px)] h-[1px] bg-[#2a2a2a]" />

      {/* Header */}
      <div className="mb-28">
        <p className="font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1.4px] uppercase mb-7">
          SERVICES
        </p>
        <h2 className="font-inter font-bold text-[52px] text-[#f2f2f2] tracking-[-1px] leading-normal">
          提供サービス
        </h2>
      </div>

      {/* Services List */}
      <div className="space-y-0">
        {services.map((service, index) => (
          <div
            key={service.number}
            className="service-row relative h-28 cursor-pointer"
          >
            {/* Service content */}
            <div className="flex items-center h-full">
              {/* Number */}
              <div className="w-4">
                <p className="font-inter font-bold text-[13px] text-[#6a6a6a] tracking-[0.5px]">
                  {service.number}
                </p>
              </div>

              {/* Title */}
              <div className="ml-12 flex-1">
                <h3 className="font-inter font-semibold text-[28px] text-[#f2f2f2] tracking-[-0.3px] leading-normal mb-1">
                  {service.titleJp}
                </h3>
                <p className="font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.3px]">
                  {service.titleEn}
                </p>
              </div>

              {/* Description */}
              <div className="ml-auto mr-20">
                <p className="font-inter font-normal text-[13px] text-[#6a6a6a] leading-normal">
                  {service.description}
                </p>
              </div>

              {/* Arrow */}
              <div className="ml-8">
                <p className="font-inter font-normal text-[18px] text-[#5e6ad2] leading-normal">
                  →
                </p>
              </div>
            </div>

            {/* Bottom border */}
            <div className="service-border absolute bottom-0 left-0 right-0 h-[1px] bg-[#2a2a2a]" />
          </div>
        ))}
      </div>
    </section>
  );
}