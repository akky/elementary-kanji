module.exports = [
    {
        ignores: ['**/findAndReplaceDOMText.js']
    },
    {
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            globals: {
                chrome: 'readonly',
                document: 'readonly',
                window: 'readonly'
            }
        },
        rules: {
            indent: ['off'], // Disable indentation checks
            'linebreak-style': ['error', 'unix'],
            quotes: [2, 'single', { avoidEscape: true }],
            semi: ['error', 'always']
        }
    }
];
