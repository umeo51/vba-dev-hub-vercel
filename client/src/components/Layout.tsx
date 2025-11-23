import Header from "@/components/Header";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">VBA Dev Hub</h3>
              <p className="text-sm text-muted-foreground">
                VBA開発者のための統合支援プラットフォーム
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">機能</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>コード生成・整形ツール</li>
                <li>スニペット共有</li>
                <li>エラー辞典</li>
                <li>リファレンス</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">リンク</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://github.com/umeo51/vba-dev-hub" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © 2025 VBA Dev Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
