import Layout from "@/components/Layout";
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2 , HelpCircle } from "lucide-react";

export default function CodeGenerator() {
  return (
    <Layout>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>コードジェネレーター</strong>の使い方がわからない場合は、
              <Link href="/guides/code-generator">
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
            <h1 className="text-4xl font-bold mb-4">VBAコード自動生成ツール</h1>
            <p className="text-lg text-muted-foreground">
              よくある定型処理のVBAコードを自動生成します（近日公開予定）
            </p>
          </div>
          <Card>
            <CardHeader>
              <Code2 className="h-12 w-12 text-primary mb-4" />
              <CardTitle>機能開発中</CardTitle>
              <CardDescription>
                この機能は現在開発中です。しばらくお待ちください。
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
