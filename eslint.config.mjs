import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([

  // Backend (Node)
  {
    files: ["server.js", "backend/**/*.js"],
    languageOptions: {
      globals: globals.node,
      sourceType: "commonjs",
    },
    extends: [js.configs.recommended],
  },

  // Frontend (Browser)
  {
    files: ["frontend/**/*.js", "public/**/*.js", "login.js", "lobby.js", "game.js"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      sourceType: "module",
    },
    extends: [js.configs.recommended],
  },

]);
