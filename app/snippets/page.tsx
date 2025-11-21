'use client';
export const dynamic = 'force-dynamic';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
}

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    // サンプルデータ（本番環境ではSupabaseから取得）
    const sampleSnippets: Snippet[] = [
      {
        id: 1,
        title: 'セル範囲をループ処理',
        description: 'For Eachを使った効率的なセル範囲の処理方法',
        code: 'For Each cell In Range("A1:A10")\n    Debug.Print cell.Value\nNext cell',
        category: 'ループ処理',
        tags: ['For Each', 'Range', 'セル操作'],
        views: 150,
        likes: 25,
      },
      {
        id: 2,
        title: 'ファイル選択ダイアログ',
        description: 'ユーザーにファイルを選択させる標準的な方法',
        code: 'Dim fd As FileDialog\nSet fd = Application.FileDialog(msoFileDialogFilePicker)\nIf fd.Show = -1 Then\n    Debug.Print fd.SelectedItems(1)\nEnd If',
        category: 'ファイル操作',
        tags: ['FileDialog', 'ファイル選択'],
        views: 200,
        likes: 40,
      },
      {
        id: 3,
        title: 'エラーハンドリング',
        description: 'On Error文を使った基本的なエラー処理',
        code: 'On Error GoTo ErrorHandler\n\' 処理\nExit Sub\n\nErrorHandler:\n    MsgBox "エラー: " & Err.Description',
        category: 'エラー処理',
        tags: ['On Error', 'エラーハンドリング'],
        views: 180,
        likes: 35,
      },
    ];
    setSnippets(sampleSnippets);
  }, []);

  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch = snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         snippet.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || snippet.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(snippets.map(s => s.category)))];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">VBAスニペット集</h1>
          <p className="text-xl text-gray-600">
            実用的なVBAコードスニペットを検索・共有
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">検索</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="スニペットを検索..."
                className="w-full p-3 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">カテゴリ</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 border rounded"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'すべて' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSnippets.map(snippet => (
            <div key={snippet.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
              <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">{snippet.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{snippet.description}</p>
                <div className="flex gap-2 mb-3">
                  {snippet.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <pre className="bg-gray-900 text-white p-3 rounded text-xs overflow-x-auto mb-4">
                <code>{snippet.code}</code>
              </pre>
              <div className="flex justify-between text-sm text-gray-500">
                <span>👁 {snippet.views}</span>
                <span>👍 {snippet.likes}</span>
              </div>
            </div>
          ))}
        </div>

        {filteredSnippets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">該当するスニペットが見つかりませんでした</p>
          </div>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:underline">
            ← ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
