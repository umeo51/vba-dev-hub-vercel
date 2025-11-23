import Header from "@/components/Header";
import Image from "next/image";

export default function ErrorDictionaryGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">VBAエラーコード逆引き辞典の使い方</h1>
        <p className="text-gray-600 mb-8">エラーコードから原因と解決方法を素早く検索できるツールです。</p>
        
        {/* 目次 */}
        <nav className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">📑 目次</h2>
          <ul className="space-y-2">
            <li><a href="#overview" className="text-red-600 hover:text-red-800 hover:underline">1. ツールの概要</a></li>
            <li><a href="#basic-usage" className="text-red-600 hover:text-red-800 hover:underline">2. 基本的な使い方</a></li>
            <li><a href="#search" className="text-red-600 hover:text-red-800 hover:underline">3. 検索機能の使い方</a></li>
            <li><a href="#category-filter" className="text-red-600 hover:text-red-800 hover:underline">4. カテゴリフィルター</a></li>
            <li><a href="#error-details" className="text-red-600 hover:text-red-800 hover:underline">5. エラー詳細の見方</a></li>
            <li><a href="#tips" className="text-red-600 hover:text-red-800 hover:underline">6. Tips・活用方法</a></li>
            <li><a href="#related" className="text-red-600 hover:text-red-800 hover:underline">7. 関連リンク</a></li>
          </ul>
        </nav>
        
        <div className="bg-white rounded-xl shadow-lg p-8 space-y-12">
          
          {/* ツールの概要 */}
          <section id="overview">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">ツールの概要</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              VBAエラーコード逆引き辞典は、VBA開発中に発生したエラーコードから、その原因と解決方法を素早く検索できるツールです。
              19種類の主要なエラーコードを収録しており、初心者から上級者まで幅広く活用できます。
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-4">
              <p className="font-semibold text-blue-800 mb-2">こんな方におすすめ：</p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>VBAでエラーが発生したが、原因がわからない方</li>
                <li>エラーメッセージの意味を理解したい方</li>
                <li>エラーの解決方法を素早く知りたい方</li>
                <li>よくあるエラーの対処法を学びたい方</li>
              </ul>
            </div>
          </section>

          {/* 基本的な使い方 */}
          <section id="basic-usage">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">基本的な使い方</h2>
            
            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">ステップ1: エラー辞典ページを開く</h3>
              <p className="text-gray-700 mb-4">
                ヘッダーメニューの「エラー辞典」をクリックするか、以下のURLにアクセスします。
              </p>
              <div className="bg-gray-100 p-3 rounded-lg mb-4">
                <code className="text-sm">https://vba-dev-hub-vercel.vercel.app/errors</code>
              </div>
              <Image 
                src="/guides/errors-01-overview.webp" 
                alt="エラー辞典のトップページ" 
                width={1200} 
                height={800} 
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-600 mt-2">▲ エラー辞典のトップページ。19種類のエラーが一覧表示されます。</p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">ステップ2: エラーを探す</h3>
              <p className="text-gray-700 mb-4">
                エラーコード（例: エラー6）または名前（例: Overflow）で検索します。
                検索ボックスに入力すると、リアルタイムで絞り込まれます。
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-700">ステップ3: 詳細を確認</h3>
              <p className="text-gray-700 mb-4">
                エラーカードをクリックすると、詳細情報が展開されます。
              </p>
              <Image 
                src="/guides/errors-02-detail.webp" 
                alt="エラー詳細の表示" 
                width={1200} 
                height={800} 
                className="rounded-lg shadow-md"
              />
              <p className="text-sm text-gray-600 mt-2">▲ エラー詳細。主な原因、解決方法、コード例が表示されます。</p>
            </div>
          </section>

          {/* 検索機能 */}
          <section id="search">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">検索機能の使い方</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              検索ボックスを使用すると、エラーコード、名前、説明のいずれかに一致するエラーを素早く見つけることができます。
            </p>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">例1: エラーコードで検索</h4>
                <p className="text-gray-700">検索ボックスに「6」と入力 → エラー6（Overflow）が表示されます。</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">例2: エラー名で検索</h4>
                <p className="text-gray-700">検索ボックスに「overflow」と入力 → エラー6が表示されます。</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-800 mb-2">例3: 説明で検索</h4>
                <p className="text-gray-700">検索ボックスに「ファイル」と入力 → ファイル関連のエラーが表示されます。</p>
              </div>
            </div>
          </section>

          {/* カテゴリフィルター */}
          <section id="category-filter">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">カテゴリフィルター</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              カテゴリプルダウンを使用すると、特定のカテゴリのエラーのみを表示できます。
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-800 mb-3">収録カテゴリ：</h4>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="flex items-center">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">フロー制御</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">プロシージャ</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">演算</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">メモリ</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">配列・コレクション</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm">データ型</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">ファイル操作</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">オブジェクト</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm">UserForm</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full text-sm">ActiveX</span>
                </div>
                <div className="flex items-center">
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm">Excel</span>
                </div>
              </div>
            </div>
          </section>

          {/* エラー詳細の見方 */}
          <section id="error-details">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">エラー詳細の見方</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              各エラーの詳細には、以下の情報が含まれています：
            </p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-yellow-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">⚠️ 主な原因</h4>
                <p className="text-gray-700">エラーが発生する主な原因を箇条書きで説明します。</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">✓ 解決方法</h4>
                <p className="text-gray-700">エラーを解決するための具体的な方法を提示します。</p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold text-gray-800 mb-2">💡 コード例</h4>
                <p className="text-gray-700">エラーが発生するコードと、正しいコードの両方を示します。</p>
              </div>
            </div>
          </section>

          {/* Tips */}
          <section id="tips">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">Tips・活用方法</h2>
            
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Tip 1: エラー番号をメモしておく</h4>
                <p className="text-gray-700">
                  VBAエディタでエラーが発生したら、エラー番号をメモしておくと、後で検索しやすくなります。
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-2">💡 Tip 2: コード例を参考にする</h4>
                <p className="text-gray-700">
                  各エラーのコード例には、エラーが発生するコードと正しいコードの両方が含まれています。
                  これを参考にすることで、エラーの原因を理解しやすくなります。
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
                <h4 className="font-semibold text-purple-900 mb-2">💡 Tip 3: カテゴリで絞り込む</h4>
                <p className="text-gray-700">
                  エラーの種類がわかっている場合は、カテゴリフィルターを使用すると効率的に検索できます。
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg p-6">
                <h4 className="font-semibold text-orange-900 mb-2">💡 Tip 4: よくあるエラーを覚える</h4>
                <p className="text-gray-700">
                  エラー9（Subscript out of range）、エラー13（Type mismatch）、エラー91（Object variable not set）は
                  VBA開発で頻繁に発生するエラーです。これらの原因と解決方法を覚えておくと、開発効率が向上します。
                </p>
              </div>
            </div>
          </section>

          {/* 関連リンク */}
          <section id="related" className="border-t pt-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">関連リンク</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <a href="/errors" className="block p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <h3 className="font-semibold text-red-700 mb-2">→ エラー辞典を使ってみる</h3>
                <p className="text-sm text-gray-600">エラーコードから原因と解決方法を検索</p>
              </a>
              <a href="/references" className="block p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <h3 className="font-semibold text-green-700 mb-2">→ 逆引きリファレンス</h3>
                <p className="text-sm text-gray-600">やりたいことからVBAコードを検索</p>
              </a>
              <a href="/functions" className="block p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h3 className="font-semibold text-blue-700 mb-2">→ 関数・ステートメント解説</h3>
                <p className="text-sm text-gray-600">VBA関数の詳細な説明とサンプル</p>
              </a>
              <a href="/faq" className="block p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <h3 className="font-semibold text-purple-700 mb-2">→ よくある質問</h3>
                <p className="text-sm text-gray-600">VBA Dev Hubに関するFAQ</p>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
