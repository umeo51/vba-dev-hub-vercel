'use client';
import Image from 'next/image';
import Link from 'next/link';
import { GuideFeedback } from '@/components/GuideFeedback';


export default function ReferencesGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-purple-600 hover:text-purple-700 transition-colors">
            VBA Dev Hub
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            逆引きリファレンスの使い方
          </h1>
          <p className="text-xl text-gray-600">
            やりたいことから素早くVBAコードを検索する方法を解説
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">目次</h2>
          <ul className="space-y-2">
            <li>
              <a href="#overview" className="text-purple-600 hover:text-purple-700 hover:underline">
                1. 逆引きリファレンスとは
              </a>
            </li>
            <li>
              <a href="#how-to-use" className="text-purple-600 hover:text-purple-700 hover:underline">
                2. 基本的な使い方
              </a>
            </li>
            <li>
              <a href="#search" className="text-purple-600 hover:text-purple-700 hover:underline">
                3. 検索機能の活用
              </a>
            </li>
            <li>
              <a href="#filter" className="text-purple-600 hover:text-purple-700 hover:underline">
                4. カテゴリと難易度でフィルタリング
              </a>
            </li>
            <li>
              <a href="#code-copy" className="text-purple-600 hover:text-purple-700 hover:underline">
                5. コードのコピー方法
              </a>
            </li>
            <li>
              <a href="#tips" className="text-purple-600 hover:text-purple-700 hover:underline">
                6. 効果的な活用のコツ
              </a>
            </li>
            <li>
              <a href="#faq" className="text-purple-600 hover:text-purple-700 hover:underline">
                7. よくある質問
              </a>
            </li>
            <li>
              <a href="#related" className="text-purple-600 hover:text-purple-700 hover:underline">
                8. 関連ツール
              </a>
            </li>
          </ul>
        </nav>

        {/* コンテンツ */}
        <div className="prose prose-lg max-w-none">
          {/* 1. 逆引きリファレンスとは */}
          <section id="overview" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. 逆引きリファレンスとは</h2>
            <p className="text-gray-700 mb-4">
              逆引きリファレンスは、「やりたいこと」から素早くVBAコードを検索できる便利なツールです。通常のリファレンスが関数名から機能を調べるのに対し、逆引きリファレンスは「セルの値を取得したい」「ファイルを開きたい」といった目的から、必要なコードを見つけることができます。
            </p>
            <p className="text-gray-700 mb-6">
              25件のリファレンスが登録されており、セル操作、ファイル操作、ループ処理など、VBA開発でよく使用される処理を網羅しています。各リファレンスには実用的なコード例と解説が含まれているため、初心者から中級者まで幅広く活用できます。
            </p>
            <div className="my-8">
              <Image
                src="/guides/references-01-overview.webp"
                alt="逆引きリファレンスのトップ画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">逆引きリファレンスのトップ画面</p>
            </div>
          </section>

          {/* 2. 基本的な使い方 */}
          <section id="how-to-use" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 基本的な使い方</h2>
            <p className="text-gray-700 mb-4">
              逆引きリファレンスの基本的な使い方は非常にシンプルです。以下の手順で目的のコードを見つけることができます。
            </p>
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">基本的な手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>トップページのナビゲーションから「リファレンス」をクリック</li>
                <li>一覧から目的の処理を探す、または検索ボックスでキーワード検索</li>
                <li>該当するリファレンスカードをクリックして詳細を表示</li>
                <li>コード例を確認し、必要に応じてコピーボタンでクリップボードにコピー</li>
                <li>VBAエディタに貼り付けて使用</li>
              </ol>
            </div>
            <p className="text-gray-700">
              各リファレンスカードには、カテゴリ（セル操作、ファイル操作など）、難易度（初級、中級、上級）、関連タグが表示されているため、一目で内容を把握できます。
            </p>
          </section>

          {/* 3. 検索機能の活用 */}
          <section id="search" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 検索機能の活用</h2>
            <p className="text-gray-700 mb-4">
              検索ボックスを使用すると、やりたいことをキーワードで素早く検索できます。検索対象は以下の項目です。
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">検索対象</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>タイトル:</strong> 「セルの値を取得する」「ファイルを開く」など</li>
                <li><strong>説明文:</strong> 各リファレンスの詳細説明</li>
                <li><strong>タグ:</strong> #セル、#ファイル、#ループなど</li>
              </ul>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">検索のコツ</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>具体的なキーワード:</strong> 「セル」「ファイル」「ループ」など具体的な単語を使用</li>
                <li><strong>動詞を含める:</strong> 「取得」「設定」「開く」「保存」など動作を表す言葉を入れる</li>
                <li><strong>部分一致:</strong> 入力したキーワードを含むすべてのリファレンスが表示されます</li>
              </ul>
            </div>
            <p className="text-gray-700">
              例えば、「セル」と検索すると、セルの値を取得、セルの値を設定、セルの書式設定など、セルに関連するすべてのリファレンスが表示されます。
            </p>
          </section>

          {/* 4. カテゴリと難易度でフィルタリング */}
          <section id="filter" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. カテゴリと難易度でフィルタリング</h2>
            <p className="text-gray-700 mb-4">
              検索ボックスの右側には、カテゴリと難易度のフィルタが用意されています。これらを組み合わせることで、より効率的に目的のリファレンスを見つけることができます。
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">カテゴリフィルタ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>すべて</li>
                  <li>セル操作</li>
                  <li>セル書式</li>
                  <li>ループ処理</li>
                  <li>データ処理</li>
                  <li>ファイル操作</li>
                  <li>シート操作</li>
                  <li>ユーザー操作</li>
                  <li>データ構造</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">難易度フィルタ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>すべて:</strong> すべての難易度を表示</li>
                  <li><strong>初級:</strong> VBA初心者向けの基本的な処理</li>
                  <li><strong>中級:</strong> ある程度VBAに慣れた方向けの処理</li>
                  <li><strong>上級:</strong> 複雑な処理や高度なテクニック</li>
                </ul>
              </div>
            </div>
            <p className="text-gray-700">
              例えば、「カテゴリ: ファイル操作」「難易度: 初級」と設定すると、初心者向けのファイル操作に関するリファレンスのみが表示されます。
            </p>
          </section>

          {/* 5. コードのコピー方法 */}
          <section id="code-copy" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. コードのコピー方法</h2>
            <p className="text-gray-700 mb-4">
              リファレンスカードをクリックすると詳細が展開され、実際のVBAコードが表示されます。コードを使用するには、以下の手順でコピーできます。
            </p>
            <div className="my-8">
              <Image
                src="/guides/references-02-detail.webp"
                alt="リファレンスの詳細表示とコードコピー"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">リファレンスの詳細表示とコードコピー</p>
            </div>
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">コピー手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>目的のリファレンスカードをクリックして詳細を展開</li>
                <li>コードブロックの右上にある「コピー」ボタンをクリック</li>
                <li>コードがクリップボードにコピーされます</li>
                <li>VBAエディタを開き、貼り付け（Ctrl+V）</li>
                <li>必要に応じてコードを編集して使用</li>
              </ol>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ 注意事項</h3>
              <p className="text-gray-700">
                コピーしたコードはそのまま使用できる場合もありますが、多くの場合、セル範囲やファイルパスなど、環境に合わせて編集が必要です。コード内のコメントを参考に、適切に修正してください。
              </p>
            </div>
          </section>

          {/* 6. 効果的な活用のコツ */}
          <section id="tips" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 効果的な活用のコツ</h2>
            <p className="text-gray-700 mb-4">
              逆引きリファレンスをより効果的に活用するためのコツをご紹介します。
            </p>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 目的から逆算して検索</h3>
                <p className="text-gray-700">
                  「Range関数」のような関数名ではなく、「セルの値を取得したい」「ファイルを保存したい」といった目的で検索しましょう。逆引きリファレンスの強みを最大限に活かせます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 複数のリファレンスを組み合わせる</h3>
                <p className="text-gray-700">
                  複雑な処理を実現したい場合は、複数のリファレンスを組み合わせることを検討しましょう。例えば、「ループ処理」と「セル操作」を組み合わせることで、複数のセルを一括処理できます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 難易度を段階的に上げる</h3>
                <p className="text-gray-700">
                  初心者の方は、まず「初級」のリファレンスから始めて、徐々に「中級」「上級」へと進んでいくことをお勧めします。基礎をしっかり固めることで、より高度な処理も理解しやすくなります。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 コードジェネレーターと併用</h3>
                <p className="text-gray-700">
                  逆引きリファレンスで処理の流れを理解した後、<Link href="/tools/generator" className="text-purple-600 hover:underline">コードジェネレーター</Link>を使用すると、より詳細なコードを自動生成できます。両ツールを併用することで、効率的にVBAコードを作成できます。
                </p>
              </div>
            </div>
          </section>

          {/* 7. よくある質問 */}
          <section id="faq" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. よくある質問</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. リファレンスの数は今後増えますか?</h3>
                <p className="text-gray-700">
                  A. はい、定期的に新しいリファレンスを追加していく予定です。ユーザーの皆様からのリクエストも受け付けていますので、<Link href="/contact" className="text-purple-600 hover:underline">お問い合わせフォーム</Link>からご要望をお寄せください。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. コードをそのまま使用しても問題ありませんか?</h3>
                <p className="text-gray-700">
                  A. リファレンスのコードは自由に使用できますが、多くの場合、セル範囲やファイルパスなど、ご自身の環境に合わせて編集が必要です。コード内のコメントを参考に適切に修正してください。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 検索しても目的のリファレンスが見つかりません</h3>
                <p className="text-gray-700">
                  A. キーワードを変えて再度検索してみてください。また、カテゴリフィルタを「すべて」に設定して、一覧から探すのも有効です。それでも見つからない場合は、<Link href="/tools/generator" className="text-purple-600 hover:underline">コードジェネレーター</Link>や<Link href="/functions" className="text-purple-600 hover:underline">関数解説</Link>もご活用ください。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 初級と中級の違いは何ですか?</h3>
                <p className="text-gray-700">
                  A. 初級は基本的な構文と単純な処理、中級は複数の処理を組み合わせた実用的なコード、上級は高度なテクニックや最適化が必要な処理を指します。ご自身のスキルレベルに合わせて選択してください。
                </p>
              </div>
            </div>
          </section>

          {/* 8. 関連ツール */}
          <section id="related" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 関連ツール</h2>
            <p className="text-gray-700 mb-6">
              逆引きリファレンスと併せて使用すると便利なツールをご紹介します。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/tools/generator" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 mb-3">VBAコードジェネレーター</h3>
                <p className="text-gray-700">
                  17種類のテンプレートから、用途に応じたVBAコードを自動生成。複数の処理を統合したコードも作成可能です。
                </p>
              </Link>
              <Link href="/functions" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 mb-3">関数・ステートメント解説</h3>
                <p className="text-gray-700">
                  VBAの組み込み関数を詳しく解説。構文、パラメータ、サンプルコード付きで、関数の使い方を学べます。
                </p>
              </Link>
              <Link href="/errors" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 mb-3">エラー辞典</h3>
                <p className="text-gray-700">
                  VBAエラーの原因と解決策を検索。エラー番号やメッセージから素早く対処法を見つけられます。
                </p>
              </Link>
              <Link href="/snippets" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-purple-600 mb-3">スニペット共有</h3>
                <p className="text-gray-700">
                  実用的なVBAコードスニペットを検索・共有。コミュニティで共有されたコードを活用できます。
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">今すぐ逆引きリファレンスを使ってみよう</h2>
            <p className="text-lg mb-6">
              やりたいことから素早くVBAコードを見つけて、開発を効率化しましょう
            </p>
            <Link
              href="/references"
              className="inline-block bg-white text-purple-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              逆引きリファレンスを開く
            

          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="references" />
          </div>


          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="references" />
          </div>
</Link>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 VBA Dev Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
