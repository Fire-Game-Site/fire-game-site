import { defineConfig } from 'astro/config';

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: node({
    mode: "standalone"
  }),
  server: {
    port: 10000,
    host: "0.0.0.0"
  },
  experimental: {
    serverIslands: true
  }
});