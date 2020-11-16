module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["simple-import-sort", "@typescript-eslint", "react"],
  rules: {
    indent: "off",
    "linebreak-style": ["error", "unix"],
    quotes: "off",
    semi: "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "prettier/prettier": ["error"],
    "sort-imports": "off",
    "import/order": "off",
    "simple-import-sort/imports": "error",
  },
  settings: {
    react: { version: "detect" },
  },
};
