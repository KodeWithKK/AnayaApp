require("esbuild").build({
  entryPoints: ["src/lambda.ts"],
  outfile: "dist/index.js",
  bundle: true,
  platform: "node",
  target: "node20",
  external: ["aws-sdk"],
});
