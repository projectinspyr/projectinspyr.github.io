// Prepares a throwaway checkout for the static GitHub Pages build (run in CI only).
// The editor (/keystatic) and the form endpoint (/api) stay on Vercel, and static
// export cannot use cacheComponents, so the image routes become plain force-static.
import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

rmSync("src/app/keystatic", { recursive: true, force: true });
rmSync("src/app/api", { recursive: true, force: true });

function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(path);
    else yield path;
  }
}

for (const file of walk("src/app")) {
  if (/(opengraph-image|twitter-image|apple-icon|robots|sitemap|manifest)\.tsx?$/.test(file)) {
    const source = readFileSync(file, "utf8");
    if (!source.includes("export const dynamic")) {
      writeFileSync(file, `${source}\nexport const dynamic = "force-static";\n`);
    }
  }
}

const og = "src/lib/og.tsx";
writeFileSync(og, readFileSync(og, "utf8").replace(/^\s*"use cache";\s*$/m, ""));
