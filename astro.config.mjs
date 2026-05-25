import { defineConfig } from 'astro/config';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import tailwind from '@astrojs/tailwind';

import cloudflare from "@astrojs/cloudflare";

function gitShortSha() {
  try {
    return execSync('git rev-parse --short HEAD', {
      stdio: ['ignore', 'pipe', 'ignore'],
    })
      .toString()
      .trim();
  } catch {
    return 'unknown';
  }
}

const pkg = JSON.parse(
  readFileSync(new URL('./package.json', import.meta.url), 'utf8'),
);

const buildInfo = {
  version: pkg.version,
  commit: process.env.CF_PAGES_COMMIT_SHA?.slice(0, 7) ?? gitShortSha(),
  builtAt: new Date().toISOString(),
};

export default defineConfig({
  site: 'https://craig-stevenson.com',
  integrations: [tailwind()],
  adapter: cloudflare(),
  vite: {
    define: {
      __BUILD_VERSION__: JSON.stringify(buildInfo.version),
      __BUILD_COMMIT__: JSON.stringify(buildInfo.commit),
      __BUILD_TIME__: JSON.stringify(buildInfo.builtAt),
    },
  },
});
