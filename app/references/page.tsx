'use client';

import Header from '@/components/Header';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

interface Reference {
  id: number;
  title: string;
  description: string;
  category: string;
  code: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const references: Reference[] = [
  {
    id: 1,
    title: 'セルの値を取得する',
    description: '指定したセルの値を取得します。',
    category: 'セル操作',
    code: `' 単一セルの値を取得
Dim value As Variant
value = Range("A1").Value

' または
value = Cells(1, 1).Value

' シート名を指定して取得
value = Worksheets("Sheet1").Range("A1").Value`,
    tags: ['セル', '取得', '基本'],
    difficulty: 'beginner'
  },
  {
    id: 2,
    title: 'セルに値を設定する',
    description: '指定したセルに値を設定します。',
    category: 'セル操作',
    code: `' 単一セルに値を設定
Range("A1").Value = "Hello"

' 数値を設定
Range("B1").Value = 100

' 数式を設定
Range("C1").Formula = "=A1+B1"

' 複数セルに同じ値を設定
Range("A1:A10").Value = "同じ値"`,
    tags: ['セル', '設定', '基本'],
    difficulty: 'beginner'
  },
  {
    id: 3,
    title: 'セルの背景色を変更する',
    description: 'セルの背景色を設定します。',
    category: 'セル書式',
    code: `' 背景色を赤に設定
Range("A1").Interior.Color = RGB(255, 0, 0)

' 背景色を黄色に設定
Range("A1").Interior.Color = vbYellow

' 背景色をクリア
Range("A1").Interior.ColorIndex = xlNone

' 条件付きで色を変更
If Range("A1").Value > 100 Then
    Range("A1").Interior.Color = RGB(255, 200, 200)
End If`,
    tags: ['セル', '書式', '色'],
    difficulty: 'beginner'
  },
  {
    id: 4,
    title: 'セルのフォントを変更する',
    description: 'セルのフォント、サイズ、スタイルを変更します。',
    category: 'セル書式',
    code: `' フォント名を変更
Range("A1").Font.Name = "Arial"

' フォントサイズを変更
Range("A1").Font.Size = 14

' 太字にする
Range("A1").Font.Bold = True

' 斜体にする
Range("A1").Font.Italic = True

' フォント色を変更
Range("A1").Font.Color = RGB(0, 0, 255)`,
    tags: ['セル', '書式', 'フォント'],
    difficulty: 'beginner'
  },
  {
    id: 5,
    title: '範囲をループ処理する',
    description: 'セル範囲を1つずつ処理します。',
    category: 'ループ処理',
    code: `' For Each を使用
Dim cell As Range
For Each cell In Range("A1:A10")
    Debug.Print cell.Value
Next cell

' For を使用
Dim i As Long
For i = 1 To 10
    Debug.Print Cells(i, 1).Value
Next i

' 使用されている範囲をループ
For Each cell In ActiveSheet.UsedRange
    If cell.Value <> "" Then
        Debug.Print cell.Address & ": " & cell.Value
    End If
Next cell`,
    tags: ['ループ', '範囲', 'For Each'],
    difficulty: 'beginner'
  },
  {
    id: 6,
    title: '最終行を取得する',
    description: 'データが入力されている最終行を取得します。',
    category: 'セル操作',
    code: `' A列の最終行を取得
Dim lastRow As Long
lastRow = Cells(Rows.Count, 1).End(xlUp).Row

' 使用されている範囲の最終行
lastRow = ActiveSheet.UsedRange.Rows.Count + _
          ActiveSheet.UsedRange.Row - 1

' 特定の範囲内の最終行
lastRow = Range("A1:A" & Rows.Count).Find("*", , , , xlByRows, xlPrevious).Row`,
    tags: ['セル', '最終行', '範囲'],
    difficulty: 'intermediate'
  },
  {
    id: 7,
    title: '最終列を取得する',
    description: 'データが入力されている最終列を取得します。',
    category: 'セル操作',
    code: `' 1行目の最終列を取得
Dim lastCol As Long
lastCol = Cells(1, Columns.Count).End(xlToLeft).Column

' 使用されている範囲の最終列
lastCol = ActiveSheet.UsedRange.Columns.Count + _
          ActiveSheet.UsedRange.Column - 1

' 列番号をアルファベットに変換
Dim colLetter As String
colLetter = Split(Cells(1, lastCol).Address, "$")(1)`,
    tags: ['セル', '最終列', '範囲'],
    difficulty: 'intermediate'
  },
  {
    id: 8,
    title: '行を挿入・削除する',
    description: '行の挿入と削除を行います。',
    category: 'セル操作',
    code: `' 3行目に1行挿入
Rows(3).Insert

' 複数行を挿入（3行目から5行目）
Rows("3:5").Insert

' 3行目を削除
Rows(3).Delete

' 複数行を削除
Rows("3:5").Delete

' 空白行を削除
Dim i As Long
For i = Cells(Rows.Count, 1).End(xlUp).Row To 1 Step -1
    If WorksheetFunction.CountA(Rows(i)) = 0 Then
        Rows(i).Delete
    End If
Next i`,
    tags: ['行', '挿入', '削除'],
    difficulty: 'intermediate'
  },
  {
    id: 9,
    title: '列を挿入・削除する',
    description: '列の挿入と削除を行います。',
    category: 'セル操作',
    code: `' C列に1列挿入
Columns("C").Insert

' 複数列を挿入（C列からE列）
Columns("C:E").Insert

' C列を削除
Columns("C").Delete

' 複数列を削除
Columns("C:E").Delete

' 列番号で指定
Columns(3).Insert
Columns(3).Delete`,
    tags: ['列', '挿入', '削除'],
    difficulty: 'intermediate'
  },
  {
    id: 10,
    title: 'セルを検索する',
    description: '特定の値を持つセルを検索します。',
    category: 'セル操作',
    code: `' 値を検索
Dim foundCell As Range
Set foundCell = Range("A:A").Find("検索値")

If Not foundCell Is Nothing Then
    MsgBox "見つかりました: " & foundCell.Address
Else
    MsgBox "見つかりませんでした"
End If

' 複数の一致を検索
Dim firstAddress As String
Set foundCell = Range("A:A").Find("検索値")
If Not foundCell Is Nothing Then
    firstAddress = foundCell.Address
    Do
        Debug.Print foundCell.Address
        Set foundCell = Range("A:A").FindNext(foundCell)
    Loop While Not foundCell Is Nothing And foundCell.Address <> firstAddress
End If`,
    tags: ['検索', 'Find', 'セル'],
    difficulty: 'intermediate'
  },
  {
    id: 11,
    title: 'セルを並び替える',
    description: 'セル範囲をソートします。',
    category: 'データ処理',
    code: `' A列を基準に昇順で並び替え
Range("A1:C10").Sort Key1:=Range("A1"), Order1:=xlAscending, Header:=xlYes

' 複数列で並び替え
With ActiveSheet.Sort
    .SortFields.Clear
    .SortFields.Add Key:=Range("A1"), Order:=xlAscending
    .SortFields.Add Key:=Range("B1"), Order:=xlDescending
    .SetRange Range("A1:C10")
    .Header = xlYes
    .Apply
End With`,
    tags: ['ソート', '並び替え', 'データ'],
    difficulty: 'intermediate'
  },
  {
    id: 12,
    title: 'フィルターを設定する',
    description: 'オートフィルターを設定・解除します。',
    category: 'データ処理',
    code: `' オートフィルターを設定
Range("A1:C10").AutoFilter

' 特定の条件でフィルター（A列が100以上）
Range("A1:C10").AutoFilter Field:=1, Criteria1:=">=100"

' 複数条件でフィルター（A列が100以上かつB列が"完了"）
Range("A1:C10").AutoFilter Field:=1, Criteria1:=">=100"
Range("A1:C10").AutoFilter Field:=2, Criteria1:="完了"

' フィルターを解除
ActiveSheet.AutoFilterMode = False`,
    tags: ['フィルター', 'オートフィルター', 'データ'],
    difficulty: 'intermediate'
  },
  {
    id: 13,
    title: 'ワークブックを開く・閉じる',
    description: 'Excelファイルを開いたり閉じたりします。',
    category: 'ファイル操作',
    code: `' ワークブックを開く
Dim wb As Workbook
Set wb = Workbooks.Open("C:\\path\\to\\file.xlsx")

' 読み取り専用で開く
Set wb = Workbooks.Open("C:\\path\\to\\file.xlsx", ReadOnly:=True)

' ワークブックを閉じる（保存する）
wb.Close SaveChanges:=True

' ワークブックを閉じる（保存しない）
wb.Close SaveChanges:=False

' すべてのワークブックを閉じる
Dim w As Workbook
For Each w In Workbooks
    w.Close SaveChanges:=False
Next w`,
    tags: ['ワークブック', 'ファイル', '開く', '閉じる'],
    difficulty: 'beginner'
  },
  {
    id: 14,
    title: 'ワークブックを保存する',
    description: 'ワークブックを保存します。',
    category: 'ファイル操作',
    code: `' 上書き保存
ActiveWorkbook.Save

' 名前を付けて保存
ActiveWorkbook.SaveAs "C:\\path\\to\\newfile.xlsx"

' CSV形式で保存
ActiveWorkbook.SaveAs "C:\\path\\to\\file.csv", FileFormat:=xlCSV

' PDF形式で保存
ActiveSheet.ExportAsFixedFormat Type:=xlTypePDF, _
    Filename:="C:\\path\\to\\file.pdf"

' 保存せずに閉じる
ActiveWorkbook.Close SaveChanges:=False`,
    tags: ['保存', 'ワークブック', 'ファイル'],
    difficulty: 'beginner'
  },
  {
    id: 15,
    title: 'シートを追加・削除する',
    description: 'ワークシートの追加と削除を行います。',
    category: 'シート操作',
    code: `' 新しいシートを追加
Dim ws As Worksheet
Set ws = Worksheets.Add

' シート名を指定して追加
Set ws = Worksheets.Add
ws.Name = "新しいシート"

' 特定の位置に追加（最後に追加）
Set ws = Worksheets.Add(After:=Worksheets(Worksheets.Count))

' シートを削除（確認なし）
Application.DisplayAlerts = False
Worksheets("Sheet1").Delete
Application.DisplayAlerts = True`,
    tags: ['シート', '追加', '削除'],
    difficulty: 'beginner'
  },
  {
    id: 16,
    title: 'シートをコピー・移動する',
    description: 'ワークシートのコピーと移動を行います。',
    category: 'シート操作',
    code: `' シートをコピー（同じブック内）
Worksheets("Sheet1").Copy After:=Worksheets(Worksheets.Count)

' シートを別のブックにコピー
Worksheets("Sheet1").Copy Before:=Workbooks("Book2.xlsx").Worksheets(1)

' シートを移動
Worksheets("Sheet1").Move After:=Worksheets(Worksheets.Count)

' シートを新しいブックにコピー
Worksheets("Sheet1").Copy`,
    tags: ['シート', 'コピー', '移動'],
    difficulty: 'intermediate'
  },
  {
    id: 17,
    title: 'メッセージボックスを表示する',
    description: 'ユーザーにメッセージを表示します。',
    category: 'ユーザー操作',
    code: `' 基本的なメッセージボックス
MsgBox "こんにちは"

' タイトル付き
MsgBox "処理が完了しました", vbInformation, "完了"

' はい/いいえボタン
Dim result As VbMsgBoxResult
result = MsgBox("続行しますか？", vbYesNo + vbQuestion, "確認")
If result = vbYes Then
    ' はいが選択された
End If

' 複数行のメッセージ
MsgBox "1行目" & vbCrLf & "2行目" & vbCrLf & "3行目"`,
    tags: ['メッセージボックス', 'ダイアログ', 'UI'],
    difficulty: 'beginner'
  },
  {
    id: 18,
    title: '入力ボックスを表示する',
    description: 'ユーザーから入力を受け取ります。',
    category: 'ユーザー操作',
    code: `' 基本的な入力ボックス
Dim userInput As String
userInput = InputBox("名前を入力してください")

' デフォルト値付き
userInput = InputBox("名前を入力してください", "入力", "山田太郎")

' キャンセルの処理
userInput = InputBox("値を入力してください")
If userInput = "" Then
    MsgBox "キャンセルされました"
    Exit Sub
End If

' 数値の入力
Dim num As Integer
num = Val(InputBox("数値を入力してください"))`,
    tags: ['入力ボックス', 'ダイアログ', 'UI'],
    difficulty: 'beginner'
  },
  {
    id: 19,
    title: 'ファイル選択ダイアログを表示する',
    description: 'ファイルを選択するダイアログを表示します。',
    category: 'ユーザー操作',
    code: `' ファイルを選択
Dim filePath As Variant
filePath = Application.GetOpenFilename("Excel Files (*.xlsx), *.xlsx")

If filePath <> False Then
    MsgBox "選択されたファイル: " & filePath
Else
    MsgBox "キャンセルされました"
End If

' 複数のファイルを選択
filePath = Application.GetOpenFilename("All Files (*.*), *.*", , , , True)

' フォルダを選択
With Application.FileDialog(msoFileDialogFolderPicker)
    If .Show = -1 Then
        MsgBox "選択されたフォルダ: " & .SelectedItems(1)
    End If
End With`,
    tags: ['ファイル選択', 'ダイアログ', 'UI'],
    difficulty: 'intermediate'
  },
  {
    id: 20,
    title: '配列を使う',
    description: '配列の宣言と使用方法です。',
    category: 'データ構造',
    code: `' 配列の宣言
Dim arr(5) As String  ' 0から5までの6要素
Dim arr2(1 To 5) As Integer  ' 1から5までの5要素

' 配列に値を代入
arr(0) = "要素1"
arr(1) = "要素2"

' 動的配列
Dim dynamicArr() As Variant
ReDim dynamicArr(10)

' 配列のサイズを変更（データを保持）
ReDim Preserve dynamicArr(20)

' 配列をループ
Dim i As Long
For i = LBound(arr) To UBound(arr)
    Debug.Print arr(i)
Next i

' セル範囲を配列に変換
Dim cellArr As Variant
cellArr = Range("A1:A10").Value`,
    tags: ['配列', 'データ構造', '基本'],
    difficulty: 'intermediate'
  },
  {
    id: 21,
    title: 'Dictionaryを使う',
    description: 'キーと値のペアを管理します。',
    category: 'データ構造',
    code: `' Dictionaryオブジェクトを作成（参照設定: Microsoft Scripting Runtime）
Dim dict As Object
Set dict = CreateObject("Scripting.Dictionary")

' 要素を追加
dict.Add "key1", "value1"
dict.Add "key2", "value2"

' 値を取得
Debug.Print dict("key1")

' キーの存在確認
If dict.Exists("key1") Then
    Debug.Print "存在します"
End If

' 値を更新
dict("key1") = "新しい値"

' 要素を削除
dict.Remove "key1"

' すべてのキーをループ
Dim key As Variant
For Each key In dict.Keys
    Debug.Print key & ": " & dict(key)
Next key`,
    tags: ['Dictionary', 'コレクション', 'データ構造'],
    difficulty: 'advanced'
  },
  {
    id: 22,
    title: 'テキストファイルを読み込む',
    description: 'テキストファイルの内容を読み込みます。',
    category: 'ファイル操作',
    code: `' テキストファイルを1行ずつ読み込む
Dim fileNum As Integer
Dim line As String

fileNum = FreeFile
Open "C:\\path\\to\\file.txt" For Input As #fileNum

Do Until EOF(fileNum)
    Line Input #fileNum, line
    Debug.Print line
Loop

Close #fileNum

' ファイル全体を一度に読み込む
Dim content As String
fileNum = FreeFile
Open "C:\\path\\to\\file.txt" For Input As #fileNum
content = Input$(LOF(fileNum), fileNum)
Close #fileNum
Debug.Print content`,
    tags: ['ファイル', '読み込み', 'テキスト'],
    difficulty: 'intermediate'
  },
  {
    id: 23,
    title: 'テキストファイルに書き込む',
    description: 'テキストファイルにデータを書き込みます。',
    category: 'ファイル操作',
    code: `' テキストファイルに書き込む（上書き）
Dim fileNum As Integer
fileNum = FreeFile
Open "C:\\path\\to\\file.txt" For Output As #fileNum
Print #fileNum, "1行目"
Print #fileNum, "2行目"
Close #fileNum

' テキストファイルに追記
fileNum = FreeFile
Open "C:\\path\\to\\file.txt" For Append As #fileNum
Print #fileNum, "追加の行"
Close #fileNum

' CSVファイルに書き込む
fileNum = FreeFile
Open "C:\\path\\to\\file.csv" For Output As #fileNum
Print #fileNum, "列1,列2,列3"
Print #fileNum, "値1,値2,値3"
Close #fileNum`,
    tags: ['ファイル', '書き込み', 'テキスト'],
    difficulty: 'intermediate'
  },
  {
    id: 24,
    title: '日付と時刻を扱う',
    description: '日付と時刻の操作方法です。',
    category: 'データ処理',
    code: `' 現在の日付と時刻を取得
Dim now As Date
now = Now
Debug.Print now

' 現在の日付のみ
Debug.Print Date

' 現在の時刻のみ
Debug.Print Time

' 日付の計算
Dim tomorrow As Date
tomorrow = DateAdd("d", 1, Date)  ' 1日後

Dim nextWeek As Date
nextWeek = DateAdd("ww", 1, Date)  ' 1週間後

' 日付の差を計算
Dim diff As Long
diff = DateDiff("d", Date, #12/31/2025#)  ' 日数の差

' 日付の書式設定
Debug.Print Format(Date, "yyyy/mm/dd")
Debug.Print Format(Date, "yyyy年mm月dd日")`,
    tags: ['日付', '時刻', 'Date'],
    difficulty: 'intermediate'
  },
  {
    id: 25,
    title: '文字列を操作する',
    description: '文字列の加工と操作方法です。',
    category: 'データ処理',
    code: `' 文字列の結合
Dim str As String
str = "Hello" & " " & "World"

' 文字列の長さ
Debug.Print Len(str)

' 部分文字列を取得
Debug.Print Left(str, 5)    ' 左から5文字
Debug.Print Right(str, 5)   ' 右から5文字
Debug.Print Mid(str, 7, 5)  ' 7文字目から5文字

' 文字列を検索
Dim pos As Long
pos = InStr(str, "World")   ' "World"の位置

' 文字列を置換
str = Replace(str, "World", "VBA")

' 大文字・小文字変換
Debug.Print UCase(str)  ' 大文字
Debug.Print LCase(str)  ' 小文字

' 空白を削除
str = Trim("  文字列  ")  ' 前後の空白を削除`,
    tags: ['文字列', 'String', 'テキスト'],
    difficulty: 'beginner'
  }
];

const categories = ['すべて', 'セル操作', 'セル書式', 'ループ処理', 'データ処理', 'ファイル操作', 'シート操作', 'ユーザー操作', 'データ構造'];
const difficulties = ['すべて', 'beginner', 'intermediate', 'advanced'];
const difficultyLabels: { [key: string]: string } = {
  'beginner': '初級',
  'intermediate': '中級',
  'advanced': '上級'
};

export default function ReferencesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('すべて');
  const [selectedDifficulty, setSelectedDifficulty] = useState('すべて');
  const [expandedRef, setExpandedRef] = useState<number | null>(null);

  const filteredReferences = useMemo(() => {
    return references.filter(ref => {
      const matchesSearch = 
        searchTerm === '' ||
        ref.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ref.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ref.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = 
        selectedCategory === 'すべて' || 
        ref.category === selectedCategory;
      
      const matchesDifficulty = 
        selectedDifficulty === 'すべて' || 
        ref.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [searchTerm, selectedCategory, selectedDifficulty]);

  const toggleRef = (id: number) => {
    setExpandedRef(expandedRef === id ? null : id);
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    alert('コードをコピーしました！');
  };

  return (
    <Header />
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VBA Dev Hub
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                ホーム
              </Link>
              <Link href="/tools" className="text-gray-600 hover:text-blue-600 transition-colors">
                ツール
              </Link>
              <Link href="/snippets" className="text-gray-600 hover:text-blue-600 transition-colors">
                スニペット
              </Link>
              <Link href="/errors" className="text-gray-600 hover:text-blue-600 transition-colors">
                エラー辞典
              </Link>
              <Link href="/references" className="text-blue-600 font-semibold">
                リファレンス
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            VBA逆引きリファレンス
          </h1>
          <p className="text-gray-600 text-lg">
            やりたいことから素早くVBAコードを検索
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                検索
              </label>
              <input
                type="text"
                placeholder="やりたいことを入力..."
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                難易度
              </label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'すべて' ? 'すべて' : difficultyLabels[difficulty]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            {filteredReferences.length}件のリファレンスが見つかりました
          </div>
        </div>

        {/* Reference List */}
        <div className="space-y-4">
          {filteredReferences.map(ref => (
            <div
              key={ref.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div
                className="p-6 cursor-pointer"
                onClick={() => toggleRef(ref.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                        {ref.category}
                      </span>
                      <span className={`inline-block px-3 py-1 rounded-full text-xs ${
                        ref.difficulty === 'beginner' ? 'bg-blue-100 text-blue-700' :
                        ref.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {difficultyLabels[ref.difficulty]}
                      </span>
                      {ref.tags.map(tag => (
                        <span key={tag} className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {ref.title}
                    </h3>
                    <p className="text-gray-600">
                      {ref.description}
                    </p>
                  </div>
                  <button className="ml-4 text-gray-400 hover:text-gray-600">
                    <svg
                      className={`w-6 h-6 transform transition-transform ${
                        expandedRef === ref.id ? 'rotate-180' : ''
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

              {expandedRef === ref.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-800 flex items-center gap-2">
                        <span className="text-blue-500">💻</span>
                        コード例
                      </h4>
                      <button
                        onClick={() => copyCode(ref.code)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-sm"
                      >
                        コピー
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                      <code>{ref.code}</code>
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredReferences.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するリファレンスが見つかりませんでした</p>
          </div>
        )}

        {/* Back to Home */}
        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:shadow-lg transition-all"
          >
            ← ホームに戻る
          </Link>
        </div>
      </main>
    </div>
  );
}
