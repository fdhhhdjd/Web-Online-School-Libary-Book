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
        'consistent-return': 'off',
        'arrow-parens': ['error', 'always'],
        'max-len': ['error', { code: 120 }],
        eqeqeq: 'error',
        'function-paren-newline': 'off',

        indent: ['error', 4],
        camelcase: 'off',
        'linebreak-style': [2, 'unix'],
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
        'operator-linebreak': [2, 'before', { overrides: { '?': 'after' } }],
        'import/prefer-default-export': 'off',
    },
};
