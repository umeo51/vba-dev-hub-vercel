-- VBA Dev Hub - Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (Supabase Auth handles this automatically)
-- We'll use auth.users() for authentication

-- Snippets table
CREATE TABLE snippets (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  code TEXT NOT NULL,
  category TEXT NOT NULL,
  tags JSONB DEFAULT '[]'::jsonb,
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Error codes table
CREATE TABLE error_codes (
  id BIGSERIAL PRIMARY KEY,
  error_number TEXT NOT NULL UNIQUE,
  error_name TEXT NOT NULL,
  description TEXT NOT NULL,
  causes TEXT NOT NULL,
  solutions TEXT NOT NULL,
  examples TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- VBA references table
CREATE TABLE vba_references (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  category TEXT NOT NULL,
  syntax TEXT NOT NULL,
  description TEXT NOT NULL,
  parameters JSONB,
  return_value TEXT,
  examples TEXT NOT NULL,
  related_items JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Code templates table
CREATE TABLE code_templates (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL,
  template TEXT NOT NULL,
  parameters JSONB,
  usage_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Snippet likes table (many-to-many)
CREATE TABLE snippet_likes (
  id BIGSERIAL PRIMARY KEY,
  snippet_id BIGINT REFERENCES snippets(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(snippet_id, user_id)
);

-- Indexes for better performance
CREATE INDEX idx_snippets_user_id ON snippets(user_id);
CREATE INDEX idx_snippets_category ON snippets(category);
CREATE INDEX idx_snippets_created_at ON snippets(created_at DESC);
CREATE INDEX idx_error_codes_number ON error_codes(error_number);
CREATE INDEX idx_vba_references_name ON vba_references(name);
CREATE INDEX idx_vba_references_type ON vba_references(type);
CREATE INDEX idx_snippet_likes_snippet_id ON snippet_likes(snippet_id);
CREATE INDEX idx_snippet_likes_user_id ON snippet_likes(user_id);

-- Row Level Security (RLS) policies

-- Enable RLS
ALTER TABLE snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE snippet_likes ENABLE ROW LEVEL SECURITY;

-- Snippets policies
CREATE POLICY "Anyone can view snippets" ON snippets
  FOR SELECT USING (true);

CREATE POLICY "Users can create their own snippets" ON snippets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own snippets" ON snippets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own snippets" ON snippets
  FOR DELETE USING (auth.uid() = user_id);

-- Snippet likes policies
CREATE POLICY "Anyone can view snippet likes" ON snippet_likes
  FOR SELECT USING (true);

CREATE POLICY "Users can like snippets" ON snippet_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike their own likes" ON snippet_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Error codes and references are read-only for regular users
ALTER TABLE error_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE vba_references ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view error codes" ON error_codes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view VBA references" ON vba_references
  FOR SELECT USING (true);

CREATE POLICY "Anyone can view code templates" ON code_templates
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for snippets updated_at
CREATE TRIGGER update_snippets_updated_at
  BEFORE UPDATE ON snippets
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data

-- Sample error codes
INSERT INTO error_codes (error_number, error_name, description, causes, solutions, examples) VALUES
('9', 'インデックスが有効範囲にありません', '配列やコレクションの要素にアクセスする際に、存在しないインデックスを指定した場合に発生します。', '1. 配列の範囲外のインデックスを指定
2. コレクションに存在しない要素を参照
3. 配列が初期化されていない', '1. インデックスの範囲を確認する
2. UBound関数で配列の上限を確認
3. 配列を適切に初期化する', '正しい例
Dim arr(1 To 10) As Integer
For i = 1 To UBound(arr)
    arr(i) = i
Next i'),
('13', '型が一致しません', '変数や引数に、期待される型と異なる型の値を代入しようとした場合に発生します。', '1. 数値型の変数に文字列を代入
2. オブジェクト型の変数にプリミティブ型を代入
3. 暗黙的な型変換が失敗', '1. データ型を確認する
2. 明示的な型変換を行う（CInt, CStr等）
3. IsNumeric関数で数値かどうかチェック', '正しい例
Dim num As Integer
Dim str As String
str = "123"
If IsNumeric(str) Then
    num = CInt(str)
End If'),
('91', 'オブジェクト変数または With ブロック変数が設定されていません', 'オブジェクト変数が Nothing の状態でメソッドやプロパティにアクセスしようとした場合に発生します。', '1. オブジェクトが Set されていない
2. オブジェクトが既に破棄されている
3. オブジェクトの取得に失敗している', '1. Set ステートメントでオブジェクトを代入
2. Is Nothing でオブジェクトの存在確認
3. エラーハンドリングを実装', '正しい例
Dim ws As Worksheet
Set ws = ThisWorkbook.Worksheets(1)
If Not ws Is Nothing Then
    ws.Range("A1").Value = "Test"
End If');

-- Sample VBA references
INSERT INTO vba_references (name, type, category, syntax, description, parameters, return_value, examples, related_items) VALUES
('MsgBox', 'function', 'ユーザーインターフェース', 'MsgBox(prompt, [buttons], [title], [helpfile], [context])', 'ダイアログボックスにメッセージを表示し、ボタンがクリックされるのを待ち、どのボタンがクリックされたかを示す整数を返します。', '[{"name":"prompt","type":"String","description":"ダイアログボックスに表示するメッセージ"},{"name":"buttons","type":"Integer","description":"表示するボタンの種類とアイコン（省略可能）"}]', 'Integer - クリックされたボタンを示す値', '基本的な使用例
MsgBox "こんにちは、世界！"

ボタンとタイトル付き
Dim result As Integer
result = MsgBox("続行しますか？", vbYesNo + vbQuestion, "確認")
If result = vbYes Then
    MsgBox "続行します"
End If', '["InputBox","MsgBoxStyle"]'),
('Range', 'object', 'ワークシート操作', 'Range(cell1, [cell2])', 'セルまたはセル範囲を表すRangeオブジェクトを返します。', '[{"name":"cell1","type":"String/Range","description":"セル参照またはRangeオブジェクト"},{"name":"cell2","type":"String/Range","description":"範囲の終点（省略可能）"}]', 'Range - セル範囲を表すオブジェクト', '単一セルの参照
Range("A1").Value = "Hello"

セル範囲の参照
Range("A1:B10").Interior.Color = RGB(255, 255, 0)', '["Cells","Offset","Resize"]');

-- Sample snippets (will be added by users)
-- Note: user_id should be a valid UUID from auth.users
-- For demo purposes, we'll leave this empty and let users create their own

COMMENT ON TABLE snippets IS 'VBA code snippets shared by users';
COMMENT ON TABLE error_codes IS 'VBA error codes dictionary';
COMMENT ON TABLE vba_references IS 'VBA functions and statements reference';
COMMENT ON TABLE code_templates IS 'Reusable VBA code templates';
