import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";
import globals from "globals";

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "build/",
      "node_modules/",
      ".react-router/",
      "app/components/svg/",
    ],
  },

  // Base JS recommended
  eslint.configs.recommended,

  // TypeScript recommended
  ...tseslint.configs.recommended,

  // React
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],

  // React Hooks
  {
    plugins: { "react-hooks": reactHooksPlugin },
    rules: reactHooksPlugin.configs.recommended.rules,
  },

  // JSX A11y
  jsxA11yPlugin.flatConfigs.recommended,

  // Tailwind CSS
  ...tailwindcssPlugin.configs["flat/recommended"],

  // Global settings
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
    settings: {
      react: { version: "detect" },
      formComponents: ["Form"],
      linkComponents: [
        { name: "Link", linkAttribute: "to" },
        { name: "NavLink", linkAttribute: "to" },
      ],
    },
  },

  // TypeScript-specific rules
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
    },
  },

  // Node files
  {
    files: ["server.js", "eslint.config.js", "scripts/**/*.js", "*.config.cjs"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  // Tailwind config uses require() for the plugin
  {
    files: ["tailwind.config.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
);
