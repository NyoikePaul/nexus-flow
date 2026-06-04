import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";

/**
 * A shared ESLint configuration for the repository.
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    // Apply type-aware parsing to your TypeScript files
    files: ["**/*.ts", "**/*.tsx", "src/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: process.cwd(), // Dynamically targets the executing workspace root
      },
    },
  },
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    plugins: {
      "only-warn": onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
