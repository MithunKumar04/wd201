import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import jest from "eslint-plugin-jest";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    languageOptions: {
      globals: {
        test: "readonly",
        describe: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
      },
    },

    plugins: { jest },
    rules: { ...jest.configs.recommended.rules },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
];
