'use client';
import Image from 'next/image';
import Link from 'next/link';


export default function UserFormGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
            VBA Dev Hub
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* タイトルセクション */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            UserFormシミュレーターの使い方
          </h1>
          <p className="text-xl text-gray-600">
            ビジュアルエディタでUserFormをデザインし、VBAコードを自動生成
          </p>
        </div>

        {/* 目次 */}
        <nav className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">目次</h2>
          <ul className="space-y-2">
            <li>
              <a href="#overview" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                1. UserFormシミュレーターとは
              </a>
            </li>
            <li>
              <a href="#how-to-use" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                2. 基本的な使い方
              </a>
            </li>
            <li>
              <a href="#controls" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                3. 利用可能なコントロール
              </a>
            </li>
            <li>
              <a href="#design" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                4. フォームのデザイン方法
              </a>
            </li>
            <li>
              <a href="#properties" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                5. プロパティの設定
              </a>
            </li>
            <li>
              <a href="#code-generation" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                6. コードの生成と使用
              </a>
            </li>
            <li>
              <a href="#tips" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                7. 効果的な活用のコツ
              </a>
            </li>
            <li>
              <a href="#faq" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                8. よくある質問
              </a>
            </li>
            <li>
              <a href="#related" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                9. 関連ツール
              </a>
            </li>
          </ul>
        </nav>

        {/* コンテンツ */}
        <div className="prose prose-lg max-w-none">
          {/* 1. UserFormシミュレーターとは */}
          <section id="overview" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">1. UserFormシミュレーターとは</h2>
            <p className="text-gray-700 mb-4">
              UserFormシミュレーターは、VBAのUserForm（ユーザーフォーム）をビジュアルに設計し、対応するVBAコードを自動生成するツールです。ドラッグ&ドロップ感覚でLabel、TextBox、Button、CheckBox、ComboBox、ListBoxなどのコントロールを配置し、プロパティを設定するだけで、実装に必要なVBAコードが自動的に生成されます。
            </p>
            <p className="text-gray-700 mb-6">
              UserFormは、ユーザーからの入力を受け取ったり、情報を表示したりするための重要なGUI要素です。このシミュレーターを使用することで、VBAエディタで手動でコントロールを配置する手間を省き、効率的にフォームを設計できます。
            </p>
            <div className="my-8">
              <Image
                src="/guides/userform-01-start.webp"
                alt="UserFormシミュレーターの初期画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">UserFormシミュレーターの初期画面</p>
            </div>
          </section>

          {/* 2. 基本的な使い方 */}
          <section id="how-to-use" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">2. 基本的な使い方</h2>
            <p className="text-gray-700 mb-4">
              UserFormシミュレーターの基本的な使い方を説明します。
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">基本的な手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>トップページのナビゲーションから「ツール」→「UserFormシミュレーター」をクリック</li>
                <li>左側の「ツールボックス」から追加したいコントロールをクリック</li>
                <li>中央の「デザイン」エリアにコントロールが配置されます</li>
                <li>右側の「プロパティ」パネルでコントロールの設定を変更</li>
                <li>必要に応じてフォームのタイトル、幅、高さを「フォーム設定」で調整</li>
                <li>「コードを表示」ボタンをクリックしてVBAコードを生成</li>
                <li>生成されたコードをコピーしてVBAエディタに貼り付け</li>
              </ol>
            </div>
            <p className="text-gray-700">
              画面は3つのエリアに分かれています: 左側の「ツールボックス」と「フォーム設定」、中央の「デザイン」エリア、右側の「プロパティ」パネルです。この構成により、直感的にフォームをデザインできます。
            </p>
          </section>

          {/* 3. 利用可能なコントロール */}
          <section id="controls" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">3. 利用可能なコントロール</h2>
            <p className="text-gray-700 mb-4">
              UserFormシミュレーターでは、以下の6種類のコントロールを使用できます。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📝 Label（ラベル）</h3>
                <p className="text-gray-700 mb-2"><strong>用途:</strong> テキストの表示</p>
                <p className="text-gray-700 mb-2"><strong>特徴:</strong> ユーザーが編集できない固定テキストを表示します</p>
                <p className="text-gray-700"><strong>使用例:</strong> 項目名、説明文、タイトルなど</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">✏️ TextBox（テキストボックス）</h3>
                <p className="text-gray-700 mb-2"><strong>用途:</strong> テキスト入力</p>
                <p className="text-gray-700 mb-2"><strong>特徴:</strong> ユーザーが自由にテキストを入力できます</p>
                <p className="text-gray-700"><strong>使用例:</strong> 名前入力、メモ欄、検索ボックスなど</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">🔘 Button（ボタン）</h3>
                <p className="text-gray-700 mb-2"><strong>用途:</strong> アクションの実行</p>
                <p className="text-gray-700 mb-2"><strong>特徴:</strong> クリックすると処理を実行します</p>
                <p className="text-gray-700"><strong>使用例:</strong> OK、キャンセル、実行ボタンなど</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">☑️ CheckBox（チェックボックス）</h3>
                <p className="text-gray-700 mb-2"><strong>用途:</strong> オン/オフの選択</p>
                <p className="text-gray-700 mb-2"><strong>特徴:</strong> True/Falseの2値を選択できます</p>
                <p className="text-gray-700"><strong>使用例:</strong> オプション選択、同意チェックなど</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📋 ComboBox（コンボボックス）</h3>
                <p className="text-gray-700 mb-2"><strong>用途:</strong> ドロップダウンリストからの選択</p>
                <p className="text-gray-700 mb-2"><strong>特徴:</strong> 複数の選択肢から1つを選べます</p>
                <p className="text-gray-700"><strong>使用例:</strong> 都道府県選択、カテゴリ選択など</p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">📜 ListBox（リストボックス）</h3>
                <p className="text-gray-700 mb-2"><strong>用途:</strong> リストからの選択</p>
                <p className="text-gray-700 mb-2"><strong>特徴:</strong> 複数の項目を一覧表示し、選択できます</p>
                <p className="text-gray-700"><strong>使用例:</strong> ファイル選択、項目一覧など</p>
              </div>
            </div>
          </section>

          {/* 4. フォームのデザイン方法 */}
          <section id="design" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">4. フォームのデザイン方法</h2>
            <p className="text-gray-700 mb-4">
              フォームをデザインする具体的な手順を説明します。
            </p>
            <div className="my-8">
              <Image
                src="/guides/userform-02-design.webp"
                alt="フォームデザイン中の画面"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">コントロールを配置してフォームをデザイン</p>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">ステップ1: フォームの基本設定</h3>
                <p className="text-gray-700 mb-3">
                  まず、左下の「フォーム設定」でフォームの基本情報を設定します。
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>タイトル:</strong> フォームのタイトルバーに表示される文字列（デフォルト: UserForm1）</li>
                  <li><strong>幅:</strong> フォームの幅をピクセル単位で指定（デフォルト: 400）</li>
                  <li><strong>高さ:</strong> フォームの高さをピクセル単位で指定（デフォルト: 300）</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">ステップ2: コントロールの追加</h3>
                <p className="text-gray-700 mb-3">
                  左側の「ツールボックス」から追加したいコントロールをクリックします。
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>クリックすると、中央のデザインエリアにコントロールが自動的に配置されます</li>
                  <li>コントロールは縦に並んで配置されます（後でプロパティで位置を調整可能）</li>
                  <li>必要な数だけコントロールを追加できます</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">ステップ3: コントロールの選択</h3>
                <p className="text-gray-700 mb-3">
                  デザインエリアに配置されたコントロールをクリックすると、そのコントロールが選択されます。
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>選択されたコントロールは青い枠線で強調表示されます</li>
                  <li>右側のプロパティパネルに、選択したコントロールのプロパティが表示されます</li>
                  <li>別のコントロールをクリックすると、選択が切り替わります</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">ステップ4: コントロールの削除</h3>
                <p className="text-gray-700 mb-3">
                  不要なコントロールは、右側のプロパティパネルの「削除」ボタンで削除できます。
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li>削除したいコントロールを選択</li>
                  <li>プロパティパネル下部の赤い「削除」ボタンをクリック</li>
                  <li>確認なしで即座に削除されます（注意してください）</li>
                </ul>
              </div>
            </div>
          </section>

          {/* 5. プロパティの設定 */}
          <section id="properties" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">5. プロパティの設定</h2>
            <p className="text-gray-700 mb-4">
              各コントロールのプロパティを設定することで、見た目や動作をカスタマイズできます。
            </p>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">共通プロパティ</h3>
              <p className="text-gray-700 mb-3">すべてのコントロールに共通するプロパティ:</p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>名前:</strong> コントロールの識別名（例: label1, textbox1）。VBAコード内で使用されます</li>
                <li><strong>X座標:</strong> フォーム左端からの距離（ピクセル）</li>
                <li><strong>Y座標:</strong> フォーム上端からの距離（ピクセル）</li>
                <li><strong>幅:</strong> コントロールの幅（ピクセル）</li>
                <li><strong>高さ:</strong> コントロールの高さ（ピクセル）</li>
              </ul>
            </div>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Label固有のプロパティ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>テキスト:</strong> ラベルに表示される文字列</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">TextBox固有のプロパティ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>テキスト:</strong> テキストボックスの初期値（空欄も可）</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Button固有のプロパティ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>テキスト:</strong> ボタンに表示される文字列（例: OK、キャンセル）</li>
                </ul>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">CheckBox固有のプロパティ</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  <li><strong>テキスト:</strong> チェックボックスの横に表示されるラベル文字列</li>
                </ul>
              </div>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mt-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">💡 プロパティ設定のコツ</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>名前は分かりやすく: 「textbox1」より「txtName」のように用途が分かる名前にする</li>
                <li>配置を整える: X座標、Y座標を調整してコントロールを綺麗に整列させる</li>
                <li>サイズを統一: 同じ種類のコントロールは幅や高さを揃えると見やすい</li>
              </ul>
            </div>
          </section>

          {/* 6. コードの生成と使用 */}
          <section id="code-generation" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">6. コードの生成と使用</h2>
            <p className="text-gray-700 mb-4">
              フォームのデザインが完成したら、VBAコードを生成してVBAエディタで使用します。
            </p>
            <div className="my-8">
              <Image
                src="/guides/userform-03-code.webp"
                alt="生成されたVBAコード"
                width={1200}
                height={800}
                className="rounded-lg shadow-lg"
              />
              <p className="text-sm text-gray-600 text-center mt-2">生成されたVBAコード</p>
            </div>
            <div className="bg-indigo-50 border-l-4 border-indigo-600 p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">コード生成の手順</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>フォームのデザインが完成したら、「コードを表示」ボタンをクリック</li>
                <li>デザインエリアが「生成されたVBAコード」に切り替わります</li>
                <li>コードブロック右上の緑色の「コピー」ボタンをクリック</li>
                <li>コードがクリップボードにコピーされます</li>
                <li>VBAエディタを開き、新しいUserFormを挿入</li>
                <li>UserFormのコードウィンドウにコピーしたコードを貼り付け</li>
              </ol>
            </div>
            <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">生成されるコードの内容</h3>
              <p className="text-gray-700 mb-3">
                生成されるVBAコードには以下の内容が含まれます:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li><strong>フォーム情報:</strong> UserFormの名前、サイズ</li>
                <li><strong>コントロール一覧:</strong> 配置したすべてのコントロールの名前と種類</li>
                <li><strong>UserForm_Initialize:</strong> フォーム初期化処理（サイズ設定、コントロール配置）</li>
                <li><strong>各コントロールの設定:</strong> 位置、サイズ、テキストなどのプロパティ設定コード</li>
              </ul>
            </div>
            <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">⚠️ コード使用時の注意</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>生成されたコードは初期化処理のみです。ボタンクリック時の処理などは別途追加が必要です</li>
                <li>VBAエディタでUserFormを作成する際、フォームのプロパティ（WidthやHeightなど）も手動で設定してください</li>
                <li>コントロールの配置は自動的に行われますが、見た目を微調整したい場合はVBAエディタで調整できます</li>
              </ul>
            </div>
          </section>

          {/* 7. 効果的な活用のコツ */}
          <section id="tips" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">7. 効果的な活用のコツ</h2>
            <p className="text-gray-700 mb-4">
              UserFormシミュレーターをより効果的に活用するためのコツをご紹介します。
            </p>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 まず紙に設計図を描く</h3>
                <p className="text-gray-700">
                  いきなりコントロールを配置するのではなく、まず紙やホワイトボードにフォームの設計図を描きましょう。どのコントロールをどこに配置するか、どんな情報を入力してもらうかを事前に計画することで、効率的にデザインできます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 コントロール名は分かりやすく</h3>
                <p className="text-gray-700">
                  デフォルトの「label1」「textbox1」ではなく、「lblName」「txtEmail」のように、用途が分かる名前に変更しましょう。後でVBAコードを書く際に、どのコントロールが何を表しているか一目で分かります。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 配置を整える</h3>
                <p className="text-gray-700">
                  X座標、Y座標を調整して、コントロールを綺麗に整列させましょう。例えば、ラベルとテキストボックスのY座標を揃える、ボタンを等間隔に配置するなど、見た目を整えることでユーザビリティが向上します。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 段階的にデザイン</h3>
                <p className="text-gray-700">
                  すべてのコントロールを一度に配置するのではなく、まず基本的なコントロール（ラベルとテキストボックス）を配置し、コードを生成して動作確認してから、追加のコントロールを配置していくと、エラーを防げます。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">💡 生成コードをベースに拡張</h3>
                <p className="text-gray-700">
                  生成されたコードはあくまで初期化処理です。ボタンクリック時の処理、入力検証、エラーハンドリングなどは、VBAエディタで追加しましょう。シミュレーターで基本構造を作り、VBAエディタで機能を追加するという流れが効率的です。
                </p>
              </div>
            </div>
          </section>

          {/* 8. よくある質問 */}
          <section id="faq" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">8. よくある質問</h2>
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. 生成されたコードをそのまま使えますか?</h3>
                <p className="text-gray-700">
                  A. 生成されたコードは、UserFormの初期化処理（コントロールの配置と基本設定）のみです。ボタンクリック時の処理などは別途VBAエディタで追加する必要があります。シミュレーターはフォームの骨組みを作るツールとお考えください。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. コントロールの位置を後から変更できますか?</h3>
                <p className="text-gray-700">
                  A. はい、右側のプロパティパネルでX座標、Y座標を変更することで、コントロールの位置を調整できます。ただし、デザインエリアでのドラッグ&ドロップには対応していないため、数値で指定する必要があります。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. デザインを保存できますか?</h3>
                <p className="text-gray-700">
                  A. 現在のバージョンでは、デザインの保存機能はありません。生成されたコードをコピーして保存しておくことをお勧めします。コードから再度フォームを再現することは可能です。
                </p>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Q. もっと多くのコントロールに対応する予定はありますか?</h3>
                <p className="text-gray-700">
                  A. はい、将来的にはOptionButton、Frame、Image、ScrollBarなど、より多くのコントロールに対応する予定です。現在は基本的な6種類のコントロールをサポートしています。
                </p>
              </div>
            </div>
          </section>

          {/* 9. 関連ツール */}
          <section id="related" className="mb-12 scroll-mt-20">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">9. 関連ツール</h2>
            <p className="text-gray-700 mb-6">
              UserFormシミュレーターと併せて使用すると便利なツールをご紹介します。
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Link href="/tools/generator" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">VBAコードジェネレーター</h3>
                <p className="text-gray-700">
                  UserFormで使用する処理（ループ、ファイル操作など）のコードを自動生成。フォームと組み合わせて完全なアプリケーションを作成できます。
                </p>
              </Link>
              <Link href="/references" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">逆引きリファレンス</h3>
                <p className="text-gray-700">
                  UserFormで使用する処理（入力検証、データ保存など）のコード例を検索。実践的な処理を素早く見つけられます。
                </p>
              </Link>
              <Link href="/functions" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">関数・ステートメント解説</h3>
                <p className="text-gray-700">
                  UserFormで使用する関数（MsgBox、InputBoxなど）を詳しく学習。フォームの機能を拡張する際に役立ちます。
                </p>
              </Link>
              <Link href="/errors" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-bold text-indigo-600 mb-3">エラー辞典</h3>
                <p className="text-gray-700">
                  UserForm実装中のエラーを素早く解決。エラー番号やメッセージから原因と対処法を検索できます。
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 text-center mt-12">
            <h2 className="text-3xl font-bold mb-4">今すぐUserFormシミュレーターを使ってみよう</h2>
            <p className="text-lg mb-6">
              ビジュアルエディタで簡単にUserFormをデザインし、VBAコードを自動生成
            </p>
            <Link
              href="/userform"
              className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors"
            >
              UserFormシミュレーターを開く
            

          {/* Feedback Section */}
          <div className="mt-12">
          </div>


          {/* Feedback Section */}
          <div className="mt-12">
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
