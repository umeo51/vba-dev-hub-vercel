export const dynamic = 'force-dynamic';

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';


export default function RegexTesterPage() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<RegExpMatchArray[]>([]);
  const [error, setError] = useState('');

  const samplePatterns = {
    email: {
      pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
      description: 'メールアドレス',
      sample: 'test@example.com',
    },
    phone: {
      pattern: '0\\d{1,4}-\\d{1,4}-\\d{4}',
      description: '電話番号（ハイフン付き）',
      sample: '03-1234-5678',
    },
    zipcode: {
      pattern: '\\d{3}-\\d{4}',
      description: '郵便番号',
      sample: '123-4567',
    },
    date: {
      pattern: '\\d{4}[/-]\\d{1,2}[/-]\\d{1,2}',
      description: '日付（YYYY/MM/DD または YYYY-MM-DD）',
      sample: '2024-01-15',
    },
    url: {
      pattern: 'https?://[\\w/:%#\\$&\\?\\(\\)~\\.=\\+\\-]+',
      description: 'URL',
      sample: 'https://example.com/path',
    },
    number: {
      pattern: '-?\\d+(\\.\\d+)?',
      description: '数値（整数または小数）',
      sample: '-123.45',
    },
  };

  const testRegex = () => {
    setError('');
    setMatches([]);

    if (!pattern) {
      setError('正規表現パターンを入力してください');
      return;
    }

    if (!testString) {
      setError('テスト文字列を入力してください');
      return;
    }

    try {
      const regex = new RegExp(pattern, 'g');
      const foundMatches: RegExpMatchArray[] = [];
      let match;

      while ((match = regex.exec(testString)) !== null) {
        foundMatches.push(match);
      }

      setMatches(foundMatches);
    } catch (err) {
      setError('正規表現パターンが無効です: ' + (err as Error).message);
    }
  };

  const loadSample = (key: string) => {
    const sample = samplePatterns[key as keyof typeof samplePatterns];
    setPattern(sample.pattern);
    setTestString(sample.sample);
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <h1 className="text-4xl font-bold mb-4">正規表現テスター</h1>
        <p className="text-xl text-muted-foreground mb-8">
          VBA用の正規表現パターンをリアルタイムでテスト
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* サンプルパターン */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>サンプルパターン</CardTitle>
              <CardDescription>よく使われる正規表現パターン</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {Object.entries(samplePatterns).map(([key, sample]) => (
                <Button
                  key={key}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3"
                  onClick={() => loadSample(key)}
                >
                  <div className="flex flex-col items-start gap-1">
                    <span className="font-semibold">{sample.description}</span>
                    <span className="text-xs text-muted-foreground font-mono">{sample.pattern}</span>
                  </div>
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* テスト入力 */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>正規表現テスト</CardTitle>
              <CardDescription>パターンとテスト文字列を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pattern">正規表現パターン</Label>
                <Input
                  id="pattern"
                  value={pattern}
                  onChange={(e) => setPattern(e.target.value)}
                  placeholder="例: \d{3}-\d{4}"
                  className="font-mono"
                />
                <p className="text-xs text-muted-foreground">
                  VBAでは CreateObject(&quot;VBScript.RegExp&quot;) を使用します
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="test-string">テスト文字列</Label>
                <Textarea
                  id="test-string"
                  value={testString}
                  onChange={(e) => setTestString(e.target.value)}
                  placeholder="マッチさせたい文字列を入力してください"
                  className="min-h-[150px]"
                />
              </div>

              <Button onClick={testRegex} className="w-full" size="lg">
                テスト実行
              </Button>

              {error && (
                <div className="p-4 bg-destructive/10 text-destructive rounded-md">
                  {error}
                </div>
              )}

              {!error && matches.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">マッチ結果</h3>
                    <Badge variant="secondary">{matches.length} 件のマッチ</Badge>
                  </div>

                  <div className="space-y-2">
                    {matches.map((match, index) => (
                      <div key={index} className="p-3 bg-muted rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-semibold">マッチ {index + 1}</span>
                          <Badge variant="outline">位置: {match.index}</Badge>
                        </div>
                        <div className="font-mono text-sm bg-background p-2 rounded">
                          {match[0]}
                        </div>
                        {match.length > 1 && (
                          <div className="mt-2 space-y-1">
                            <span className="text-xs text-muted-foreground">キャプチャグループ:</span>
                            {match.slice(1).map((group, i) => (
                              <div key={i} className="text-xs font-mono bg-background p-1 rounded">
                                グループ {i + 1}: {group}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {!error && matches.length === 0 && pattern && testString && (
                <div className="p-4 bg-muted rounded-md text-center text-muted-foreground">
                  マッチする文字列が見つかりませんでした
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* VBAでの使用例 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>VBAでの使用例</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-muted p-4 rounded-md overflow-x-auto text-sm">
              <code>{`Sub TestRegex()
    Dim regex As Object
    Dim matches As Object
    Dim match As Object
    
    ' RegExpオブジェクトを作成
    Set regex = CreateObject("VBScript.RegExp")
    
    ' パターンを設定
    regex.Pattern = "${pattern || '\\d{3}-\\d{4}'}"
    regex.Global = True
    regex.IgnoreCase = False
    
    ' テスト実行
    Set matches = regex.Execute("${testString || 'テスト文字列'}")
    
    ' 結果を表示
    For Each match In matches
        Debug.Print "マッチ: " & match.Value
        Debug.Print "位置: " & match.FirstIndex
    Next match
End Sub`}</code>
            </pre>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
