import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(1, "お名前は必須です"),
  email: z.string().min(1, "メールアドレスは必須です").email("正しいメールアドレスを入力してください"),
  company: z.string().optional(),
  message: z.string().min(1, "お問い合わせ内容は必須です"),
  agreeToPrivacy: z.boolean().refine((val) => val === true, "プライバシーポリシーに同意してください"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;