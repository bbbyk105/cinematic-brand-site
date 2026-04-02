"use client";

import { useState } from "react";
import { contactFormSchema, type ContactFormData } from "@/lib/validations";

interface FormErrors {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  agreeToPrivacy?: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    message: "",
    agreeToPrivacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      agreeToPrivacy: e.target.checked
    }));

    // Clear error when user checks the box
    if (errors.agreeToPrivacy) {
      setErrors(prev => ({
        ...prev,
        agreeToPrivacy: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData);

      // Log the payload (as per requirement for initial implementation)
      console.log("Contact form submission:", validatedData);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Set success status
      setSubmitStatus('success');

      // Reset form
      setFormData({
        name: "",
        email: "",
        company: "",
        message: "",
        agreeToPrivacy: false,
      });

    } catch (error) {
      if (error instanceof Error && 'issues' in error) {
        // Zod validation errors
        const validationErrors: FormErrors = {};
        const zodError = error as { issues: Array<{ path: string[]; message: string }> };
        zodError.issues.forEach((issue) => {
          if (issue.path[0]) {
            validationErrors[issue.path[0] as keyof FormErrors] = issue.message;
          }
        });
        setErrors(validationErrors);
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* Desktop Layout: 2-column (left: company info, right: form) */}
      <div className="hidden lg:flex lg:space-x-20">
        {/* Left Column - Company Info */}
        <div className="flex-1">
          <div className="space-y-6">
            <p className="font-inter font-normal text-[10px] text-[#6a6a6a] tracking-[1.4px] uppercase">
              CONTACT
            </p>
            <h1 className="font-inter font-bold text-[64px] text-[#f2f2f2] tracking-[-1.3px] leading-[1.2]">
              お問い合わせ
            </h1>
            <div className="font-inter font-normal text-[16px] text-[#6a6a6a] leading-[1.8] space-y-1">
              <p>ご依頼・ご相談・コラボレーションのご提案など、</p>
              <p>お気軽にお問い合わせください。通常2営業日以内にご返信します。</p>
            </div>
          </div>
        </div>

        {/* Right Column - Form */}
        <div className="flex-1 max-w-[860px]">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
                お名前
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="お名前を入力"
                  className="w-full h-[48px] bg-[#141414] border border-[#2a2a2a] rounded-[4px] px-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                />
                {errors.name && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
                メールアドレス
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="メールアドレスを入力"
                  className="w-full h-[48px] bg-[#141414] border border-[#2a2a2a] rounded-[4px] px-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Company Field */}
            <div className="space-y-2">
              <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
                会社名（任意）
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="会社名（任意）を入力"
                className="w-full h-[48px] bg-[#141414] border border-[#2a2a2a] rounded-[4px] px-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
              />
            </div>

            {/* Message Field */}
            <div className="space-y-2">
              <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
                お問い合わせ内容
              </label>
              <div className="relative">
                <textarea
                  name="message"
                  rows={8}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="メッセージを入力してください"
                  className="w-full bg-[#141414] border border-[#2a2a2a] rounded-[6px] p-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors resize-none"
                />
                {errors.message && (
                  <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>
                )}
              </div>
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="space-y-4">
              <label className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  checked={formData.agreeToPrivacy}
                  onChange={handleCheckboxChange}
                  className="mt-1 h-4 w-4 rounded border-[#2a2a2a] bg-[#141414] text-[#5e6ad2] focus:ring-[#5e6ad2] focus:ring-offset-0"
                />
                <span className="font-inter text-[11px] text-[#6a6a6a]">
                  プライバシーポリシーに同意します
                </span>
              </label>
              {errors.agreeToPrivacy && (
                <p className="text-[11px] text-red-500">{errors.agreeToPrivacy}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-[#0066ff] to-[#8833ff] text-white px-6 py-3 rounded-[6px] font-inter font-medium text-[14px] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送信中..." : "Send Message"}
              </button>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-[6px] text-green-400 text-[13px]">
                お問い合わせありがとうございます。2営業日以内にご返信いたします。
              </div>
            )}
            {submitStatus === 'error' && (
              <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-[6px] text-red-400 text-[13px]">
                送信に失敗しました。しばらく後でもう一度お試しください。
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mobile Layout: Stack (title + form) */}
      <div className="lg:hidden space-y-8">
        {/* Mobile Title */}
        <div className="space-y-4">
          <h1 className="font-inter font-bold text-[40px] text-[#f2f2f2] tracking-[-0.8px] leading-[1.2]">
            お問い合わせ
          </h1>
          <div className="font-inter font-normal text-[14px] text-[#6a6a6a] leading-[1.75] space-y-1">
            <p>ご依頼・ご相談はお気軽にどうぞ。</p>
            <p>通常2営業日以内にご返信します。</p>
          </div>
        </div>

        {/* Mobile Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
              お名前
            </label>
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="お名前を入力"
                className="w-full h-[48px] bg-[#141414] border border-[#2a2a2a] rounded-[4px] px-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
              />
              {errors.name && (
                <p className="mt-1 text-[11px] text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
              メールアドレス
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="メールアドレスを入力"
                className="w-full h-[48px] bg-[#141414] border border-[#2a2a2a] rounded-[4px] px-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
              />
              {errors.email && (
                <p className="mt-1 text-[11px] text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
              会社名（任意）
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              placeholder="会社名（任意）を入力"
              className="w-full h-[48px] bg-[#141414] border border-[#2a2a2a] rounded-[4px] px-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors"
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label className="block font-inter font-normal text-[11px] text-[#6a6a6a] tracking-[0.4px]">
              お問い合わせ内容
            </label>
            <div className="relative">
              <textarea
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="メッセージを入力してください"
                className="w-full bg-[#141414] border border-[#2a2a2a] rounded-[6px] p-4 font-inter text-[13px] text-[#f2f2f2] placeholder-[#4d4d4d] focus:border-[#5e6ad2] focus:outline-none transition-colors resize-none"
              />
              {errors.message && (
                <p className="mt-1 text-[11px] text-red-500">{errors.message}</p>
              )}
            </div>
          </div>

          {/* Privacy Policy Checkbox */}
          <div className="space-y-4">
            <label className="flex items-start space-x-3">
              <input
                type="checkbox"
                checked={formData.agreeToPrivacy}
                onChange={handleCheckboxChange}
                className="mt-1 h-4 w-4 rounded border-[#2a2a2a] bg-[#141414] text-[#5e6ad2] focus:ring-[#5e6ad2] focus:ring-offset-0"
              />
              <span className="font-inter text-[11px] text-[#6a6a6a]">
                プライバシーポリシーに同意します
              </span>
            </label>
            {errors.agreeToPrivacy && (
              <p className="text-[11px] text-red-500">{errors.agreeToPrivacy}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#0066ff] to-[#8833ff] text-white px-6 py-3 rounded-[6px] font-inter font-medium text-[14px] hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "送信中..." : "Send Message"}
            </button>
          </div>

          {/* Success/Error Messages */}
          {submitStatus === 'success' && (
            <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-[6px] text-green-400 text-[13px]">
              お問い合わせありがとうございます。2営業日以内にご返信いたします。
            </div>
          )}
          {submitStatus === 'error' && (
            <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-[6px] text-red-400 text-[13px]">
              送信に失敗しました。しばらく後でもう一度お試しください。
            </div>
          )}
        </form>
      </div>
    </div>
  );
}