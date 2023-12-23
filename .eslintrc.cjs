module.exports = {
    'root': true,
    'env': { browser: true, esnext: true },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
    ],
    'no-semi': 'error',
    'no-void': 'error',
    'ignorePattern': ['dist', 'node_modules', 'eslintrc.cjs'],
    'plugins': ['react-refresh', '@typescript-eslint', 'react-hooks'],
    'no-eval': ['error', {'allowIndirect': true}],
    'rules': {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
          ],
        "no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-namespace": "off",
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
        "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
    }
}