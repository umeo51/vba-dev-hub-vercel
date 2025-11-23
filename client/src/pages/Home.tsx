import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Code2, BookOpen, AlertCircle, Library, Brain, Sparkles, Play, Zap, MessageSquare, HelpCircle } from "lucide-react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";

export default function Home() {
  const { data: popularSnippets } = trpc.snippets.list.useQuery({ 
    sortBy: 'popular', 
    limit: 3 
  });

  const playgroundFeatures = [
    {
      icon: MessageSquare,
      title: "AI駆動のコード生成",
      description: "自然言語で要件を伝えるだけで、AIが最適なVBAコードを生成します。",
    },
    {
      icon: Play,
      title: "ブラウザ内実行環境",
      description: "生成されたコードをその場でテスト。Excelを開かずに動作確認できます。",
    },
    {
      icon: Zap,
      title: "即座のフィードバック",
      description: "実行結果を見ながらコードを修正。生成→テスト→修正のサイクルを高速化します。",
    },
  ];

  const supportTools = [
    {
      icon: AlertCircle,
      title: "エラー辞典",
      description: "VBAエラーの原因と解決策を素早く検索",
      href: "/errors",
      color: "text-red-600",
    },
    {
      icon: Library,
      title: "リファレンス",
      description: "関数・ステートメントの詳しい解説",
      href: "/references",
      color: "text-purple-600",
    },
    {
      icon: BookOpen,
      title: "スニペット共有",
      description: "便利なコード断片を共有・検索",
      href: "/snippets",
      color: "text-green-600",
    },
    {
      icon: Brain,
      title: "クイズ・学習",
      description: "VBAの知識を定着させる練習問題",
      href: "/quiz",
      color: "text-orange-600",
    },
  ];

  return (
    <Layout>
      {/* Hero Section - VBA Playground */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-primary/5 py-20 md:py-32">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>AI × ブラウザ実行環境</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              <span className="text-primary">VBA Playground</span>
              <br />
              生成して、すぐテスト
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              AIがVBAコードを生成し、ブラウザ内のサンドボックスで即座にテスト。
              「生成→テスト→修正→実装」のワークフローを、これまでにないスピードで実現します。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6">
                <Link href="/playground">
                  <a className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    Playgroundを試す
                  </a>
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-6">
                <Link href="/guides">
                  <a className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    使い方を見る
                  </a>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Playground Features */}
      <section className="py-20 border-y bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">VBA Playgroundの特徴</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              従来のコード生成ツールとは一線を画す、統合開発体験
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {playgroundFeatures.map((feature) => (
              <Card key={feature.title} className="border-2">
                <CardHeader>
                  <feature.icon className="h-12 w-12 mb-4 text-primary" />
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">シンプルな3ステップ</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              VBA Playgroundで、開発プロセスが劇的に効率化されます
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">要件を伝える</h3>
              <p className="text-muted-foreground">
                「セルA1からA10の合計を求める」など、自然な日本語で指示
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">AIが生成</h3>
              <p className="text-muted-foreground">
                AIが最適なVBAコードを生成し、エディタに自動挿入
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">即座にテスト</h3>
              <p className="text-muted-foreground">
                実行ボタンを押すだけで、ブラウザ内で動作確認完了
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Support Tools Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">充実したサポートツール</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Playground以外にも、VBA開発を支援する多彩なツールを提供
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportTools.map((tool) => (
              <Link key={tool.title} href={tool.href}>
                <a>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-primary/50">
                    <CardHeader>
                      <tool.icon className={`h-10 w-10 mb-2 ${tool.color}`} />
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link href="/tools/generator">
                <a>その他のツールを見る</a>
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Popular Snippets Section */}
      {popularSnippets && popularSnippets.length > 0 && (
        <section className="py-20">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">人気のスニペット</h2>
                <p className="text-muted-foreground">
                  コミュニティで共有されている便利なコード
                </p>
              </div>
              <Button variant="outline" asChild>
                <Link href="/snippets">
                  <a>すべて見る</a>
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularSnippets.map((snippet) => (
                <Link key={snippet.id} href={`/snippets/${snippet.id}`}>
                  <a>
                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                      <CardHeader>
                        <CardTitle className="line-clamp-2">{snippet.title}</CardTitle>
                        <CardDescription className="line-clamp-2">
                          {snippet.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            👁️ {snippet.views}
                          </div>
                          <div className="flex items-center gap-1">
                            ❤️ {snippet.likes}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              VBA開発の新しいスタンダード
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              VBA Playgroundで、コーディングからテストまでの時間を大幅に短縮。
              今すぐ無料で始めましょう。
            </p>
            <Button size="lg" asChild className="text-lg px-8 py-6">
              <Link href="/playground">
                <a className="flex items-center gap-2">
                  <Play className="h-5 w-5" />
                  Playgroundを始める
                </a>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
