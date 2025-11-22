import Header from '@/components/Header';
import Link from 'next/link';
import { MessageCircle, Clock, AlertCircle } from 'lucide-react';

export const metadata = {
  title: 'お問い合わせ - VBA Dev Hub',
  description: 'VBA Dev Hubへのお問い合わせはこちらから。ご質問、ご意見、バグ報告など、お気軽にお問い合わせください。',
};

export default function ContactPage() {
  // TODO: Googleフォームを作成後、以下のURLを実際のGoogleフォーム埋め込みURLに置き換えてください
  // Googleフォームの「送信」→「<>」（埋め込み）タブからiframe URLを取得できます
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true";
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">お問い合わせ</h1>
          <p className="text-gray-600 mb-8">
            VBA Dev Hubに関するご質問、ご意見、ご要望などがございましたら、以下のフォームよりお気軽にお問い合わせください。
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* メインコンテンツ - Googleフォーム */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">お問い合わせフォーム</h2>
                
                {/* Googleフォーム埋め込みエリア */}
                <div className="w-full" style={{ minHeight: '800px' }}>
                  {GOOGLE_FORM_URL.includes('YOUR_FORM_ID') ? (
                    // Googleフォームが未設定の場合の表示
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                      <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        Googleフォームの設定が必要です
                      </h3>
                      <p className="text-gray-600 mb-4">
                        管理者の方へ：<code className="bg-gray-100 px-2 py-1 rounded text-sm">app/contact/page.tsx</code>の
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">GOOGLE_FORM_URL</code>を
                        実際のGoogleフォーム埋め込みURLに置き換えてください。
                      </p>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left max-w-2xl mx-auto">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>設定手順：</strong>
                        </p>
                        <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                          <li>Googleフォームを作成</li>
                          <li>「送信」ボタンをクリック</li>
                          <li>「&lt;&gt;」（埋め込み）タブを選択</li>
                          <li>表示されたiframe内のURLをコピー</li>
                          <li>このファイルの<code className="bg-gray-100 px-1 rounded">GOOGLE_FORM_URL</code>に貼り付け</li>
                        </ol>
                        <p className="text-sm text-gray-600 mt-3">
                          詳細は<code className="bg-gray-100 px-1 rounded">GOOGLE_FORM_SETUP.md</code>をご覧ください。
                        </p>
                      </div>
                    </div>
                  ) : (
                    // Googleフォームが設定済みの場合の表示
                    <iframe
                      src={GOOGLE_FORM_URL}
                      width="100%"
                      height="800"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      className="rounded-lg"
                    >
                      読み込んでいます…
                    </iframe>
                  )}
                </div>
              </div>
            </div>

            {/* サイドバー */}
            <div className="space-y-6">
              {/* よくあるご質問 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-6 h-6 text-purple-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">よくあるご質問</h3>
                </div>
                <ul className="space-y-3 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>コードは商用利用できますか？</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>生成されたコードの著作権は？</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>新しい機能のリクエストは？</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2">•</span>
                    <span>バグを見つけた場合は？</span>
                  </li>
                </ul>
                <Link 
                  href="/faq" 
                  className="inline-block mt-4 text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  FAQページを見る →
                </Link>
              </div>

              {/* 回答について */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-blue-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">回答について</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  お問い合わせいただいた内容は、運営チームが確認し、通常2〜3営業日以内にご返信いたします。
                  お急ぎの場合は、件名に「至急」とご記入ください。
                </p>
              </div>

              {/* 注意事項 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="w-6 h-6 text-orange-600 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-800">注意事項</h3>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">※</span>
                    <span>個別のVBAコード作成依頼には対応しておりません。</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">※</span>
                    <span>技術的なサポートは提供しておりません。</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">※</span>
                    <span>営業・広告に関するお問い合わせはご遠慮ください。</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
