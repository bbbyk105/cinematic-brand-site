"use client";

import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

// ScrollTriggerカスタムフック
export function useScrollTrigger(
  callback: () => void | (() => void),
  dependencies: React.DependencyList = []
) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // コールバック実行（クリーンアップ関数を返す場合もある）
    const cleanup = callback();

    // クリーンアップ関数
    return () => {
      if (typeof cleanup === "function") {
        cleanup();
      }
      // ScrollTriggerインスタンスをクリーンアップ
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger && !document.body.contains(trigger.trigger)) {
          trigger.kill();
        }
      });
    };
  }, dependencies);
}

// 基本的なフェードインアニメーション用フック
export function useFadeInOnScroll(selector: string, options?: gsap.TweenVars) {
  useScrollTrigger(() => {
    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    elements.forEach((element, index) => {
      gsap.fromTo(
        element,
        {
          y: 20,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            end: "bottom 10%",
            toggleActions: "play none none reverse",
          },
          ...options,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  });
}