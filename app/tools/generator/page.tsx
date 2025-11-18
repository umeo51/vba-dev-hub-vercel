'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Copy, Download } from 'lucide-react';
import { toast } from 'sonner';

type CodeTemplate = 'loop' | 'fileRead' | 'fileWrite' | 'excelRead' | 'excelWrite' | 'msgbox' | 'inputbox';

export default function CodeGeneratorPage() {
  const [template, setTemplate] = useState<CodeTemplate>('loop');
  const [generatedCode, setGeneratedCode] = useState('');
  const [params, setParams] = useState<Record<string, string>>({
    startValue: '1',
    endValue: '10',
    variableName: 'i',
    filePath: 'C:\\temp\\data.txt',
    sheetName: 'Sheet1',
    range: 'A1:B10',
    message: 'こんにちは',
    title: 'メッセージ',
  });

  const templates: Record<CodeTemplate, { name: string; description: string; fields: string[] }> = {
    loop: {
      name: 'For...Nextループ',
      description: '指定した範囲でループ処理を行うコードを生成します',
      fields: ['startValue', 'endValue', 'variableName'],
    },
    fileRead: {
      name: 'テキストファイル読み込み',
      description: 'テキストファイルを読み込むコードを生成します',
      fields: ['filePath', 'variableName'],
    },
    fileWrite: {
      name: 'テキストファイル書き込み',
      description: 'テキストファイルに書き込むコードを生成します',
      fields: ['filePath', 'message'],
    },
    excelRead: {
      name: 'Excelセル読み込み',
      description: 'Excelのセル範囲を読み込むコードを生成します',
      fields: ['sheetName', 'range', 'variableName'],
    },
    excelWrite: {
      name: 'Excelセル書き込み',
      description: 'Excelのセルに書き込むコードを生成します',
      fields: ['sheetName', 'range', 'message'],
    },
    msgbox: {
      name: 'メッセージボックス',
      description: 'メッセージボックスを表示するコードを生成します',
      fields: ['message', 'title'],
    },
    inputbox: {
      name: '入力ボックス',
      description: 'ユーザーから入力を受け取るコードを生成します',
      fields: ['message', 'title', 'variableName'],
    },
  };

  const generateCode = () => {
    let code = '';

    switch (template) {
      case 'loop':
        code = `Dim ${params.variableName} As Long

For ${params.variableName} = ${params.startValue} To ${params.endValue}
    ' ここに処理を記述
    Debug.Print ${params.variableName}
Next ${params.variableName}`;
        break;

      case 'fileRead':
        code = `Dim ${params.variableName} As String
Dim fileNum As Integer

fileNum = FreeFile
Open "${params.filePath}" For Input As #fileNum

Do Until EOF(fileNum)
    Line Input #fileNum, ${params.variableName}
    ' ここに処理を記述
    Debug.Print ${params.variableName}
Loop

Close #fileNum`;
        break;

      case 'fileWrite':
        code = `Dim fileNum As Integer

fileNum = FreeFile
Open "${params.filePath}" For Output As #fileNum

Print #fileNum, "${params.message}"

Close #fileNum`;
        break;

      case 'excelRead':
        code = `Dim ws As Worksheet
Dim ${params.variableName} As Variant

Set ws = ThisWorkbook.Worksheets("${params.sheetName}")
${params.variableName} = ws.Range("${params.range}").Value

' 配列として読み込まれます
Debug.Print ${params.variableName}(1, 1)`;
        break;

      case 'excelWrite':
        code = `Dim ws As Worksheet

Set ws = ThisWorkbook.Worksheets("${params.sheetName}")
ws.Range("${params.range}").Value = "${params.message}"`;
        break;

      case 'msgbox':
        code = `MsgBox "${params.message}", vbInformation, "${params.title}"`;
        break;

      case 'inputbox':
        code = `Dim ${params.variableName} As String

${params.variableName} = InputBox("${params.message}", "${params.title}")

If ${params.variableName} <> "" Then
    ' ここに処理を記述
    Debug.Print ${params.variableName}
End If`;
        break;
    }

    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast.success('コードをクリップボードにコピーしました');
  };

  const downloadCode = () => {
    const blob = new Blob([generatedCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'generated_code.vba';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('コードをダウンロードしました');
  };

  const currentTemplate = templates[template];

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">VBAコード自動生成</h1>
        <p className="text-xl text-muted-foreground mb-8">
          UIベースで定型処理のコードを簡単に作成
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 設定パネル */}
          <Card>
            <CardHeader>
              <CardTitle>コード設定</CardTitle>
              <CardDescription>生成するコードのテンプレートとパラメータを選択してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template">テンプレート</Label>
                <Select value={template} onValueChange={(value) => setTemplate(value as CodeTemplate)}>
                  <SelectTrigger id="template">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(templates).map(([key, tmpl]) => (
                      <SelectItem key={key} value={key}>
                        {tmpl.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-sm text-muted-foreground">{currentTemplate.description}</p>
              </div>

              {currentTemplate.fields.includes('startValue') && (
                <div className="space-y-2">
                  <Label htmlFor="startValue">開始値</Label>
                  <Input
                    id="startValue"
                    value={params.startValue}
                    onChange={(e) => setParams({ ...params, startValue: e.target.value })}
                  />
                </div>
              )}

              {currentTemplate.fields.includes('endValue') && (
                <div className="space-y-2">
                  <Label htmlFor="endValue">終了値</Label>
                  <Input
                    id="endValue"
                    value={params.endValue}
                    onChange={(e) => setParams({ ...params, endValue: e.target.value })}
                  />
                </div>
              )}

              {currentTemplate.fields.includes('variableName') && (
                <div className="space-y-2">
                  <Label htmlFor="variableName">変数名</Label>
                  <Input
                    id="variableName"
                    value={params.variableName}
                    onChange={(e) => setParams({ ...params, variableName: e.target.value })}
                  />
                </div>
              )}

              {currentTemplate.fields.includes('filePath') && (
                <div className="space-y-2">
                  <Label htmlFor="filePath">ファイルパス</Label>
                  <Input
                    id="filePath"
                    value={params.filePath}
                    onChange={(e) => setParams({ ...params, filePath: e.target.value })}
                  />
                </div>
              )}

              {currentTemplate.fields.includes('sheetName') && (
                <div className="space-y-2">
                  <Label htmlFor="sheetName">シート名</Label>
                  <Input
                    id="sheetName"
                    value={params.sheetName}
                    onChange={(e) => setParams({ ...params, sheetName: e.target.value })}
                  />
                </div>
              )}

              {currentTemplate.fields.includes('range') && (
                <div className="space-y-2">
                  <Label htmlFor="range">セル範囲</Label>
                  <Input
                    id="range"
                    value={params.range}
                    onChange={(e) => setParams({ ...params, range: e.target.value })}
                    placeholder="A1:B10"
                  />
                </div>
              )}

              {currentTemplate.fields.includes('message') && (
                <div className="space-y-2">
                  <Label htmlFor="message">メッセージ</Label>
                  <Input
                    id="message"
                    value={params.message}
                    onChange={(e) => setParams({ ...params, message: e.target.value })}
                  />
                </div>
              )}

              {currentTemplate.fields.includes('title') && (
                <div className="space-y-2">
                  <Label htmlFor="title">タイトル</Label>
                  <Input
                    id="title"
                    value={params.title}
                    onChange={(e) => setParams({ ...params, title: e.target.value })}
                  />
                </div>
              )}

              <Button onClick={generateCode} className="w-full" size="lg">
                コードを生成
              </Button>
            </CardContent>
          </Card>

          {/* プレビューパネル */}
          <Card>
            <CardHeader>
              <CardTitle>生成されたコード</CardTitle>
              <CardDescription>生成されたVBAコードをコピーまたはダウンロードできます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={generatedCode}
                readOnly
                className="font-mono text-sm min-h-[400px]"
                placeholder="パラメータを設定して「コードを生成」ボタンをクリックしてください"
              />

              {generatedCode && (
                <div className="flex gap-2">
                  <Button onClick={copyToClipboard} variant="outline" className="flex-1">
                    <Copy className="w-4 h-4 mr-2" />
                    コピー
                  </Button>
                  <Button onClick={downloadCode} variant="outline" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    ダウンロード
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
