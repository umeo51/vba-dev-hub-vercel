import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { Library } from "lucide-react";

export default function ReferenceDetail() {
  const [, params] = useRoute("/references/:id");
  const id = parseInt(params?.id || "0");
  const { data: reference, isLoading } = trpc.references.getById.useQuery({ id });

  if (isLoading) return <Layout><div className="container py-12 text-center">読み込み中...</div></Layout>;
  if (!reference) return <Layout><div className="container py-12 text-center">リファレンスが見つかりません</div></Layout>;

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Library className="h-8 w-8 text-purple-600 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <CardTitle className="text-3xl">{reference.name}</CardTitle>
                    <Badge>{reference.type}</Badge>
                  </div>
                  <p className="text-muted-foreground">{reference.description}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader><CardTitle>構文</CardTitle></CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code className="font-mono text-sm">{reference.syntax}</code>
              </pre>
            </CardContent>
          </Card>

          {reference.returnValue && (
            <Card>
              <CardHeader><CardTitle>戻り値</CardTitle></CardHeader>
              <CardContent><p>{reference.returnValue}</p></CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle>サンプルコード</CardTitle></CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code className="font-mono text-sm">{reference.examples}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
