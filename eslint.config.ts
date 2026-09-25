import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig(
  { ignores: ["dist", ".output", ".tanstack", "node_modules", "src/routeTree.gen.ts", "docs"] },
  js.configs.recommended,
  tseslint.configs.strictTypeChecked,
  reactHooks.configs.flat.recommended,
  {
    languageOptions: { parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname } },
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { assertionStyle: "never" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-confusing-void-expression": "off",
    },
  },
  // R3F scenes mutate three.js objects inside useFrame by design (no React state per frame).
  { files: ["src/scene/**", "src/components/viz/**"], rules: { "react-hooks/immutability": "off" } },
  // TanStack Router's notFound()/redirect() are thrown by design.
  { files: ["src/routes/**"], rules: { "@typescript-eslint/only-throw-error": "off" } },
);
