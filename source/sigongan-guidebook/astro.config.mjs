import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
export default defineConfig({
  output: "static",
  devToolbar: { enabled: false },
  trailingSlash: "always",
  site: process.env.SITE_URL || undefined,
  integrations: [mdx()],
  markdown: { syntaxHighlight: false },
});
