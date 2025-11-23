import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { Link } from "wouter";
import { Search, AlertCircle , HelpCircle } from "lucide-react";

export default function ErrorDictionary() {
  const [search, setSearch] = useState("");
  const { data: errors, isLoading } = trpc.errorCodes.list.useQuery({ search, limit: 50 });

  return (
    <Layout>
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
        <div className="flex items-center gap-3">
          <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm text-gray-700">
              <strong>エラー辞典</strong>の使い方がわからない場合は、
              <Link href="/guides/error-dictionary">
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
          <h1 className="text-4xl font-bold mb-4">VBAエラー辞典</h1>
          <p className="text-lg text-muted-foreground mb-6">
            VBAでよく遭遇するエラーコードの原因と解決策を検索できます
          </p>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="エラー番号やキーワードで検索..." className="pl-10" />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">読み込み中...</div>
        ) : errors && errors.length > 0 ? (
          <div className="space-y-4">
            {errors.map((error) => (
              <Link key={error.id} href={`/errors/\${error.id}`}>
                <a>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start gap-4">
                        <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
                        <div className="flex-1">
                          <CardTitle className="mb-1">
                            エラー {error.errorNumber}: {error.errorName}
                          </CardTitle>
                          <CardDescription className="line-clamp-2">
                            {error.description}
                          </CardDescription>
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
              エラーが見つかりませんでした
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}
