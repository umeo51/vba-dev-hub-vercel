import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";
import { TrendingUp, Heart, Search , HelpCircle } from "lucide-react";

export default function Snippets() {
  const [search, setSearch] = useState("");
  const { data: snippets, isLoading } = trpc.snippets.list.useQuery({ search, limit: 50 });

  return (
    <Layout>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>スニペット共有</strong>の使い方がわからない場合は、
              <Link href="/guides/snippets">
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
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">VBAスニペット共有</h1>
          <p className="text-lg text-muted-foreground mb-6">
            便利なVBAコードの断片を共有・検索できます
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="スニペットを検索..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">読み込み中...</div>
        ) : snippets && snippets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map((snippet) => (
              <Link key={snippet.id} href={`/snippets/${snippet.id}`}>
                <a>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{snippet.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{snippet.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <TrendingUp className="h-4 w-4" />
                          {snippet.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {snippet.likes}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              スニペットが見つかりませんでした
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
