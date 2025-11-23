'use client';
import Image from 'next/image';
import Link from 'next/link';
import { GuideFeedback } from '@/components/GuideFeedback';

export const metadata = {
  title: 'VBAクイズの使い方 | VBA Dev Hub',
  description: 'VBAクイズの使い方を詳しく解説。難易度別の練習問題でVBAの知識を試し、スキルアップを目指しましょう。',
};

export default function QuizGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-orange-600 hover:text-orange-700 transition-colors">
            VBA Dev Hub
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VBAクイズの使い方
          </h1>
          <p className="text-xl text-gray-600">
            楽しく学べる練習問題でVBAの知識を試し、スキルアップを目指そう
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">目次</h2>
          <ul className="space-y-2">
            <li>
              <a href="#overview" className="text-orange-600 hover:text-orange-700 hover:underline">
                1. VBAクイズとは
              </a>
            </li>
            <li>
              <a href="#how-to-use" className="text-orange-600 hover:text-orange-700 hover:underline">
                2. 基本的な使い方
              </a>
            </li>
            <li>
              <a href="#difficulty" className="text-orange-600 hover:text-orange-700 hover:underline">
                3. 難易度の選択
              </a>
            </li>
            <li>
              <a href="#answering" className="text-orange-600 hover:text-orange-700 hover:underline">
                4. 問題への回答方法
              </a>
            </li>
            <li>
              <a href="#results" className="text-orange-600 hover:text-orange-700 hover:underline">
                5. 結果の確認と復習
              </a>
            </li>
            <li>
              <a href="#tips" className="text-orange-600 hover:text-orange-700 hover:underline">
                6. 効果的な活用のコツ
              </a>
            </li>
            <li>
              <a href="#faq" className="text-orange-600 hover:text-orange-700 hover:underline">
                7. よくある質問
              </a>
            </li>
            <li>
              <a href="#related" className="text-orange-600 hover:text-orange-700 hover:underline">
                8. 関連ツール
              </a>
            </li>
          </ul>
        </nav>

        {/* コンテンツ */}
        <div className="prose prose-lg max-w-none">
          {/* 1. VBAクイズとは */}
          <section id="overview" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. VBAクイズとは</h2>
            <p className="text-gray-700 mb-4">
              VBAクイズは、VBAの知識を楽しく試せる練習問題ツールです。基本的な構文から実践的なコーディング問題まで、難易度別に15問が出題されます。各問題には4つの選択肢が用意されており、回答後すぐに正解と詳しい解説が表示されるため、効率的にスキルアップできます。
            </p>
            <p className="text-gray-700 mb-6">
              初級、中級、上級の3つの難易度から選択でき、自分のレベルに合わせて学習できます。問題は変数、データ型、制御構造、関数、配列など、VBA開発で必要な幅広いトピックをカバーしています。
            </p>
            <div className="my-8">
              <Image
                src="/guides/quiz-01-start.webp"
                alt="VBAクイズのスタート画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">VBAクイズのスタート画面</p>
            </div>
          </section>

          {/* 2. 基本的な使い方 */}
          <section id="how-to-use" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 基本的な使い方</h2>
            <p className="text-gray-700 mb-4">
              VBAクイズの基本的な使い方は非常にシンプルです。以下の手順でクイズに挑戦できます。
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">基本的な手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>トップページのナビゲーションから「クイズ」をクリック</li>
                <li>難易度を選択（初級、中級、上級、またはすべて）</li>
                <li>「クイズを開始」ボタンをクリック</li>
                <li>各問題に対して4つの選択肢から正解を選択</li>
                <li>「回答する」ボタンをクリックして答えを確定</li>
                <li>正解と解説を確認</li>
                <li>15問すべて回答すると、最終結果が表示されます</li>
              </ol>
            </div>
            <p className="text-gray-700">
              クイズは何度でも挑戦できるため、繰り返し練習することで確実にスキルアップできます。
            </p>
          </section>

          {/* 3. 難易度の選択 */}
          <section id="difficulty" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 難易度の選択</h2>
            <p className="text-gray-700 mb-4">
              VBAクイズでは、自分のレベルに合わせて難易度を選択できます。各難易度の特徴を理解して、適切なレベルから始めましょう。
            </p>
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">🟢 初級</h3>
                <p className="text-gray-700 mb-3 font-semibold">こんな方におすすめ:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                  <li>VBAを始めたばかり</li>
                  <li>基本的な構文を学習中</li>
                  <li>変数やデータ型を理解したい</li>
                </ul>
                <p className="text-gray-700 font-semibold">出題内容:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>変数の宣言と代入</li>
                  <li>基本的なデータ型</li>
                  <li>簡単な演算</li>
                  <li>基本的な制御構造</li>
                </ul>
              </div>
              <div className="bg-yellow-50 border-2 border-yellow-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-yellow-900 mb-3">🟡 中級</h3>
                <p className="text-gray-700 mb-3 font-semibold">こんな方におすすめ:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                  <li>基本構文は理解している</li>
                  <li>実践的なコードを書きたい</li>
                  <li>関数やループを使いこなしたい</li>
                </ul>
                <p className="text-gray-700 font-semibold">出題内容:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>ループ処理（For、Do）</li>
                  <li>条件分岐（If、Select Case）</li>
                  <li>組み込み関数の使用</li>
                  <li>配列の基本</li>
                </ul>
              </div>
              <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 mb-3">🔴 上級</h3>
                <p className="text-gray-700 mb-3 font-semibold">こんな方におすすめ:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 mb-3">
                  <li>VBAに慣れている</li>
                  <li>複雑なロジックを理解したい</li>
                  <li>最適化やベストプラクティスを学びたい</li>
                </ul>
                <p className="text-gray-700 font-semibold">出題内容:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>多次元配列</li>
                  <li>エラーハンドリング</li>
                  <li>オブジェクト操作</li>
                  <li>高度なアルゴリズム</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 「すべて」を選択すると</h3>
              <p className="text-gray-700">
                「すべて」を選択すると、初級、中級、上級の問題がランダムに出題されます。幅広い知識を試したい場合や、総合的な実力を確認したい場合におすすめです。
              </p>
            </div>
          </section>

          {/* 4. 問題への回答方法 */}
          <section id="answering" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. 問題への回答方法</h2>
            <p className="text-gray-700 mb-4">
              クイズを開始すると、問題が1問ずつ表示されます。回答方法は以下の通りです。
            </p>
            <div className="my-8">
              <Image
                src="/guides/quiz-02-question.webp"
                alt="クイズの問題画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">クイズの問題画面</p>
            </div>
            <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">回答手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>問題文とコード例（表示されている場合）をよく読む</li>
                <li>4つの選択肢（A、B、C、D）から正解だと思うものをクリック</li>
                <li>選択した選択肢がハイライトされることを確認</li>
                <li>「回答する」ボタンをクリックして答えを確定</li>
                <li>正解・不正解の判定と解説が表示されます</li>
                <li>解説を読んで理解を深める</li>
                <li>次の問題に進む</li>
              </ol>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">画面の見方</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>進捗表示:</strong> 画面上部に「問題 1 / 15」のように現在の進捗が表示されます</li>
                <li><strong>スコア表示:</strong> 右上に「スコア: 3 / 5」のように現在の正解数が表示されます</li>
                <li><strong>カテゴリタグ:</strong> 問題の左上に「初級」「基本構文」などのタグが表示され、問題の種類が分かります</li>
                <li><strong>プログレスバー:</strong> 画面上部のバーで全体の進捗状況を視覚的に確認できます</li>
              </ul>
            </div>
          </section>

          {/* 5. 結果の確認と復習 */}
          <section id="results" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. 結果の確認と復習</h2>
            <p className="text-gray-700 mb-4">
              回答を確定すると、すぐに正解・不正解の判定と詳しい解説が表示されます。
            </p>
            <div className="my-8">
              <Image
                src="/guides/quiz-03-result.webp"
                alt="回答結果と解説の表示"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">回答結果と解説の表示</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-green-900 mb-3">✅ 正解の場合</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>選択肢が緑色でハイライト</li>
                  <li>「✓ 正解!」のメッセージ</li>
                  <li>正解の理由を説明する解説</li>
                  <li>スコアが1点加算</li>
                </ul>
              </div>
              <div className="bg-red-50 border-2 border-red-600 rounded-lg p-6">
                <h3 className="text-xl font-bold text-red-900 mb-3">❌ 不正解の場合</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>選択した選択肢が赤色でハイライト</li>
                  <li>正解の選択肢が緑色で表示</li>
                  <li>「✗ 不正解」のメッセージ</li>
                  <li>正解の理由と間違いやすいポイントの解説</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 解説の活用方法</h3>
              <p className="text-gray-700 mb-3">
                解説には、正解の理由だけでなく、関連する知識や注意点も含まれています。以下のポイントを意識して読みましょう。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>なぜその答えが正解なのかを理解する</li>
                <li>他の選択肢が不正解である理由も考える</li>
                <li>解説に出てくる関連知識もメモする</li>
                <li>不正解だった問題は、後で<Link href="/functions" className="text-orange-600 hover:underline">関数解説</Link>で復習する</li>
              </ul>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">最終結果</h3>
              <p className="text-gray-700 mb-3">
                15問すべてに回答すると、最終結果が表示されます。
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>総合スコア:</strong> 15問中何問正解したかが表示されます</li>
                <li><strong>正答率:</strong> パーセンテージで表示されます</li>
                <li><strong>評価:</strong> スコアに応じて「素晴らしい!」「よくできました」などのメッセージ</li>
                <li><strong>再挑戦:</strong> 「もう一度挑戦」ボタンで同じ難易度のクイズに再挑戦できます</li>
              </ul>
            </div>
          </section>

          {/* 6. 効果的な活用のコツ */}
          <section id="tips" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 効果的な活用のコツ</h2>
            <p className="text-gray-700 mb-4">
              VBAクイズを最大限に活用するためのコツをご紹介します。
            </p>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 段階的にレベルアップ</h3>
                <p className="text-gray-700">
                  まずは初級から始めて、80%以上の正答率を安定して取れるようになったら中級に進みましょう。焦らず段階的にレベルアップすることで、確実に知識が定着します。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 繰り返し挑戦する</h3>
                <p className="text-gray-700">
                  問題はランダムに出題されるため、何度も挑戦することで幅広い知識を身につけられます。1日1回クイズに挑戦する習慣をつけると、効果的にスキルアップできます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 間違えた問題を復習</h3>
                <p className="text-gray-700">
                  間違えた問題は、解説を読むだけでなく、<Link href="/functions" className="text-orange-600 hover:underline">関数解説</Link>や<Link href="/references" className="text-orange-600 hover:underline">逆引きリファレンス</Link>で関連する内容を深く学習しましょう。実際にVBAエディタでコードを書いて試すと、より理解が深まります。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 時間を決めて集中</h3>
                <p className="text-gray-700">
                  15問で約10〜15分程度です。時間を決めて集中して取り組むことで、効率的に学習できます。通勤時間や休憩時間などのスキマ時間を活用するのもおすすめです。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 実践と組み合わせる</h3>
                <p className="text-gray-700">
                  クイズで学んだ知識は、<Link href="/tools/generator" className="text-orange-600 hover:underline">コードジェネレーター</Link>や実際のVBAプロジェクトで使ってみましょう。知識を実践に結びつけることで、本当の意味でスキルが身につきます。
                </p>
              </div>
            </div>
          </section>

          {/* 7. よくある質問 */}
          <section id="faq" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. よくある質問</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 問題は毎回同じですか?</h3>
                <p className="text-gray-700">
                  A. いいえ、問題はランダムに出題されます。同じ難易度でも、挑戦するたびに異なる問題が出題されるため、繰り返し練習することで幅広い知識を身につけられます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 途中で中断できますか?</h3>
                <p className="text-gray-700">
                  A. 現在のバージョンでは、クイズを途中で中断すると進捗は保存されません。15問すべてに回答することをお勧めします。時間がない場合は、後で改めて挑戦してください。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 何点取れば合格ですか?</h3>
                <p className="text-gray-700">
                  A. VBAクイズに合格・不合格の基準はありません。自分のスキルを確認し、弱点を見つけるためのツールとしてご活用ください。目安として、80%以上（15問中12問以上正解）を目指すと良いでしょう。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 問題の数は増えますか?</h3>
                <p className="text-gray-700">
                  A. はい、定期的に新しい問題を追加していく予定です。より幅広いトピックをカバーし、実践的な問題も増やしていきます。
                </p>
              </div>
            </div>
          </section>

          {/* 8. 関連ツール */}
          <section id="related" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 関連ツール</h2>
            <p className="text-gray-700 mb-6">
              VBAクイズと併せて使用すると便利なツールをご紹介します。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/functions" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-orange-600 mb-3">関数・ステートメント解説</h3>
                <p className="text-gray-700">
                  クイズで出題される関数を詳しく学習。構文、パラメータ、サンプルコード付きで理解を深められます。
                </p>
              </Link>
              <Link href="/references" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-orange-600 mb-3">逆引きリファレンス</h3>
                <p className="text-gray-700">
                  クイズで学んだ知識を実践的なコードで確認。やりたいことから素早くVBAコードを検索できます。
                </p>
              </Link>
              <Link href="/tools/generator" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-orange-600 mb-3">VBAコードジェネレーター</h3>
                <p className="text-gray-700">
                  学んだ知識を活かして実際のコードを生成。17種類のテンプレートから用途に応じたコードを作成できます。
                </p>
              </Link>
              <Link href="/errors" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-orange-600 mb-3">エラー辞典</h3>
                <p className="text-gray-700">
                  クイズで学んだコードを実行中にエラーが出た場合、素早く原因と解決策を検索できます。
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">今すぐVBAクイズに挑戦しよう</h2>
            <p className="text-lg mb-6">
              楽しく学べる練習問題で、VBAの知識を試してスキルアップ
            </p>
            <Link
              href="/quiz"
              className="inline-block bg-white text-orange-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              VBAクイズを始める
            

          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="quiz" />
          </div>


          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="quiz" />
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
