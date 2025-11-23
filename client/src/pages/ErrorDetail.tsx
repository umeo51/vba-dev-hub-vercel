import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { AlertCircle } from "lucide-react";

export default function ErrorDetail() {
  const [, params] = useRoute("/errors/:id");
  const id = parseInt(params?.id || "0");
  const { data: error, isLoading } = trpc.errorCodes.getById.useQuery({ id });

  if (isLoading) return <Layout><div className="container py-12 text-center">読み込み中...</div></Layout>;
  if (!error) return <Layout><div className="container py-12 text-center">エラーが見つかりません</div></Layout>;

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <AlertCircle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <CardTitle className="text-3xl mb-2">
                    エラー {error.errorNumber}: {error.errorName}
                  </CardTitle>
                  <p className="text-muted-foreground">{error.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader><CardTitle>原因</CardTitle></CardHeader>
            <CardContent><p className="whitespace-pre-wrap">{error.causes}</p></CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>解決策</CardTitle></CardHeader>
            <CardContent><p className="whitespace-pre-wrap">{error.solutions}</p></CardContent>
          </Card>

          {error.examples && (
            <Card>
              <CardHeader><CardTitle>サンプルコード</CardTitle></CardHeader>
              <CardContent>
                <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                  <code className="font-mono text-sm">{error.examples}</code>
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
