'use client';
import Header from '@/components/Header';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function FormatterPage() {
  const [inputCode, setInputCode] = useState('');
  const [formattedCode, setFormattedCode] = useState('');

  const formatCode = () => {
    const lines = inputCode.split('\n');
    let indentLevel = 0;
    const formatted = lines.map(line => {
      const trimmed = line.trim();
      if (trimmed.match(/^(End If|End Sub|End Function|Next|Loop)/i)) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      const indented = '    '.repeat(indentLevel) + trimmed;
      if (trimmed.match(/^(If|For|Do|Sub|Function)/i) && !trimmed.match(/End If|End Sub|End Function/i)) {
        indentLevel++;
      }
      return indented;
    }).join('\n');
    setFormattedCode(formatted);
  };

  return (
      <Header />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">コード整形ツール</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">入力コード</h2>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              className="w-full h-96 p-4 border rounded font-mono text-sm"
              placeholder="VBAコードを入力してください..."
            />
            <button
              onClick={formatCode}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              整形する
            </button>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">整形後のコード</h2>
            <pre className="w-full h-96 p-4 border rounded bg-gray-900 text-white font-mono text-sm overflow-auto">
              {formattedCode || '整形されたコードがここに表示されます'}
            </pre>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/tools" className="text-blue-600 hover:underline">
            ← ツール一覧に戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
