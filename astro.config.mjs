// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";
import { SITE } from "./src/config";
import pagefind from "astro-pagefind";
import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";
import { modifiedTime, readingTime } from "./src/utils/remarks.mjs";
import cloudflare from "@astrojs/cloudflare";
// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  base: SITE.basePath,

  markdown: {
    remarkPlugins: [readingTime, modifiedTime],
  },

  integrations: [
    tailwind(),
    mdx(),
    pagefind(),
    sitemap({
      changefreq: "hourly",
      lastmod: new Date('2022-02-24'),
      filter: (page) => page !== "https://prisri.org/newdr/" && page !== "https://prisri.org/google/",
    }),
  ],

  experimental: {
    responsiveImages: true,
  },

  adapter: cloudflare(),
});
