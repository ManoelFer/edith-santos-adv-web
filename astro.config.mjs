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
  // CSP em <meta> com hash de cada script e estilo inline.
  // frame-ancestors não funciona em <meta>: fica no public/_headers.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self' https://gateway.umami.is",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        resources: ["'self'", "https://cloud.umami.is"],
      },
    },
  },
  // Converte as ilustrações SVG em JPG para o og:image (redes sociais não
  // aceitam SVG). Seguro aqui: só entram SVGs criados no projeto, em src/assets.
  image: {
    dangerouslyProcessSVG: true,
  },
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
