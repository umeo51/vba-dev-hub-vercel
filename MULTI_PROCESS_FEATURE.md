# VBAコード自動生成ツール - 複数処理統合機能

## 📋 概要

VBAコード自動生成ツールに**複数処理統合モード**を追加しました。これにより、複数の処理を組み合わせて1つの統合されたVBAコードとして生成できるようになりました。

## 🎯 実装の目的

実務では、単一の処理だけでなく、複数の処理を順番に実行するケースが多く存在します。例えば：

- データをコピー → 重複削除 → 並び替え → CSV出力
- 複数シートからデータ収集 → 統合 → 集計 → レポート作成

従来は各処理を個別に生成し、手動で統合する必要がありましたが、この機能により**ワンクリックで統合コードを生成**できるようになりました。

## ✨ 主な機能

### 1. モード切替

- **単一処理モード**: 従来通り、1つの処理のコードを生成
- **複数処理統合モード**: 複数の処理を組み合わせて統合コードを生成

### 2. 処理管理

- **処理の追加**: テンプレートを選択してパラメータを設定し、処理リストに追加
- **処理の削除**: 不要な処理をリストから削除
- **順序変更**: ↑↓ボタンで処理の実行順序を変更
- **処理リスト表示**: 登録済みの処理を一覧表示

### 3. 統合コード生成オプション

#### 進捗表示オプション
各処理の実行状況をステータスバーに表示します。

```vba
' 進捗表示
Application.StatusBar = "処理中... (1/3)"
```

#### エラーハンドリングオプション
エラー発生時の処理を自動追加します。

```vba
Sub MultiProcessCode()
    On Error GoTo ErrorHandler
    
    ' 処理内容
    
    Exit Sub

ErrorHandler:
    MsgBox "エラーが発生しました: " & Err.Description, vbCritical
    Application.StatusBar = False
End Sub
```

### 4. 自動コメント生成

各処理に対して、処理番号と内容を説明するコメントを自動生成します。

```vba
' 処理1: Sheet1のA1からSheet2のB1にデータを転記
Worksheets("Sheet2").Range("B1").Value = _
    Worksheets("Sheet1").Range("A1").Value

' 処理2: Sheet1をA列で並び替え
With Worksheets("Sheet1").Sort
    .SortFields.Clear
    .SortFields.Add Key:=Range("A1"), Order:=xlAscending
    .SetRange Range("A1:C100")
    .Header = xlYes
    .Apply
End With
```

## 💡 使用例

### 例1: データ集計レポート作成

**シナリオ**: 元データをコピーして、重複削除、並び替え、CSV出力を一括実行

**手順**:
1. 複数処理統合モードを選択
2. 処理1: 範囲→範囲コピー（Sheet1のA1:D100 → Sheet2のA1）
3. 処理2: 重複削除（Sheet2のA列）
4. 処理3: データ並び替え（Sheet2のA列、昇順）
5. 処理4: CSV出力（Sheet2 → C:\output.csv）
6. 「統合コードを生成」をクリック

**生成されるコード**:
```vba
Sub MultiProcessCode()
    On Error GoTo ErrorHandler
    
    ' 処理1: Sheet1のA1:D100からSheet2のA1以降にコピー
    Worksheets("Sheet1").Range("A1:D100").Copy
    Worksheets("Sheet2").Range("A1").PasteSpecial xlPasteValues
    Application.CutCopyMode = False
    
    ' 進捗表示
    Application.StatusBar = "処理中... (1/4)"
    
    ' 処理2: Sheet2の1列目で重複削除
    Worksheets("Sheet2").Range("A1:D100").RemoveDuplicates _
        Columns:=1, Header:=xlYes
    
    ' 進捗表示
    Application.StatusBar = "処理中... (2/4)"
    
    ' 処理3: Sheet2をA列で並び替え
    With Worksheets("Sheet2").Sort
        .SortFields.Clear
        .SortFields.Add Key:=Range("A1"), Order:=xlAscending
        .SetRange Range("A1:D100")
        .Header = xlYes
        .Apply
    End With
    
    ' 進捗表示
    Application.StatusBar = "処理中... (3/4)"
    
    ' 処理4: Sheet2をCSV出力
    Dim wb As Workbook
    Set wb = Workbooks.Add
    ThisWorkbook.Worksheets("Sheet2").Copy Before:=wb.Worksheets(1)
    wb.SaveAs Filename:="C:\output.csv", FileFormat:=xlCSV
    wb.Close SaveChanges:=False
    
    ' 進捗表示
    Application.StatusBar = "処理中... (4/4)"

    Application.StatusBar = False
    
    MsgBox "すべての処理が完了しました", vbInformation
    Exit Sub

ErrorHandler:
    MsgBox "エラーが発生しました: " & Err.Description, vbCritical
    Application.StatusBar = False
End Sub
```

### 例2: 複数シートの統合処理

**シナリオ**: Sheet1とSheet2のデータを統合シートにコピーして集計

**手順**:
1. 処理1: セル→セル転記（Sheet1のA1 → 統合シートのA1）
2. 処理2: セル→セル転記（Sheet2のA1 → 統合シートのA2）
3. 処理3: 集計処理（統合シートのA1:A2、合計）

## 🎨 UI/UX設計

### モード切替ボタン
- 目立つ位置に配置
- 選択中のモードは紫-青のグラデーション
- 非選択は白背景にグレーのボーダー

### 処理リスト
- カード形式で表示
- 各カードに処理番号とテンプレート名を表示
- ↑↓ボタンで順序変更
- ゴミ箱アイコンで削除

### 統合コード生成ボタン
- 緑色のグラデーション（緑→エメラルド）
- 処理数を表示（例: "統合コードを生成 (3個の処理)"）
- 処理が登録されていない場合は非表示

### オプションチェックボックス
- 進捗表示を追加
- エラーハンドリングを追加
- デフォルトで両方ともチェック済み

## 📊 技術的な実装

### 状態管理

```typescript
interface ProcessItem {
  id: string;
  templateId: string;
  params: Record<string, string>;
}

const [processList, setProcessList] = useState<ProcessItem[]>([]);
const [isMultiMode, setIsMultiMode] = useState(false);
const [showProgressOption, setShowProgressOption] = useState(true);
const [showErrorHandling, setShowErrorHandling] = useState(true);
```

### コード生成ロジック

各テンプレートの`generateCode`関数に`index`パラメータを追加し、複数処理モードでは処理番号付きのコメントを生成します。

```typescript
generateCode: (params, index) => {
  const comment = index !== undefined 
    ? `    ' 処理${index + 1}: ${params.sourceSheet}の${params.sourceCell}から${params.targetSheet}の${params.targetCell}にデータを転記`
    : `    ' ${params.sourceSheet}の${params.sourceCell}から${params.targetSheet}の${params.targetCell}にデータを転記`;
  
  return `${comment}
    Worksheets("${params.targetSheet}").Range("${params.targetCell}").Value = _
        Worksheets("${params.sourceSheet}").Range("${params.sourceCell}").Value`;
}
```

### 統合コード生成

```typescript
const handleGenerateMultiCode = () => {
  if (processList.length === 0) return;

  let code = 'Sub MultiProcessCode()\n';
  
  if (showErrorHandling) {
    code += '    On Error GoTo ErrorHandler\n    \n';
  }
  
  processList.forEach((process, index) => {
    const template = templates.find(t => t.id === process.templateId);
    if (template) {
      code += template.generateCode(process.params, index) + '\n';
      
      if (showProgressOption) {
        code += `    \n    ' 進捗表示\n`;
        code += `    Application.StatusBar = "処理中... (${index + 1}/${processList.length})"\n`;
      }
    }
  });
  
  if (showProgressOption) {
    code += '\n    Application.StatusBar = False\n';
  }
  
  code += '    \n    MsgBox "すべての処理が完了しました", vbInformation\n';
  
  if (showErrorHandling) {
    code += '    Exit Sub\n\n';
    code += 'ErrorHandler:\n';
    code += '    MsgBox "エラーが発生しました: " & Err.Description, vbCritical\n';
    code += '    Application.StatusBar = False\n';
  }
  
  code += 'End Sub';
  
  setGeneratedCode(code);
};
```

## 🚀 デプロイ情報

**公開URL**: https://vba-dev-hub-vercel.vercel.app/tools/generator

**リポジトリ**: https://github.com/umeo51/vba-dev-hub-vercel

**デプロイ日**: 2025年11月22日

## 📈 期待される効果

### ユーザーへの価値

1. **時間短縮**: 複数の処理を手動で統合する手間が不要
2. **エラー削減**: 自動生成により、統合時のコピペミスを防止
3. **学習効果**: 生成されたコードから、複数処理の統合方法を学べる
4. **柔軟性**: 処理の順序を自由に変更でき、試行錯誤が容易

### 利用シーン

- **データ分析**: 複数のデータ処理を一括実行
- **レポート作成**: データ収集→加工→出力の自動化
- **定型業務**: 毎日/毎週実行する処理の自動化
- **教育**: VBAの複雑な処理の学習教材として

## 🎯 今後の拡張可能性

1. **処理のテンプレート化**: よく使う処理の組み合わせを保存
2. **ドラッグ&ドロップ**: より直感的な順序変更
3. **条件分岐**: 処理の結果に応じて次の処理を変更
4. **ループ処理**: 同じ処理を複数回実行
5. **変数の共有**: 前の処理の結果を次の処理で使用

## 📝 まとめ

複数処理統合機能により、VBAコード自動生成ツールは**単なるテンプレート集から実用的なコード生成プラットフォーム**へと進化しました。

ユーザーは複雑な処理を簡単に作成でき、VBA開発の効率が大幅に向上します。この機能は、初心者から上級者まで幅広いユーザーに価値を提供します。

---

**開発完了日**: 2025年11月22日  
**バージョン**: 2.0  
**ステータス**: 本番環境で稼働中 ✅
