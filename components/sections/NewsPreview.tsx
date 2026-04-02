"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const newsItems = [
  {
    date: "2026.04.01",
    tag: "RELEASE",
    title: "AIエージェント自動化サービスをリリースしました"
  },
  {
    date: "2026.03.15",
    tag: "BLOG",
    title: "Notion APIとGitHubを連携した開発自動化の仕組み"
  },
  {
    date: "2026.02.28",
    tag: "WORKS",
    title: "シネマティックブランドサイトの制作事例を公開"
  }
];

export function NewsPreview() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Stagger animation for news rows on scroll enter
    ScrollTrigger.create({
      trigger: ".news-section",
      start: "top center",
      onEnter: () => {
        gsap.fromTo(
          ".news-row",
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.06,
            ease: "power2.out"
          }
        );

        // Animate "view all" link with delay
        gsap.fromTo(
          ".news-view-all",
          { opacity: 0, y: 8 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            delay: 0.3,
            ease: "power2.out"
          }
        );
      },
    });

    // Hover effects for news rows
    const newsRows = document.querySelectorAll(".news-row");
    newsRows.forEach((row) => {
      row.addEventListener("mouseenter", () => {
        gsap.to(row.querySelector(".news-arrow"), {
          x: 4,
          duration: 0.2,
          ease: "power2.out"
        });
      });

      row.addEventListener("mouseleave", () => {
        gsap.to(row.querySelector(".news-arrow"), {
          x: 0,
          duration: 0.2,
          ease: "power2.out"
        });
      });
    });
  }, []);

  return (
    <section className="news-section relative bg-[#0a0a0a] w-full h-[800px] px-20 py-20 overflow-hidden">
      {/* Header */}
      <div className="mb-28">
        <p className="font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1.4px] uppercase mb-7">
          NEWS
        </p>
        <h2 className="font-inter font-bold text-[56px] text-[#f2f2f2] tracking-[-1.12px] leading-normal">
          最新情報
        </h2>
      </div>

      {/* News Items */}
      <div className="space-y-4">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="news-row relative h-[72px] cursor-pointer border-b border-[#2a2a2a]"
          >
            <div className="flex items-center h-full">
              {/* Date */}
              <div className="w-16">
                <p className="font-inter font-normal text-[12px] text-[#666] leading-normal">
                  {item.date}
                </p>
              </div>

              {/* Tag */}
              <div className="ml-14">
                <div className="bg-[#2a2a2a] px-2 py-1 rounded-[3px]">
                  <p className="font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[0.6px]">
                    {item.tag}
                  </p>
                </div>
              </div>

              {/* Title */}
              <div className="ml-20 flex-1">
                <p className="font-inter font-normal text-[15px] text-[#f2f2f2] leading-normal">
                  {item.title}
                </p>
              </div>

              {/* Arrow */}
              <div className="ml-8">
                <p className="news-arrow font-inter font-normal text-[14px] text-[#5e6ad2] leading-normal">
                  →
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Link */}
      <div className="news-view-all mt-16">
        <a
          href="#"
          className="font-inter font-normal text-[13px] text-[#5e6ad2] leading-normal hover:underline transition-all duration-200"
        >
          すべての記事を見る →
        </a>
      </div>
    </section>
  );
}