const expoConfig = require("eslint-config-expo/flat");
const prettierConfig = require("eslint-config-prettier");

/** @type {import('eslint').Linter.Config[]} */
module.exports = [
  ...expoConfig,
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*"],
  },
  {
    rules: {
      "react/display-name": "error",
      "react/no-unescaped-entities": "error",
    },
  },
  prettierConfig,
];
