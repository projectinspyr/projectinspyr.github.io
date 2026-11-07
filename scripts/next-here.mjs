// Starts Next.js with this project as the working directory, wherever it is launched from.
// The /keystatic editor reads and writes content relative to the working directory.
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

process.chdir(join(dirname(fileURLToPath(import.meta.url)), ".."));
await import("next/dist/bin/next");
