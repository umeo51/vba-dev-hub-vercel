import { useState, useMemo } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, Code2, AlertCircle, Library, Brain, FileCode, Layout as LayoutIcon, Share2 } from "lucide-react";

const guides = [
  {
    slug: "code-generator",
    title: "コードジェネレーターの使い方",
    description: "VBAコードの自動生成方法と効率的な活用法を解説",
    category: "ツール",
    icon: Code2,
    tags: ["コード生成", "自動化", "初心者向け"],
  },
  {
    slug: "formatter",
    title: "コード整形ツールの使い方",
    description: "VBAコードを見やすく整形する方法とベストプラクティス",
    category: "ツール",
    icon: FileCode,
    tags: ["コード整形", "可読性", "品質向上"],
  },
  {
    slug: "regex",
    title: "正規表現テスターの使い方",
    description: "正規表現のテストとデバッグを効率的に行う方法",
    category: "ツール",
    icon: Search,
    tags: ["正規表現", "パターンマッチング", "テスト"],
  },
  {
    slug: "error-dictionary",
    title: "エラー辞典の使い方",
    description: "VBAエラーの検索と解決方法の見つけ方",
    category: "リファレンス",
    icon: AlertCircle,
    tags: ["エラー", "トラブルシューティング", "デバッグ"],
  },
  {
    slug: "references",
    title: "逆引きリファレンスの使い方",
    description: "やりたいことから関数やメソッドを見つける方法",
    category: "リファレンス",
    icon: Library,
    tags: ["リファレンス", "関数検索", "逆引き"],
  },
  {
    slug: "functions",
    title: "関数・ステートメント解説の使い方",
    description: "VBA関数の詳細な使い方とサンプルコードの活用法",
    category: "リファレンス",
    icon: BookOpen,
    tags: ["関数", "ステートメント", "サンプルコード"],
  },
  {
    slug: "quiz",
    title: "VBAクイズの使い方",
    description: "クイズで楽しく学習し、スキルアップする方法",
    category: "学習",
    icon: Brain,
    tags: ["クイズ", "学習", "スキルチェック"],
  },
  {
    slug: "userform",
    title: "UserFormシミュレーターの使い方",
    description: "ブラウザ上でUserFormをデザインする方法",
    category: "ツール",
    icon: LayoutIcon,
    tags: ["UserForm", "UI設計", "デザイン"],
  },
  {
    slug: "snippets",
    title: "スニペット共有の使い方",
    description: "コードスニペットの投稿・検索・活用方法",
    category: "コミュニティ",
    icon: Share2,
    tags: ["スニペット", "共有", "コミュニティ"],
  },
];

const categories = ["すべて", "ツール", "リファレンス", "学習", "コミュニティ"];

export default function Guides() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("すべて");

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesSearch =
        searchQuery === "" ||
        guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        guide.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        selectedCategory === "すべて" || guide.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">使い方ガイド</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            各ツールの使い方を詳しく解説。初めての方でも安心してご利用いただけます。
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="ガイドを検索... (例: コード生成、エラー、クイズ)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer px-4 py-2 text-sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-center text-sm text-muted-foreground">
          {filteredGuides.length}件のガイドが見つかりました
        </div>

        {/* Guides Grid */}
        {filteredGuides.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`}>
                <a>
                  <Card className="h-full hover:shadow-lg transition-all hover:border-primary/50 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <guide.icon className="h-8 w-8 text-primary" />
                        <Badge variant="secondary">{guide.category}</Badge>
                      </div>
                      <CardTitle className="text-xl">{guide.title}</CardTitle>
                      <CardDescription className="text-base">
                        {guide.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {guide.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">ガイドが見つかりませんでした</h3>
            <p className="text-muted-foreground">
              別のキーワードやカテゴリで検索してみてください
            </p>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">お探しのガイドが見つかりませんか?</h2>
          <p className="text-muted-foreground mb-6">
            各ツールページにも「使い方ガイド」へのリンクがあります。<br />
            ツールを使いながら、必要に応じてガイドをご参照ください。
          </p>
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-primary hover:underline font-semibold">
              ホームに戻る
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
