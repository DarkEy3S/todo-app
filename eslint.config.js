import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import pluginReact from 'eslint-plugin-react'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default defineConfig([
    globalIgnores(['dist']),
    {
        files: ['**/*.{ts,tsx}'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs['recommended-latest'],
            reactRefresh.configs.vite,
        ],

        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
    },
    eslintPluginPrettierRecommended,
    tseslint.configs.recommended,
    {
        ...pluginReact.configs.flat.recommended,
        rules: {
            // отключаем старое правило для React 17+
            'react/react-in-jsx-scope': 'off',
            'no-console': 'error',
            'prettier/prettier': [
                'error',
                {
                    singleQuote: false,
                    printWidth: 130,
                    tabWidth: 2,
                    semi: true,
                },
            ],
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
    },
])
