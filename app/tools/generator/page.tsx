'use client';
import Header from '@/components/Header';
export const dynamic = 'force-dynamic';

import { useState } from 'react';
import Link from 'next/link';

export default function GeneratorPage() {
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const templates = [
    { id: 'loop', name: 'For Each ループ', code: 'For Each item In collection\n    \' 処理\nNext item' },
    { id: 'if', name: 'If文', code: 'If condition Then\n    \' 処理\nEnd If' },
    { id: 'function', name: '関数定義', code: 'Function FunctionName() As String\n    FunctionName = "result"\nEnd Function' },
  ];

  const handleGenerate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setGeneratedCode(template.code);
    }
  };

  return (
      <Header />
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">VBAコード自動生成</h1>
        
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-xl font-semibold mb-4">テンプレートを選択</h2>
          <div className="space-y-2">
            {templates.map(template => (
              <button
                key={template.id}
                onClick={() => handleGenerate(template.id)}
                className="w-full text-left p-4 border rounded hover:bg-gray-50"
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {generatedCode && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">生成されたコード</h2>
            <pre className="bg-gray-900 text-white p-4 rounded overflow-x-auto">
              <code>{generatedCode}</code>
            </pre>
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
