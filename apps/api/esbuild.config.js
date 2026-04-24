const esbuild = require("esbuild");

esbuild
  .build({
    entryPoints: ["src/lambda.ts"],
    outfile: "dist/index.js",
    bundle: true,
    platform: "node",
    target: "node20",
    format: "cjs",
    sourcemap: false,
    minify: true,

    external: [
      "aws-sdk",

      "@nestjs/websockets",
      "@nestjs/websockets/socket-module",

      "@nestjs/microservices",
      "@nestjs/microservices/microservices-module",

      "@nestjs/graphql",

      "class-transformer/storage",
    ],
  })
  .catch(() => process.exit(1));
