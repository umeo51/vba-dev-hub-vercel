import { drizzle } from "drizzle-orm/mysql2";
import { errorCodes, vbaReferences, snippets, codeTemplates } from "../drizzle/schema.js";

const db = drizzle(process.env.DATABASE_URL);

async function seedData() {
  console.log("Seeding database with sample data...");

  // Sample Error Codes
  const sampleErrors = [
    {
      errorNumber: "9",
      errorName: "インデックスが有効範囲にありません",
      description: "配列やコレクションの要素にアクセスする際に、存在しないインデックスを指定した場合に発生します。",
      causes: "1. 配列の範囲外のインデックスを指定\n2. コレクションに存在しない要素を参照\n3. 配列が初期化されていない",
      solutions: "1. インデックスの範囲を確認する\n2. UBound関数で配列の上限を確認\n3. 配列を適切に初期化する",
      examples: "' 正しい例\nDim arr(1 To 10) As Integer\nFor i = 1 To UBound(arr)\n    arr(i) = i\nNext i"
    },
    {
      errorNumber: "13",
      errorName: "型が一致しません",
      description: "変数や引数に、期待される型と異なる型の値を代入しようとした場合に発生します。",
      causes: "1. 数値型の変数に文字列を代入\n2. オブジェクト型の変数にプリミティブ型を代入\n3. 暗黙的な型変換が失敗",
      solutions: "1. データ型を確認する\n2. 明示的な型変換を行う（CInt, CStr等）\n3. IsNumeric関数で数値かどうかチェック",
      examples: "' 正しい例\nDim num As Integer\nDim str As String\nstr = \"123\"\nIf IsNumeric(str) Then\n    num = CInt(str)\nEnd If"
    },
    {
      errorNumber: "91",
      errorName: "オブジェクト変数または With ブロック変数が設定されていません",
      description: "オブジェクト変数が Nothing の状態でメソッドやプロパティにアクセスしようとした場合に発生します。",
      causes: "1. オブジェクトが Set されていない\n2. オブジェクトが既に破棄されている\n3. オブジェクトの取得に失敗している",
      solutions: "1. Set ステートメントでオブジェクトを代入\n2. Is Nothing でオブジェクトの存在確認\n3. エラーハンドリングを実装",
      examples: "' 正しい例\nDim ws As Worksheet\nSet ws = ThisWorkbook.Worksheets(1)\nIf Not ws Is Nothing Then\n    ws.Range(\"A1\").Value = \"Test\"\nEnd If"
    },
    {
      errorNumber: "1004",
      errorName: "アプリケーション定義またはオブジェクト定義のエラーです",
      description: "Excel VBAで最も一般的なエラーの一つで、様々な原因で発生する可能性があります。",
      causes: "1. 存在しないシートやセル範囲を参照\n2. 保護されたシートに書き込もうとした\n3. 無効な操作を実行しようとした",
      solutions: "1. オブジェクトの存在を確認\n2. シートの保護状態を確認\n3. 操作が有効かどうか検証",
      examples: "' 正しい例\nOn Error Resume Next\nDim ws As Worksheet\nSet ws = ThisWorkbook.Worksheets(\"Sheet1\")\nIf Not ws Is Nothing Then\n    ws.Range(\"A1\").Value = \"Test\"\nEnd If\nOn Error GoTo 0"
    },
    {
      errorNumber: "424",
      errorName: "オブジェクトが必要です",
      description: "オブジェクトが必要な場所でオブジェクト以外の値を使用しようとした場合に発生します。",
      causes: "1. Set キーワードを使わずにオブジェクトを代入\n2. 関数がオブジェクトを返すはずが Nothing を返した\n3. オブジェクト型でない変数をオブジェクトとして使用",
      solutions: "1. Set ステートメントを使用してオブジェクトを代入\n2. 関数の戻り値を確認\n3. 変数の型宣言を確認",
      examples: "' 正しい例\nDim rng As Range\nSet rng = Range(\"A1\")\nrng.Value = \"Test\""
    }
  ];

  for (const error of sampleErrors) {
    await db.insert(errorCodes).values(error);
  }
  console.log(`✓ Inserted ${sampleErrors.length} error codes`);

  // Sample VBA References
  const sampleReferences = [
    {
      name: "MsgBox",
      type: "function",
      category: "ユーザーインターフェース",
      syntax: "MsgBox(prompt, [buttons], [title], [helpfile], [context])",
      description: "ダイアログボックスにメッセージを表示し、ボタンがクリックされるのを待ち、どのボタンがクリックされたかを示す整数を返します。",
      parameters: JSON.stringify([
        { name: "prompt", type: "String", description: "ダイアログボックスに表示するメッセージ" },
        { name: "buttons", type: "Integer", description: "表示するボタンの種類とアイコン（省略可能）" },
        { name: "title", type: "String", description: "ダイアログボックスのタイトル（省略可能）" }
      ]),
      returnValue: "Integer - クリックされたボタンを示す値",
      examples: "' 基本的な使用例\nMsgBox \"こんにちは、世界！\"\n\n' ボタンとタイトル付き\nDim result As Integer\nresult = MsgBox(\"続行しますか？\", vbYesNo + vbQuestion, \"確認\")\nIf result = vbYes Then\n    MsgBox \"続行します\"\nEnd If",
      relatedItems: JSON.stringify(["InputBox", "MsgBoxStyle"])
    },
    {
      name: "Range",
      type: "object",
      category: "ワークシート操作",
      syntax: "Range(cell1, [cell2])",
      description: "セルまたはセル範囲を表すRangeオブジェクトを返します。",
      parameters: JSON.stringify([
        { name: "cell1", type: "String/Range", description: "セル参照またはRangeオブジェクト" },
        { name: "cell2", type: "String/Range", description: "範囲の終点（省略可能）" }
      ]),
      returnValue: "Range - セル範囲を表すオブジェクト",
      examples: "' 単一セルの参照\nRange(\"A1\").Value = \"Hello\"\n\n' セル範囲の参照\nRange(\"A1:B10\").Interior.Color = RGB(255, 255, 0)\n\n' 変数を使用\nDim rng As Range\nSet rng = Range(\"A1\", \"C5\")\nrng.Font.Bold = True",
      relatedItems: JSON.stringify(["Cells", "Offset", "Resize"])
    },
    {
      name: "For...Next",
      type: "statement",
      category: "制御構造",
      syntax: "For counter = start To end [Step step]\n    [statements]\nNext [counter]",
      description: "指定した回数だけステートメントのブロックを繰り返し実行します。",
      parameters: JSON.stringify([
        { name: "counter", type: "Numeric", description: "ループカウンター変数" },
        { name: "start", type: "Numeric", description: "開始値" },
        { name: "end", type: "Numeric", description: "終了値" },
        { name: "step", type: "Numeric", description: "増分値（省略時は1）" }
      ]),
      returnValue: null,
      examples: "' 基本的なループ\nDim i As Integer\nFor i = 1 To 10\n    Debug.Print i\nNext i\n\n' ステップ指定\nFor i = 0 To 100 Step 10\n    Debug.Print i\nNext i\n\n' 逆順ループ\nFor i = 10 To 1 Step -1\n    Debug.Print i\nNext i",
      relatedItems: JSON.stringify(["For Each...Next", "Do...Loop", "While...Wend"])
    },
    {
      name: "Split",
      type: "function",
      category: "文字列操作",
      syntax: "Split(expression, [delimiter], [limit], [compare])",
      description: "文字列を指定した区切り文字で分割し、配列として返します。",
      parameters: JSON.stringify([
        { name: "expression", type: "String", description: "分割する文字列" },
        { name: "delimiter", type: "String", description: "区切り文字（省略時はスペース）" },
        { name: "limit", type: "Long", description: "返す部分文字列の最大数" },
        { name: "compare", type: "CompareMethod", description: "比較方法" }
      ]),
      returnValue: "String() - 分割された文字列の配列",
      examples: "' カンマ区切りの文字列を分割\nDim arr() As String\narr = Split(\"りんご,バナナ,オレンジ\", \",\")\nDebug.Print arr(0) ' りんご\n\n' スペース区切り（デフォルト）\narr = Split(\"Hello World VBA\")\nFor i = 0 To UBound(arr)\n    Debug.Print arr(i)\nNext i",
      relatedItems: JSON.stringify(["Join", "InStr", "Replace"])
    },
    {
      name: "If...Then...Else",
      type: "statement",
      category: "制御構造",
      syntax: "If condition Then\n    [statements]\n[ElseIf condition Then\n    [statements]]\n[Else\n    [statements]]\nEnd If",
      description: "条件に基づいて異なるステートメントを実行します。",
      parameters: JSON.stringify([
        { name: "condition", type: "Boolean", description: "評価する条件式" }
      ]),
      returnValue: null,
      examples: "' 基本的な条件分岐\nDim score As Integer\nscore = 85\n\nIf score >= 90 Then\n    MsgBox \"優秀\"\nElseIf score >= 70 Then\n    MsgBox \"良好\"\nElse\n    MsgBox \"要努力\"\nEnd If\n\n' 1行形式\nIf score >= 60 Then MsgBox \"合格\" Else MsgBox \"不合格\"",
      relatedItems: JSON.stringify(["Select Case", "IIf", "Choose"])
    }
  ];

  for (const ref of sampleReferences) {
    await db.insert(vbaReferences).values(ref);
  }
  console.log(`✓ Inserted ${sampleReferences.length} VBA references`);

  // Sample Snippets
  const sampleSnippets = [
    {
      userId: 1,
      title: "最終行を取得する",
      description: "指定した列の最終行番号を取得するコードスニペット",
      code: "Function GetLastRow(ws As Worksheet, col As Long) As Long\n    GetLastRow = ws.Cells(ws.Rows.Count, col).End(xlUp).Row\nEnd Function\n\n' 使用例\nDim lastRow As Long\nlastRow = GetLastRow(ActiveSheet, 1) ' A列の最終行",
      category: "ワークシート操作",
      tags: JSON.stringify(["最終行", "セル", "範囲"]),
      views: 1250,
      likes: 89
    },
    {
      userId: 1,
      title: "CSVファイルを読み込む",
      description: "CSVファイルを読み込んでワークシートに展開するコード",
      code: "Sub ImportCSV(filePath As String, ws As Worksheet)\n    Dim fileNum As Integer\n    Dim lineData As String\n    Dim dataArray() As String\n    Dim row As Long\n    \n    fileNum = FreeFile\n    Open filePath For Input As #fileNum\n    \n    row = 1\n    Do While Not EOF(fileNum)\n        Line Input #fileNum, lineData\n        dataArray = Split(lineData, \",\")\n        \n        Dim col As Long\n        For col = 0 To UBound(dataArray)\n            ws.Cells(row, col + 1).Value = dataArray(col)\n        Next col\n        \n        row = row + 1\n    Loop\n    \n    Close #fileNum\nEnd Sub",
      category: "ファイル操作",
      tags: JSON.stringify(["CSV", "ファイル", "インポート"]),
      views: 980,
      likes: 67
    },
    {
      userId: 1,
      title: "重複を削除する",
      description: "指定した範囲から重複する行を削除するマクロ",
      code: "Sub RemoveDuplicates(rng As Range, keyColumn As Long)\n    rng.RemoveDuplicates Columns:=keyColumn, Header:=xlYes\n    MsgBox \"重複を削除しました\"\nEnd Sub\n\n' 使用例\nCall RemoveDuplicates(Range(\"A1:C100\"), 1) ' A列を基準に重複削除",
      category: "データ処理",
      tags: JSON.stringify(["重複削除", "データクリーニング"]),
      views: 756,
      likes: 52
    }
  ];

  for (const snippet of sampleSnippets) {
    await db.insert(snippets).values(snippet);
  }
  console.log(`✓ Inserted ${sampleSnippets.length} code snippets`);

  // Sample Code Templates
  const sampleTemplates = [
    {
      name: "基本的なSubプロシージャ",
      description: "標準的なSubプロシージャのテンプレート",
      category: "基本構造",
      template: "Sub {{procedureName}}()\n    ' 処理内容をここに記述\n    {{code}}\nEnd Sub",
      parameters: JSON.stringify([
        { name: "procedureName", type: "string", description: "プロシージャ名" },
        { name: "code", type: "text", description: "実行するコード" }
      ]),
      usageCount: 450
    },
    {
      name: "エラーハンドリング付きプロシージャ",
      description: "エラー処理を含む堅牢なプロシージャテンプレート",
      category: "基本構造",
      template: "Sub {{procedureName}}()\n    On Error GoTo ErrorHandler\n    \n    {{code}}\n    \n    Exit Sub\n    \nErrorHandler:\n    MsgBox \"エラーが発生しました: \" & Err.Description, vbCritical\nEnd Sub",
      parameters: JSON.stringify([
        { name: "procedureName", type: "string", description: "プロシージャ名" },
        { name: "code", type: "text", description: "実行するコード" }
      ]),
      usageCount: 320
    },
    {
      name: "ループ処理テンプレート",
      description: "範囲内の各セルに対してループ処理を行うテンプレート",
      category: "ループ",
      template: "Sub ProcessRange()\n    Dim ws As Worksheet\n    Dim cell As Range\n    \n    Set ws = {{worksheet}}\n    \n    For Each cell In ws.Range(\"{{range}}\")\n        {{processing}}\n    Next cell\nEnd Sub",
      parameters: JSON.stringify([
        { name: "worksheet", type: "string", description: "対象のワークシート" },
        { name: "range", type: "string", description: "処理する範囲" },
        { name: "processing", type: "text", description: "各セルに対する処理" }
      ]),
      usageCount: 280
    }
  ];

  for (const template of sampleTemplates) {
    await db.insert(codeTemplates).values(template);
  }
  console.log(`✓ Inserted ${sampleTemplates.length} code templates`);

  console.log("\n✅ Database seeding completed successfully!");
}

seedData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  });
