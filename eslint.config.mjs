import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        page: true,
        request: true,
        process: true,
        expect: true,
        __dirname: true,
      },
    },
    rules: {
      semi: ["error", "always"],
      indent: ["error", 4], //
      quotes: ["error", "single"],
      "no-unused-vars": "warn",
      "no-unused-code": "off",
    },
  },

  pluginJs.configs.recommended,
];
