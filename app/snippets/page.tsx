export const dynamic = 'force-dynamic';

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Plus, Eye, ThumbsUp } from 'lucide-react';
import { toast } from 'sonner';

interface Snippet {
  id: number;
  title: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  created_at: string;
}

export default function SnippetsPage() {
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [filteredSnippets, setFilteredSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const categories = ['all', 'ファイル操作', 'Excel操作', 'データ処理', 'ユーザーインターフェース', 'その他'];

  useEffect(() => {
    fetchSnippets();
  }, []);

  useEffect(() => {
    filterSnippets();
  }, [searchQuery, categoryFilter, snippets]);

  const fetchSnippets = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('snippets')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setSnippets(data || []);
    } catch (error) {
      console.error('Error fetching snippets:', error);
      toast.error('スニペットの読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };

  const filterSnippets = () => {
    let filtered = snippets;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter((s) => s.category === categoryFilter);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.title.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query) ||
          s.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredSnippets(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="container">
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">読み込み中...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container max-w-6xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">VBAスニペット</h1>
            <p className="text-xl text-muted-foreground">便利なVBAコードの断片を検索・共有</p>
          </div>
          <Button asChild>
            <Link href="/snippets/new">
              <Plus className="w-4 h-4 mr-2" />
              新規投稿
            </Link>
          </Button>
        </div>

        {/* 検索・フィルター */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="スニペットを検索..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="カテゴリで絞り込み" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'すべてのカテゴリ' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* スニペット一覧 */}
        {filteredSnippets.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">スニペットが見つかりませんでした</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredSnippets.map((snippet) => (
              <Link key={snippet.id} href={`/snippets/${snippet.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="mb-2">{snippet.title}</CardTitle>
                        <CardDescription>{snippet.description}</CardDescription>
                      </div>
                      <Badge variant="secondary">{snippet.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{snippet.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        <span>{snippet.likes}</span>
                      </div>
                    </div>
                    {snippet.tags && snippet.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {snippet.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
