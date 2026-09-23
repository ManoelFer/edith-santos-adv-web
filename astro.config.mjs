// @ts-check
import sitemap from "@astrojs/sitemap"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig, fontProviders } from "astro/config"

// Páginas que não devem ir para o sitemap (também recebem noindex)
const foraDoSitemap = ["/obrigado/"]

// https://astro.build/config
export default defineConfig({
  site: "https://edithsantos.adv.br",
  trailingSlash: "always",
  integrations: [
    sitemap({
      filter: (page) =>
        !foraDoSitemap.some((caminho) => new URL(page).pathname === caminho),
    }),
  ],
  fonts: [
    {
      provider: fontProviders.local(),
      name: "Public Sans",
      cssVariable: "--font-public-sans",
      fallbacks: ["Helvetica", "Arial", "sans-serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/public-sans-latin.woff2"],
            weight: "400 600",
            style: "normal",
          },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: "Instrument Serif",
      cssVariable: "--font-instrument-serif",
      fallbacks: ["Georgia", "serif"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/instrument-serif-latin.woff2"],
            weight: "400",
            style: "normal",
          },
          {
            src: ["./src/assets/fonts/instrument-serif-italic-latin.woff2"],
            weight: "400",
            style: "italic",
          },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
