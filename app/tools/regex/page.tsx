'use client';
import Header from '@/components/Header';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function RegexPage() {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [matches, setMatches] = useState<string[]>([]);

  const testRegex = () => {
    try {
      const regex = new RegExp(pattern, 'g');
      const found = testString.match(regex) || [];
      setMatches(found);
    } catch (error) {
      setMatches(['エラー: 無効な正規表現パターンです']);
    }
  };

  const samplePatterns = [
    { name: 'メールアドレス', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { name: '電話番号', pattern: '\\d{2,4}-\\d{2,4}-\\d{4}' },
    { name: '郵便番号', pattern: '\\d{3}-\\d{4}' },
  ];

  return (
      <Header />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">正規表現テスター</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">サンプルパターン</h2>
          <div className="flex gap-2 flex-wrap">
            {samplePatterns.map(sample => (
              <button
                key={sample.name}
                onClick={() => setPattern(sample.pattern)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                {sample.name}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <label className="block mb-2 font-semibold">正規表現パターン</label>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="w-full p-3 border rounded font-mono"
            placeholder="例: \\d{3}-\\d{4}"
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <label className="block mb-2 font-semibold">テスト文字列</label>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            className="w-full h-32 p-3 border rounded"
            placeholder="テストする文字列を入力..."
          />
          <button
            onClick={testRegex}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            テスト実行
          </button>
        </div>

        {matches.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">マッチ結果 ({matches.length}件)</h2>
            <ul className="space-y-2">
              {matches.map((match, index) => (
                <li key={index} className="p-2 bg-green-50 border border-green-200 rounded">
                  {match}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-8">
          <Link href="/tools" className="text-blue-600 hover:underline">
            ← ツール一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
