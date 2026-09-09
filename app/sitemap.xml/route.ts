import { siteOrigin } from "@/lib/seo";

export function GET() {
  // Index canonical pages only. Omit lastmod until content dates are maintained.
  const urls = ["/", "/2025"];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${siteOrigin}${path}</loc></url>`).join("\n")}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } },
  );
}
