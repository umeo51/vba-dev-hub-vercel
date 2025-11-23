import { useMemo } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThumbsUp, ThumbsDown, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { trpc } from "@/lib/trpc";

const guidePages = [
  { slug: "code-generator", title: "コードジェネレーター" },
  { slug: "formatter", title: "コード整形ツール" },
  { slug: "regex", title: "正規表現テスター" },
  { slug: "error-dictionary", title: "エラー辞典" },
  { slug: "references", title: "逆引きリファレンス" },
  { slug: "functions", title: "関数・ステートメント解説" },
  { slug: "quiz", title: "VBAクイズ" },
  { slug: "userform", title: "UserFormシミュレーター" },
  { slug: "snippets", title: "スニペット共有" },
];

export default function FeedbackStats() {
  // Fetch stats for all guide pages
  const statsQueries = guidePages.map((guide) =>
    trpc.guideFeedback.getStats.useQuery({ guidePage: guide.slug })
  );

  const allStats = useMemo(() => {
    return guidePages.map((guide, index) => {
      const query = statsQueries[index];
      const stats = query.data || { helpful: 0, notHelpful: 0, total: 0 };
      const helpfulRate =
        stats.total > 0 ? (Number(stats.helpful) / Number(stats.total)) * 100 : 0;

      return {
        ...guide,
        ...stats,
        helpfulRate,
        isLoading: query.isLoading,
      };
    });
  }, [statsQueries]);

  const sortedByTotal = useMemo(() => {
    return [...allStats].sort((a, b) => Number(b.total) - Number(a.total));
  }, [allStats]);

  const sortedByRate = useMemo(() => {
    return [...allStats]
      .filter((s) => Number(s.total) > 0)
      .sort((a, b) => b.helpfulRate - a.helpfulRate);
  }, [allStats]);

  const totalFeedback = allStats.reduce((sum, s) => sum + Number(s.total), 0);
  const totalHelpful = allStats.reduce((sum, s) => sum + Number(s.helpful), 0);
  const overallRate = totalFeedback > 0 ? (totalHelpful / totalFeedback) * 100 : 0;

  return (
    <Layout>
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">ガイドフィードバック統計</h1>
          <p className="text-lg text-muted-foreground">
            各ガイドページのユーザー評価を確認し、改善に役立てましょう
          </p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-blue-600" />
                総フィードバック数
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{totalFeedback}</div>
              <p className="text-sm text-muted-foreground mt-2">
                全ガイドページの合計
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ThumbsUp className="h-5 w-5 text-green-600" />
                役に立った
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-green-600">{totalHelpful}</div>
              <p className="text-sm text-muted-foreground mt-2">
                ポジティブな評価
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                総合満足度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-purple-600">
                {overallRate.toFixed(1)}%
              </div>
              <Progress value={overallRate} className="mt-4" />
            </CardContent>
          </Card>
        </div>

        {/* Top Rated Guides */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">満足度ランキング</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sortedByRate.slice(0, 6).map((guide, index) => (
              <Card key={guide.slug}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={index < 3 ? "default" : "secondary"}>
                          #{index + 1}
                        </Badge>
                        {index === 0 && <TrendingUp className="h-4 w-4 text-green-600" />}
                      </div>
                      <CardTitle className="text-lg">
                        <Link href={`/guides/${guide.slug}`}>
                          <a className="hover:text-primary transition-colors">
                            {guide.title}
                          </a>
                        </Link>
                      </CardTitle>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">
                        {guide.helpfulRate.toFixed(1)}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {Number(guide.total)}件の評価
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={guide.helpfulRate} className="mb-3" />
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-green-600">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{Number(guide.helpful)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-red-600">
                      <ThumbsDown className="h-4 w-4" />
                      <span>{Number(guide.notHelpful)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Guides Stats */}
        <div>
          <h2 className="text-2xl font-bold mb-6">全ガイドの詳細統計</h2>
          <div className="grid grid-cols-1 gap-4">
            {sortedByTotal.map((guide) => (
              <Card key={guide.slug}>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-1">
                        <Link href={`/guides/${guide.slug}`}>
                          <a className="hover:text-primary transition-colors">
                            {guide.title}
                          </a>
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        総評価数: {Number(guide.total)}件
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">
                          {Number(guide.helpful)}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <ThumbsUp className="h-3 w-3" />
                          役に立った
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-600">
                          {Number(guide.notHelpful)}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <ThumbsDown className="h-3 w-3" />
                          役に立たなかった
                        </div>
                      </div>
                      <div className="text-center min-w-[80px]">
                        <div className="text-2xl font-bold text-primary">
                          {guide.helpfulRate.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">満足度</div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={guide.helpfulRate} />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Improvement Suggestions */}
        <div className="mt-12 bg-amber-50 border-l-4 border-amber-600 p-6 rounded">
          <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
            <TrendingDown className="h-5 w-5 text-amber-600" />
            改善が必要なガイド
          </h3>
          <p className="text-sm text-gray-700 mb-4">
            満足度が低いガイドや評価数が少ないガイドは、内容の見直しや拡充を検討しましょう。
          </p>
          <ul className="space-y-2">
            {sortedByRate
              .filter((g) => g.helpfulRate < 70 && Number(g.total) > 5)
              .map((guide) => (
                <li key={guide.slug} className="text-sm">
                  <Link href={`/guides/${guide.slug}`}>
                    <a className="text-amber-700 hover:underline font-medium">
                      {guide.title}
                    </a>
                  </Link>
                  <span className="text-gray-600">
                    {" "}
                    - 満足度 {guide.helpfulRate.toFixed(1)}%
                  </span>
                </li>
              ))}
            {sortedByTotal
              .filter((g) => Number(g.total) < 5)
              .map((guide) => (
                <li key={guide.slug} className="text-sm">
                  <Link href={`/guides/${guide.slug}`}>
                    <a className="text-amber-700 hover:underline font-medium">
                      {guide.title}
                    </a>
                  </Link>
                  <span className="text-gray-600">
                    {" "}
                    - 評価数が少ない ({Number(guide.total)}件)
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}
