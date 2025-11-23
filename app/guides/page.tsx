'use client';
import Header from '@/components/Header';
import Link from 'next/link';
import { BookOpen, Code, AlertCircle, Lightbulb, TrendingUp, Layout, Database } from 'lucide-react';

export default function GuidesPage() {
  const guides = [
    {
      title: 'VBAコード自動生成ツールの使い方',
      description: 'UIベースでVBAコードを簡単に生成する方法を詳しく解説します。',
      href: '/guides/code-generator',
      icon: Code,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'エラー辞典の使い方',
      description: 'VBAエラーを素早く検索して解決する方法を学びます。',
      href: '/guides/error-dictionary',
      icon: AlertCircle,
      color: 'from-red-500 to-pink-500',
    },
    {
      title: '逆引きリファレンスの使い方',
      description: 'やりたいことからVBAコードを検索する方法を解説します。',
      href: '/guides/references',
      icon: Lightbulb,
      color: 'from-green-500 to-emerald-500',
    },
    {
      title: '関数・ステートメント解説の使い方',
      description: 'VBA関数の詳細な使い方とサンプルコードの見方を説明します。',
      href: '/guides/functions',
      icon: BookOpen,
      color: 'from-purple-500 to-violet-500',
    },
    {
      title: 'VBAクイズの使い方',
      description: 'クイズ機能を使ってVBAスキルを効果的に向上させる方法を紹介します。',
      href: '/guides/quiz',
      icon: TrendingUp,
      color: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'スニペット共有の使い方',
      description: 'VBAコードスニペットの検索・投稿・共有方法を解説します。',
      href: '/guides/snippets',
      icon: Database,
      color: 'from-indigo-500 to-blue-500',
    },
    {
      title: 'UserFormシミュレーターの使い方',
      description: 'UserFormをブラウザ上でデザインしてコード生成する方法を学びます。',
      href: '/guides/userform',
      icon: Layout,
      color: 'from-pink-500 to-rose-500',
    },
  ];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              使い方ガイド
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              VBA Dev Hubの各ツールの使い方を詳しく解説します。スクリーンショット付きで分かりやすく説明しているので、初めての方でも安心してご利用いただけます。
            </p>
          </div>

          {/* Guides Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => {
              const Icon = guide.icon;
              return (
                <Link
                  key={guide.href}
                  href={guide.href}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${guide.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {guide.title}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {guide.description}
                    </p>
                  </div>
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                    <span className="text-blue-600 text-sm font-medium group-hover:underline">
                      詳しく見る →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Back Link */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              ← ホームに戻る
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
