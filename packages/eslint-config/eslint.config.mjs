import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import pluginImport from "eslint-plugin-import";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import tseslint from "typescript-eslint";

export default [
   js.configs.recommended,
   ...tseslint.configs.recommended,

   // базовые настройки
   {
      languageOptions: {
         ecmaVersion: 2021,
         sourceType: "module",
      },
      plugins: {
         import: pluginImport,
         "simple-import-sort": simpleImportSort,
      },
      rules: {
         "simple-import-sort/imports": "error",
         "simple-import-sort/exports": "warn",
      },
   },

   {
      files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
      rules: {
         // ts-версию выключаем (именно она крашится)
         "@typescript-eslint/no-unused-expressions": "off",

         // включаем core-версию с теми же поблажками
         "no-unused-expressions": [
            "error",
            {
               allowShortCircuit: true,
               allowTernary: true,
               allowTaggedTemplates: true,
            },
         ],
         "@typescript-eslint/no-unused-vars": [
            "error", // уровень предупреждения
            {
               vars: "all",
               args: "after-used",
               ignoreRestSiblings: true,
               argsIgnorePattern: "^_", // аргументы с _ не будут ошибкой
               varsIgnorePattern: "^_", // переменные с _ не будут ошибкой
            },
         ],
      },
   },

   // в самом конце — prettier
   prettier,
];
