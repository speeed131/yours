module.exports = {
    extends: [
      "eslint:recommended",
      "plugin:vue/vue3-recommended",  // "plugin:vue/vue3-strongly-recommended"もあります
      "@vue/typescript",
      "plugin:prettier/recommended",
      "prettier/vue",
      "prettier/@typescript-eslint",
    ],
    env: {
      node: true,
    },
    rules: {},
};