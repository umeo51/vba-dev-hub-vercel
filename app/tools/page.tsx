export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Wand2, TestTube } from 'lucide-react';

export default function ToolsPage() {
  const tools = [
    {
      title: 'VBAコード自動生成',
      description: 'UIベースで定型処理のコードを簡単に作成できます',
      icon: Wand2,
      href: '/tools/generator',
      color: 'text-blue-500',
    },
    {
      title: 'コード整形ツール',
      description: 'インデントや命名規則を自動的に統一します',
      icon: Code,
      href: '/tools/formatter',
      color: 'text-green-500',
    },
    {
      title: '正規表現テスター',
      description: 'VBA用の正規表現パターンをリアルタイムでテストできます',
      icon: TestTube,
      href: '/tools/regex',
      color: 'text-purple-500',
    },
  ];

  return (
    <div className="min-h-screen py-12">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">開発ツール</h1>
          <p className="text-xl text-muted-foreground mb-12">
            VBA開発を効率化する便利なツール集
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link key={tool.href} href={tool.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <Icon className={`w-12 h-12 ${tool.color} mb-4`} />
                      <CardTitle>{tool.title}</CardTitle>
                      <CardDescription>{tool.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
