# Vercel デプロイガイド

このガイドでは、VBA Dev HubをVercelにデプロイする手順を説明します。

## 前提条件

- GitHubアカウント（リポジトリは既に作成済み）
- Vercelアカウント（[vercel.com](https://vercel.com)で無料登録）
- Supabaseプロジェクト（既にセットアップ済み）

## デプロイ手順

### 1. Vercelにログイン

1. [Vercel](https://vercel.com)にアクセス
2. 「Sign Up」または「Log In」をクリック
3. GitHubアカウントでログイン

### 2. 新しいプロジェクトをインポート

1. Vercelダッシュボードで「Add New...」→「Project」をクリック
2. 「Import Git Repository」セクションで、`umeo51/vba-dev-hub-vercel`を検索
3. 「Import」ボタンをクリック

### 3. プロジェクト設定

#### Build & Development Settings

- **Framework Preset**: Next.js（自動検出）
- **Build Command**: `npm run build`（デフォルト）
- **Output Directory**: `.next`（デフォルト）
- **Install Command**: `npm install`（デフォルト）

これらはデフォルトで正しく設定されているはずです。

#### Environment Variables（環境変数）

以下の環境変数を追加してください：

| 変数名 | 値 |
|--------|-----|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://svmpuynlvrcccbykdfco.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN2bXB1eW5sdnJjY2NieWtkZmNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMzMTkwNDMsImV4cCI6MjA3ODg5NTA0M30._V138IwNNglvd-lQ-RBI8b5rqIc7cVpGtmc11zXRGic` |
| `NEXT_PUBLIC_SITE_URL` | （デプロイ後に自動設定されるVercel URLを使用） |

**環境変数の追加方法：**
1. 「Environment Variables」セクションを展開
2. 各変数名と値を入力
3. 「Add」をクリック

### 4. デプロイ

1. すべての設定を確認
2. 「Deploy」ボタンをクリック
3. デプロイが完了するまで待機（通常1〜3分）

### 5. デプロイ完了

デプロイが成功すると、以下のような画面が表示されます：

- **Production URL**: `https://vba-dev-hub-vercel.vercel.app`（または類似のURL）
- このURLをクリックしてサイトを確認

## デプロイ後の設定

### カスタムドメインの設定（オプション）

1. Vercelダッシュボードでプロジェクトを選択
2. 「Settings」→「Domains」を選択
3. カスタムドメインを追加

### Google AdSenseの設定

1. `app/layout.tsx`を編集
2. `<head>`セクションにAdSenseスクリプトを追加：

```tsx
<Script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX"
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

3. 変更をコミット＆プッシュすると、Vercelが自動的に再デプロイ

## トラブルシューティング

### ビルドエラーが発生する場合

1. ローカルで`npm run build`を実行してエラーを確認
2. エラーを修正してGitHubにプッシュ
3. Vercelが自動的に再デプロイ

### データベース接続エラーが発生する場合

1. 環境変数が正しく設定されているか確認
2. Supabaseプロジェクトが正常に動作しているか確認
3. SupabaseのRLSポリシーが正しく設定されているか確認

### 環境変数を変更した場合

1. Vercelダッシュボードで「Settings」→「Environment Variables」を選択
2. 変数を編集または追加
3. 「Deployments」タブで最新のデプロイを選択
4. 「Redeploy」をクリック

## 継続的デプロイ

GitHubリポジトリに変更をプッシュすると、Vercelが自動的に以下を実行します：

- **mainブランチ**: 本番環境に自動デプロイ
- **その他のブランチ**: プレビュー環境を作成

## 参考リンク

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)

## サポート

問題が発生した場合は、以下を確認してください：

1. [Vercel Status](https://www.vercel-status.com/)
2. [Supabase Status](https://status.supabase.com/)
3. GitHubリポジトリのIssuesセクション
