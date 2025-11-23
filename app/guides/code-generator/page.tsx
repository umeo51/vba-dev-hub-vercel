'use client';
import Header from '@/components/Header';
import { GuideFeedback } from '@/components/GuideFeedback';

export const metadata = {
  title: 'VBAコード自動生成ツールの使い方 - VBA Dev Hub',
  description: 'VBAコード自動生成ツールの詳しい使い方を、スクリーンショット付きで解説します。',
};

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
            <li><a href="#modes" className="text-purple-600 hover:text-purple-800 hover:underline">2. 2つのモード</a></li>
            <li><a href="#basic-usage" className="text-purple-600 hover:text-purple-800 hover:underline">3. 基本的な使い方（単一処理モード）</a></li>
            <li><a href="#multi-process" className="text-purple-600 hover:text-purple-800 hover:underline">4. 複数処理統合モードの使い方</a></li>
            <li><a href="#examples" className="text-purple-600 hover:text-purple-800 hover:underline">5. 実用例</a></li>
            <li><a href="#tips" className="text-purple-600 hover:text-purple-800 hover:underline">6. Tips・よくある質問</a></li>
            <li><a href="#related" className="text-purple-600 hover:text-purple-800 hover:underline">7. 関連リンク</a></li>
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
          <section id="modes">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">2つのモード</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border-2 border-purple-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-purple-700">単一処理モード</h3>
                <p className="text-gray-700 leading-relaxed">
                  1つのテンプレートを選択して、すぐに使える単一のSubプロシージャを生成します。
                  シンプルな処理に最適です。
                </p>
              </div>
              <div className="border-2 border-pink-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3 text-pink-700">複数処理統合モード</h3>
                <p className="text-gray-700 leading-relaxed">
                  複数の処理を組み合わせて、1つの統合されたVBAコードとして生成します。
                  実務でよくある「複数の処理を順番に実行」するシナリオに対応しています。
                </p>
              </div>
            </div>
          </section>

          {/* 基本的な使い方 */}
          <section id="basic-usage">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">基本的な使い方（単一処理モード）</h2>
            
            {/* ステップ1 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">1</span>
                テンプレートを選択
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                左側のカテゴリから目的に合ったカテゴリを選択し、右側のテンプレート一覧から使用したいテンプレートをクリックします。
                17種類のテンプレートが5つのカテゴリに分類されています。
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img 
                  src="/guides/generator-01-overview.webp" 
                  alt="テンプレート選択画面" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 mt-2 text-center">テンプレート選択画面</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-800 mb-2">利用可能なカテゴリ：</p>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                  <li><strong>データ転記・コピー</strong>（4種類）- セル転記、範囲コピー、条件付き転記など</li>
                  <li><strong>データ処理</strong>（4種類）- 重複削除、並び替え、検索、集計など</li>
                  <li><strong>ファイル・シート操作</strong>（3種類）- シート追加、コピー、CSV出力</li>
                  <li><strong>繰り返し処理</strong>（3種類）- 行ループ、シートループ、ファイルループ</li>
                  <li><strong>基本構文</strong>（3種類）- Forループ、If文など</li>
                </ul>
              </div>
            </div>

            {/* ステップ2 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">2</span>
                パラメータを設定
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                テンプレートを選択すると、パラメータ設定画面が表示されます。
                シート名、セル範囲、条件などを入力します。プルダウンで選択できる項目もあります。
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img 
                  src="/guides/generator-02-parameters.webp" 
                  alt="パラメータ設定画面" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 mt-2 text-center">パラメータ設定画面（セル→セル転記の例）</p>
              </div>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-800 font-semibold">⚠️ 注意点</p>
                <ul className="list-disc list-inside mt-2 text-yellow-700 space-y-1 ml-4">
                  <li>シート名は実際のExcelファイルに存在するシート名を入力してください</li>
                  <li>セル範囲は「A1」「B2:D10」のような形式で入力してください</li>
                  <li>デフォルト値が設定されているので、そのまま使用することもできます</li>
                </ul>
              </div>
            </div>

            {/* ステップ3 */}
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
                <span className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-lg">3</span>
                コードを生成
              </h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                「コードを生成」ボタンをクリックすると、入力したパラメータに基づいてVBAコードが自動生成されます。
                生成されたコードは、右上の「コピー」ボタンでワンクリックでコピーできます。
              </p>
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img 
                  src="/guides/generator-03-generated-code.webp" 
                  alt="生成されたコード" 
                  className="w-full rounded-lg shadow-md"
                />
                <p className="text-sm text-gray-600 mt-2 text-center">生成されたVBAコード</p>
              </div>
              <div className="bg-green-50 border-l-4 border-green-500 p-4">
                <p className="text-green-800 font-semibold">✅ 生成されたコードの使い方</p>
                <ol className="list-decimal list-inside mt-2 text-green-700 space-y-1 ml-4">
                  <li>「コピー」ボタンをクリックしてコードをコピー</li>
                  <li>Excelを開き、Alt + F11でVBAエディタを起動</li>
                  <li>挿入 → 標準モジュールを選択</li>
                  <li>コピーしたコードを貼り付け</li>
                  <li>F5キーを押して実行</li>
                </ol>
              </div>
            </div>
          </section>

          {/* 複数処理統合モードの使い方 */}
          <section id="multi-process">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">複数処理統合モードの使い方</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              複数の処理を組み合わせて、1つの統合されたVBAコードを生成できます。
              実務でよくある「データをコピーして、並び替えて、重複を削除する」といった一連の処理を自動化できます。
            </p>
            
            <div className="space-y-6">
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">ステップ1: 複数処理統合モードを選択</h4>
                <p className="text-gray-700">画面上部の「複数処理統合モード」ボタンをクリックします。</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">ステップ2: 処理を追加</h4>
                <p className="text-gray-700">
                  テンプレートを選択し、パラメータを設定して「処理リストに追加」ボタンをクリックします。
                  必要な処理を繰り返し追加していきます。
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">ステップ3: 処理の順序を調整</h4>
                <p className="text-gray-700">
                  処理リストで、↑↓ボタンを使って処理の順序を変更できます。
                  不要な処理はゴミ箱アイコンで削除できます。
                </p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">ステップ4: オプションを設定</h4>
                <p className="text-gray-700">
                  進捗表示やエラーハンドリングのオプションを設定できます。
                </p>
                <ul className="list-disc list-inside mt-2 text-gray-700 space-y-1 ml-4">
                  <li><strong>進捗表示を追加</strong>: 各処理の進捗をステータスバーに表示</li>
                  <li><strong>エラーハンドリングを追加</strong>: エラー発生時の処理を自動追加</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">ステップ5: 統合コードを生成</h4>
                <p className="text-gray-700">
                  「統合コードを生成」ボタンをクリックすると、すべての処理が1つのVBAコードとして生成されます。
                </p>
              </div>
            </div>
          </section>

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
