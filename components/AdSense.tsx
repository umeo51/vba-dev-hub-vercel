'use client';

import { useEffect } from 'react';

interface AdSenseProps {
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
}

export default function AdSense({ 
  adSlot, 
  adFormat = 'auto', 
  fullWidthResponsive = true,
  style = {}
}: AdSenseProps) {
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  return (
    <div style={{ overflow: 'hidden', ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...style }}
        data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // ここに実際のAdSense IDを設定
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}
