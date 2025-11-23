import { useEffect } from "react";

interface AdSenseProps {
  adSlot: string;
  adFormat?: "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Google AdSense広告コンポーネント
 * 
 * 使用方法:
 * 1. Google AdSenseアカウントを作成
 * 2. サイトを登録して承認を受ける
 * 3. 広告ユニットを作成してadSlotを取得
 * 4. client/index.htmlの<head>にAdSenseスクリプトを追加:
 *    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
 *            crossorigin="anonymous"></script>
 * 5. このコンポーネントを使用して広告を表示
 */
export default function AdSense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
  className,
}: AdSenseProps) {
  useEffect(() => {
    try {
      // AdSenseスクリプトが読み込まれているか確認
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className={className} style={style}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ここに実際のAdSense IDを設定
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

/**
 * 記事内広告用のプリセット
 */
export function InArticleAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="XXXXXXXXXX" // 記事内広告のスロットID
      adFormat="fluid"
      className={className}
    />
  );
}

/**
 * サイドバー広告用のプリセット
 */
export function SidebarAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="XXXXXXXXXX" // サイドバー広告のスロットID
      adFormat="auto"
      className={className}
      style={{ minHeight: "250px" }}
    />
  );
}

/**
 * フッター広告用のプリセット
 */
export function FooterAd({ className }: { className?: string }) {
  return (
    <AdSense
      adSlot="XXXXXXXXXX" // フッター広告のスロットID
      adFormat="horizontal"
      className={className}
      style={{ minHeight: "90px" }}
    />
  );
}
