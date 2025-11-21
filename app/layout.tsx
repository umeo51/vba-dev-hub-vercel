import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VBA Dev Hub - VBA開発をもっと効率的に",
  description: "VBA開発者のための統合支援プラットフォーム。コード生成、スニペット共有、エラー解決、学習まで、すべてがここに揃っています。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
