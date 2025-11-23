'use client';
import Header from '@/components/Header';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Trash2, Plus, Copy, Check, BookOpen } from 'lucide-react';

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
  generateCode: (params: Record<string, string>, index?: number) => string;
}

interface ProcessItem {
  id: string;
  templateId: string;
  params: Record<string, string>;
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
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sourceSheet}の${params.sourceCell}から${params.targetSheet}の${params.targetCell}にデータを転記` : `    ' ${params.sourceSheet}の${params.sourceCell}から${params.targetSheet}の${params.targetCell}にデータを転記`;
      return `${comment}
    Worksheets("${params.targetSheet}").Range("${params.targetCell}").Value = _
        Worksheets("${params.sourceSheet}").Range("${params.sourceCell}").Value`;
    }
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
    generateCode: (params, index) => {
      let pasteCode = '';
      if (params.copyType === 'all') {
        pasteCode = 'Worksheets("' + params.targetSheet + '").Range("' + params.targetCell + '").PasteSpecial';
      } else if (params.copyType === 'values') {
        pasteCode = 'Worksheets("' + params.targetSheet + '").Range("' + params.targetCell + '").PasteSpecial xlPasteValues';
      } else {
        pasteCode = 'Worksheets("' + params.targetSheet + '").Range("' + params.targetCell + '").PasteSpecial xlPasteFormats';
      }
      
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sourceSheet}の${params.sourceRange}から${params.targetSheet}の${params.targetCell}以降にコピー` : `    ' ${params.sourceSheet}の${params.sourceRange}から${params.targetSheet}の${params.targetCell}以降にコピー`;
      return `${comment}
    Worksheets("${params.sourceSheet}").Range("${params.sourceRange}").Copy
    ${pasteCode}
    Application.CutCopyMode = False`;
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
    generateCode: (params, index) => {
      let conditionCode = '';
      const col = params.sourceColumn;
      const val = params.conditionValue;
      
      switch (params.condition) {
        case 'equal':
          conditionCode = `If cell.Value = ${isNaN(Number(val)) ? '"' + val + '"' : val} Then`;
          break;
        case 'notequal':
          conditionCode = `If cell.Value <> ${isNaN(Number(val)) ? '"' + val + '"' : val} Then`;
          break;
        case 'greater':
          conditionCode = `If cell.Value > ${val} Then`;
          break;
        case 'less':
          conditionCode = `If cell.Value < ${val} Then`;
          break;
        case 'contains':
          conditionCode = `If InStr(cell.Value, "${val}") > 0 Then`;
          break;
      }
      
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sourceSheet}の${col}列で条件に合致する行を${params.targetSheet}に転記` : `    ' ${params.sourceSheet}の${col}列で条件に合致する行を${params.targetSheet}に転記`;
      return `${comment}
    Dim lastRow As Long, targetRow As Long, cell As Range
    lastRow = Worksheets("${params.sourceSheet}").Cells(Rows.Count, "${col}").End(xlUp).Row
    targetRow = 2
    
    For Each cell In Worksheets("${params.sourceSheet}").Range("${col}2:${col}" & lastRow)
        ${conditionCode}
            Worksheets("${params.sourceSheet}").Rows(cell.Row).Copy _
                Worksheets("${params.targetSheet}").Rows(targetRow)
            targetRow = targetRow + 1
        End If
    Next cell`;
    }
  },
  {
    id: 'filter_copy',
    category: 'data_transfer',
    name: 'フィルタ後のデータコピー',
    description: 'オートフィルタで絞り込んだデータをコピーします',
    parameters: [
      { name: 'sourceSheet', label: '転記元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'sourceRange', label: '転記元範囲', type: 'text', default: 'A1:D100', placeholder: 'A1:D100' },
      { name: 'targetSheet', label: '転記先シート名', type: 'text', default: 'Sheet2', placeholder: 'Sheet2' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sourceSheet}のフィルタ後のデータを${params.targetSheet}にコピー` : `    ' ${params.sourceSheet}のフィルタ後のデータを${params.targetSheet}にコピー`;
      return `${comment}
    Worksheets("${params.sourceSheet}").Range("${params.sourceRange}").SpecialCells(xlCellTypeVisible).Copy _
        Worksheets("${params.targetSheet}").Range("A1")
    Application.CutCopyMode = False`;
    }
  },
  
  // データ処理系
  {
    id: 'remove_duplicates',
    category: 'data_process',
    name: '重複削除',
    description: '指定した列の重複データを削除します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'dataRange', label: '対象範囲', type: 'text', default: 'A1:C100', placeholder: 'A1:C100' },
      { name: 'keyColumn', label: '判定列（1,2,3...）', type: 'text', default: '1', placeholder: '1' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sheetName}の${params.keyColumn}列目で重複削除` : `    ' ${params.sheetName}の${params.keyColumn}列目で重複削除`;
      return `${comment}
    Worksheets("${params.sheetName}").Range("${params.dataRange}").RemoveDuplicates _
        Columns:=${params.keyColumn}, Header:=xlYes`;
    }
  },
  {
    id: 'sort_data',
    category: 'data_process',
    name: 'データ並び替え',
    description: 'データを指定した列で並び替えます',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'dataRange', label: '対象範囲', type: 'text', default: 'A1:C100', placeholder: 'A1:C100' },
      { name: 'sortColumn', label: '並び替え列（A,B,C...）', type: 'text', default: 'A', placeholder: 'A' },
      { name: 'sortOrder', label: '並び順', type: 'select', options: [
        { value: 'asc', label: '昇順' },
        { value: 'desc', label: '降順' }
      ], default: 'asc' }
    ],
    generateCode: (params, index) => {
      const order = params.sortOrder === 'asc' ? 'xlAscending' : 'xlDescending';
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sheetName}を${params.sortColumn}列で並び替え` : `    ' ${params.sheetName}を${params.sortColumn}列で並び替え`;
      return `${comment}
    With Worksheets("${params.sheetName}").Sort
        .SortFields.Clear
        .SortFields.Add Key:=Range("${params.sortColumn}1"), Order:=${order}
        .SetRange Range("${params.dataRange}")
        .Header = xlYes
        .Apply
    End With`;
    }
  },
  {
    id: 'vlookup_search',
    category: 'data_process',
    name: 'データ検索（VLOOKUP風）',
    description: '検索値に対応するデータを取得します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'searchValue', label: '検索値', type: 'text', default: '商品A', placeholder: '商品A' },
      { name: 'searchRange', label: '検索範囲', type: 'text', default: 'A1:D100', placeholder: 'A1:D100' },
      { name: 'searchColumn', label: '検索列（1,2,3...）', type: 'text', default: '1', placeholder: '1' },
      { name: 'returnColumn', label: '取得列（1,2,3...）', type: 'text', default: '2', placeholder: '2' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sheetName}で${params.searchValue}を検索` : `    ' ${params.sheetName}で${params.searchValue}を検索`;
      return `${comment}
    Dim result As Variant
    result = Application.WorksheetFunction.VLookup("${params.searchValue}", _
        Worksheets("${params.sheetName}").Range("${params.searchRange}"), ${params.returnColumn}, False)
    MsgBox "検索結果: " & result, vbInformation`;
    }
  },
  {
    id: 'aggregate',
    category: 'data_process',
    name: '集計処理',
    description: '指定した列のデータを集計します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'dataRange', label: '対象範囲', type: 'text', default: 'A1:A100', placeholder: 'A1:A100' },
      { name: 'aggregateType', label: '集計方法', type: 'select', options: [
        { value: 'sum', label: '合計（SUM）' },
        { value: 'average', label: '平均（AVERAGE）' },
        { value: 'count', label: '個数（COUNT）' },
        { value: 'max', label: '最大値（MAX）' },
        { value: 'min', label: '最小値（MIN）' }
      ], default: 'sum' }
    ],
    generateCode: (params, index) => {
      let funcName = '';
      switch (params.aggregateType) {
        case 'sum': funcName = 'Sum'; break;
        case 'average': funcName = 'Average'; break;
        case 'count': funcName = 'Count'; break;
        case 'max': funcName = 'Max'; break;
        case 'min': funcName = 'Min'; break;
      }
      
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sheetName}の${params.dataRange}を集計` : `    ' ${params.sheetName}の${params.dataRange}を集計`;
      return `${comment}
    Dim result As Variant
    result = Application.WorksheetFunction.${funcName}(Worksheets("${params.sheetName}").Range("${params.dataRange}"))
    MsgBox "集計結果: " & result, vbInformation`;
    }
  },
  
  // ファイル・シート操作系
  {
    id: 'add_sheet',
    category: 'file_sheet',
    name: 'シート追加',
    description: '新しいシートを追加します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: '新しいシート', placeholder: '新しいシート' },
      { name: 'position', label: '追加位置', type: 'select', options: [
        { value: 'first', label: '先頭' },
        { value: 'last', label: '最後' }
      ], default: 'last' }
    ],
    generateCode: (params, index) => {
      const posCode = params.position === 'first' 
        ? 'Worksheets.Add Before:=Worksheets(1)'
        : 'Worksheets.Add After:=Worksheets(Worksheets.Count)';
      
      const comment = index !== undefined ? `    ' 処理${index + 1}: シート「${params.sheetName}」を追加` : `    ' シート「${params.sheetName}」を追加`;
      return `${comment}
    ${posCode}
    ActiveSheet.Name = "${params.sheetName}"`;
    }
  },
  {
    id: 'copy_sheet',
    category: 'file_sheet',
    name: 'シートコピー',
    description: 'シートを別のブックにコピーします',
    parameters: [
      { name: 'sourceSheet', label: '元シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'targetWorkbook', label: '先ブック名', type: 'text', default: 'Book2.xlsx', placeholder: 'Book2.xlsx' },
      { name: 'copyType', label: 'コピー先', type: 'select', options: [
        { value: 'same', label: '同じブック' },
        { value: 'new', label: '新しいブック' }
      ], default: 'same' }
    ],
    generateCode: (params, index) => {
      const copyCode = params.copyType === 'same'
        ? `Worksheets("${params.sourceSheet}").Copy After:=Worksheets(Worksheets.Count)`
        : `Worksheets("${params.sourceSheet}").Copy`;
      
      const comment = index !== undefined ? `    ' 処理${index + 1}: シート「${params.sourceSheet}」をコピー` : `    ' シート「${params.sourceSheet}」をコピー`;
      return `${comment}
    ${copyCode}`;
    }
  },
  {
    id: 'export_csv',
    category: 'file_sheet',
    name: 'CSV出力',
    description: 'シートのデータをCSVファイルに出力します',
    parameters: [
      { name: 'sheetName', label: 'シート名', type: 'text', default: 'Sheet1', placeholder: 'Sheet1' },
      { name: 'filePath', label: '出力ファイルパス', type: 'text', default: 'C:\\output.csv', placeholder: 'C:\\output.csv' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sheetName}をCSV出力` : `    ' ${params.sheetName}をCSV出力`;
      return `${comment}
    Dim wb As Workbook
    Set wb = Workbooks.Add
    ThisWorkbook.Worksheets("${params.sheetName}").Copy Before:=wb.Worksheets(1)
    wb.SaveAs Filename:="${params.filePath}", FileFormat:=xlCSV
    wb.Close SaveChanges:=False`;
    }
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
      { name: 'endColumn', label: '終了列（A,B,C...）', type: 'text', default: 'A', placeholder: 'A' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.sheetName}の各行をループ処理` : `    ' ${params.sheetName}の各行をループ処理`;
      return `${comment}
    Dim i As Long, lastRow As Long
    lastRow = Worksheets("${params.sheetName}").Cells(Rows.Count, "${params.endColumn}").End(xlUp).Row
    
    For i = ${params.startRow} To lastRow
        ' ここに各行に対する処理を記述
        Debug.Print Worksheets("${params.sheetName}").Cells(i, "${params.endColumn}").Value
    Next i`;
    }
  },
  {
    id: 'sheet_loop',
    category: 'loop',
    name: '複数シートループ',
    description: 'すべてのシートに対して処理を実行します',
    parameters: [],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: すべてのシートをループ処理` : `    ' すべてのシートをループ処理`;
      return `${comment}
    Dim ws As Worksheet
    For Each ws In ThisWorkbook.Worksheets
        ' ここに各シートに対する処理を記述
        Debug.Print ws.Name
    Next ws`;
    }
  },
  {
    id: 'file_loop',
    category: 'loop',
    name: '複数ファイルループ',
    description: 'フォルダ内のすべてのExcelファイルを処理します',
    parameters: [
      { name: 'folderPath', label: 'フォルダパス', type: 'text', default: 'C:\\data\\', placeholder: 'C:\\data\\' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.folderPath}内のファイルをループ処理` : `    ' ${params.folderPath}内のファイルをループ処理`;
      return `${comment}
    Dim fileName As String, wb As Workbook
    fileName = Dir("${params.folderPath}*.xlsx")
    
    Do While fileName <> ""
        Set wb = Workbooks.Open("${params.folderPath}" & fileName)
        ' ここに各ファイルに対する処理を記述
        Debug.Print wb.Name
        wb.Close SaveChanges:=False
        fileName = Dir()
    Loop`;
    }
  },
  
  // 基本構文
  {
    id: 'for_loop',
    category: 'basic',
    name: 'Forループ',
    description: '指定回数の繰り返し処理',
    parameters: [
      { name: 'startNum', label: '開始値', type: 'text', default: '1', placeholder: '1' },
      { name: 'endNum', label: '終了値', type: 'text', default: '10', placeholder: '10' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: ${params.startNum}から${params.endNum}までループ` : `    ' ${params.startNum}から${params.endNum}までループ`;
      return `${comment}
    Dim i As Long
    For i = ${params.startNum} To ${params.endNum}
        ' ここに処理を記述
        Debug.Print i
    Next i`;
    }
  },
  {
    id: 'if_statement',
    category: 'basic',
    name: 'If文',
    description: '条件分岐処理',
    parameters: [
      { name: 'condition', label: '条件', type: 'text', default: 'x > 10', placeholder: 'x > 10' },
    ],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: 条件分岐` : `    ' 条件分岐`;
      return `${comment}
    If ${params.condition} Then
        ' 条件が真の場合の処理
        MsgBox "条件を満たしています"
    Else
        ' 条件が偽の場合の処理
        MsgBox "条件を満たしていません"
    End If`;
    }
  },
  {
    id: 'other_basic',
    category: 'basic',
    name: 'その他の基本構文',
    description: 'Select Case、Do Whileなど',
    parameters: [],
    generateCode: (params, index) => {
      const comment = index !== undefined ? `    ' 処理${index + 1}: 基本構文のサンプル` : `    ' 基本構文のサンプル`;
      return `${comment}
    ' Select Case文
    Select Case x
        Case 1
            MsgBox "1です"
        Case 2
            MsgBox "2です"
        Case Else
            MsgBox "その他です"
    End Select
    
    ' Do While文
    Do While x < 10
        x = x + 1
    Loop`;
    }
  }
];

const categories = [
  { id: 'all', name: 'すべて', count: templates.length },
  { id: 'data_transfer', name: 'データ転記・コピー', count: templates.filter(t => t.category === 'data_transfer').length },
  { id: 'data_process', name: 'データ処理', count: templates.filter(t => t.category === 'data_process').length },
  { id: 'file_sheet', name: 'ファイル・シート操作', count: templates.filter(t => t.category === 'file_sheet').length },
  { id: 'loop', name: '繰り返し処理', count: templates.filter(t => t.category === 'loop').length },
  { id: 'basic', name: '基本構文', count: templates.filter(t => t.category === 'basic').length },
];

export default function CodeGeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null);
  const [params, setParams] = useState<Record<string, string>>({});
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copied, setCopied] = useState(false);
  
  // 複数処理管理用の状態
  const [processList, setProcessList] = useState<ProcessItem[]>([]);  const [isMultiMode, setIsMultiMode] = useState(true);
  const [showProgressOption, setShowProgressOption] = useState(true);
  const [showErrorHandling, setShowErrorHandling] = useState(true);

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateSelect = (template: CodeTemplate) => {
    setSelectedTemplate(template);
    const defaultParams: Record<string, string> = {};
    template.parameters?.forEach(param => {
      defaultParams[param.name] = param.default || '';
    });
    setParams(defaultParams);
    setGeneratedCode('');
  };

  const handleParamChange = (name: string, value: string) => {
    setParams(prev => ({ ...prev, [name]: value }));
  };

  const handleGenerateCode = () => {
    if (selectedTemplate) {
      const code = selectedTemplate.generateCode(params);
      setGeneratedCode(`Sub GeneratedCode()
${code}
    
    MsgBox "処理が完了しました", vbInformation
End Sub`);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 複数処理管理関数
  const handleAddProcess = () => {
    if (selectedTemplate) {
      const newProcess: ProcessItem = {
        id: Date.now().toString(),
        templateId: selectedTemplate.id,
        params: { ...params }
      };
      setProcessList(prev => [...prev, newProcess]);
      setSelectedTemplate(null);
      setParams({});
    }
  };

  const handleRemoveProcess = (id: string) => {
    setProcessList(prev => prev.filter(p => p.id !== id));
  };

  const handleMoveProcess = (index: number, direction: 'up' | 'down') => {
    const newList = [...processList];
    if (direction === 'up' && index > 0) {
      [newList[index - 1], newList[index]] = [newList[index], newList[index - 1]];
    } else if (direction === 'down' && index < newList.length - 1) {
      [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
    }
    setProcessList(newList);
  };

  const handleGenerateMultiCode = () => {
    if (processList.length === 0) return;

    let code = 'Sub MultiProcessCode()\n';
    
    if (showErrorHandling) {
      code += '    On Error GoTo ErrorHandler\n    \n';
    }
    
    processList.forEach((process, index) => {
      const template = templates.find(t => t.id === process.templateId);
      if (template) {
        if (showProgressOption && index > 0) {
          code += '\n';
        }
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

  const getTemplateName = (templateId: string) => {
    return templates.find(t => t.id === templateId)?.name || '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            VBAコード自動生成ツール
          </h1>
          <div className="mb-6">
            <Link
              href="/guides/code-generator"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>使い方ガイドを見る</span>
            </Link>
          </div>
          <p className="text-xl text-gray-600">
            条件を選択するだけで、実用的なVBAコードを自動生成
          </p>
        </div>



        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* カテゴリ選択 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 text-gray-800">カテゴリ</h2>
              <div className="space-y-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{category.name}</span>
                      <span className={`text-sm px-2 py-1 rounded-full ${
                        selectedCategory === category.id
                          ? 'bg-white/20'
                          : 'bg-gray-200'
                      }`}>
                        {category.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="font-semibold mb-2">テンプレート数</p>
                  <p className="text-3xl font-bold text-purple-600">{templates.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* テンプレート選択 & パラメータ入力 */}
          <div className="lg:col-span-3">
            {!selectedTemplate ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">テンプレートを選択</h2>
                  {isMultiMode && processList.length > 0 && (
                    <button
                      onClick={handleGenerateMultiCode}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      統合コードを生成 ({processList.length}個の処理)
                    </button>
                  )}
                </div>

                {isMultiMode && processList.length > 0 && (
                  <div className="mb-6 bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-lg font-bold mb-4 text-gray-800">登録済みの処理</h3>
                    <div className="space-y-3">
                      {processList.map((process, index) => (
                        <div key={process.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <span className="font-semibold text-purple-600">処理{index + 1}:</span>{' '}
                            <span className="text-gray-700">{getTemplateName(process.templateId)}</span>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleMoveProcess(index, 'up')}
                              disabled={index === 0}
                              className="p-2 text-gray-600 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowUp size={20} />
                            </button>
                            <button
                              onClick={() => handleMoveProcess(index, 'down')}
                              disabled={index === processList.length - 1}
                              className="p-2 text-gray-600 hover:text-purple-600 disabled:opacity-30 disabled:cursor-not-allowed"
                            >
                              <ArrowDown size={20} />
                            </button>
                            <button
                              onClick={() => handleRemoveProcess(process.id)}
                              className="p-2 text-red-600 hover:text-red-700"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showProgressOption}
                          onChange={(e) => setShowProgressOption(e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <span className="text-sm text-gray-700">進捗表示を追加</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={showErrorHandling}
                          onChange={(e) => setShowErrorHandling(e.target.checked)}
                          className="w-4 h-4 text-purple-600 rounded"
                        />
                        <span className="text-sm text-gray-700">エラーハンドリングを追加</span>
                      </label>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {filteredTemplates.map(template => (
                    <button
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className="bg-white rounded-xl shadow-lg p-6 text-left hover:shadow-xl transition-all border-2 border-transparent hover:border-purple-400"
                    >
                      <h3 className="text-lg font-bold text-gray-800 mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <button
                      onClick={() => {
                        setSelectedTemplate(null);
                        setParams({});
                        setGeneratedCode('');
                      }}
                      className="text-purple-600 hover:text-purple-700 font-semibold mb-2 inline-block"
                    >
                      ← テンプレート選択に戻る
                    </button>
                    <h2 className="text-2xl font-bold text-gray-800">{selectedTemplate.name}</h2>
                    <p className="text-gray-600 mt-1">{selectedTemplate.description}</p>
                  </div>
                </div>

                {selectedTemplate.parameters && selectedTemplate.parameters.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-4 text-gray-800">パラメータ設定</h3>
                    <div className="space-y-4">
                      {selectedTemplate.parameters.map(param => (
                        <div key={param.name}>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            {param.label}
                          </label>
                          {param.type === 'text' ? (
                            <input
                              type="text"
                              value={params[param.name] || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              placeholder={param.placeholder}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                            />
                          ) : (
                            <select
                              value={params[param.name] || param.default || ''}
                              onChange={(e) => handleParamChange(param.name, e.target.value)}
                              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
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
                  </div>
                )}

                <div className="flex gap-4">
                  {!isMultiMode ? (
                    <button
                      onClick={handleGenerateCode}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                    >
                      コードを生成
                    </button>
                  ) : (
                    <button
                      onClick={handleAddProcess}
                      className="flex-1 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Plus size={20} />
                      処理リストに追加
                    </button>
                  )}
                </div>

                {generatedCode && (
                  <div className="mt-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">生成されたコード</h3>
                      <button
                        onClick={handleCopy}
                        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                      >
                        {copied ? <Check size={20} /> : <Copy size={20} />}
                        {copied ? 'コピーしました！' : 'コピー'}
                      </button>
                    </div>
                    <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                      <code>{generatedCode}</code>
                    </pre>
                  </div>
                )}
              </div>
            )}

            {/* 統合コード表示エリア */}
            {isMultiMode && generatedCode && !selectedTemplate && (
              <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">統合コード</h3>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
                  >
                    {copied ? <Check size={20} /> : <Copy size={20} />}
                    {copied ? 'コピーしました！' : 'コピー'}
                  </button>
                </div>
                <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm">
                  <code>{generatedCode}</code>
                </pre>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/tools" className="text-purple-600 hover:text-purple-700 font-semibold">
            ← ツール一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
