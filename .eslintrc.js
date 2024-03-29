module.exports = {
  parser: "@babel/eslint-parser",
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    sourceType: "module",
  },
  "plugins": ["@babel"],
  rules: {
    "indent": ["error", 4],
    "linebreak-style": ["error", "unix"],
    "quotes": [2, "single", { "avoidEscape": true }],
    "semi": ["error", "always"]
  },
};