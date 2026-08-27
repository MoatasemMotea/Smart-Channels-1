import { defineConfig, globalIgnores } from "eslint/config";
import nextPlugin from "eslint-config-next";
import jsxA11y from "eslint-plugin-jsx-a11y";

// eslint-config-next already registers the jsx-a11y plugin with Next's
// baseline rules; we extend with the full recommended rule set (rules
// only — redefining the plugin itself is rejected by ESLint).
const a11yRecommendedRules = jsxA11y.flatConfigs.recommended.rules;

export default defineConfig([
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "design/**",
    "media-source/**",
    "public/**",
    "test-results/**",
    "playwright-report/**",
  ]),
  ...nextPlugin,
  {
    files: ["**/*.tsx", "**/*.jsx"],
    rules: { ...a11yRecommendedRules },
  },
  {
    files: ["src/**"],
    rules: {
      // Owner-editability guard: brand colors live in globals.css tokens.
      "no-restricted-syntax": [
        "error",
        {
          selector: "Literal[value=/#FF189C|#8D3492|#D80F7E/i]",
          message: "Use semantic design tokens (globals.css), not raw brand hex values.",
        },
      ],
    },
  },
]);
