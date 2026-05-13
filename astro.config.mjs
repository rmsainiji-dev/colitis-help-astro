import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://colitishelpusa.com',
  output: 'static',
  integrations: [
    react(),
    mdx(),
    sitemap({
      // Exclude /api/ and /blog/[slug]/ duplicates (standalone pages are canonical)
      filter: (page) =>
        !page.includes('/api/') &&
        !/\/blog\/.+/.test(page),
      changefreq: 'weekly',
      serialize(item) {
        if (item.url === 'https://colitishelpusa.com/')               item.priority = 1.0;
        else if (item.url.includes('/uc-care-options-check'))         item.priority = 0.95;
        else if (item.url.includes('/ulcerative-colitis-symptoms'))   item.priority = 0.9;
        else if (item.url.includes('/ulcerative-colitis-flare-up'))   item.priority = 0.9;
        else if (item.url.includes('/ulcerative-colitis-treatment'))  item.priority = 0.85;
        else if (item.url.includes('/biologics-for-ulcerative'))      item.priority = 0.85;
        else if (item.url.includes('/jak-inhibitors'))                item.priority = 0.85;
        else if (item.url.includes('/free-uc-flare-guide'))           item.priority = 0.8;
        else if (item.url.includes('/gi-doctor-questions'))           item.priority = 0.8;
        else if (item.url.includes('/ulcerative-colitis-help/'))      item.priority = 0.5;
        else if (
          item.url.includes('/terms') ||
          item.url.includes('/privacy') ||
          item.url.includes('/about') ||
          item.url.includes('/partner-disclosure') ||
          item.url.includes('/medical-disclaimer')
        )                                                             item.priority = 0.3;
        else                                                          item.priority = 0.7;
        return item;
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
