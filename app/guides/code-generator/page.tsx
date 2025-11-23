'use client';
import Header from '@/components/Header';


export default function CodeGeneratorGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">VBAコード自動生成ツールの使い方</h1>
        <p className="text-gray-600 mb-8">条件を選択するだけで、実用的なVBAコードを自動生成できるツールです。</p>
        
        {/* 目次 */}
        <nav className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📑 目次</h2>
          <ul className="space-y-2">
            <li><a href="#overview" className="text-purple-600 hover:text-purple-800 hover:underline">1. ツールの概要</a></li>
            
            
            <li><a href="#basic-usage" className="text-purple-600 hover:text-purple-800 hover:underline">2. 基本的な使い方</a></li>
            <li><a href="#examples" className="text-purple-600 hover:text-purple-800 hover:underline">3. 実用例</a></li>
            <li><a href="#tips" className="text-purple-600 hover:text-purple-800 hover:underline">4. Tips・よくある質問</a></li>
            <li><a href="#related" className="text-purple-600 hover:text-purple-800 hover:underline">5. 関連リンク</a></li>
          </ul>
        </nav>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-12">
          
          {/* ツールの概要 */}
          <section id="overview">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">ツールの概要</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              VBAコード自動生成ツールは、VBA開発でよく使用される処理を、プルダウンやテキスト入力で条件を指定するだけで、
              すぐに使えるVBAコードを生成できるツールです。初心者から上級者まで、幅広いユーザーに対応しています。
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-blue-800 font-semibold">💡 こんな方におすすめ</p>
              <ul className="list-disc list-inside mt-2 text-blue-700 space-y-1 ml-4">
                <li>VBAの構文を覚えるのが大変な初心者の方</li>
                <li>定型的なコードを素早く生成したい中級者の方</li>
                <li>チーム教育や標準化に活用したい上級者の方</li>
              </ul>
            </div>
          </section>

          {/* 2つのモード */}
          {/* 基本的な使い方 */}
          {/* 複数処理統合モードの使い方 */}
          {/* 実用例 */}
          <section id="examples">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">実用例</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-blue-800">例1: データ集計レポート作成</h3>
                <p className="text-gray-700 mb-3">複数処理統合モードで以下の処理を組み合わせ：</p>
                <ol className="list-decimal list-inside text-gray-700 space-y-2 ml-4">
                  <li>元データをコピー（Sheet1 → Sheet2）</li>
                  <li>重複削除（Sheet2のA列）</li>
                  <li>データ並び替え（Sheet2のA列、昇順）</li>
                  <li>集計処理（Sheet2のB列、SUM）</li>
                </ol>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-green-800">例2: 条件付きデータ抽出</h3>
                <p className="text-gray-700 mb-3">単一処理モードで条件付き転記を使用：</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>転記元: Sheet1のA列</li>
                  <li>条件: 100より大きい</li>
                  <li>転記先: Sheet2</li>
                </ul>
                <p className="text-gray-700 mt-3">→ 売上が100万円以上のデータのみを抽出</p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-800">例3: 複数シートの一括処理</h3>
                <p className="text-gray-700 mb-3">繰り返し処理で複数シートを処理：</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                  <li>すべてのシートに対して同じ処理を実行</li>
                  <li>特定の条件に合致するシートのみ処理</li>
                  <li>シート名のパターンマッチング</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section id="tips">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tips・よくある質問</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Q: 生成されたコードをカスタマイズできますか？</h4>
                <p className="text-gray-700">
                  A: はい、生成されたコードはそのまま使用できますが、自由にカスタマイズすることもできます。
                  コメントも含まれているので、どの部分を変更すればよいか分かりやすくなっています。
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Q: エラーが発生した場合はどうすればよいですか？</h4>
                <p className="text-gray-700">
                  A: 複数処理統合モードで「エラーハンドリングを追加」オプションを有効にすると、
                  エラー発生時にメッセージボックスでエラー内容が表示されます。
                  シート名やセル範囲が正しいか確認してください。
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Q: 生成されたコードを保存できますか？</h4>
                <p className="text-gray-700">
                  A: 「コピー」ボタンでコードをコピーした後、テキストエディタやVBAエディタに貼り付けて保存してください。
                  よく使うコードは、VBAプロジェクトの標準モジュールに保存しておくと便利です。
                </p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Q: どのExcelバージョンで動作しますか？</h4>
                <p className="text-gray-700">
                  A: 生成されるコードは、Excel 2010以降のすべてのバージョンで動作します。
                  Office 365、Excel 2013、2016、2019、2021でテスト済みです。
                </p>
              </div>
            </div>
          </section>

          {/* 関連リンク */}
          <section id="related" className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">関連リンク</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/tools/generator" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-purple-700 mb-2">→ ツールを使ってみる</h3>
                <p className="text-sm text-gray-600">VBAコード自動生成ツールを実際に使ってみましょう</p>
              </a>
              <a href="/snippets" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-700 mb-2">→ スニペットを探す</h3>
                <p className="text-sm text-gray-600">他のユーザーが投稿したVBAコードを参考にする</p>
              </a>
              <a href="/references" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-green-700 mb-2">→ 逆引きリファレンス</h3>
                <p className="text-sm text-gray-600">やりたいことからVBAコードを検索する</p>
              </a>
              <a href="/faq" className="block p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors">
                <h3 className="font-semibold text-yellow-700 mb-2">→ よくある質問</h3>
                <p className="text-sm text-gray-600">その他の質問はFAQページをご覧ください</p>
              </a>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
