const esbuild = require("esbuild");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
const tscPlugin = require("esbuild-plugin-tsc");
const { shimPlugin } = require("esbuild-shim-plugin");
const pkg = require("./package.json");

// Load .env before build
dotenv.config();

const outDir = "dist";

// Modules we want to keep external (not bundled)
const externals = [
  "express",
  "@nestjs/websockets/socket-module",
  "@nestjs/microservices/microservices-module",
  "@nestjs/microservices",
  "@nestjs/graphql",
  "class-transformer/storage",
];

function prepareDeploymentPackage(sourcePkg, targetDir, externalList) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const deployPkg = {
    name: sourcePkg.name + "-deploy",
    version: sourcePkg.version,
    type: "module",
    private: true,
    dependencies: {},
  };

  externalList.forEach((ext) => {
    if (sourcePkg.dependencies[ext]) {
      deployPkg.dependencies[ext] = sourcePkg.dependencies[ext];
    }
  });

  fs.writeFileSync(
    path.join(targetDir, "package.json"),
    JSON.stringify(deployPkg, null, 2),
  );
  console.log(`✅ Minimal package.json generated in ${targetDir}`);
}

async function runBuild() {
  prepareDeploymentPackage(pkg, outDir, externals);

  try {
    await esbuild.build({
      entryPoints: ["src/lambda.ts"],
      bundle: true,
      platform: "node",
      target: "node20",
      format: "esm",
      outfile: path.join(outDir, "index.mjs"),
      sourcemap: true,
      keepNames: true,
      mainFields: ["module", "main"],
      plugins: [
        tscPlugin({
          tsconfigPath: "./tsconfig.json",
        }),
        shimPlugin(),
      ],
      external: externals,
    });
    console.log("✅ Build completed successfully.");
  } catch (err) {
    console.error("❌ Build failed:", err);
    process.exit(1);
  }
}

runBuild();
