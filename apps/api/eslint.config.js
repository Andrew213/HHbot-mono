import base from "@hhbot/eslint-config";

export default [
   ...base,
   {
      files: ["**/*.ts"],
      rules: {
         // правила для сервера
      },
   },
];
