import { site } from "@data/site"
import { EVENTO_COOKIES_ACEITOS, lerConsentimento } from "@lib/cookies"

declare global {
  interface Window {
    dataLayer: unknown[]
  }
}

// gtag.js só reconhece o objeto arguments (array-like), não um array de verdade:
// por isso usa arguments em vez de _args no push.
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments)
}

// Só mede visitas no domínio real (fica de fora de localhost, preview e CI),
// mesmo critério do componente Analytics.
const dominio = new URL(site.url).hostname
function noDominioReal() {
  return window.location.hostname === dominio
}

let ativado = false

// Só carrega o script do Google e configura as tags depois do aceite no aviso
// de cookies (CookieBanner.astro), porque elas usam cookies não essenciais.
// Chamada tanto por iniciarGoogleAds() (toda página) quanto por
// registrarConversaoContato() (só /obrigado): o guard evita configurar duas vezes.
function ativar() {
  if (ativado || !noDominioReal()) return
  ativado = true
  const script = document.createElement("script")
  script.id = "google-ads-gtag"
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${site.googleAds.id}`
  document.head.appendChild(script)
  gtag("js", new Date())
  gtag("config", site.googleAds.id)
  gtag("config", site.googleAds.conversaoId)
}

export function iniciarGoogleAds() {
  window.dataLayer = window.dataLayer || []

  if (lerConsentimento() === "aceito") {
    ativar()
  }

  window.addEventListener(EVENTO_COOKIES_ACEITOS, ativar)
}

const CHAVE_CONVERSAO_CONTATO = "conversao-contato-disparada"

// sessionStorage (não localStorage): trava só dentro desta aba/sessão, para um
// F5 ou "voltar" em /obrigado não contar duas vezes o mesmo contato. Uma nova
// visita de verdade, em outra sessão, volta a contar.
function jaDisparouConversaoContato(): boolean {
  try {
    return sessionStorage.getItem(CHAVE_CONVERSAO_CONTATO) === "1"
  } catch {
    return false
  }
}

function marcarConversaoContatoDisparada() {
  try {
    sessionStorage.setItem(CHAVE_CONVERSAO_CONTATO, "1")
  } catch {
    // Armazenamento bloqueado (navegação privada, extensão): sem trava nesta
    // sessão, mas não impede o evento de disparar.
  }
}

/** Conversão "Contato": formulário enviado. Chamar só na página /obrigado. */
export function registrarConversaoContato() {
  window.dataLayer = window.dataLayer || []

  function disparar() {
    ativar()
    if (!noDominioReal() || jaDisparouConversaoContato()) return
    marcarConversaoContatoDisparada()
    gtag("event", "conversion", { send_to: site.googleAds.conversaoContatoId })
  }

  if (lerConsentimento() === "aceito") {
    disparar()
  } else {
    window.addEventListener(EVENTO_COOKIES_ACEITOS, disparar, { once: true })
  }
}
