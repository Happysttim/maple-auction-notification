module.exports = {
    'root': true,
    'env': { browser: true },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    'ignorePatterns': ['/dist/', '/node_modules/', '.eslintrc.cjs', 'rollup.main.config.ts', 'rollup.preload.config.ts', 'vite.renderer.config.ts'],
    'plugins': ['react-refresh', '@typescript-eslint', 'react-hooks'],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        project: true,
        __tsconfigRootDir: __dirname
    },
    'rules': {
        'semi': 'error',
        'no-void': 'error',
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
        'no-eval': ['error', {'allowIndirect': true}],
        'quotes': ['error', 'single'],
        'no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
        'react-hooks/exhaustive-deps': 'off'
    }
}