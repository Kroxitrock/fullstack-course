import {defineConfig} from "eslint/config";
import globals from "globals";


export default defineConfig([{
    files: ["**/*.js"],
    languageOptions: {sourceType: "commonjs", globals: {...globals.node}, ecmaVersion: "latest"}
}, {files: ["**/*.{js,mjs,cjs}"], languageOptions: {globals: globals.browser}},]);