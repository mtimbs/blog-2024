// @ts-check
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://michaeltimbs.me",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
      wrap: true,
    },
  },
});
