import { site } from "@data/site"
import { EVENTO_COOKIES_ACEITOS, lerConsentimento } from "@lib/cookies"

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

function gtag(...args: unknown[]) {
  window.dataLayer.push(args)
}

export function iniciarGoogleAds() {
  const { id } = site.googleAds
  // Só mede visitas no domínio real (fica de fora de localhost, preview e CI),
  // mesmo critério do componente Analytics.
  const dominio = new URL(site.url).hostname

  window.dataLayer = window.dataLayer || []

  // Só carrega o script do Google depois do aceite no aviso de cookies
  // (CookieBanner.astro), porque o gtag usa cookies não essenciais.
  function ativar() {
    if (window.location.hostname !== dominio) return
    if (document.getElementById("google-ads-gtag")) return
    const script = document.createElement("script")
    script.id = "google-ads-gtag"
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
    document.head.appendChild(script)
    gtag("js", new Date())
    gtag("config", id)
  }

  if (lerConsentimento() === "aceito") {
    ativar()
  }

  window.addEventListener(EVENTO_COOKIES_ACEITOS, ativar)
}
