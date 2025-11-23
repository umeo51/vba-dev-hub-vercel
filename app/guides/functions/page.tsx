'use client';
import Image from 'next/image';
import Link from 'next/link';
import { GuideFeedback } from '@/components/GuideFeedback';


export default function FunctionsGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700 transition-colors">
            VBA Dev Hub
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            関数・ステートメント解説の使い方
          </h1>
          <p className="text-xl text-gray-600">
            VBAの組み込み関数を詳しく学び、効果的に活用する方法を解説
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">目次</h2>
          <ul className="space-y-2">
            <li>
              <a href="#overview" className="text-pink-600 hover:text-pink-700 hover:underline">
                1. 関数・ステートメント解説とは
              </a>
            </li>
            <li>
              <a href="#how-to-use" className="text-pink-600 hover:text-pink-700 hover:underline">
                2. 基本的な使い方
              </a>
            </li>
            <li>
              <a href="#search" className="text-pink-600 hover:text-pink-700 hover:underline">
                3. 関数の検索方法
              </a>
            </li>
            <li>
              <a href="#details" className="text-pink-600 hover:text-pink-700 hover:underline">
                4. 関数詳細の見方
              </a>
            </li>
            <li>
              <a href="#examples" className="text-pink-600 hover:text-pink-700 hover:underline">
                5. サンプルコードの活用
              </a>
            </li>
            <li>
              <a href="#tips" className="text-pink-600 hover:text-pink-700 hover:underline">
                6. 効果的な学習のコツ
              </a>
            </li>
            <li>
              <a href="#faq" className="text-pink-600 hover:text-pink-700 hover:underline">
                7. よくある質問
              </a>
            </li>
            <li>
              <a href="#related" className="text-pink-600 hover:text-pink-700 hover:underline">
                8. 関連ツール
              </a>
            </li>
          </ul>
        </nav>

        {/* コンテンツ */}
        <div className="prose prose-lg max-w-none">
          {/* 1. 関数・ステートメント解説とは */}
          <section id="overview" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. 関数・ステートメント解説とは</h2>
            <p className="text-gray-700 mb-4">
              関数・ステートメント解説は、VBAの組み込み関数とステートメントを詳しく学べるリファレンスツールです。各関数について、構文、パラメータの説明、戻り値、実用的なサンプルコード、注意事項、関連する関数などを網羅的に解説しています。
            </p>
            <p className="text-gray-700 mb-6">
              現在20件の関数が登録されており、ダイアログ表示、文字列操作、変換、判定、日付時刻、配列など、VBA開発で頻繁に使用される関数をカバーしています。初心者がVBAの基礎を学ぶのに最適なツールです。
            </p>
            <div className="my-8">
              <Image
                src="/guides/functions-01-list.webp"
                alt="関数・ステートメント解説のトップ画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">関数・ステートメント解説のトップ画面</p>
            </div>
          </section>

          {/* 2. 基本的な使い方 */}
          <section id="how-to-use" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 基本的な使い方</h2>
            <p className="text-gray-700 mb-4">
              関数・ステートメント解説の基本的な使い方を説明します。
            </p>
            <div className="bg-pink-50 border-l-4 border-pink-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">基本的な手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>トップページのナビゲーションから「関数解説」をクリック</li>
                <li>一覧から学びたい関数を探す、または検索ボックスで検索</li>
                <li>関数カードをクリックして詳細を表示</li>
                <li>構文、パラメータ、サンプルコードを確認</li>
                <li>必要に応じてサンプルコードをコピーして使用</li>
              </ol>
            </div>
            <p className="text-gray-700">
              各関数カードには、カテゴリ（ダイアログ、文字列、変換など）、関数名、簡潔な説明、構文が表示されているため、一覧から目的の関数を素早く見つけることができます。
            </p>
          </section>

          {/* 3. 関数の検索方法 */}
          <section id="search" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 関数の検索方法</h2>
            <p className="text-gray-700 mb-4">
              関数・ステートメント解説には、2つの検索方法が用意されています。
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">キーワード検索</h3>
                <p className="text-gray-700 mb-3">
                  検索ボックスに関数名や説明のキーワードを入力すると、該当する関数が絞り込まれます。
                </p>
                <p className="text-gray-700 font-semibold mb-2">検索対象:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>関数名（MsgBox、Lenなど）</li>
                  <li>説明文</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">カテゴリフィルタ</h3>
                <p className="text-gray-700 mb-3">
                  カテゴリドロップダウンから目的のカテゴリを選択すると、そのカテゴリの関数のみが表示されます。
                </p>
                <p className="text-gray-700 font-semibold mb-2">カテゴリ一覧:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>ダイアログ</li>
                  <li>文字列</li>
                  <li>変換</li>
                  <li>判定</li>
                  <li>日付時刻</li>
                  <li>配列</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">検索のコツ</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>関数名が分かる場合:</strong> 検索ボックスに直接関数名を入力（例: MsgBox、Len）</li>
                <li><strong>用途から探す場合:</strong> カテゴリフィルタを使用（例: 文字列操作なら「文字列」カテゴリ）</li>
                <li><strong>機能から探す場合:</strong> 検索ボックスに機能のキーワードを入力（例: 「メッセージ」「変換」「判定」）</li>
              </ul>
            </div>
          </section>

          {/* 4. 関数詳細の見方 */}
          <section id="details" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 関数詳細の見方</h2>
            <p className="text-gray-700 mb-4">
              関数カードをクリックすると詳細が展開され、以下の情報が表示されます。
            </p>
            <div className="my-8">
              <Image
                src="/guides/functions-02-detail.webp"
                alt="関数の詳細表示"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">関数の詳細表示（MsgBox関数の例）</p>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📋 構文</h3>
                <p className="text-gray-700">
                  関数の正式な構文が表示されます。必須パラメータと省略可能なパラメータ（[]で囲まれている）が明確に示されています。
                </p>
                <div className="bg-gray-100 p-4 rounded mt-3 font-mono text-sm">
                  MsgBox(prompt, [buttons], [title], [helpfile], [context])
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📝 パラメータ</h3>
                <p className="text-gray-700">
                  各パラメータの名前、説明、省略可否が詳しく解説されています。パラメータ名は色分けされており、必須か省略可能かが一目で分かります。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">↩️ 戻り値</h3>
                <p className="text-gray-700">
                  関数が返す値の型と意味が説明されています。例えば、MsgBoxの場合は「押されたボタンの値」が戻り値として説明されています。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💻 使用例</h3>
                <p className="text-gray-700">
                  実際に使用できるサンプルコードが複数パターン用意されています。基本的な使用例から、実践的な応用例まで段階的に学べます。各サンプルには「コピー」ボタンが付いており、クリックするだけでコードをコピーできます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">⚠️ 注意事項</h3>
                <p className="text-gray-700">
                  関数を使用する際の注意点や、よくある間違い、知っておくべき仕様などが記載されています。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🔗 関連する関数</h3>
                <p className="text-gray-700">
                  類似の機能を持つ関数や、併せて使用すると便利な関数がリンクとして表示されています。クリックすると、その関数の詳細にジャンプできます。
                </p>
              </div>
            </div>
          </section>

          {/* 5. サンプルコードの活用 */}
          <section id="examples" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. サンプルコードの活用</h2>
            <p className="text-gray-700 mb-4">
              各関数の詳細には、実用的なサンプルコードが複数用意されています。これらを効果的に活用する方法を説明します。
            </p>
            <div className="bg-pink-50 border-l-4 border-pink-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">サンプルコードの種類</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>基本的な使用:</strong> 最もシンプルな使い方を示すコード</li>
                <li><strong>応用例:</strong> パラメータを組み合わせた実用的なコード</li>
                <li><strong>実践的なパターン:</strong> 実際の開発で使用される典型的なコード</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">コピーと使用の手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>目的に合ったサンプルコードを選択</li>
                <li>コードブロック右上の「コピー」ボタンをクリック</li>
                <li>VBAエディタを開き、貼り付け（Ctrl+V）</li>
                <li>変数名やメッセージ内容を自分の用途に合わせて編集</li>
                <li>実行して動作を確認</li>
              </ol>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ サンプルコード使用時の注意</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>サンプルコードはそのまま動作しますが、実際の用途に合わせて変数名やメッセージを編集してください</li>
                <li>コード内のコメント（' で始まる行）を読んで、処理の内容を理解しましょう</li>
                <li>複雑なサンプルは、まず基本的な使用例から試すことをお勧めします</li>
              </ul>
            </div>
          </section>

          {/* 6. 効果的な学習のコツ */}
          <section id="tips" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 効果的な学習のコツ</h2>
            <p className="text-gray-700 mb-4">
              関数・ステートメント解説を使って効率的にVBAを学ぶためのコツをご紹介します。
            </p>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 基本的な関数から順番に学ぶ</h3>
                <p className="text-gray-700">
                  まずは「ダイアログ」カテゴリのMsgBoxやInputBoxから始めましょう。これらは視覚的に結果が分かりやすく、VBAの基礎を学ぶのに最適です。その後、「文字列」「変換」「日付時刻」と進んでいくと、段階的にスキルアップできます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 サンプルコードを実際に実行する</h3>
                <p className="text-gray-700">
                  読むだけでなく、必ず自分でVBAエディタにコピーして実行してみましょう。実際に動かすことで、関数の動作を体感的に理解できます。また、パラメータの値を変えて実験することで、より深く理解できます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 関連する関数を横断的に学ぶ</h3>
                <p className="text-gray-700">
                  各関数の詳細にある「関連する関数」のリンクを活用しましょう。例えば、Left関数を学んだら、Right関数やMid関数も一緒に学ぶことで、文字列操作の全体像が理解できます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 注意事項を必ず確認する</h3>
                <p className="text-gray-700">
                  各関数の「注意事項」セクションには、よくある間違いや重要な仕様が記載されています。これを読むことで、エラーを未然に防ぎ、効率的に学習できます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 他のツールと組み合わせる</h3>
                <p className="text-gray-700">
                  関数の基本を学んだ後、<Link href="/references" className="text-pink-600 hover:underline">逆引きリファレンス</Link>や<Link href="/tools/generator" className="text-pink-600 hover:underline">コードジェネレーター</Link>と組み合わせることで、実践的なコードを作成できるようになります。
                </p>
              </div>
            </div>
          </section>

          {/* 7. よくある質問 */}
          <section id="faq" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. よくある質問</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 関数とステートメントの違いは何ですか?</h3>
                <p className="text-gray-700">
                  A. 関数は値を返すもの（例: Len関数は文字列の長さを返す）、ステートメントは処理を実行するもの（例: MsgBoxはメッセージを表示する）です。ただし、MsgBoxのように両方の性質を持つものもあります。このツールでは両方を「関数」として扱っています。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 関数の数は今後増えますか?</h3>
                <p className="text-gray-700">
                  A. はい、定期的に新しい関数を追加していく予定です。まずは基本的でよく使用される関数から充実させ、徐々に高度な関数も追加していきます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. パラメータの[]は何を意味しますか?</h3>
                <p className="text-gray-700">
                  A. []で囲まれたパラメータは省略可能であることを示しています。例えば、MsgBox(prompt, [buttons])の場合、promptは必須ですがbuttonsは省略できます。省略した場合はデフォルト値が使用されます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. サンプルコードが動作しません</h3>
                <p className="text-gray-700">
                  A. サンプルコードをそのままコピーした場合、環境によっては変数名やセル範囲の調整が必要な場合があります。エラーメッセージを確認し、必要に応じて<Link href="/errors" className="text-pink-600 hover:underline">エラー辞典</Link>で解決策を探してください。
                </p>
              </div>
            </div>
          </section>

          {/* 8. 関連ツール */}
          <section id="related" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 関連ツール</h2>
            <p className="text-gray-700 mb-6">
              関数・ステートメント解説と併せて使用すると便利なツールをご紹介します。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/references" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-pink-600 mb-3">逆引きリファレンス</h3>
                <p className="text-gray-700">
                  やりたいことから素早くVBAコードを検索。関数の使い方を学んだ後、実践的な処理を探すのに最適です。
                </p>
              </Link>
              <Link href="/tools/generator" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-pink-600 mb-3">VBAコードジェネレーター</h3>
                <p className="text-gray-700">
                  17種類のテンプレートから、用途に応じたVBAコードを自動生成。関数を組み合わせた複雑なコードも作成可能です。
                </p>
              </Link>
              <Link href="/quiz" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-pink-600 mb-3">VBAクイズ</h3>
                <p className="text-gray-700">
                  学んだ関数の知識を試せるクイズ。難易度別に15問出題され、解説付きでスキルアップできます。
                </p>
              </Link>
              <Link href="/errors" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-pink-600 mb-3">エラー辞典</h3>
                <p className="text-gray-700">
                  VBAエラーの原因と解決策を検索。関数使用時のエラーも素早く解決できます。
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">今すぐ関数・ステートメント解説で学習を始めよう</h2>
            <p className="text-lg mb-6">
              VBAの組み込み関数を詳しく学び、実践的なスキルを身につけましょう
            </p>
            <Link
              href="/functions"
              className="inline-block bg-white text-pink-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              関数・ステートメント解説を開く
            

          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="functions" />
          </div>


          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="functions" />
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
