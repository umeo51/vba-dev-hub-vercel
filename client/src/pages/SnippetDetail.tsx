import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { useRoute } from "wouter";
import { Heart, TrendingUp, Copy } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/_core/hooks/useAuth";

export default function SnippetDetail() {
  const [, params] = useRoute("/snippets/:id");
  const id = parseInt(params?.id || "0");
  const { isAuthenticated } = useAuth();
  
  const { data: snippet, isLoading } = trpc.snippets.getById.useQuery({ id });
  const { data: isLiked, refetch: refetchLike } = trpc.snippets.checkLike.useQuery(
    { snippetId: id },
    { enabled: isAuthenticated }
  );
  
  const utils = trpc.useUtils();
  const likeMutation = trpc.snippets.toggleLike.useMutation({
    onSuccess: () => {
      refetchLike();
      utils.snippets.getById.invalidate({ id });
      toast.success(isLiked ? "いいねを取り消しました" : "いいねしました");
    },
  });

  const handleCopy = async () => {
    if (snippet) {
      await navigator.clipboard.writeText(snippet.code);
      toast.success("コードをコピーしました");
    }
  };

  if (isLoading) return <Layout><div className="container py-12 text-center">読み込み中...</div></Layout>;
  if (!snippet) return <Layout><div className="container py-12 text-center">スニペットが見つかりません</div></Layout>;

  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-3xl mb-2">{snippet.title}</CardTitle>
                  <p className="text-muted-foreground">{snippet.description}</p>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {snippet.views}
                  </div>
                  {isAuthenticated && (
                    <Button variant="ghost" size="sm" onClick={() => likeMutation.mutate({ snippetId: id })}>
                      <Heart className={`h-4 w-4 \${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                      {snippet.likes}
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">コード</h3>
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="mr-2 h-4 w-4" />
                  コピー
                </Button>
              </div>
              <pre className="p-4 bg-muted rounded-md overflow-x-auto">
                <code className="font-mono text-sm">{snippet.code}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
