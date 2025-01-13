// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import { SITE } from './src/config';

import sitemap from "@astrojs/sitemap";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: SITE.url,
  base: SITE.basePath,
  integrations: [tailwind(), mdx(), sitemap()]
});