module.exports = {
    env: {
        node: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['airbnb-base', 'eslint:recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    rules: {
        // 'arrow-parens': 'off',
        'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
        'arrow-parens': ['error', 'always'],
        'function-paren-newline': 'off',

        indent: ['error', 4],
        camelcase: 'off',
        // 'linebreak-style': [2, 'unix'],
        'no-useless-escape': 'off',
        'no-console': [
            'error',
            {
                allow: ['info', 'warn', 'error', 'time', 'timeEnd'],
            },
        ],
        'no-unused-expressions': ['error', { allowTernary: true }],
        'no-duplicate-imports': 'error',
        'no-underscore-dangle': 'off',
        'no-extra-parens': 'error',
        'no-return-await': 'error',
        'no-return-assign': 'off',
        'no-shadow': [
            'error',
            {
                builtinGlobals: false,
                hoist: 'functions',
                allow: [],
            },
        ],
        'operator-linebreak': [
            'error',
            'after',
            {
                overrides: {
                    '?': 'before',
                    ':': 'before',
                    '&&': 'before',
                    '||': 'before',
                },
            },
        ],
        'import/prefer-default-export': 'off',
        'import/no-unresolved': 'off',
        'linebreak-style': ['error', process.platform === 'win64' && 'win32' ? 'windows' : 'unix'],
        // eslint-disable-next-line no-dupe-keys
        'no-return-await': 'off',
        'func-names': 'off',
        'no-ternary': 0,
        'no-unneeded-ternary': 0,
        'import/order': 'off',
        'no-restricted-globals': 'off',
        'prefer-const': 'off',
        'max-len': 'off',
        'no-restricted-syntax': 'off',
        'no-await-in-loop': 'off',
        'consistent-return': 'off',
        'no-template-curly-in-string': 'off',
        'prefer-destructuring': 'off',
        radix: 'off',
        'no-else-return': 'off',
        'no-async-promise-executor': 'off',
        'no-promise-executor-return': 'off',
        // eslint-disable-next-line no-dupe-keys
        'no-unused-expressions': 'off',
        'implicit-arrow-linebreak': 'off',
        'object-curly-newline': 'off',
        'no-nested-ternary': 'off',
    },
};
