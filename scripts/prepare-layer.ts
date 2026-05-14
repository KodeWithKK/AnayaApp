import { execSync } from "child_process";
import fs from "fs";
import path from "path";

const ROOT_DIR = process.cwd();
const API_PACKAGE_PATH = path.join(ROOT_DIR, "apps/api/package.json");
const LAYER_DIR = path.join(ROOT_DIR, "layer/nodejs");
const NODE_MODULES_DIR = path.join(LAYER_DIR, "node_modules");

async function prepareLayer() {
  // 0. Safety Check
  if (!fs.existsSync(path.join(ROOT_DIR, "turbo.json"))) {
    console.error("❌ Run from project root.");
    process.exit(1);
  }

  console.log("🚀 Preparing Layer...");

  // 1. Create layer directory
  console.log(`📁 Creating ${LAYER_DIR}...`);
  if (fs.existsSync(path.join(ROOT_DIR, "layer"))) {
    fs.rmSync(path.join(ROOT_DIR, "layer"), { recursive: true, force: true });
  }
  fs.mkdirSync(LAYER_DIR, { recursive: true });

  // 2. Process package.json
  console.log("📦 Processing package.json...");
  const apiPackage = JSON.parse(fs.readFileSync(API_PACKAGE_PATH, "utf-8"));

  const layerPackage = {
    name: "api-layer",
    version: "1.0.0",
    dependencies: {} as Record<string, string>,
  };

  if (apiPackage.dependencies) {
    for (const [name, version] of Object.entries(apiPackage.dependencies)) {
      if (!name.startsWith("@repo/")) {
        layerPackage.dependencies[name] = version as string;
      }
    }
  }

  const layerPackagePath = path.join(LAYER_DIR, "package.json");
  fs.writeFileSync(layerPackagePath, JSON.stringify(layerPackage, null, 2));

  // 3. Install dependencies
  console.log("⏳ Installing deps...");
  const installPath = path.join(ROOT_DIR, "layer/nodejs");
  try {
    execSync(`npm install --prefix ${installPath} --omit=dev`, {
      stdio: "inherit",
    });
  } catch (error) {
    console.error("❌ Install failed.");
    process.exit(1);
  }

  // 4. Cleanup and Pruning
  console.log("🧹 Pruning...");
  if (fs.existsSync(layerPackagePath)) fs.unlinkSync(layerPackagePath);
  const lockPath = path.join(LAYER_DIR, "package-lock.json");
  if (fs.existsSync(lockPath)) fs.unlinkSync(lockPath);

  const unwantedPackages = [
    "typescript",
    "prettier",
    "@esbuild",
    "@types",
    ".bin",
  ];

  if (fs.existsSync(NODE_MODULES_DIR)) {
    for (const pkg of unwantedPackages) {
      const pkgPath = path.join(NODE_MODULES_DIR, pkg);
      if (fs.existsSync(pkgPath)) {
        fs.rmSync(pkgPath, { recursive: true, force: true });
      }
    }

    const prunePatterns = [
      "*.md",
      "*.ts",
      "*.map",
      "LICENSE",
      "README",
      "test",
      "tests",
      "__tests__",
      "docs",
      "examples",
    ];

    const walkAndPrune = (dir: string) => {
      fs.readdirSync(dir, { withFileTypes: true }).forEach((dirent) => {
        const fullPath = path.join(dir, dirent.name);
        const name = dirent.name.toLowerCase();

        if (dirent.isDirectory()) {
          if (prunePatterns.includes(name))
            fs.rmSync(fullPath, { recursive: true, force: true });
          else walkAndPrune(fullPath);
        } else if (
          prunePatterns.some((p) =>
            p.startsWith("*.")
              ? name.endsWith(p.slice(1))
              : name.startsWith(p.toLowerCase()),
          )
        ) {
          fs.unlinkSync(fullPath);
        }
      });
    };

    walkAndPrune(NODE_MODULES_DIR);
  } else {
    console.error("❌ node_modules not found in layer!");
  }

  console.log("✅ Done!");
}

prepareLayer().catch((err) => {
  console.error("💥 Fatal error during layer preparation:", err);
  process.exit(1);
});
