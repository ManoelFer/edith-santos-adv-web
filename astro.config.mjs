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
    // Domínios do Google conforme o guia oficial de CSP da Google tag (GA4 com
    // recursos de publicidade + conversões e remarketing do Google Ads):
    // https://developers.google.com/tag-platform/security/guides/csp
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com https://www.googleadservices.com https://*.g.doubleclick.net https://pagead2.googlesyndication.com https://*.google.com https://*.google.com.br",
        "font-src 'self'",
        "connect-src 'self' https://gateway.umami.is https://www.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://www.googleadservices.com https://*.g.doubleclick.net https://ad.doubleclick.net https://pagead2.googlesyndication.com https://*.google.com https://*.google.com.br",
        "frame-src https://www.googletagmanager.com https://td.doubleclick.net",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "upgrade-insecure-requests",
      ],
      scriptDirective: {
        resources: [
          "'self'",
          "https://cloud.umami.is",
          "https://www.googletagmanager.com",
          "https://www.googleadservices.com",
          "https://www.google.com",
          "https://googleads.g.doubleclick.net",
        ],
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
