// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  adapter: vercel(),

  i18n: {
    locales: ["es", "en", "ca"],
    defaultLocale: "es",
    routing:{
      prefixDefaultLocale: false,
    },
  },

});