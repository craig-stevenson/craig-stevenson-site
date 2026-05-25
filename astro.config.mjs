import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

export default defineConfig({
  site: 'https://craig-stevenson.com',
  integrations: [tailwind()],
  adapter: cloudflare()
});