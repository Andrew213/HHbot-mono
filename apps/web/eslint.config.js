import base from "@hhbot/eslint-config";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";

const reactOverride = {
   files: ["**/*.jsx", "**/*.tsx", "**/*.ts"],
   plugins: {
      react: pluginReact,
      "react-hooks": pluginReactHooks,
   },
   settings: {
      react: {version: "detect"},
   },
   rules: {
      // правила для клиента
      ...pluginReact.configs.recommended.rules,
      ...pluginReactHooks.configs.recommended.rules,

      // React 17+ не требует import React
      "react/react-in-jsx-scope": "off",
   },
};

export default [...base, reactOverride];
