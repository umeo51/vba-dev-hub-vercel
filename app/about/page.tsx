import Header from '@/components/Header';

export const metadata = {
  title: '運営者情報 - VBA Dev Hub',
  description: 'VBA Dev Hubの運営者情報です。',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">運営者情報</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">サイト名</h2>
            <p className="text-gray-700">VBA Dev Hub（VBAデブハブ）</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">サイトURL</h2>
            <p className="text-gray-700">
              <a href="https://vba-dev-hub-vercel.vercel.app" className="text-purple-600 hover:text-purple-700 underline">
                https://vba-dev-hub-vercel.vercel.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">運営者</h2>
            <p className="text-gray-700">VBA Dev Hub 運営チーム</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">設立</h2>
            <p className="text-gray-700">2025年11月</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">サイトの目的</h2>
            <p className="text-gray-700 leading-relaxed">
              VBA Dev Hubは、VBA（Visual Basic for Applications）開発者の皆様に、より効率的で快適な開発環境を提供することを目的としています。コード生成ツール、スニペット共有、エラー辞典、学習コンテンツなど、VBA開発に必要なリソースを一箇所に集約し、開発者の生産性向上をサポートします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">提供サービス</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>VBAコード自動生成ツール</li>
              <li>コード整形・正規表現テスター</li>
              <li>VBAスニペット共有プラットフォーム</li>
              <li>エラーコード逆引き辞典</li>
              <li>逆引きリファレンス</li>
              <li>関数・ステートメント解説</li>
              <li>VBAクイズ・練習問題</li>
              <li>UserFormシミュレーター</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">お問い合わせ</h2>
            <p className="text-gray-700">
              サイトに関するお問い合わせは、<a href="/contact" className="text-purple-600 hover:text-purple-700 underline">お問い合わせページ</a>よりご連絡ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">免責事項</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトで提供される情報やツールは、正確性を期すよう努めておりますが、その完全性や正確性を保証するものではありません。当サイトのコンテンツを利用したことにより生じたいかなる損害についても、当サイトは一切の責任を負いません。詳細は<a href="/terms" className="text-purple-600 hover:text-purple-700 underline">利用規約</a>をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">著作権</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトのコンテンツ（テキスト、画像、プログラムコードなど）の著作権は、VBA Dev Hub運営チームまたは各コンテンツ提供者に帰属します。ただし、VBAコードスニペットやツールで生成されたコードについては、利用者が自由に使用できます。
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">最終更新日：2025年11月22日</p>
          </div>
        </div>
      </div>
    </div>
  );
}
