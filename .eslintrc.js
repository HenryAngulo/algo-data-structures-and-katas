module.exports = {
  root: true,
  parser: `babel-eslint`,
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 8 }, // to enable features such as async/await
  ignorePatterns: [`node_modules/*`, `.next/*`, `.out/*`, `!.prettierrc.js`], // We don't want to lint generated files nor node_modules, but we want to lint .prettierrc.js (ignored by default by eslint)
  extends: [
    `eslint:recommended`,
    `plugin:prettier/recommended`, //Prettier plugin,
  ],
  rules: {
    //General rules
    'object-curly-newline': `off`,
    'no-mixed-operators': `off`,
    'no-plusplus': 0,
    semi: [`error`, `never`],
    'max-len': [
      `error`,
      80,
      2,
      {
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignoreComments: true,
      },
    ],
    'no-constant-condition': 0,
    'no-console': 0,
    radix: 1,
    'prefer-destructuring': `off`,
    'prefer-const': [
      `warn`,
      {
        destructuring: `all`,
        ignoreReadBeforeAssign: false,
      },
    ],
    'no-useless-concat': `error`,
    'no-negated-condition': 0,
    quotes: [`error`, `backtick`],
    'no-shadow': 0,
    'no-multi-spaces': 2,
    'no-multiple-empty-lines': [
      `error`,
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'no-irregular-whitespace': 2,
    camelcase: [
      2,
      {
        properties: `always`,
      },
    ],
    'no-trailing-spaces': [
      2,
      {
        skipBlankLines: true,
      },
    ],
    'prettier/prettier': [`warn`],
    'no-unused-vars': [
      `error`,
      { argsIgnorePattern: `next|_`, ignoreRestSiblings: true },
    ],
  },
}
