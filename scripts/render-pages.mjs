import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, ".output", "public");
const serverEntry = path.join(rootDir, ".output", "server", "index.mjs");

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "spree-vision-forge";
const hasGitHubPagesCustomDomain = process.env.GITHUB_PAGES_CUSTOM_DOMAIN === "true";
const basePath =
  process.env.GITHUB_PAGES === "true" && !hasGitHubPagesCustomDomain ? `/${repositoryName}/` : "/";
const siteOrigin = "https://cache-atelier.ru";

const { default: handler } = await import(pathToFileURL(serverEntry).href);

async function renderPath(pathname, expectedStatuses = [200]) {
  const renderUrl = new URL(pathname.replace(/^\//, ""), new URL(basePath, siteOrigin));
  const response = await handler.fetch(
    new Request(renderUrl),
    {},
    {
      waitUntil() {},
    },
  );

  if (!expectedStatuses.includes(response.status)) {
    throw new Error(`Static render failed for ${renderUrl.pathname}: ${response.status}`);
  }

  return response.text();
}

async function writeRoute(pathname, html) {
  const outputPath =
    pathname === "/"
      ? path.join(publicDir, "index.html")
      : path.join(publicDir, pathname.replace(/^\//, ""), "index.html");
  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, html);
}

await mkdir(publicDir, { recursive: true });

const homeHtml = await renderPath("/");
// The TanStack route normalizes to /catalog during SSR; GitHub Pages serves the
// generated directory as /catalog/ and the canonical URL reflects that.
const catalogHtml = await renderPath("/catalog");
const productPaths = [
  ...new Set(
    [...catalogHtml.matchAll(/href="(\/catalog\/[a-z0-9-]+)(?:\?[^\"]*)?"/g)].map(
      (match) => match[1],
    ),
  ),
];

await writeRoute("/", homeHtml);
await writeRoute("/catalog/", catalogHtml);

for (let index = 0; index < productPaths.length; index += 4) {
  const batch = productPaths.slice(index, index + 4);
  await Promise.all(
    batch.map(async (pathname) => {
      const html = await renderPath(pathname);
      await writeRoute(pathname, html);
    }),
  );
}

const notFoundHtml = (await renderPath("/__not-found__", [404]))
  .replace(/<title>.*?<\/title>/, "<title>Страница не найдена — Caché</title>")
  .replace(
    /<meta name="robots" content="[^"]*"\/>/,
    '<meta name="robots" content="noindex, nofollow"/>',
  );
await writeFile(path.join(publicDir, "404.html"), notFoundHtml);
await writeFile(path.join(publicDir, ".nojekyll"), "");

console.log(`Rendered ${productPaths.length + 2} indexable pages and 404.html`);
