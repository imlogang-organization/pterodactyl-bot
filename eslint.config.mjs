import globals from "globals";
import pluginJs from "@eslint/js";

// Get the recommended configuration
const recommendedConfig = pluginJs.configs.recommended;

// Create a new configuration object
const newConfig = {
  ...recommendedConfig,
  rules: {
    ...recommendedConfig.rules,
    "no-unused-vars": "off",
  },
};

export default [
  { languageOptions: { globals: globals.node } },
  newConfig,
];