"use client";

import { useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { initGSAP } from "@/lib/gsap";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // GSAP初期化
    initGSAP();
  }, []);

  return (
    <>
      <Header />
      <main className="pt-[75px]">
        {children}
      </main>
      <Footer />
    </>
  );
}