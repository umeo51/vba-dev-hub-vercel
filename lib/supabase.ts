import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// これらの値は後でVercelの環境変数で設定します
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
}

// データベース型定義
export type Snippet = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  code: string;
  category: string;
  tags: string[];
  views: number;
  likes: number;
  created_at: string;
  updated_at: string;
};

export type ErrorCode = {
  id: number;
  error_number: string;
  error_name: string;
  description: string;
  causes: string;
  solutions: string;
  examples: string | null;
};

export type VBAReference = {
  id: number;
  name: string;
  type: string;
  category: string;
  syntax: string;
  description: string;
  parameters: string | null;
  return_value: string | null;
  examples: string;
  related_items: string | null;
};
