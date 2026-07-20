import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalogSource = await readFile(path.join(rootDir, "src", "data", "catalog.ts"), "utf8");
const productIds = [...catalogSource.matchAll(/^\s{4}id: "([a-z0-9-]+)",$/gm)].map(
  (match) => match[1],
);

if (productIds.length === 0) {
  throw new Error("No catalog product IDs found while generating sitemap.xml");
}

const origin = "https://cache-atelier.ru";
const urls = ["/", "/catalog/", ...productIds.map((id) => `/catalog/${id}`)];
const urlset = urls
  .map((pathname) => `  <url><loc>${new URL(pathname, origin).toString()}</loc></url>`)
  .join("\n");
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlset}
</urlset>
`;

const publicDir = path.join(rootDir, "public");
await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, "sitemap.xml"), sitemap);

console.log(`Generated sitemap.xml with ${urls.length} URLs`);
