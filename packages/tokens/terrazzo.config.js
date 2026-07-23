import { defineConfig } from "@terrazzo/cli";
import pluginCSS from "@terrazzo/plugin-css";

export default defineConfig({
  tokens: ["./src/primitives.json", "./src/semantic.json"],
  outDir: "./dist/",
  plugins: [
    pluginCSS({
      filename: "tokens.css",
      variableName: (token) => {
        const id = typeof token === "string" ? token : token.id;
        return `--flint-${id.replace(/\./g, "-")}`;
      },
      modeSelectors: [
        { mode: "light", selectors: [":root"] },
        { mode: "dark", selectors: [".dark"] },
      ],
    }),
  ],
});
