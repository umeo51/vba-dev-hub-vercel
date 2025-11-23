import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

export default function SEO({
  title,
  description = "VBA Dev Hubは、VBA開発者のための統合支援プラットフォームです。コード生成、スニペット共有、エラー解決、学習まで、すべてがここに揃っています。",
  keywords = "VBA, Excel VBA, マクロ, コード生成, スニペット, エラー辞典, プログラミング, 開発ツール",
  ogImage = "/og-image.png",
  ogType = "website",
  canonicalUrl,
}: SEOProps) {
  const siteTitle = "VBA Dev Hub";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const siteUrl = typeof window !== "undefined" ? window.location.origin : "";
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const canonical = canonicalUrl || currentUrl;

  return (
    <Helmet>
      {/* 基本メタタグ */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="VBA Dev Hub" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />

      {/* その他 */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="language" content="Japanese" />
      <meta httpEquiv="content-language" content="ja" />
    </Helmet>
  );
}
