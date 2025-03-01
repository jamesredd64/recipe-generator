module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "google",
  ],
  rules: {
    "quotes": ["error", "double"],
    "indent": ["error", 2],
    "max-len": ["error", {code: 120}],
    "object-curly-spacing": ["error", "never"],
    "quote-props": ["error", "consistent"],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
