import { drizzle } from "drizzle-orm/mysql2";
import { errorCodes, vbaReferences, snippets } from "../drizzle/schema.js";
import { writeFileSync } from "fs";

const db = drizzle(process.env.DATABASE_URL);
const SITE_URL = "https://vba-dev-hub.manus.space"; // 本番環境のURLに変更してください

async function generateSitemap() {
  console.log("Generating sitemap.xml...");

  const now = new Date().toISOString();

  // 静的ページ
  const staticPages = [
    { url: "/", priority: "1.0", changefreq: "daily" },
    { url: "/tools/generator", priority: "0.8", changefreq: "weekly" },
    { url: "/tools/formatter", priority: "0.8", changefreq: "weekly" },
    { url: "/tools/regex", priority: "0.8", changefreq: "weekly" },
    { url: "/snippets", priority: "0.9", changefreq: "daily" },
    { url: "/errors", priority: "0.9", changefreq: "weekly" },
    { url: "/references", priority: "0.9", changefreq: "weekly" },
    { url: "/quiz", priority: "0.7", changefreq: "weekly" },
  ];

  // 動的ページ（データベースから取得）
  const [allSnippets, allErrors, allReferences] = await Promise.all([
    db.select({ id: snippets.id, updatedAt: snippets.updatedAt }).from(snippets),
    db.select({ id: errorCodes.id }).from(errorCodes),
    db.select({ id: vbaReferences.id }).from(vbaReferences),
  ]);

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
`;

  // 静的ページを追加
  for (const page of staticPages) {
    xml += `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  // スニペット詳細ページを追加
  for (const snippet of allSnippets) {
    const lastmod = snippet.updatedAt ? snippet.updatedAt.toISOString() : now;
    xml += `  <url>
    <loc>${SITE_URL}/snippets/${snippet.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  // エラー詳細ページを追加
  for (const error of allErrors) {
    xml += `  <url>
    <loc>${SITE_URL}/errors/${error.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  // リファレンス詳細ページを追加
  for (const ref of allReferences) {
    xml += `  <url>
    <loc>${SITE_URL}/references/${ref.id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  // ファイルに書き込み
  writeFileSync("client/public/sitemap.xml", xml);
  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   - ${staticPages.length} static pages`);
  console.log(`   - ${allSnippets.length} snippet pages`);
  console.log(`   - ${allErrors.length} error pages`);
  console.log(`   - ${allReferences.length} reference pages`);
  console.log(`   Total: ${staticPages.length + allSnippets.length + allErrors.length + allReferences.length} URLs`);
}

generateSitemap()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error generating sitemap:", error);
    process.exit(1);
  });
