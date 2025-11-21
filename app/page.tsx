'use client';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, BookOpen, AlertCircle, Lightbulb, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header />

    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">
              VBA開発を<span className="gradient-text">もっと効率的に</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              VBA Dev Hubは、VBA開発者のための統合支援プラットフォームです。コード生成、スニペット共有、エラー解決、学習まで、すべてがここに揃っています。
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/tools">ツールを使ってみる</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/snippets">スニペットを探す</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center mb-2">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-muted-foreground">便利ツール</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-muted-foreground">スニペット</div>
            </div>
            <div>
              <div className="flex items-center justify-center mb-2">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <div className="text-4xl font-bold mb-2">1,000+</div>
              <div className="text-muted-foreground">ユーザー</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">充実した機能</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            VBA開発のあらゆる場面で役立つツールとリソースを提供します
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Code className="w-10 h-10 text-primary mb-4" />
                <CardTitle>コード生成・整形ツール</CardTitle>
                <CardDescription>
                  VBAの定型的なコードを自動生成したり、既存のコードを解析して可読性を向上させます。正規表現のテストも可能です。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="w-10 h-10 text-primary mb-4" />
                <CardTitle>スニペット共有</CardTitle>
                <CardDescription>
                  便利なVBAコードの断片を検索・共有できます。他の開発者が投稿したスニペットを参考にして、開発を加速しましょう。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <AlertCircle className="w-10 h-10 text-primary mb-4" />
                <CardTitle>エラー辞典</CardTitle>
                <CardDescription>
                  VBAでよく遭遇するエラーの原因と解決策を網羅的に解説。エラーメッセージやエラー番号で検索して、すぐに対処法を見つけられます。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Lightbulb className="w-10 h-10 text-primary mb-4" />
                <CardTitle>リファレンス</CardTitle>
                <CardDescription>
                  VBAの関数、ステートメント、オブジェクトについて、シンタックスやサンプルコード付きで詳しく解説します。
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <CardTitle>クイズ・学習</CardTitle>
                <CardDescription>
                  VBAの知識を定着させるためのクイズや練習問題を提供。自分のスキルレベルをチェックして、さらなる成長を目指しましょう。
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">今すぐ始めましょう</h2>
          <p className="text-xl mb-8 opacity-90">
            VBA Dev Hubで、あなたの開発体験を次のレベルへ
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link href="/tools">無料で始める</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold mb-4">VBA Dev Hub</h3>
              <p className="text-sm text-muted-foreground">
                VBA開発者のための統合支援プラットフォーム
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">機能</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/tools" className="hover:text-foreground">コード生成・整形ツール</Link></li>
                <li><Link href="/snippets" className="hover:text-foreground">スニペット共有</Link></li>
                <li><Link href="/errors" className="hover:text-foreground">エラー辞典</Link></li>
                <li><Link href="/references" className="hover:text-foreground">リファレンス</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">リンク</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="https://github.com/umeo51/vba-dev-hub" className="hover:text-foreground">GitHub</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 VBA Dev Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
      </>
  );
}
