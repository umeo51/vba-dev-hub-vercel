'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Copy, Wand2 } from 'lucide-react';
import { toast } from 'sonner';

export default function FormatterPage() {
  const [inputCode, setInputCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  const formatCode = () => {
    if (!inputCode.trim()) {
      toast.error('コードを入力してください');
      return;
    }

    const lines = inputCode.split('\n');
    let indentLevel = 0;
    const formatted: string[] = [];

    for (let line of lines) {
      const trimmed = line.trim();
      
      if (!trimmed || trimmed.startsWith("'")) {
        // 空行またはコメント行はそのまま
        formatted.push(trimmed);
        continue;
      }

      // インデントレベルを減らすキーワード
      if (
        trimmed.match(/^End\s+(Sub|Function|If|With|Select|For|Property)/i) ||
        trimmed.match(/^Next(\s|$)/i) ||
        trimmed.match(/^Loop(\s|$)/i) ||
        trimmed.match(/^Wend(\s|$)/i) ||
        trimmed.match(/^Case\s+/i) ||
        trimmed.match(/^Else(\s|$)/i) ||
        trimmed.match(/^ElseIf\s+/i)
      ) {
        indentLevel = Math.max(0, indentLevel - 1);
      }

      // インデントを適用
      const indent = '    '.repeat(indentLevel);
      formatted.push(indent + trimmed);

      // インデントレベルを増やすキーワード
      if (
        trimmed.match(/^(Sub|Function|Property\s+(Get|Let|Set))\s+/i) ||
        trimmed.match(/^If\s+.*Then\s*$/i) ||
        trimmed.match(/^With\s+/i) ||
        trimmed.match(/^Select\s+Case\s+/i) ||
        trimmed.match(/^For\s+/i) ||
        trimmed.match(/^Do\s+/i) ||
        trimmed.match(/^While\s+/i) ||
        trimmed.match(/^Case\s+/i) ||
        trimmed.match(/^Else(\s|$)/i) ||
        trimmed.match(/^ElseIf\s+/i)
      ) {
        indentLevel++;
      }
    }

    setFormattedCode(formatted.join('\n'));
    toast.success('コードを整形しました');
  };

  const copyToClipboard = () => {
    if (!formattedCode) {
      toast.error('整形されたコードがありません');
      return;
    }
    navigator.clipboard.writeText(formattedCode);
    toast.success('コードをクリップボードにコピーしました');
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">コード整形ツール</h1>
        <p className="text-xl text-muted-foreground mb-8">
          VBAコードのインデントを自動的に整形します
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 入力パネル */}
          <Card>
            <CardHeader>
              <CardTitle>整形前のコード</CardTitle>
              <CardDescription>整形したいVBAコードを貼り付けてください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="input-code">VBAコード</Label>
                <Textarea
                  id="input-code"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="font-mono text-sm min-h-[500px]"
                  placeholder="Sub Example()
Dim i As Long
For i = 1 To 10
If i Mod 2 = 0 Then
Debug.Print i
End If
Next i
End Sub"
                />
              </div>

              <Button onClick={formatCode} className="w-full" size="lg">
                <Wand2 className="w-4 h-4 mr-2" />
                コードを整形
              </Button>
            </CardContent>
          </Card>

          {/* 出力パネル */}
          <Card>
            <CardHeader>
              <CardTitle>整形後のコード</CardTitle>
              <CardDescription>整形されたコードが表示されます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="output-code">整形済みコード</Label>
                <Textarea
                  id="output-code"
                  value={formattedCode}
                  readOnly
                  className="font-mono text-sm min-h-[500px] bg-muted"
                  placeholder="整形されたコードがここに表示されます"
                />
              </div>

              {formattedCode && (
                <Button onClick={copyToClipboard} variant="outline" className="w-full">
                  <Copy className="w-4 h-4 mr-2" />
                  コピー
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* 使い方ガイド */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>使い方</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>左側のテキストエリアに整形したいVBAコードを貼り付けます</li>
              <li>「コードを整形」ボタンをクリックします</li>
              <li>右側に整形されたコードが表示されます</li>
              <li>「コピー」ボタンで整形済みコードをクリップボードにコピーできます</li>
            </ol>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
