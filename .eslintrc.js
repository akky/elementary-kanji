module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parserOptions: {
    sourceType: "module",
  },
  rules: {
    "indent": ["error", 4],
    "linebreak-style": ["error", "unix"],
    "quotes": [2, "single", { "avoidEscape": true }],
    "semi": ["error", "always"]
  },
};