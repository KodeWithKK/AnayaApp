/** @type {import("prettier").Config} */
const config = {
  bracketSpacing: true,
  bracketSameLine: true,
  singleQuote: false,
  trailingComma: "all",
  semi: true,
  printWidth: 80,
  tabWidth: 2,
  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(react-native/(.*)$)|^(react-native$)",
    "^(expo/(.*)$)|^(expo$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^@repo/(.*)$",
    "",
    "^@/(.*)$",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
};

module.exports = config;
