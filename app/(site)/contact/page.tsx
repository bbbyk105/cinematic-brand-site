import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "お問い合わせ | BK - AI Agent Development & Automation",
  description: "ご依頼・ご相談・コラボレーションのご提案など、お気軽にお問い合わせください。通常2営業日以内にご返信します。",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="container mx-auto px-6 lg:px-20 py-16 lg:py-24">
        <ContactForm />
      </div>
    </div>
  );
}