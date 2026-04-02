import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BK | AI Agent Development & Automation",
  description: "AIと自動化で開発の常識を塗り替える。Notion・GitHub・各種APIを連携し、タスク管理から実装・運用までを一気通貫で自動化。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${inter.variable} h-full dark`}>
      <body className="min-h-full bg-[#0a0a0a] text-[#f2f2f2] font-inter antialiased">{children}</body>
    </html>
  );
}
