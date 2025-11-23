'use client';

import Header from '@/components/Header';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { BookOpen} from 'lucide-react';

interface VBAFunction {
  id: number;
  name: string;
  category: string;
  description: string;
  syntax: string;
  parameters: { name: string; description: string; optional?: boolean }[];
  returnType: string;
  examples: { title: string; code: string; output?: string }[];
  notes?: string[];
  relatedFunctions?: string[];
}

const vbaFunctions: VBAFunction[] = [
  {
    id: 1,
    name: 'MsgBox',
    category: 'ダイアログ',
    description: 'メッセージボックスを表示し、ユーザーの応答を取得します。',
    syntax: 'MsgBox(prompt, [buttons], [title], [helpfile], [context])',
    parameters: [
      { name: 'prompt', description: '表示するメッセージ' },
      { name: 'buttons', description: 'ボタンの種類とアイコン', optional: true },
      { name: 'title', description: 'タイトルバーに表示する文字列', optional: true },
      { name: 'helpfile', description: 'ヘルプファイルのパス', optional: true },
      { name: 'context', description: 'ヘルプコンテキスト番号', optional: true }
    ],
    returnType: 'VbMsgBoxResult (押されたボタンの値)',
    examples: [
      {
        title: '基本的な使用',
        code: 'MsgBox "こんにちは！"',
        output: 'メッセージボックスに「こんにちは！」と表示'
      },
      {
        title: 'はい/いいえボタン',
        code: `Dim result As VbMsgBoxResult
result = MsgBox("続行しますか？", vbYesNo + vbQuestion, "確認")
If result = vbYes Then
    MsgBox "はいが選択されました"
Else
    MsgBox "いいえが選択されました"
End If`,
        output: 'ユーザーの選択に応じて処理を分岐'
      }
    ],
    notes: [
      'buttonsパラメータには定数を組み合わせて指定できます',
      'vbOKOnly, vbYesNo, vbYesNoCancel などのボタン定数',
      'vbInformation, vbQuestion, vbExclamation, vbCritical などのアイコン定数'
    ],
    relatedFunctions: ['InputBox']
  },
  {
    id: 2,
    name: 'InputBox',
    category: 'ダイアログ',
    description: 'ユーザーに入力を求めるダイアログボックスを表示します。',
    syntax: 'InputBox(prompt, [title], [default], [xpos], [ypos], [helpfile], [context])',
    parameters: [
      { name: 'prompt', description: '表示するメッセージ' },
      { name: 'title', description: 'タイトルバーに表示する文字列', optional: true },
      { name: 'default', description: 'デフォルトの入力値', optional: true },
      { name: 'xpos', description: 'X座標（左端からの距離）', optional: true },
      { name: 'ypos', description: 'Y座標（上端からの距離）', optional: true }
    ],
    returnType: 'String (入力された文字列)',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim name As String
name = InputBox("名前を入力してください", "入力")
MsgBox "こんにちは、" & name & "さん！"`,
        output: 'ユーザーが入力した名前を使用'
      },
      {
        title: 'デフォルト値付き',
        code: `Dim email As String
email = InputBox("メールアドレスを入力してください", "入力", "example@example.com")`,
        output: 'デフォルト値が入力欄に表示される'
      }
    ],
    notes: [
      'キャンセルボタンが押された場合、空文字列("")が返されます',
      '数値を入力させる場合はVal関数で変換が必要です'
    ],
    relatedFunctions: ['MsgBox']
  },
  {
    id: 3,
    name: 'Len',
    category: '文字列',
    description: '文字列の長さ（文字数）を返します。',
    syntax: 'Len(string)',
    parameters: [
      { name: 'string', description: '長さを調べる文字列' }
    ],
    returnType: 'Long (文字数)',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim length As Long
length = Len("Hello")
Debug.Print length  ' 5`,
        output: '5'
      },
      {
        title: '空文字列のチェック',
        code: `Dim str As String
str = InputBox("文字を入力してください")
If Len(str) = 0 Then
    MsgBox "何も入力されていません"
End If`,
        output: '入力がない場合にメッセージを表示'
      }
    ],
    notes: [
      '全角文字も1文字として数えます',
      'Null値を渡すとエラーになります'
    ],
    relatedFunctions: ['LenB', 'Left', 'Right', 'Mid']
  },
  {
    id: 4,
    name: 'Left',
    category: '文字列',
    description: '文字列の左端から指定した文字数を取得します。',
    syntax: 'Left(string, length)',
    parameters: [
      { name: 'string', description: '元の文字列' },
      { name: 'length', description: '取得する文字数' }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = Left("Hello World", 5)
Debug.Print result  ' "Hello"`,
        output: 'Hello'
      },
      {
        title: 'ファイル拡張子のチェック',
        code: `Dim filename As String
filename = "document.xlsx"
If Right(filename, 5) = ".xlsx" Then
    MsgBox "Excelファイルです"
End If`,
        output: 'ファイル拡張子を判定'
      }
    ],
    relatedFunctions: ['Right', 'Mid', 'Len']
  },
  {
    id: 5,
    name: 'Right',
    category: '文字列',
    description: '文字列の右端から指定した文字数を取得します。',
    syntax: 'Right(string, length)',
    parameters: [
      { name: 'string', description: '元の文字列' },
      { name: 'length', description: '取得する文字数' }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = Right("Hello World", 5)
Debug.Print result  ' "World"`,
        output: 'World'
      }
    ],
    relatedFunctions: ['Left', 'Mid', 'Len']
  },
  {
    id: 6,
    name: 'Mid',
    category: '文字列',
    description: '文字列の指定した位置から指定した文字数を取得します。',
    syntax: 'Mid(string, start, [length])',
    parameters: [
      { name: 'string', description: '元の文字列' },
      { name: 'start', description: '開始位置（1から始まる）' },
      { name: 'length', description: '取得する文字数', optional: true }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = Mid("Hello World", 7, 5)
Debug.Print result  ' "World"`,
        output: 'World'
      },
      {
        title: '長さを省略',
        code: `Dim result As String
result = Mid("Hello World", 7)
Debug.Print result  ' "World"`,
        output: 'World（7文字目から最後まで）'
      }
    ],
    notes: [
      'lengthを省略すると、startから最後までの文字列を返します'
    ],
    relatedFunctions: ['Left', 'Right', 'InStr']
  },
  {
    id: 7,
    name: 'InStr',
    category: '文字列',
    description: '文字列内で別の文字列を検索し、最初に見つかった位置を返します。',
    syntax: 'InStr([start], string1, string2, [compare])',
    parameters: [
      { name: 'start', description: '検索開始位置', optional: true },
      { name: 'string1', description: '検索対象の文字列' },
      { name: 'string2', description: '検索する文字列' },
      { name: 'compare', description: '比較方法（vbBinaryCompare/vbTextCompare）', optional: true }
    ],
    returnType: 'Long (見つかった位置、見つからない場合は0)',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim pos As Long
pos = InStr("Hello World", "World")
Debug.Print pos  ' 7`,
        output: '7'
      },
      {
        title: '文字列の存在チェック',
        code: `Dim text As String
text = "example@example.com"
If InStr(text, "@") > 0 Then
    MsgBox "メールアドレス形式です"
End If`,
        output: '@が含まれているか確認'
      }
    ],
    notes: [
      '見つからない場合は0を返します',
      '大文字小文字を区別しない検索にはvbTextCompareを使用します'
    ],
    relatedFunctions: ['InStrRev', 'Replace', 'Mid']
  },
  {
    id: 8,
    name: 'Replace',
    category: '文字列',
    description: '文字列内の指定した部分文字列を別の文字列に置換します。',
    syntax: 'Replace(expression, find, replace, [start], [count], [compare])',
    parameters: [
      { name: 'expression', description: '元の文字列' },
      { name: 'find', description: '検索する文字列' },
      { name: 'replace', description: '置換後の文字列' },
      { name: 'start', description: '開始位置', optional: true },
      { name: 'count', description: '置換する回数', optional: true },
      { name: 'compare', description: '比較方法', optional: true }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = Replace("Hello World", "World", "VBA")
Debug.Print result  ' "Hello VBA"`,
        output: 'Hello VBA'
      },
      {
        title: '複数の置換',
        code: `Dim text As String
text = "apple apple apple"
text = Replace(text, "apple", "orange")
Debug.Print text  ' "orange orange orange"`,
        output: 'すべてのappleがorangeに置換される'
      }
    ],
    relatedFunctions: ['InStr', 'Mid']
  },
  {
    id: 9,
    name: 'UCase',
    category: '文字列',
    description: '文字列を大文字に変換します。',
    syntax: 'UCase(string)',
    parameters: [
      { name: 'string', description: '変換する文字列' }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = UCase("hello world")
Debug.Print result  ' "HELLO WORLD"`,
        output: 'HELLO WORLD'
      }
    ],
    relatedFunctions: ['LCase', 'StrConv']
  },
  {
    id: 10,
    name: 'LCase',
    category: '文字列',
    description: '文字列を小文字に変換します。',
    syntax: 'LCase(string)',
    parameters: [
      { name: 'string', description: '変換する文字列' }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = LCase("HELLO WORLD")
Debug.Print result  ' "hello world"`,
        output: 'hello world'
      }
    ],
    relatedFunctions: ['UCase', 'StrConv']
  },
  {
    id: 11,
    name: 'Trim',
    category: '文字列',
    description: '文字列の前後の空白を削除します。',
    syntax: 'Trim(string)',
    parameters: [
      { name: 'string', description: '処理する文字列' }
    ],
    returnType: 'String',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim result As String
result = Trim("  Hello World  ")
Debug.Print result  ' "Hello World"`,
        output: 'Hello World'
      }
    ],
    notes: [
      '文字列の途中の空白は削除されません',
      '前後の空白のみが削除されます'
    ],
    relatedFunctions: ['LTrim', 'RTrim']
  },
  {
    id: 12,
    name: 'Val',
    category: '変換',
    description: '文字列を数値に変換します。',
    syntax: 'Val(string)',
    parameters: [
      { name: 'string', description: '変換する文字列' }
    ],
    returnType: 'Double',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim num As Double
num = Val("123.45")
Debug.Print num  ' 123.45`,
        output: '123.45'
      },
      {
        title: '数値以外の文字を含む場合',
        code: `Dim num As Double
num = Val("123abc")
Debug.Print num  ' 123（数値部分のみ）`,
        output: '123'
      }
    ],
    notes: [
      '数値に変換できない場合は0を返します',
      '文字列の先頭から数値として認識できる部分のみを変換します'
    ],
    relatedFunctions: ['CInt', 'CLng', 'CDbl', 'IsNumeric']
  },
  {
    id: 13,
    name: 'IsNumeric',
    category: '判定',
    description: '式が数値として評価できるかどうかを判定します。',
    syntax: 'IsNumeric(expression)',
    parameters: [
      { name: 'expression', description: '判定する式' }
    ],
    returnType: 'Boolean',
    examples: [
      {
        title: '基本的な使用',
        code: `If IsNumeric("123") Then
    MsgBox "数値です"
End If`,
        output: '数値として評価可能な場合Trueを返す'
      },
      {
        title: '入力値の検証',
        code: `Dim input As String
input = InputBox("数値を入力してください")
If IsNumeric(input) Then
    Dim num As Double
    num = CDbl(input)
Else
    MsgBox "数値を入力してください"
End If`,
        output: 'ユーザー入力の検証'
      }
    ],
    relatedFunctions: ['IsDate', 'IsEmpty', 'IsNull', 'Val']
  },
  {
    id: 14,
    name: 'Date',
    category: '日付時刻',
    description: '現在のシステム日付を返します。',
    syntax: 'Date',
    parameters: [],
    returnType: 'Date',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim today As Date
today = Date
Debug.Print today`,
        output: '2025/11/22（実行日の日付）'
      }
    ],
    relatedFunctions: ['Now', 'Time', 'DateAdd', 'DateDiff']
  },
  {
    id: 15,
    name: 'Now',
    category: '日付時刻',
    description: '現在のシステム日付と時刻を返します。',
    syntax: 'Now',
    parameters: [],
    returnType: 'Date',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim current As Date
current = Now
Debug.Print current`,
        output: '2025/11/22 14:30:45（実行時の日時）'
      }
    ],
    relatedFunctions: ['Date', 'Time', 'Format']
  },
  {
    id: 16,
    name: 'DateAdd',
    category: '日付時刻',
    description: '指定した日付に期間を加算した日付を返します。',
    syntax: 'DateAdd(interval, number, date)',
    parameters: [
      { name: 'interval', description: '加算する単位（"d"=日、"m"=月、"yyyy"=年など）' },
      { name: 'number', description: '加算する数' },
      { name: 'date', description: '基準日' }
    ],
    returnType: 'Date',
    examples: [
      {
        title: '日付の加算',
        code: `Dim tomorrow As Date
tomorrow = DateAdd("d", 1, Date)
Debug.Print tomorrow  ' 明日の日付

Dim nextMonth As Date
nextMonth = DateAdd("m", 1, Date)
Debug.Print nextMonth  ' 1ヶ月後`,
        output: '指定した期間後の日付'
      }
    ],
    notes: [
      'intervalには "yyyy"(年)、"m"(月)、"d"(日)、"h"(時)、"n"(分)、"s"(秒) などが使用できます'
    ],
    relatedFunctions: ['DateDiff', 'Date', 'Now']
  },
  {
    id: 17,
    name: 'DateDiff',
    category: '日付時刻',
    description: '2つの日付の間隔を返します。',
    syntax: 'DateDiff(interval, date1, date2, [firstdayofweek], [firstweekofyear])',
    parameters: [
      { name: 'interval', description: '間隔の単位' },
      { name: 'date1', description: '開始日' },
      { name: 'date2', description: '終了日' },
      { name: 'firstdayofweek', description: '週の最初の曜日', optional: true },
      { name: 'firstweekofyear', description: '年の最初の週', optional: true }
    ],
    returnType: 'Long',
    examples: [
      {
        title: '日数の計算',
        code: `Dim days As Long
days = DateDiff("d", Date, #12/31/2025#)
Debug.Print days & "日後"`,
        output: '指定日までの日数'
      },
      {
        title: '年齢の計算',
        code: `Dim age As Long
age = DateDiff("yyyy", #1/1/1990#, Date)
Debug.Print age & "歳"`,
        output: '年齢を計算'
      }
    ],
    relatedFunctions: ['DateAdd', 'Date', 'Now']
  },
  {
    id: 18,
    name: 'Format',
    category: '変換',
    description: '式を指定した書式で文字列に変換します。',
    syntax: 'Format(expression, [format])',
    parameters: [
      { name: 'expression', description: '書式設定する式' },
      { name: 'format', description: '書式文字列', optional: true }
    ],
    returnType: 'String',
    examples: [
      {
        title: '日付の書式設定',
        code: `Dim dateStr As String
dateStr = Format(Date, "yyyy/mm/dd")
Debug.Print dateStr  ' "2025/11/22"

dateStr = Format(Date, "yyyy年mm月dd日")
Debug.Print dateStr  ' "2025年11月22日"`,
        output: '指定した書式の日付文字列'
      },
      {
        title: '数値の書式設定',
        code: `Dim numStr As String
numStr = Format(1234.5, "#,##0.00")
Debug.Print numStr  ' "1,234.50"`,
        output: 'カンマ区切りの数値'
      }
    ],
    notes: [
      '日付書式: yyyy(年), mm(月), dd(日), hh(時), nn(分), ss(秒)',
      '数値書式: #(桁), 0(ゼロ表示), ,(カンマ), .(小数点)'
    ],
    relatedFunctions: ['FormatNumber', 'FormatDateTime', 'FormatPercent']
  },
  {
    id: 19,
    name: 'Array',
    category: '配列',
    description: 'Variant型の配列を作成します。',
    syntax: 'Array(arglist)',
    parameters: [
      { name: 'arglist', description: '配列の要素（カンマ区切り）' }
    ],
    returnType: 'Variant (配列)',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim arr As Variant
arr = Array("Apple", "Banana", "Orange")
Debug.Print arr(0)  ' "Apple"
Debug.Print arr(1)  ' "Banana"`,
        output: '配列の作成と要素へのアクセス'
      },
      {
        title: 'ループ処理',
        code: `Dim arr As Variant
arr = Array(1, 2, 3, 4, 5)
Dim i As Long
For i = LBound(arr) To UBound(arr)
    Debug.Print arr(i)
Next i`,
        output: '配列要素を順に処理'
      }
    ],
    relatedFunctions: ['LBound', 'UBound', 'ReDim']
  },
  {
    id: 20,
    name: 'UBound',
    category: '配列',
    description: '配列の指定した次元の最大インデックスを返します。',
    syntax: 'UBound(arrayname, [dimension])',
    parameters: [
      { name: 'arrayname', description: '配列変数' },
      { name: 'dimension', description: '次元（省略時は1）', optional: true }
    ],
    returnType: 'Long',
    examples: [
      {
        title: '基本的な使用',
        code: `Dim arr(5) As Integer
Debug.Print UBound(arr)  ' 5

Dim arr2 As Variant
arr2 = Array(1, 2, 3)
Debug.Print UBound(arr2)  ' 2`,
        output: '配列の最大インデックス'
      }
    ],
    relatedFunctions: ['LBound', 'Array', 'ReDim']
  }
];

const categories = ['すべて', 'ダイアログ', '文字列', '変換', '判定', '日付時刻', '配列'];

export default function FunctionsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [expandedFunc, setExpandedFunc] = useState<number | null>(null);

  const filteredFunctions = useMemo(() => {
    return vbaFunctions.filter(func => {
      const matchesSearch = 
        searchTerm === '' ||
        func.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        func.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'すべて' || 
        func.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const toggleFunc = (id: number) => {
    setExpandedFunc(expandedFunc === id ? null : id);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('コードをコピーしました！');
  };

  return (
    <>

      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            VBA関数・ステートメント解説
          </h1>
          <p className="text-gray-600 text-lg">
            VBAの組み込み関数を詳しく解説。構文、パラメータ、サンプルコード付き
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
                placeholder="関数名、説明で検索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                カテゴリ
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {filteredFunctions.length}件の関数が見つかりました
          </div>
        </div>

        {/* Function List */}
        <div className="space-y-4">
          {filteredFunctions.map(func => (
            <div
              key={func.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleFunc(func.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                        {func.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2 font-mono">
                      {func.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {func.description}
                    </p>
                    <code className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {func.syntax}
                    </code>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <svg
                      className={`w-6 h-6 transform transition-transform ${
                        expandedFunc === func.id ? 'rotate-180' : ''
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

              {expandedFunc === func.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  {/* Parameters */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">パラメータ</h4>
                    <div className="space-y-2">
                      {func.parameters.map((param, index) => (
                        <div key={index} className="flex gap-2">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded text-purple-600 font-semibold">
                            {param.name}
                          </code>
                          <span className="text-sm text-gray-600">
                            {param.description}
                            {param.optional && <span className="text-gray-400 ml-1">(省略可)</span>}
                          </span>
                        </div>
                      ))}
                      {func.parameters.length === 0 && (
                        <p className="text-sm text-gray-500">パラメータなし</p>
                      )}
                    </div>
                  </div>

                  {/* Return Type */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">戻り値</h4>
                    <p className="text-sm text-gray-700">{func.returnType}</p>
                  </div>

                  {/* Examples */}
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">使用例</h4>
                    <div className="space-y-4">
                      {func.examples.map((example, index) => (
                        <div key={index}>
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="text-sm font-semibold text-gray-700">{example.title}</h5>
                            <button
                              onClick={() => copyCode(example.code)}
                              className="px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors text-xs"
                            >
                              コピー
                            </button>
                          </div>
                          <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                            <code>{example.code}</code>
                          </pre>
                          {example.output && (
                            <div className="mt-2 text-sm text-gray-600">
                              <span className="font-semibold">出力: </span>
                              {example.output}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Notes */}
                  {func.notes && func.notes.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">注意事項</h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                        {func.notes.map((note, index) => (
                          <li key={index}>{note}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Related Functions */}
                  {func.relatedFunctions && func.relatedFunctions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800 mb-2">関連する関数</h4>
                      <div className="flex gap-2 flex-wrap">
                        {func.relatedFunctions.map((relFunc, index) => (
                          <span key={index} className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                            {relFunc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredFunctions.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当する関数が見つかりませんでした</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  </>
  );
}
