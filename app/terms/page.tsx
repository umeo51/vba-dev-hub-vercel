import Header from '@/components/Header';

export const metadata = {
  title: '利用規約 - VBA Dev Hub',
  description: 'VBA Dev Hubの利用規約です。',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">利用規約</h1>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-6">
          <section>
            <p className="text-gray-700 leading-relaxed">
              この利用規約（以下、「本規約」）は、VBA Dev Hub（以下、「当サイト」）が提供するサービスの利用条件を定めるものです。ユーザーの皆様には、本規約に従って当サイトをご利用いただきます。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第1条（適用）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約は、ユーザーと当サイトとの間の当サイトの利用に関わる一切の関係に適用されるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第2条（利用登録）</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトの利用にあたり、特別な登録は必要ありません。ただし、一部の機能については、登録が必要となる場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第3条（禁止事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              ユーザーは、当サイトの利用にあたり、以下の行為をしてはなりません。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サイトのサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
              <li>当サイトのサービスの運営を妨害するおそれのある行為</li>
              <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
              <li>他のユーザーに成りすます行為</li>
              <li>当サイトのサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              <li>当サイトの他のユーザーまたは第三者の知的財産権、肖像権、プライバシー、名誉その他の権利または利益を侵害する行為</li>
              <li>その他、当サイトが不適切と判断する行為</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第4条（コンテンツの利用）</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトで提供されるVBAコード、スニペット、ツール等のコンテンツは、個人利用・商用利用を問わず自由にご利用いただけます。ただし、当サイトのコンテンツを利用した結果生じたいかなる損害についても、当サイトは一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第5条（免責事項）</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              当サイトは、以下の事項について一切の責任を負いません。
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>当サイトのコンテンツの正確性、完全性、有用性</li>
              <li>当サイトのサービスの中断、停止、終了、利用不能または変更</li>
              <li>当サイトのコンテンツを利用したことにより発生した損害</li>
              <li>ユーザーの端末環境、ソフトウェア、ハードウェアに起因する問題</li>
              <li>第三者によるサービスの妨害、情報改ざん等によって生じた損害</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第6条（サービス内容の変更等）</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、ユーザーに通知することなく、サービスの内容を変更し、または提供を中止することができるものとします。これによってユーザーに生じた損害について、当サイトは一切の責任を負いません。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第7条（利用規約の変更）</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。変更後の利用規約は、当サイトに掲載した時点で効力を生じるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第8条（個人情報の取扱い）</h2>
            <p className="text-gray-700 leading-relaxed">
              当サイトは、ユーザーの個人情報を適切に取り扱うものとし、詳細は<a href="/privacy" className="text-purple-600 hover:text-purple-700 underline">プライバシーポリシー</a>に定めるものとします。
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">第9条（準拠法・裁判管轄）</h2>
            <p className="text-gray-700 leading-relaxed">
              本規約の解釈にあたっては、日本法を準拠法とします。当サイトに関して紛争が生じた場合には、当サイト運営者の所在地を管轄する裁判所を専属的合意管轄とします。
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
