import { readdirSync, writeFileSync } from "node:fs";
const domain = (process.argv[2] || "").replace(/\/$/, "");
if (!/^https:\/\//.test(domain)) {
  console.error(
    "Usage: node scripts/generate-sitemap.mjs https://your-domain.example",
  );
  process.exit(1);
}
const skip = new Set(["berita-detail.html", "404.html"]);
const pages = [
  "",
  ...readdirSync("pages")
    .filter((f) => f.endsWith(".html") && !skip.has(f))
    .map((f) => "pages/" + f),
];
const urls = pages
  .map((p) => "<url><loc>" + domain + "/" + p + "</loc></url>")
  .join("");
writeFileSync(
  "sitemap.xml",
  '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' +
    urls +
    "</urlset>",
);
writeFileSync(
  "robots.txt",
  "User-agent: *\nAllow: /\nSitemap: " + domain + "/sitemap.xml\n",
);
