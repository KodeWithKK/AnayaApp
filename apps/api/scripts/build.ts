import * as fs from "fs";
import * as path from "path";
import { build } from "esbuild";
import esbuildPluginTsc from "esbuild-plugin-tsc";

async function runBuild() {
  console.log("🛠️  Building with esbuild...");

  const rootDir = path.resolve(__dirname, "..");
  const tsconfigPath = path.resolve(rootDir, "tsconfig.json");

  const pkgPath = path.resolve(rootDir, "package.json");
  const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
  const esmOnlyPackages = [
    "@thallesp/nestjs-better-auth",
    "better-auth",
    "@better-auth/expo",
  ];
  const external = Object.keys(pkg.dependencies || {}).filter(
    (dep) => !dep.startsWith("@repo/") && !esmOnlyPackages.includes(dep),
  );

  await build({
    entryPoints: [
      path.resolve(rootDir, "src/main.ts"),
      path.resolve(rootDir, "src/lambda.ts"),
    ],
    bundle: true,
    platform: "node",
    target: "node20",
    outdir: path.resolve(rootDir, "dist"),
    format: "cjs",
    sourcemap: true,
    minify: true,
    banner: {
      js: 'var importMetaUrl = require("url").pathToFileURL(__filename).href;',
    },
    define: {
      "import.meta.url": "importMetaUrl",
    },
    plugins: [
      esbuildPluginTsc({
        tsconfigPath,
      }),
    ],
    external: [
      ...external,
      "aws-lambda",
      "@nestjs/microservices",
      "@nestjs/websockets",
      "@nestjs/graphql",
      "cache-manager",
    ],
  });

  console.log("✅ Build complete!");
}

runBuild().catch((err) => {
  console.error("❌ Build failed:", err);
  process.exit(1);
});
