import Header from '@/components/Header';

export const metadata = {
  title: 'プライバシーポリシー - VBA Dev Hub',
  description: 'VBA Dev Hubのプライバシーポリシーです。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">プライバシーポリシー</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">1. 個人情報の収集について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイト「VBA Dev Hub」（以下、「当サイト」）では、ユーザーの皆様により良いサービスを提供するため、以下の情報を収集する場合があります。
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>アクセス解析のための情報（IPアドレス、ブラウザ情報、アクセス日時など）</li>
              <li>お問い合わせフォームから送信された情報（メールアドレス、お名前、お問い合わせ内容など）</li>
              <li>Cookie及びこれに類する技術により取得される情報</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">2. 個人情報の利用目的</h2>
            <p className="text-gray-700 leading-relaxed">
              収集した個人情報は、以下の目的で利用いたします。
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>お問い合わせへの対応</li>
              <li>サービスの改善・向上</li>
              <li>アクセス解析によるサイトの利用状況の把握</li>
              <li>不正利用の防止</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">3. 個人情報の第三者提供</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、以下の場合を除き、個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>ユーザーの同意がある場合</li>
              <li>法令に基づく場合</li>
              <li>人の生命、身体または財産の保護のために必要がある場合</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">4. Cookieの使用について</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、ユーザーの利便性向上やアクセス解析のためにCookieを使用しています。Cookieの使用を希望されない場合は、ブラウザの設定でCookieを無効にすることができます。ただし、Cookieを無効にした場合、一部の機能が利用できなくなる可能性があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">5. Google AdSenseについて</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、広告配信のためにGoogle AdSenseを利用しています。Google AdSenseは、Cookieを使用してユーザーの興味に基づいた広告を配信します。Cookieを使用することで、GoogleやGoogleのパートナーは当サイトや他のサイトへのアクセス情報に基づいて広告を配信できます。
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              ユーザーは、<a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">広告設定</a>でパーソナライズ広告を無効にできます。または、<a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">www.aboutads.info</a>にアクセスして、パーソナライズ広告に使われる第三者配信事業者のCookieを無効にできます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">6. アクセス解析ツールについて</h2>
            <h3 className="text-xl font-semibold mb-3 text-gray-800">Google Analytics 4（GA4）の使用</h3>
            <p className="text-gray-700 leading-relaxed">
              当サイトでは、サイトの利用状況を把握し、サービスの改善を行うために、Google LLC（以下「Google」）が提供するアクセス解析ツール「Google Analytics 4」（以下「GA4」）を使用しています。
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              GA4は、Cookieおよび類似の技術を使用して、以下のような情報を収集します：
            </p>
            <ul className="list-disc list-inside mt-3 text-gray-700 space-y-2 ml-4">
              <li>ページビュー数、訪問回数、滞在時間</li>
              <li>使用しているデバイス、ブラウザ、OS</li>
              <li>アクセス元の地域情報（国、都市レベル）</li>
              <li>サイト内での行動（クリック、スクロール、フォーム送信など）</li>
              <li>流入元（検索エンジン、SNS、直接アクセスなど）</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-3">
              これらの情報は、個人を特定するものではなく、統計的なデータとして収集・利用されます。収集されたデータは、Googleのプライバシーポリシーに基づいて管理されます。
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Googleのプライバシーポリシーについては、<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">こちら</a>をご確認ください。
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              GA4によるデータ収集を無効にしたい場合は、<a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700 underline">Google Analytics オプトアウト アドオン</a>をご利用ください。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">7. 個人情報の管理</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、個人情報の漏洩、滅失、毀損を防止するため、適切なセキュリティ対策を実施します。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">8. プライバシーポリシーの変更</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、法令の変更やサービス内容の変更に伴い、プライバシーポリシーを変更することがあります。変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">9. お問い合わせ</h2>
            <p className="text-gray-700 leading-relaxed">
              プライバシーポリシーに関するお問い合わせは、<a href="/contact" className="text-purple-600 hover:text-purple-700 underline">お問い合わせページ</a>よりご連絡ください。
            </p>
          </section>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-gray-600 text-sm">制定日：2025年11月22日</p>
          </div>
        </div>
      </div>
    </div>
  );
}
