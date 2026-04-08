#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = process.cwd();
const androidDir = path.join(root, "android");
const isWindows = process.platform === "win32";

const shouldPrebuild = process.argv.includes("--prebuild");
const gradleCmd = isWindows ? "gradlew.bat" : "./gradlew";

const sourceApk = path.join(
  androidDir,
  "app",
  "build",
  "outputs",
  "apk",
  "release",
  "app-release.apk",
);

const outputDir = path.join(root, "output");
const outputApk = path.join(outputDir, "ZoneWake.apk");

function run(command, args, cwd) {
  const result = spawnSync(command, args, {
    cwd,
    stdio: "inherit",
    shell: isWindows,
  });

  if (result.status !== 0) {
    process.exit(result.status || 1);
  }
}

if (shouldPrebuild) {
  console.log("🏗️ Running prebuild...");
  run("npm", ["run", "prebuild:android"], root);
}

console.log("🚧 Building release APK with Gradle...");
run(gradleCmd, ["assembleRelease"], androidDir);

if (!fs.existsSync(sourceApk)) {
  console.error("❌ APK not found at expected path:\n", sourceApk);
  process.exit(1);
}

fs.mkdirSync(outputDir, { recursive: true });
fs.copyFileSync(sourceApk, outputApk);

console.log("");
console.log("✅ APK exported successfully:", outputApk);
