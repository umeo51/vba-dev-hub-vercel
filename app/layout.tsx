import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VBA Dev Hub - VBA開発をもっと効率的に",
  description: "VBA開発者のための統合支援プラットフォーム。コード生成、スニペット共有、エラー解決、学習まで、すべてがここに揃っています。",
  keywords: "VBA, Excel, マクロ, プログラミング, コード生成, スニペット, エラー辞典, リファレンス, クイズ, UserForm",
  authors: [{ name: "VBA Dev Hub" }],
  openGraph: {
    title: "VBA Dev Hub - VBA開発をもっと効率的に",
    description: "VBA開発者のための統合支援プラットフォーム",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics 4 */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-EZ15SDWKN1"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-EZ15SDWKN1');
            `,
          }}
        />
        
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
