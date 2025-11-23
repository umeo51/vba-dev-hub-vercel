import Layout from "@/components/Layout";
import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";
import { Copy, Wand2 , HelpCircle } from "lucide-react";

export default function CodeFormatter() {
  const [code, setCode] = useState("");
  const [formatted, setFormatted] = useState("");
  const [indentSize, setIndentSize] = useState(4);

  const formatMutation = trpc.tools.formatCode.useMutation({
    onSuccess: (data) => {
      setFormatted(data.formatted);
      toast.success("コードを整形しました");
    },
    onError: () => {
      toast.error("整形に失敗しました");
    },
  });

  const handleFormat = () => {
    if (!code.trim()) {
      toast.error("コードを入力してください");
      return;
    }
    formatMutation.mutate({ code, indentSize });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      toast.success("クリップボードにコピーしました");
    } catch {
      toast.error("コピーに失敗しました");
    }
  };

  return (
    <Layout>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>コード整形ツール</strong>の使い方がわからない場合は、
              <Link href="/guides/formatter">
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">VBAコード整形ツール</h1>
            <p className="text-lg text-muted-foreground">
              VBAコードのインデントを自動で整え、可読性を向上させます
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>整形前のコード</CardTitle>
                <CardDescription>整形したいVBAコードを貼り付けてください</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="indent-size">インデントサイズ</Label>
                  <Select value={indentSize.toString()} onValueChange={(value) => setIndentSize(parseInt(value))}>
                    <SelectTrigger id="indent-size"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2スペース</SelectItem>
                      <SelectItem value="4">4スペース</SelectItem>
                      <SelectItem value="8">8スペース</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code-input">VBAコード</Label>
                  <Textarea id="code-input" value={code} onChange={(e) => setCode(e.target.value)} placeholder="Sub Example()..." className="font-mono text-sm min-h-[400px]" />
                </div>
                <Button onClick={handleFormat} disabled={formatMutation.isPending} className="w-full">
                  <Wand2 className="mr-2 h-4 w-4" />
                  {formatMutation.isPending ? "整形中..." : "コードを整形"}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>整形後のコード</CardTitle>
                <CardDescription>インデントが整えられたコードが表示されます</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="code-output">整形結果</Label>
                    {formatted && (
                      <Button variant="ghost" size="sm" onClick={handleCopy}>
                        <Copy className="mr-2 h-4 w-4" />コピー
                      </Button>
                    )}
                  </div>
                  <Textarea id="code-output" value={formatted} readOnly placeholder="整形されたコードがここに表示されます" className="font-mono text-sm min-h-[400px] bg-muted" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}
