module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    // https://future-architect.github.io/articles/20210616a/
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier", //@MEMO: テンプレート内で、クラス多いと改行してくる
    "@vue/prettier/@typescript-eslint",
    "prettier"
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // @see https://eslint.vuejs.org/rules/singleline-html-element-content-newline.html
    "vue/singleline-html-element-content-newline": "off",
    // @see https://eslint.vuejs.org/rules/multiline-html-element-content-newline.html#vue-multiline-html-element-content-newline
    "vue/multiline-html-element-content-newline": "off"
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)",
      ],
      env: {
        jest: true,
      },
    },
  ],
};
