'use client';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';

import Link from 'next/link';

export default function ToolsPage() {
  const tools = [
    {
      title: 'VBAコード自動生成',
      description: 'UIベースで定型処理のコードを簡単に作成できます',
      href: '/tools/generator',
      color: 'bg-blue-50 border-blue-200',
    },
    {
      title: 'コード整形ツール',
      description: 'インデントや命名規則を自動的に統一します',
      href: '/tools/formatter',
      color: 'bg-green-50 border-green-200',
    },
    {
      title: '正規表現テスター',
      description: 'VBA用の正規表現パターンをリアルタイムでテストできます',
      href: '/tools/regex',
      color: 'bg-purple-50 border-purple-200',
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            VBA開発ツール
          </h1>
          <p className="text-xl text-gray-600">
            効率的なVBA開発をサポートする便利なツール集
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className={`block p-6 rounded-lg border-2 ${tool.color} hover:shadow-lg transition-shadow`}
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {tool.title}
              </h3>
              <p className="text-gray-600">{tool.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
      </>
  );
}
