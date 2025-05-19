import path from "node:path"
import {fileURLToPath} from "node:url"

import {FlatCompat} from "@eslint/eslintrc"
import eslint from "@eslint/js"
import stylisticTs from "@stylistic/eslint-plugin"
import typescriptEslintEslintPlugin from "@typescript-eslint/eslint-plugin"
import * as parser from "@typescript-eslint/parser"
import globals from "globals"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: eslint.configs.recommended,
    allConfig: eslint.configs.all,
})

const customized = stylisticTs.configs.customize({
    indent: 4,
    quotes: "double",
    semi: false,
})

export default [
    ...compat.extends(
        "plugin:@typescript-eslint/recommended",
        "plugin:import/recommended",
        "plugin:import/typescript",
    ),
    {
        settings: {
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json",
                },
            },
        },
    },
    {
        ignores: [
            "**/.eslintrc.js",
            "dist/**/*.js",
            "built/**/*.js",
        ],
    },
    {
        plugins: {
            "@typescript-eslint": typescriptEslintEslintPlugin,
            "@stylistic": stylisticTs,
        },

        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },

            parser: parser,
            ecmaVersion: 5,
            sourceType: "module",

            parserOptions: {
                project: "tsconfig.json",
                tsconfigRootDir: "./",
            },
        },

        rules: {
            ...customized.rules,
            "@typescript-eslint/interface-name-prefix": "off",
            "@typescript-eslint/explicit-function-return-type": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-unused-vars": "off",
            "no-restricted-imports": ["warn"],
            "import/order": [
                "error",
                {
                    "groups": [
                        // Built-in imports (come from NodeJS native) go first
                        "builtin",
                        // <- External imports
                        "external",
                        // <- Absolute imports
                        "internal",
                        // <- Relative imports, the sibling and parent types they can be mingled together
                        ["sibling", "parent"],
                        // <- index imports
                        "index",
                        // <- unknown
                        "unknown",
                    ],
                    "newlines-between": "always",
                    "alphabetize": {
                        /* sort in ascending order. Options: ["ignore", "asc", "desc"] */
                        order: "asc",
                        /* ignore case. Options: [true, false] */
                        caseInsensitive: true,
                    },
                },
            ],
            "@stylistic/arrow-parens": ["error", "always"],
            "@stylistic/brace-style": [
                "error",
                "1tbs",
                {allowSingleLine: true},
            ],
            "@stylistic/max-statements-per-line": ["error", {max: 2}],
            "@stylistic/max-len": ["error", {code: 4000}],
            "@stylistic/multiline-ternary": ["error", "always-multiline"],
            "@stylistic/array-element-newline": [
                "error",
                {multiline: true, consistent: true, minItems: 3},
            ],
            "@stylistic/array-bracket-newline": [
                "error",
                {multiline: true, minItems: 3},
            ],
            "@stylistic/array-bracket-spacing": ["error", "never"],
            "@stylistic/block-spacing": ["error", "never"],
            "@stylistic/linebreak-style": ["error", "unix"],
            "@stylistic/no-trailing-spaces": "error",
            "@stylistic/object-curly-spacing": ["error", "never"],
            "@stylistic/spaced-comment": ["error", "always"],
        },
    },
]
