'use client';

import Header from '@/components/Header';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen} from 'lucide-react';

interface VBAError {
  code: number;
  name: string;
  description: string;
  causes: string[];
  solutions: string[];
  example?: string;
  category: string;
}

const vbaErrors: VBAError[] = [
  {
    code: 3,
    name: 'Return without GoSub',
    description: 'GoSubステートメントなしでReturnステートメントが実行されました。',
    causes: [
      'GoSubを使用せずにReturnステートメントを使用した',
      'GoSubとReturnの対応が取れていない'
    ],
    solutions: [
      'GoSubステートメントを使用してサブルーチンを呼び出す',
      'GoSubとReturnの対応を確認する',
      '代わりにSubプロシージャやFunctionプロシージャを使用する'
    ],
    example: `' 正しい例
Sub Example()
    GoSub SubRoutine
    Exit Sub
SubRoutine:
    Debug.Print "サブルーチン実行"
    Return
End Sub`,
    category: 'フロー制御'
  },
  {
    code: 5,
    name: 'Invalid procedure call or argument',
    description: 'プロシージャの呼び出しまたは引数が無効です。',
    causes: [
      '引数の型が正しくない',
      '引数の数が正しくない',
      '無効な値が渡された（負の値など）',
      '配列の範囲外にアクセスした'
    ],
    solutions: [
      '引数の型を確認する',
      '引数の数を確認する',
      '値の範囲を確認する',
      '配列のインデックスを確認する'
    ],
    example: `' エラーの例
Left("文字列", -1) ' 負の値はエラー

' 正しい例
Left("文字列", 3) ' "文字"`,
    category: 'プロシージャ'
  },
  {
    code: 6,
    name: 'Overflow',
    description: '演算結果が変数の型で表現できる範囲を超えました。',
    causes: [
      '変数の型の範囲を超える値を代入した',
      '演算結果が型の範囲を超えた',
      'Integer型で32767を超える値を扱った'
    ],
    solutions: [
      'より大きな型（Long、Double等）を使用する',
      '演算の途中結果も考慮して型を選択する',
      '値の範囲チェックを行う'
    ],
    example: `' エラーの例
Dim i As Integer
i = 40000 ' Integerの範囲外

' 正しい例
Dim i As Long
i = 40000 ' OK`,
    category: '演算'
  },
  {
    code: 7,
    name: 'Out of memory',
    description: 'メモリが不足しています。',
    causes: [
      '大量のデータを扱っている',
      'メモリリークが発生している',
      'オブジェクトを解放していない',
      '配列のサイズが大きすぎる'
    ],
    solutions: [
      '不要なオブジェクトをNothingで解放する',
      '配列のサイズを見直す',
      '処理を分割する',
      'Excelを再起動する'
    ],
    example: `' オブジェクトの解放
Dim wb As Workbook
Set wb = Workbooks.Open("ファイル.xlsx")
' 処理...
wb.Close
Set wb = Nothing ' メモリ解放`,
    category: 'メモリ'
  },
  {
    code: 9,
    name: 'Subscript out of range',
    description: '配列のインデックスまたはコレクションの要素が範囲外です。',
    causes: [
      '配列の範囲外にアクセスした',
      '存在しないシート名を指定した',
      '存在しないコレクション要素にアクセスした',
      '配列が初期化されていない'
    ],
    solutions: [
      '配列の上限・下限を確認する（LBound、UBound）',
      'シート名やインデックスの存在を確認する',
      'エラーハンドリングを追加する',
      '配列を正しく初期化する'
    ],
    example: `' エラーの例
Worksheets("存在しないシート").Activate

' 正しい例
On Error Resume Next
Dim ws As Worksheet
Set ws = Worksheets("シート名")
If ws Is Nothing Then
    MsgBox "シートが見つかりません"
End If`,
    category: '配列・コレクション'
  },
  {
    code: 11,
    name: 'Division by zero',
    description: 'ゼロで除算しようとしました。',
    causes: [
      '除数が0になっている',
      '変数が初期化されていない（初期値0）',
      '計算結果が0になった'
    ],
    solutions: [
      '除算前に除数が0でないか確認する',
      '変数を適切に初期化する',
      'エラーハンドリングを追加する'
    ],
    example: `' エラーの例
result = 10 / 0

' 正しい例
If divisor <> 0 Then
    result = 10 / divisor
Else
    MsgBox "ゼロで除算できません"
End If`,
    category: '演算'
  },
  {
    code: 13,
    name: 'Type mismatch',
    description: 'データ型が一致しません。',
    causes: [
      '文字列を数値として扱った',
      '数値を文字列として扱った',
      'オブジェクト型の不一致',
      'Null値を扱った'
    ],
    solutions: [
      'データ型を確認する（TypeName関数）',
      '型変換関数を使用する（CInt、CLng、CStr等）',
      'IsNumeric関数で数値かチェックする',
      'IsNull関数でNullをチェックする'
    ],
    example: `' エラーの例
Dim num As Integer
num = "文字列"

' 正しい例
Dim str As String
str = "123"
If IsNumeric(str) Then
    num = CInt(str)
End If`,
    category: 'データ型'
  },
  {
    code: 28,
    name: 'Out of stack space',
    description: 'スタック領域が不足しています。',
    causes: [
      '再帰呼び出しが深すぎる',
      '終了条件のない再帰',
      'ローカル変数が多すぎる'
    ],
    solutions: [
      '再帰の深さを制限する',
      '再帰をループに書き換える',
      'ローカル変数を減らす',
      '終了条件を確認する'
    ],
    example: `' エラーの例（無限再帰）
Function Factorial(n As Long) As Long
    Factorial = n * Factorial(n - 1) ' 終了条件なし
End Function

' 正しい例
Function Factorial(n As Long) As Long
    If n <= 1 Then
        Factorial = 1
    Else
        Factorial = n * Factorial(n - 1)
    End If
End Function`,
    category: 'プロシージャ'
  },
  {
    code: 52,
    name: 'Bad file name or number',
    description: 'ファイル名またはファイル番号が正しくありません。',
    causes: [
      '無効なファイル番号を使用した',
      'ファイルが開かれていない',
      'ファイル番号が重複している'
    ],
    solutions: [
      'FreeFile関数を使用して空いているファイル番号を取得する',
      'ファイルを開いてから操作する',
      'ファイル番号を確認する'
    ],
    example: `' 正しい例
Dim fileNum As Integer
fileNum = FreeFile
Open "C:\\test.txt" For Output As #fileNum
Print #fileNum, "テキスト"
Close #fileNum`,
    category: 'ファイル操作'
  },
  {
    code: 53,
    name: 'File not found',
    description: 'ファイルが見つかりません。',
    causes: [
      'ファイルパスが間違っている',
      'ファイルが存在しない',
      'ファイル名のスペルミス',
      '相対パスの基準が間違っている'
    ],
    solutions: [
      'ファイルパスを確認する',
      'Dir関数でファイルの存在を確認する',
      '絶対パスを使用する',
      'ファイル選択ダイアログを使用する'
    ],
    example: `' 正しい例
Dim filePath As String
filePath = "C:\\test.txt"
If Dir(filePath) <> "" Then
    ' ファイルが存在する
    Workbooks.Open filePath
Else
    MsgBox "ファイルが見つかりません"
End If`,
    category: 'ファイル操作'
  },
  {
    code: 58,
    name: 'File already exists',
    description: 'ファイルが既に存在します。',
    causes: [
      '既存のファイルと同じ名前で保存しようとした',
      'Name ステートメントで既存ファイル名を指定した'
    ],
    solutions: [
      '既存ファイルを削除してから作成する',
      '別のファイル名を使用する',
      'ファイルの存在を確認してから処理する'
    ],
    example: `' 正しい例
Dim filePath As String
filePath = "C:\\test.txt"
If Dir(filePath) <> "" Then
    Kill filePath ' 既存ファイルを削除
End If
' ファイル作成処理`,
    category: 'ファイル操作'
  },
  {
    code: 70,
    name: 'Permission denied',
    description: 'アクセス許可がありません。',
    causes: [
      'ファイルが読み取り専用',
      'ファイルが他のプロセスで使用中',
      'フォルダへの書き込み権限がない',
      'ファイルが開いている'
    ],
    solutions: [
      'ファイルを閉じる',
      '読み取り専用属性を解除する',
      '管理者権限で実行する',
      '別の場所に保存する'
    ],
    example: `' ファイルが開いているか確認
On Error Resume Next
Workbooks.Open "C:\\test.xlsx"
If Err.Number = 70 Then
    MsgBox "ファイルが使用中です"
End If
On Error GoTo 0`,
    category: 'ファイル操作'
  },
  {
    code: 91,
    name: 'Object variable or With block variable not set',
    description: 'オブジェクト変数またはWithブロック変数が設定されていません。',
    causes: [
      'Setステートメントを使用せずにオブジェクトを代入した',
      'オブジェクトがNothingのまま使用された',
      'オブジェクトの初期化に失敗した'
    ],
    solutions: [
      'Setステートメントを使用する',
      'オブジェクトがNothingでないか確認する（Is Nothing）',
      'オブジェクトを正しく初期化する'
    ],
    example: `' エラーの例
Dim ws As Worksheet
ws.Name = "新しいシート" ' Setなし

' 正しい例
Dim ws As Worksheet
Set ws = Worksheets.Add
If Not ws Is Nothing Then
    ws.Name = "新しいシート"
End If`,
    category: 'オブジェクト'
  },
  {
    code: 94,
    name: 'Invalid use of Null',
    description: 'Nullの使い方が正しくありません。',
    causes: [
      'Null値を通常の変数に代入しようとした',
      'Null値を含む演算を行った',
      'データベースからNull値を取得した'
    ],
    solutions: [
      'IsNull関数でNullをチェックする',
      'Variant型を使用する',
      'Null値を適切に処理する',
      'Nz関数（Access）を使用する'
    ],
    example: `' 正しい例
Dim value As Variant
value = Range("A1").Value
If IsNull(value) Then
    MsgBox "値がNullです"
Else
    ' 通常の処理
End If`,
    category: 'データ型'
  },
  {
    code: 400,
    name: 'Form already displayed; can\'t show modally',
    description: 'フォームが既に表示されています。モーダルで表示できません。',
    causes: [
      'モードレスで表示されているフォームをモーダルで表示しようとした',
      'フォームが既に表示されている'
    ],
    solutions: [
      'フォームを一度閉じてから再表示する',
      'Unload ステートメントでフォームをアンロードする',
      'モードレス表示を使用する'
    ],
    example: `' 正しい例
Unload UserForm1
UserForm1.Show vbModal`,
    category: 'UserForm'
  },
  {
    code: 424,
    name: 'Object required',
    description: 'オブジェクトが必要です。',
    causes: [
      'オブジェクト変数以外でオブジェクトのメンバーにアクセスしようとした',
      'Withステートメントの対象がオブジェクトでない',
      'Setを使わずにオブジェクトを代入した'
    ],
    solutions: [
      'オブジェクト変数を正しく宣言する',
      'Setステートメントを使用する',
      '変数の型を確認する'
    ],
    example: `' エラーの例
Dim ws
ws = Worksheets(1) ' Setなし

' 正しい例
Dim ws As Worksheet
Set ws = Worksheets(1)`,
    category: 'オブジェクト'
  },
  {
    code: 429,
    name: 'ActiveX component can\'t create object',
    description: 'ActiveXコンポーネントはオブジェクトを作成できません。',
    causes: [
      'ActiveXコンポーネントが登録されていない',
      'DLLファイルが見つからない',
      '32bit/64bitの不一致',
      '必要なライブラリが参照設定されていない'
    ],
    solutions: [
      'ActiveXコンポーネントを再登録する',
      '参照設定を確認する',
      'Office/Excelのビット数を確認する',
      '必要なDLLをインストールする'
    ],
    example: `' エラーが発生する可能性のある例
Dim obj As Object
Set obj = CreateObject("未登録のCOMオブジェクト")

' 正しい例（存在するオブジェクト）
Dim fso As Object
Set fso = CreateObject("Scripting.FileSystemObject")`,
    category: 'ActiveX'
  },
  {
    code: 438,
    name: 'Object doesn\'t support this property or method',
    description: 'オブジェクトはこのプロパティまたはメソッドをサポートしていません。',
    causes: [
      '存在しないプロパティやメソッドを使用した',
      'オブジェクトの型が間違っている',
      'スペルミス',
      'Excelのバージョンによる非対応'
    ],
    solutions: [
      'プロパティ・メソッド名のスペルを確認する',
      'オブジェクトの型を確認する',
      'オブジェクトブラウザで利用可能なメンバーを確認する',
      'Excelのバージョンを確認する'
    ],
    example: `' エラーの例
Range("A1").NonExistentMethod ' 存在しないメソッド

' 正しい例
Range("A1").Value = "テスト"`,
    category: 'オブジェクト'
  },
  {
    code: 1004,
    name: 'Application-defined or object-defined error',
    description: 'アプリケーション定義またはオブジェクト定義のエラーです。',
    causes: [
      '無効な範囲指定',
      '存在しないシート名',
      '無効なセル参照',
      '保護されたシートへの書き込み',
      '多様な原因（汎用エラー）'
    ],
    solutions: [
      'エラーが発生する直前の処理を特定する',
      'デバッグモードで1行ずつ実行する',
      'オブジェクトの存在を確認する',
      'シートの保護状態を確認する',
      '範囲指定が正しいか確認する'
    ],
    example: `' エラーの例
Range("A1:Z1000000").Value = "テスト" ' 範囲が大きすぎる

' 正しい例
On Error Resume Next
Range("A1:A100").Value = "テスト"
If Err.Number <> 0 Then
    MsgBox "エラー: " & Err.Description
End If
On Error GoTo 0`,
    category: 'Excel'
  }
];

const categories = ['すべて', 'フロー制御', 'プロシージャ', '演算', 'メモリ', '配列・コレクション', 'データ型', 'ファイル操作', 'オブジェクト', 'UserForm', 'ActiveX', 'Excel'];

export default function ErrorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [expandedError, setExpandedError] = useState<number | null>(null);

  const filteredErrors = useMemo(() => {
    return vbaErrors.filter(error => {
      const matchesSearch = 
        searchTerm === '' ||
        error.code.toString().includes(searchTerm) ||
        error.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        error.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'すべて' || 
        error.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleError = (code: number) => {
    setExpandedError(expandedError === code ? null : code);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            VBAエラーコード逆引き辞典
          </h1>
          <p className="text-gray-600 text-lg">
            VBAのエラーコードから原因と解決方法を素早く検索
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                検索
              </label>
              <input
                type="text"
                placeholder="エラーコード、名前、説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {filteredErrors.length}件のエラーが見つかりました
          </div>
        </div>

        {/* Error List */}
        <div className="space-y-4">
          {filteredErrors.map(error => (
            <div
              key={error.code}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleError(error.code)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                        エラー {error.code}
                      </span>
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                        {error.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {error.name}
                    </h3>
                    <p className="text-gray-600">
                      {error.description}
                    </p>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <svg
                      className={`w-6 h-6 transform transition-transform ${
                        expandedError === error.code ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </div>
              </div>

              {expandedError === error.code && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  {/* Causes */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-orange-500">⚠️</span>
                      主な原因
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {error.causes.map((cause, index) => (
                        <li key={index}>{cause}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                      <span className="text-green-500">✓</span>
                      解決方法
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {error.solutions.map((solution, index) => (
                        <li key={index}>{solution}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Example */}
                  {error.example && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                        <span className="text-blue-500">💡</span>
                        コード例
                      </h4>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{error.example}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredErrors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するエラーが見つかりませんでした</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
      </div>
    </>
  );
}
