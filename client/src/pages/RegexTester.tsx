import Layout from "@/components/Layout";
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Search , HelpCircle } from "lucide-react";

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState("g");
  const [results, setResults] = useState<any>(null);

  const testMutation = trpc.tools.testRegex.useMutation({
    onSuccess: (data) => {
      setResults(data);
      if (data.success) {
        toast.success(`\${data.matches.length}件のマッチが見つかりました`);
      } else {
        toast.error(data.error);
      }
    },
  });

  const handleTest = () => {
    if (!pattern) {
      toast.error("正規表現パターンを入力してください");
      return;
    }
    testMutation.mutate({ pattern, testString, flags });
  };

  return (
    <Layout>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>正規表現テスター</strong>の使い方がわからない場合は、
              <Link href="/guides/regex">
                <a className="text-blue-600 hover:underline font-semibold ml-1">
                  使い方ガイド
                </a>
              </Link>
              をご覧ください。
            </p>
          </div>
        </div>
      </div>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">正規表現テスター</h1>
            <p className="text-lg text-muted-foreground">
              VBAで使用する正規表現パターンをテストできます
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>パターン設定</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pattern">正規表現パターン</Label>
                  <Input id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="\\d+" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="flags">フラグ</Label>
                  <Input id="flags" value={flags} onChange={(e) => setFlags(e.target.value)} placeholder="g" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="test-string">テスト文字列</Label>
                  <Textarea id="test-string" value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="テストしたい文字列を入力" className="min-h-[150px]" />
                </div>
                <Button onClick={handleTest} disabled={testMutation.isPending} className="w-full">
                  <Search className="mr-2 h-4 w-4" />
                  {testMutation.isPending ? "テスト中..." : "テスト実行"}
                </Button>
              </CardContent>
            </Card>

            {results && results.success && (
              <Card>
                <CardHeader>
                  <CardTitle>マッチ結果 ({results.matches.length}件)</CardTitle>
                </CardHeader>
                <CardContent>
                  {results.matches.length > 0 ? (
                    <div className="space-y-2">
                      {results.matches.map((match: any, i: number) => (
                        <div key={i} className="p-3 bg-muted rounded-md">
                          <div className="font-mono text-sm"><strong>マッチ:</strong> {match.match}</div>
                          <div className="text-sm text-muted-foreground">位置: {match.index}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">マッチする文字列が見つかりませんでした</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
