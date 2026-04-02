"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// GSAPプラグイン登録（クライアントサイドでのみ実行）
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // ScrollTrigger設定
  ScrollTrigger.defaults({
    markers: false, // プロダクションでは無効
    scroller: window,
  });
}

// GSAP初期化関数
export function initGSAP() {
  if (typeof window === "undefined") return;

  // ScrollTriggerをリフレッシュ
  ScrollTrigger.refresh();
}

// ScrollTriggerクリーンアップ関数
export function cleanupScrollTrigger() {
  if (typeof window === "undefined") return;

  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  ScrollTrigger.refresh();
}

export { gsap, ScrollTrigger };