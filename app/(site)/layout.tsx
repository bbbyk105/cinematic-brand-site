"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { initGSAP } from "@/lib/gsap";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomepage = pathname === "/";

  useEffect(() => {
    // GSAP初期化
    initGSAP();
  }, []);

  return (
    <>
      {/* Hide header on homepage since Hero has its own navigation */}
      {!isHomepage && <Header />}
      <main className={!isHomepage ? "pt-[75px]" : ""}>
        {children}
      </main>
      <Footer />
    </>
  );
}