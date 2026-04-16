const esbuild = require("esbuild");
const dotenv = require("dotenv");

// Load .env before build so env vars are embedded
dotenv.config();

esbuild
  .build({
    entryPoints: ["src/lambda.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    outfile: "dist/index.js",
    sourcemap: true,
    mainFields: ["main", "module"],
    external: [
      "@nestjs/websockets/socket-module",
      "@nestjs/microservices/microservices-module",
      "@nestjs/microservices",
      "@nestjs/graphql",
      "class-transformer/storage",
      "aws-sdk",
    ], // avoid bundling optional NestJS dependencies and AWS SDK
  })
  .catch(() => process.exit(1));
