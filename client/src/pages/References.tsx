import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";
import { Search, Library , HelpCircle } from "lucide-react";

export default function References() {
  const [search, setSearch] = useState("");
  const { data: references, isLoading } = trpc.references.list.useQuery({ search, limit: 50 });

  return (
    <Layout>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>逆引きリファレンス</strong>の使い方がわからない場合は、
              <Link href="/guides/references">
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
          <h1 className="text-4xl font-bold mb-4">VBAリファレンス</h1>
          <p className="text-lg text-muted-foreground mb-6">
            VBAの関数、ステートメント、オブジェクトについて詳しく解説します
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="関数名やキーワードで検索..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">読み込み中...</div>
        ) : references && references.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {references.map((ref) => (
              <Link key={ref.id} href={`/references/\${ref.id}`}>
                <a>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Library className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="mb-1">{ref.name}</CardTitle>
                          <CardDescription className="text-xs mb-2">{ref.type}</CardDescription>
                          <CardDescription className="line-clamp-2">{ref.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              リファレンスが見つかりませんでした
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
