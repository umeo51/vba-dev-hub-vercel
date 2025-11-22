'use client';
import Header from '@/components/Header';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

type CodeCategory = 'data_transfer' | 'data_process' | 'file_sheet' | 'loop' | 'basic';

interface CodeTemplate {
  id: string;
  category: CodeCategory;
  name: string;
  description: string;
  parameters?: {
    name: string;
    label: string;
    type: 'text' | 'select';
    options?: { value: string; label: string }[];
    default?: string;
    placeholder?: string;
  }[];
  generateCode: (params: Record<string, string>) => string;
}

const templates: CodeTemplate[] = [
  // データ転記・コピー系
  {
    id: 'cell_to_cell',
    category: 'data_transfer',
    name: 'セル→セル転記',
    description: '特定のセルから別のセルにデータを転記します',
    parameters: [
      { name: 'sourceSheet', label: '転記元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'sourceCell', label: '転記元セル', type: 'text', default: 'A1', placeholder: 'A1' },
      { name: 'targetSheet', label: '転記先シート名', type: 'text', default: 'Sheet2', placeholder: 'Sheet2' },
      { name: 'targetCell', label: '転記先セル', type: 'text', default: 'B1', placeholder: 'B1' },
    ],
    generateCode: (params) => `Sub CellToCellTransfer()
    ' ${params.sourceSheet}の${params.sourceCell}から${params.targetSheet}の${params.targetCell}にデータを転記
    Worksheets("${params.targetSheet}").Range("${params.targetCell}").Value = _
        Worksheets("${params.sourceSheet}").Range("${params.sourceCell}").Value
    
    MsgBox "データを転記しました", vbInformation
End Sub`
  },
  {
    id: 'range_to_range',
    category: 'data_transfer',
    name: '範囲→範囲コピー',
    description: 'セル範囲を別の範囲にコピーします',
    parameters: [
      { name: 'sourceSheet', label: '転記元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'sourceRange', label: '転記元範囲', type: 'text', default: 'A1:C10', placeholder: 'A1:C10' },
      { name: 'targetSheet', label: '転記先シート名', type: 'text', default: 'Sheet2', placeholder: 'Sheet2' },
      { name: 'targetCell', label: '転記先開始セル', type: 'text', default: 'A1', placeholder: 'A1' },
      { name: 'copyType', label: 'コピー方法', type: 'select', options: [
        { value: 'all', label: 'すべて（書式含む）' },
        { value: 'values', label: '値のみ' },
        { value: 'formats', label: '書式のみ' }
      ], default: 'all' }
    ],
    generateCode: (params) => {
      let pasteCode = '';
      if (params.copyType === 'all') {
        pasteCode = 'Worksheets("' + params.targetSheet + '").Range("' + params.targetCell + '").PasteSpecial';
      } else if (params.copyType === 'values') {
        pasteCode = 'Worksheets("' + params.targetSheet + '").Range("' + params.targetCell + '").PasteSpecial xlPasteValues';
      } else {
        pasteCode = 'Worksheets("' + params.targetSheet + '").Range("' + params.targetCell + '").PasteSpecial xlPasteFormats';
      }
      
      return `Sub RangeToRangeCopy()
    ' ${params.sourceSheet}の${params.sourceRange}から${params.targetSheet}の${params.targetCell}以降にコピー
    Worksheets("${params.sourceSheet}").Range("${params.sourceRange}").Copy
    ${pasteCode}
    Application.CutCopyMode = False
    
    MsgBox "データをコピーしました", vbInformation
End Sub`;
    }
  },
  {
    id: 'conditional_transfer',
    category: 'data_transfer',
    name: '条件付き転記',
    description: '条件に合致するデータのみを転記します',
    parameters: [
      { name: 'sourceSheet', label: '転記元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'sourceColumn', label: '判定列（A,B,C...）', type: 'text', default: 'A', placeholder: 'A' },
      { name: 'condition', label: '条件', type: 'select', options: [
        { value: 'equal', label: '等しい（=）' },
        { value: 'notequal', label: '等しくない（<>）' },
        { value: 'greater', label: 'より大きい（>）' },
        { value: 'less', label: 'より小さい（<）' },
        { value: 'contains', label: '含む' }
      ], default: 'equal' },
      { name: 'conditionValue', label: '条件値', type: 'text', default: '100', placeholder: '100' },
      { name: 'targetSheet', label: '転記先シート名', type: 'text', default: 'Sheet2', placeholder: 'Sheet2' },
    ],
    generateCode: (params) => {
      let conditionCode = '';
      const col = params.sourceColumn;
      const val = params.conditionValue;
      
      switch(params.condition) {
        case 'equal':
          conditionCode = `cell.Value = "${val}"`;
          break;
        case 'notequal':
          conditionCode = `cell.Value <> "${val}"`;
          break;
        case 'greater':
          conditionCode = `cell.Value > ${val}`;
          break;
        case 'less':
          conditionCode = `cell.Value < ${val}`;
          break;
        case 'contains':
          conditionCode = `InStr(cell.Value, "${val}") > 0`;
          break;
      }
      
      return `Sub ConditionalTransfer()
    Dim wsSource As Worksheet, wsTarget As Worksheet
    Dim lastRow As Long, targetRow As Long
    Dim cell As Range
    
    Set wsSource = Worksheets("${params.sourceSheet}")
    Set wsTarget = Worksheets("${params.targetSheet}")
    
    ' 転記元の最終行を取得
    lastRow = wsSource.Cells(wsSource.Rows.Count, "${col}").End(xlUp).Row
    targetRow = 2 ' 転記先の開始行（1行目はヘッダー想定）
    
    ' 条件に合致する行を転記
    For Each cell In wsSource.Range("${col}2:${col}" & lastRow)
        If ${conditionCode} Then
            wsSource.Rows(cell.Row).Copy wsTarget.Rows(targetRow)
            targetRow = targetRow + 1
        End If
    Next cell
    
    MsgBox "条件に合致するデータを転記しました", vbInformation
End Sub`;
    }
  },
  {
    id: 'filter_copy',
    category: 'data_transfer',
    name: 'フィルタ後のデータコピー',
    description: 'オートフィルタで絞り込んだデータをコピーします',
    parameters: [
      { name: 'sourceSheet', label: '転記元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'filterColumn', label: 'フィルタ列番号', type: 'text', default: '1', placeholder: '1' },
      { name: 'filterValue', label: 'フィルタ値', type: 'text', default: '東京', placeholder: '東京' },
      { name: 'targetSheet', label: '転記先シート名', type: 'text', default: 'Sheet2', placeholder: 'Sheet2' },
    ],
    generateCode: (params) => `Sub FilterAndCopy()
    Dim wsSource As Worksheet, wsTarget As Worksheet
    Dim lastRow As Long
    
    Set wsSource = Worksheets("${params.sourceSheet}")
    Set wsTarget = Worksheets("${params.targetSheet}")
    
    ' 最終行を取得
    lastRow = wsSource.Cells(wsSource.Rows.Count, 1).End(xlUp).Row
    
    ' オートフィルタを設定
    wsSource.Range("A1").AutoFilter Field:=${params.filterColumn}, Criteria1:="${params.filterValue}"
    
    ' フィルタ後のデータをコピー
    wsSource.Range("A1:A" & lastRow).SpecialCells(xlCellTypeVisible).EntireRow.Copy
    wsTarget.Range("A1").PasteSpecial
    
    ' フィルタを解除
    wsSource.AutoFilterMode = False
    Application.CutCopyMode = False
    
    MsgBox "フィルタ後のデータをコピーしました", vbInformation
End Sub`
  },

  // データ処理系
  {
    id: 'remove_duplicates',
    category: 'data_process',
    name: '重複削除',
    description: '指定した列の重複データを削除します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'dataRange', label: 'データ範囲', type: 'text', default: 'A1:C100', placeholder: 'A1:C100' },
      { name: 'keyColumn', label: '重複判定列番号', type: 'text', default: '1', placeholder: '1' },
    ],
    generateCode: (params) => `Sub RemoveDuplicates()
    Dim ws As Worksheet
    Set ws = Worksheets("${params.sheetName}")
    
    ' 重複を削除
    ws.Range("${params.dataRange}").RemoveDuplicates Columns:=${params.keyColumn}, Header:=xlYes
    
    MsgBox "重複データを削除しました", vbInformation
End Sub`
  },
  {
    id: 'sort_data',
    category: 'data_process',
    name: 'データ並び替え',
    description: 'データを指定した列で並び替えます',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'dataRange', label: 'データ範囲', type: 'text', default: 'A1:C100', placeholder: 'A1:C100' },
      { name: 'sortColumn', label: '並び替え列', type: 'text', default: 'A', placeholder: 'A' },
      { name: 'sortOrder', label: '並び順', type: 'select', options: [
        { value: 'asc', label: '昇順' },
        { value: 'desc', label: '降順' }
      ], default: 'asc' }
    ],
    generateCode: (params) => {
      const order = params.sortOrder === 'asc' ? 'xlAscending' : 'xlDescending';
      return `Sub SortData()
    Dim ws As Worksheet
    Set ws = Worksheets("${params.sheetName}")
    
    ' データを並び替え
    With ws.Sort
        .SortFields.Clear
        .SortFields.Add Key:=ws.Range("${params.sortColumn}1"), _
            SortOn:=xlSortOnValues, Order:=${order}, DataOption:=xlSortNormal
        .SetRange ws.Range("${params.dataRange}")
        .Header = xlYes
        .Apply
    End With
    
    MsgBox "データを並び替えました", vbInformation
End Sub`;
    }
  },
  {
    id: 'vlookup_search',
    category: 'data_process',
    name: 'データ検索（VLOOKUP風）',
    description: '検索値に対応するデータを取得します',
    parameters: [
      { name: 'searchSheet', label: '検索先シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'searchRange', label: '検索範囲', type: 'text', default: 'A1:D100', placeholder: 'A1:D100' },
      { name: 'searchValue', label: '検索値（セル参照）', type: 'text', default: 'Sheet2!A1', placeholder: 'Sheet2!A1' },
      { name: 'returnColumn', label: '取得列番号', type: 'text', default: '2', placeholder: '2' },
      { name: 'resultCell', label: '結果出力セル', type: 'text', default: 'Sheet2!B1', placeholder: 'Sheet2!B1' },
    ],
    generateCode: (params) => `Sub VLookupSearch()
    Dim searchValue As Variant
    Dim result As Variant
    
    ' 検索値を取得
    searchValue = Range("${params.searchValue}").Value
    
    ' VLOOKUP風の検索
    On Error Resume Next
    result = Application.WorksheetFunction.VLookup(searchValue, _
        Worksheets("${params.searchSheet}").Range("${params.searchRange}"), _
        ${params.returnColumn}, False)
    On Error GoTo 0
    
    ' 結果を出力
    If IsError(result) Then
        Range("${params.resultCell}").Value = "見つかりませんでした"
    Else
        Range("${params.resultCell}").Value = result
    End If
    
    MsgBox "検索が完了しました", vbInformation
End Sub`
  },
  {
    id: 'aggregate_data',
    category: 'data_process',
    name: '集計処理',
    description: '指定した列のデータを集計します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'dataColumn', label: '集計列', type: 'text', default: 'B', placeholder: 'B' },
      { name: 'startRow', label: '開始行', type: 'text', default: '2', placeholder: '2' },
      { name: 'endRow', label: '終了行', type: 'text', default: '100', placeholder: '100' },
      { name: 'aggregateType', label: '集計方法', type: 'select', options: [
        { value: 'sum', label: '合計（SUM）' },
        { value: 'average', label: '平均（AVERAGE）' },
        { value: 'count', label: '個数（COUNT）' },
        { value: 'max', label: '最大値（MAX）' },
        { value: 'min', label: '最小値（MIN）' }
      ], default: 'sum' }
    ],
    generateCode: (params) => {
      let funcName = '';
      let funcLabel = '';
      switch(params.aggregateType) {
        case 'sum':
          funcName = 'Sum';
          funcLabel = '合計';
          break;
        case 'average':
          funcName = 'Average';
          funcLabel = '平均';
          break;
        case 'count':
          funcName = 'Count';
          funcLabel = '個数';
          break;
        case 'max':
          funcName = 'Max';
          funcLabel = '最大値';
          break;
        case 'min':
          funcName = 'Min';
          funcLabel = '最小値';
          break;
      }
      
      return `Sub AggregateData()
    Dim ws As Worksheet
    Dim result As Double
    
    Set ws = Worksheets("${params.sheetName}")
    
    ' ${funcLabel}を計算
    result = Application.WorksheetFunction.${funcName}(ws.Range("${params.dataColumn}${params.startRow}:${params.dataColumn}${params.endRow}"))
    
    MsgBox "${funcLabel}: " & result, vbInformation
End Sub`;
    }
  },

  // ファイル・シート操作系
  {
    id: 'add_sheet',
    category: 'file_sheet',
    name: 'シート追加',
    description: '新しいシートを追加します',
    parameters: [
      { name: 'sheetName', label: '新しいシート名', type: 'text', default: '新規シート', placeholder: '新規シート' },
      { name: 'position', label: '追加位置', type: 'select', options: [
        { value: 'before', label: '先頭に追加' },
        { value: 'after', label: '最後に追加' }
      ], default: 'after' }
    ],
    generateCode: (params) => {
      const posCode = params.position === 'before' 
        ? 'Worksheets.Add Before:=Worksheets(1)'
        : 'Worksheets.Add After:=Worksheets(Worksheets.Count)';
      
      return `Sub AddNewSheet()
    Dim ws As Worksheet
    
    ' 新しいシートを追加
    Set ws = ${posCode}
    ws.Name = "${params.sheetName}"
    
    MsgBox "シート「${params.sheetName}」を追加しました", vbInformation
End Sub`;
    }
  },
  {
    id: 'copy_sheet',
    category: 'file_sheet',
    name: 'シートコピー',
    description: 'シートを別のブックにコピーします',
    parameters: [
      { name: 'sourceSheet', label: 'コピー元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'targetType', label: 'コピー先', type: 'select', options: [
        { value: 'same', label: '同じブック内' },
        { value: 'new', label: '新しいブック' }
      ], default: 'same' }
    ],
    generateCode: (params) => {
      if (params.targetType === 'same') {
        return `Sub CopySheet()
    ' 同じブック内にシートをコピー
    Worksheets("${params.sourceSheet}").Copy After:=Worksheets(Worksheets.Count)
    ActiveSheet.Name = "${params.sourceSheet}_コピー"
    
    MsgBox "シートをコピーしました", vbInformation
End Sub`;
      } else {
        return `Sub CopySheet()
    ' 新しいブックにシートをコピー
    Worksheets("${params.sourceSheet}").Copy
    
    MsgBox "新しいブックにシートをコピーしました", vbInformation
End Sub`;
      }
    }
  },
  {
    id: 'export_csv',
    category: 'file_sheet',
    name: 'CSV出力',
    description: 'シートのデータをCSVファイルに出力します',
    parameters: [
      { name: 'sheetName', label: '出力元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'fileName', label: 'ファイル名', type: 'text', default: 'output.csv', placeholder: 'output.csv' },
    ],
    generateCode: (params) => `Sub ExportToCSV()
    Dim ws As Worksheet
    Dim filePath As String
    
    Set ws = Worksheets("${params.sheetName}")
    
    ' 保存先パス（デスクトップ）
    filePath = CreateObject("WScript.Shell").SpecialFolders("Desktop") & "\\${params.fileName}"
    
    ' CSVとして保存
    ws.Copy
    ActiveWorkbook.SaveAs Filename:=filePath, FileFormat:=xlCSV
    ActiveWorkbook.Close SaveChanges:=False
    
    MsgBox "CSVファイルを出力しました: " & filePath, vbInformation
End Sub`
  },

  // 繰り返し処理系
  {
    id: 'row_loop',
    category: 'loop',
    name: '行ループ処理',
    description: 'データの各行に対して処理を実行します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'startRow', label: '開始行', type: 'text', default: '2', placeholder: '2' },
      { name: 'dataColumn', label: 'データ列', type: 'text', default: 'A', placeholder: 'A' },
    ],
    generateCode: (params) => `Sub RowLoop()
    Dim ws As Worksheet
    Dim lastRow As Long
    Dim i As Long
    
    Set ws = Worksheets("${params.sheetName}")
    
    ' 最終行を取得
    lastRow = ws.Cells(ws.Rows.Count, "${params.dataColumn}").End(xlUp).Row
    
    ' 各行に対して処理
    For i = ${params.startRow} To lastRow
        ' ここに処理を記述
        Debug.Print "処理中: " & ws.Cells(i, "${params.dataColumn}").Value
        
        ' 例: B列に行番号を入力
        ws.Cells(i, "B").Value = i
    Next i
    
    MsgBox "行ループ処理が完了しました", vbInformation
End Sub`
  },
  {
    id: 'sheet_loop',
    category: 'loop',
    name: '複数シートループ',
    description: 'ブック内のすべてのシートに対して処理を実行します',
    parameters: [
      { name: 'processType', label: '処理内容', type: 'select', options: [
        { value: 'print', label: 'シート名を表示' },
        { value: 'protect', label: 'シートを保護' },
        { value: 'unprotect', label: 'シート保護を解除' }
      ], default: 'print' }
    ],
    generateCode: (params) => {
      let processCode = '';
      switch(params.processType) {
        case 'print':
          processCode = 'Debug.Print ws.Name';
          break;
        case 'protect':
          processCode = 'ws.Protect Password:="password"';
          break;
        case 'unprotect':
          processCode = 'ws.Unprotect Password:="password"';
          break;
      }
      
      return `Sub SheetLoop()
    Dim ws As Worksheet
    
    ' すべてのシートに対して処理
    For Each ws In ThisWorkbook.Worksheets
        ${processCode}
    Next ws
    
    MsgBox "すべてのシートの処理が完了しました", vbInformation
End Sub`;
    }
  },
  {
    id: 'file_loop',
    category: 'loop',
    name: '複数ファイルループ',
    description: 'フォルダ内のすべてのExcelファイルに対して処理を実行します',
    parameters: [
      { name: 'folderPath', label: 'フォルダパス', type: 'text', default: 'C:\\Users\\Desktop\\', placeholder: 'C:\\Users\\Desktop\\' },
    ],
    generateCode: (params) => `Sub FileLoop()
    Dim folderPath As String
    Dim fileName As String
    Dim wb As Workbook
    
    folderPath = "${params.folderPath}"
    
    ' フォルダ内の最初のExcelファイルを取得
    fileName = Dir(folderPath & "*.xlsx")
    
    ' すべてのExcelファイルに対して処理
    Do While fileName <> ""
        ' ファイルを開く
        Set wb = Workbooks.Open(folderPath & fileName)
        
        ' ここに処理を記述
        Debug.Print "処理中: " & fileName
        
        ' ファイルを閉じる
        wb.Close SaveChanges:=False
        
        ' 次のファイルを取得
        fileName = Dir()
    Loop
    
    MsgBox "すべてのファイルの処理が完了しました", vbInformation
End Sub`
  },

  // 基本構文
  {
    id: 'for_loop',
    category: 'basic',
    name: 'Forループ',
    description: '指定回数繰り返し処理を実行します',
    parameters: [
      { name: 'startNum', label: '開始値', type: 'text', default: '1', placeholder: '1' },
      { name: 'endNum', label: '終了値', type: 'text', default: '10', placeholder: '10' },
    ],
    generateCode: (params) => `Sub ForLoop()
    Dim i As Long
    
    For i = ${params.startNum} To ${params.endNum}
        ' ここに処理を記述
        Debug.Print i
    Next i
End Sub`
  },
  {
    id: 'if_statement',
    category: 'basic',
    name: 'If文',
    description: '条件分岐を行います',
    parameters: [
      { name: 'condition', label: '条件', type: 'text', default: 'x > 10', placeholder: 'x > 10' },
    ],
    generateCode: (params) => `Sub IfStatement()
    Dim x As Long
    x = 15
    
    If ${params.condition} Then
        MsgBox "条件を満たしています"
    Else
        MsgBox "条件を満たしていません"
    End If
End Sub`
  },
];

const categories = [
  { id: 'all', name: 'すべて' },
  { id: 'data_transfer', name: 'データ転記・コピー' },
  { id: 'data_process', name: 'データ処理' },
  { id: 'file_sheet', name: 'ファイル・シート操作' },
  { id: 'loop', name: '繰り返し処理' },
  { id: 'basic', name: '基本構文' },
];

export default function GeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null);
  const [parameters, setParameters] = useState<Record<string, string>>({});
  const [generatedCode, setGeneratedCode] = useState('');

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (template: CodeTemplate) => {
    setSelectedTemplate(template);
    setGeneratedCode('');
    
    // デフォルト値を設定
    const defaultParams: Record<string, string> = {};
    template.parameters?.forEach(param => {
      defaultParams[param.name] = param.default || '';
    });
    setParameters(defaultParams);
  };

  const handleParameterChange = (name: string, value: string) => {
    setParameters(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerate = () => {
    if (selectedTemplate) {
      const code = selectedTemplate.generateCode(parameters);
      setGeneratedCode(code);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    alert('コードをコピーしました！');
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              VBAコード自動生成ツール
            </h1>
            <p className="text-gray-600 text-lg">
              条件を選択するだけで、実用的なVBAコードを自動生成
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* カテゴリ選択 */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">カテゴリ</h2>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setSelectedTemplate(null);
                        setGeneratedCode('');
                      }}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">テンプレート数</h3>
                  <p className="text-3xl font-bold text-blue-600">{filteredTemplates.length}</p>
                </div>
              </div>
            </div>

            {/* テンプレート選択とパラメータ入力 */}
            <div className="lg:col-span-2">
              {!selectedTemplate ? (
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h2 className="text-xl font-bold mb-4">テンプレートを選択</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {filteredTemplates.map(template => (
                      <button
                        key={template.id}
                        onClick={() => handleTemplateSelect(template)}
                        className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                      >
                        <h3 className="font-semibold text-lg mb-2">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* パラメータ入力 */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-xl font-bold">{selectedTemplate.name}</h2>
                      <button
                        onClick={() => {
                          setSelectedTemplate(null);
                          setGeneratedCode('');
                        }}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        ← テンプレート選択に戻る
                      </button>
                    </div>
                    <p className="text-gray-600 mb-6">{selectedTemplate.description}</p>

                    {selectedTemplate.parameters && selectedTemplate.parameters.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="font-semibold">パラメータ設定</h3>
                        {selectedTemplate.parameters.map(param => (
                          <div key={param.name}>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              {param.label}
                            </label>
                            {param.type === 'text' ? (
                              <input
                                type="text"
                                value={parameters[param.name] || ''}
                                onChange={(e) => handleParameterChange(param.name, e.target.value)}
                                placeholder={param.placeholder}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            ) : (
                              <select
                                value={parameters[param.name] || ''}
                                onChange={(e) => handleParameterChange(param.name, e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              >
                                {param.options?.map(option => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={handleGenerate}
                      className="mt-6 w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      コードを生成
                    </button>
                  </div>

                  {/* 生成されたコード */}
                  {generatedCode && (
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">生成されたコード</h2>
                        <button
                          onClick={handleCopy}
                          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          コピー
                        </button>
                      </div>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                        <code>{generatedCode}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/tools"
              className="inline-block px-6 py-3 bg-white text-blue-600 rounded-lg shadow hover:shadow-lg transition-all"
            >
              ← ツール一覧に戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
