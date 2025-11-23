'use client';
import Image from 'next/image';
import Link from 'next/link';
import { GuideFeedback } from '@/components/GuideFeedback';


export default function SnippetsGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
            VBA Dev Hub
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            スニペット共有の使い方
          </h1>
          <p className="text-xl text-gray-600">
            実用的なVBAコードスニペットを検索・投稿・共有しよう
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">目次</h2>
          <ul className="space-y-2">
            <li>
              <a href="#overview" className="text-teal-600 hover:text-teal-700 hover:underline">
                1. スニペット共有とは
              </a>
            </li>
            <li>
              <a href="#how-to-use" className="text-teal-600 hover:text-teal-700 hover:underline">
                2. 基本的な使い方
              </a>
            </li>
            <li>
              <a href="#search" className="text-teal-600 hover:text-teal-700 hover:underline">
                3. スニペットの検索方法
              </a>
            </li>
            <li>
              <a href="#view" className="text-teal-600 hover:text-teal-700 hover:underline">
                4. スニペットの閲覧とコピー
              </a>
            </li>
            <li>
              <a href="#post" className="text-teal-600 hover:text-teal-700 hover:underline">
                5. スニペットの投稿方法
              </a>
            </li>
            <li>
              <a href="#tips" className="text-teal-600 hover:text-teal-700 hover:underline">
                6. 効果的な活用のコツ
              </a>
            </li>
            <li>
              <a href="#faq" className="text-teal-600 hover:text-teal-700 hover:underline">
                7. よくある質問
              </a>
            </li>
            <li>
              <a href="#related" className="text-teal-600 hover:text-teal-700 hover:underline">
                8. 関連ツール
              </a>
            </li>
          </ul>
        </nav>

        {/* コンテンツ */}
        <div className="prose prose-lg max-w-none">
          {/* 1. スニペット共有とは */}
          <section id="overview" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. スニペット共有とは</h2>
            <p className="text-gray-700 mb-4">
              スニペット共有は、VBAの実用的なコードスニペット（コードの断片）をコミュニティで共有するプラットフォームです。ユーザーが投稿した便利なコードを検索・閲覧したり、自分が作成した有用なコードを他のユーザーと共有したりできます。
            </p>
            <p className="text-gray-700 mb-6">
              スニペットには、タイトル、説明、コード、カテゴリ、タグが含まれており、検索やフィルタリングで目的のコードを素早く見つけることができます。コミュニティの知恵を活用することで、開発効率を大幅に向上させることができます。
            </p>
            <div className="my-8">
              <Image
                src="/guides/snippets-01-list.webp"
                alt="スニペット共有のトップ画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">スニペット共有のトップ画面</p>
            </div>
          </section>

          {/* 2. 基本的な使い方 */}
          <section id="how-to-use" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 基本的な使い方</h2>
            <p className="text-gray-700 mb-4">
              スニペット共有の基本的な使い方を説明します。
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">基本的な手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>トップページのナビゲーションから「スニペット」をクリック</li>
                <li>一覧から目的のスニペットを探す、または検索・フィルタリング</li>
                <li>スニペットカードをクリックして詳細を表示</li>
                <li>コードを確認し、必要に応じてコピーボタンでクリップボードにコピー</li>
                <li>VBAエディタに貼り付けて使用</li>
              </ol>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 スニペット投稿の手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>右上の「スニペットを投稿」ボタンをクリック</li>
                <li>タイトル、説明、コード、カテゴリ、タグを入力</li>
                <li>「投稿」ボタンをクリックして公開</li>
                <li>投稿したスニペットが一覧に表示されます</li>
              </ol>
            </div>
          </section>

          {/* 3. スニペットの検索方法 */}
          <section id="search" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. スニペットの検索方法</h2>
            <p className="text-gray-700 mb-4">
              スニペット共有には、効率的にスニペットを見つけるための検索機能とフィルタリング機能が用意されています。
            </p>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">キーワード検索</h3>
                <p className="text-gray-700 mb-3">
                  検索ボックスにキーワードを入力すると、タイトル、説明、タグに該当するスニペットが表示されます。
                </p>
                <p className="text-gray-700 font-semibold mb-2">検索対象:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>タイトル</li>
                  <li>説明文</li>
                  <li>タグ</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">カテゴリフィルタ</h3>
                <p className="text-gray-700 mb-3">
                  カテゴリドロップダウンから目的のカテゴリを選択すると、そのカテゴリのスニペットのみが表示されます。
                </p>
                <p className="text-gray-700 font-semibold mb-2">カテゴリ一覧:</p>
                <ul className="list-disc list-inside space-y-1 text-gray-700">
                  <li>セル操作</li>
                  <li>ファイル操作</li>
                  <li>データ処理</li>
                  <li>ユーティリティ</li>
                  <li>その他</li>
                </ul>
              </div>
            </div>
            <div className="bg-teal-50 border-l-4 border-teal-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">検索のコツ</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>具体的なキーワード:</strong> 「セル」「ファイル」「配列」など具体的な単語を使用</li>
                <li><strong>動詞を含める:</strong> 「取得」「保存」「変換」など動作を表す言葉を入れる</li>
                <li><strong>カテゴリと組み合わせ:</strong> カテゴリフィルタとキーワード検索を組み合わせると、より絞り込める</li>
              </ul>
            </div>
          </section>

          {/* 4. スニペットの閲覧とコピー */}
          <section id="view" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. スニペットの閲覧とコピー</h2>
            <p className="text-gray-700 mb-4">
              スニペットカードをクリックすると詳細が展開され、コードを確認できます。
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">スニペット詳細の内容</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>タイトル:</strong> スニペットの名前</li>
                <li><strong>説明:</strong> スニペットの用途や機能の詳細説明</li>
                <li><strong>コード:</strong> 実際のVBAコード（シンタックスハイライト付き）</li>
                <li><strong>カテゴリ:</strong> スニペットの分類</li>
                <li><strong>タグ:</strong> 関連キーワード</li>
                <li><strong>投稿者:</strong> スニペットを投稿したユーザー名</li>
                <li><strong>投稿日:</strong> スニペットが投稿された日時</li>
              </ul>
            </div>
            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">コードのコピー方法</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>目的のスニペットカードをクリックして詳細を展開</li>
                <li>コードブロック右上の「コピー」ボタンをクリック</li>
                <li>コードがクリップボードにコピーされます</li>
                <li>VBAエディタを開き、貼り付け（Ctrl+V）</li>
                <li>必要に応じてコードを編集して使用</li>
              </ol>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ コード使用時の注意</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>スニペットはユーザー投稿のため、コードの品質や動作保証はありません</li>
                <li>コピーしたコードは、必ず自分の環境でテストしてから本番で使用してください</li>
                <li>変数名、セル範囲、ファイルパスなど、環境に合わせて編集が必要な場合があります</li>
                <li>コードの内容を理解してから使用することをお勧めします</li>
              </ul>
            </div>
          </section>

          {/* 5. スニペットの投稿方法 */}
          <section id="post" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. スニペットの投稿方法</h2>
            <p className="text-gray-700 mb-4">
              自分が作成した便利なVBAコードをコミュニティと共有する方法を説明します。
            </p>
            <div className="bg-teal-50 border-l-4 border-teal-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">投稿手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>ログインしていることを確認（未ログインの場合はログインが必要）</li>
                <li>右上の「スニペットを投稿」ボタンをクリック</li>
                <li>投稿フォームが表示されます</li>
                <li>各項目を入力（詳細は下記参照）</li>
                <li>「投稿」ボタンをクリック</li>
                <li>投稿が完了すると、一覧に表示されます</li>
              </ol>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📝 タイトル（必須）</h3>
                <p className="text-gray-700 mb-2">
                  スニペットの名前を入力します。簡潔で分かりやすいタイトルを付けましょう。
                </p>
                <p className="text-gray-700 text-sm">
                  例: 「セルの背景色を条件で変更」「CSVファイルを読み込む」「重複データを削除」
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📄 説明（必須）</h3>
                <p className="text-gray-700 mb-2">
                  スニペットの用途、機能、使い方を詳しく説明します。他のユーザーが理解しやすいように書きましょう。
                </p>
                <p className="text-gray-700 text-sm">
                  例: 「指定した列の値に応じてセルの背景色を自動的に変更します。条件は3つまで設定可能です。」
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💻 コード（必須）</h3>
                <p className="text-gray-700 mb-2">
                  実際のVBAコードを入力します。コメントを含めると、他のユーザーが理解しやすくなります。
                </p>
                <div className="bg-gray-100 p-4 rounded mt-3 font-mono text-sm">
                  Sub ColorCells()<br />
                  &nbsp;&nbsp;' A列の値に応じて背景色を変更<br />
                  &nbsp;&nbsp;Dim cell As Range<br />
                  &nbsp;&nbsp;For Each cell In Range("A1:A10")<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;If cell.Value &gt; 100 Then<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;cell.Interior.Color = RGB(255, 0, 0)<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;End If<br />
                  &nbsp;&nbsp;Next cell<br />
                  End Sub
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏷️ カテゴリ（必須）</h3>
                <p className="text-gray-700 mb-2">
                  スニペットの分類を選択します。最も適切なカテゴリを1つ選んでください。
                </p>
                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
                  <li><strong>セル操作:</strong> セルの読み書き、書式設定など</li>
                  <li><strong>ファイル操作:</strong> ファイルの読み込み、保存、削除など</li>
                  <li><strong>データ処理:</strong> データの集計、変換、フィルタリングなど</li>
                  <li><strong>ユーティリティ:</strong> 汎用的な便利機能</li>
                  <li><strong>その他:</strong> 上記に当てはまらないもの</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🏷️ タグ（任意）</h3>
                <p className="text-gray-700 mb-2">
                  スニペットに関連するキーワードをカンマ区切りで入力します。検索性を高めるために有効です。
                </p>
                <p className="text-gray-700 text-sm">
                  例: 「セル, 背景色, 条件分岐, 書式設定」
                </p>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 良いスニペットを投稿するコツ</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>汎用性:</strong> 特定の環境に依存しない、汎用的なコードを投稿しましょう</li>
                <li><strong>コメント:</strong> コード内にコメントを含めると、他のユーザーが理解しやすくなります</li>
                <li><strong>テスト済み:</strong> 投稿前に必ず動作確認を行いましょう</li>
                <li><strong>詳細な説明:</strong> 使い方や注意点を説明欄に記載しましょう</li>
                <li><strong>適切なカテゴリとタグ:</strong> 検索しやすいように、適切なカテゴリとタグを設定しましょう</li>
              </ul>
            </div>
          </section>

          {/* 6. 効果的な活用のコツ */}
          <section id="tips" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. 効果的な活用のコツ</h2>
            <p className="text-gray-700 mb-4">
              スニペット共有をより効果的に活用するためのコツをご紹介します。
            </p>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 まず検索してから実装</h3>
                <p className="text-gray-700">
                  新しい機能を実装する前に、まずスニペット共有で似たようなコードがないか検索してみましょう。車輪の再発明を避け、既存のコードを活用することで、開発時間を大幅に短縮できます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 コードを理解してから使用</h3>
                <p className="text-gray-700">
                  スニペットをコピーして使用する前に、コードの内容を理解しましょう。ブラックボックスとして使用すると、エラーが発生した際に対処できません。分からない部分は<Link href="/functions" className="text-teal-600 hover:underline">関数解説</Link>で調べましょう。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 自分のコードライブラリを作る</h3>
                <p className="text-gray-700">
                  便利なスニペットを見つけたら、自分用のコードライブラリとして保存しておきましょう。テキストファイルやOneNoteなどに整理しておくと、後で素早く再利用できます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 積極的に投稿する</h3>
                <p className="text-gray-700">
                  自分が作成した便利なコードは、積極的にコミュニティと共有しましょう。他のユーザーの役に立つだけでなく、フィードバックをもらうことで自分のスキルも向上します。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 複数のスニペットを組み合わせる</h3>
                <p className="text-gray-700">
                  複雑な処理を実現したい場合は、複数のスニペットを組み合わせることを検討しましょう。例えば、「ファイル読み込み」と「データ処理」のスニペットを組み合わせることで、より高度な機能を実装できます。
                </p>
              </div>
            </div>
          </section>

          {/* 7. よくある質問 */}
          <section id="faq" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. よくある質問</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. スニペットは誰でも投稿できますか?</h3>
                <p className="text-gray-700">
                  A. はい、VBA Dev Hubにログインしているユーザーであれば、誰でもスニペットを投稿できます。ログインしていない場合は、閲覧のみ可能です。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 投稿したスニペットを編集・削除できますか?</h3>
                <p className="text-gray-700">
                  A. 現在のバージョンでは、投稿後の編集・削除機能は実装されていません。投稿前に内容をよく確認してください。将来的に編集・削除機能を追加する予定です。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. スニペットの品質は保証されていますか?</h3>
                <p className="text-gray-700">
                  A. スニペットはユーザー投稿のため、品質や動作保証はありません。使用前に必ずコードを確認し、自分の環境でテストしてから本番で使用してください。問題があるスニペットを見つけた場合は、<Link href="/contact" className="text-teal-600 hover:underline">お問い合わせ</Link>からご報告ください。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. スニペットを商用利用できますか?</h3>
                <p className="text-gray-700">
                  A. スニペットは投稿者の善意により共有されています。商用利用する場合は、投稿者の意図を尊重し、必要に応じて投稿者に確認することをお勧めします。
                </p>
              </div>
            </div>
          </section>

          {/* 8. 関連ツール */}
          <section id="related" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. 関連ツール</h2>
            <p className="text-gray-700 mb-6">
              スニペット共有と併せて使用すると便利なツールをご紹介します。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/references" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-teal-600 mb-3">逆引きリファレンス</h3>
                <p className="text-gray-700">
                  やりたいことから素早くVBAコードを検索。公式リファレンスとスニペットを組み合わせて使用すると効果的です。
                </p>
              </Link>
              <Link href="/tools/generator" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-teal-600 mb-3">VBAコードジェネレーター</h3>
                <p className="text-gray-700">
                  17種類のテンプレートから、用途に応じたVBAコードを自動生成。スニペットと組み合わせて複雑なコードも作成可能です。
                </p>
              </Link>
              <Link href="/functions" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-teal-600 mb-3">関数・ステートメント解説</h3>
                <p className="text-gray-700">
                  スニペット内で使用されている関数を詳しく学習。構文、パラメータ、サンプルコード付きで理解を深められます。
                </p>
              </Link>
              <Link href="/errors" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-teal-600 mb-3">エラー辞典</h3>
                <p className="text-gray-700">
                  スニペット使用時のエラーを素早く解決。エラー番号やメッセージから原因と対処法を検索できます。
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-teal-600 to-green-600 text-white rounded-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">今すぐスニペット共有を使ってみよう</h2>
            <p className="text-lg mb-6">
              実用的なVBAコードスニペットを検索・投稿・共有して、開発を効率化
            </p>
            <Link
              href="/snippets"
              className="inline-block bg-white text-teal-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              スニペット共有を開く
            

          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="snippets" />
          </div>


          {/* Feedback Section */}
          <div className="mt-12">
            <GuideFeedback guidePage="snippets" />
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
