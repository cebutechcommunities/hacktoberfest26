import { access, cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

const root = fileURLToPath(new URL("../", import.meta.url));
const client = resolve(root, "dist/client");
const server = resolve(root, "dist/server");
const output = resolve(root, "dist/pages");

// Require a complete build before replacing the previous deployment artifact.
await access(resolve(server, "index.js"));
await access(resolve(client, "vinext-client-entry-manifest.json"));
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(client, output, { recursive: true });

// Bundle before upload so Pages does not relocate Vite's server/SSR module graph.
await build({
  entryPoints: [resolve(server, "index.js")],
  outfile: resolve(output, "_worker.js"),
  bundle: true,
  format: "esm",
  platform: "neutral",
  target: "es2022",
  external: ["node:*", "cloudflare:*"],
  minify: true,
  logLevel: "warning",
});

// Serve fonts, images, and client bundles directly without a Function invocation.
await writeFile(
  resolve(output, "_routes.json"),
  JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        "/_next/static/*",
        "/fonts/*",
        "/images/*",
        "/favicon.png",
        "/og.png",
        "/vinext-client-entry-manifest.json",
      ],
    },
    null,
    2,
  ) + "\n",
);

// Keep Pages discovery separate from Vite's generated Worker deployment config.
const pagesDeployConfig = resolve(root, "cloudflare/pages/.wrangler/deploy");
await mkdir(pagesDeployConfig, { recursive: true });
await writeFile(
  resolve(pagesDeployConfig, "config.json"),
  JSON.stringify({ configPath: "../../wrangler.jsonc" }) + "\n",
);

console.log("Cloudflare Pages artifact ready in dist/pages");
