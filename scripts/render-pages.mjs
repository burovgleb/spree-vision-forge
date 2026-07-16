import { copyFile, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(rootDir, ".output", "public");
const serverEntry = path.join(rootDir, ".output", "server", "index.mjs");

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "spree-vision-forge";
const basePath = process.env.GITHUB_PAGES === "true" ? `/${repositoryName}/` : "/";
const renderUrl = new URL(basePath, "https://example.com");

const { default: handler } = await import(pathToFileURL(serverEntry).href);

const response = await handler.fetch(
  new Request(renderUrl),
  {},
  {
    waitUntil() {},
  },
);

if (!response.ok) {
  throw new Error(`Static render failed for ${renderUrl.pathname}: ${response.status}`);
}

const html = await response.text();

await mkdir(publicDir, { recursive: true });
await writeFile(path.join(publicDir, "index.html"), html);
await copyFile(path.join(publicDir, "index.html"), path.join(publicDir, "404.html"));
await writeFile(path.join(publicDir, ".nojekyll"), "");

console.log(`Rendered ${renderUrl.pathname} to .output/public/index.html`);
