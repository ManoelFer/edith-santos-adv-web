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

const CONSENTIMENTO_NEGADO = {
  ad_storage: "denied",
  analytics_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
} as const

const CONSENTIMENTO_CONCEDIDO = {
  ad_storage: "granted",
  analytics_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
} as const

function concederConsentimento() {
  gtag("consent", "update", CONSENTIMENTO_CONCEDIDO)
}

// Modo de consentimento v2 (avançado): o script do Google carrega em toda
// visita, mas começa com tudo negado. Sem o aceite, ele não grava cookies nem
// identificadores e só envia sinais sem cookies, que o Google usa para estimar
// as conversões. Com o aceite no aviso (CookieBanner.astro), o consentimento
// passa a "granted" e a medição fica completa.
// Chamada tanto por iniciarGoogleAds() (toda página) quanto por
// registrarConversaoContato() (só /obrigado): o guard evita configurar duas vezes.
function ativar() {
  if (ativado || !noDominioReal()) return
  ativado = true
  window.dataLayer = window.dataLayer || []
  // O padrão de consentimento precisa entrar no dataLayer antes do "config".
  gtag("consent", "default", { ...CONSENTIMENTO_NEGADO, wait_for_update: 500 })
  // Sem cookies, guarda o gclid do anúncio nos links internos (não nos
  // externos, como o do WhatsApp) e tira dados de anúncio dos sinais anônimos.
  gtag("set", "url_passthrough", true)
  gtag("set", "ads_data_redaction", true)
  if (lerConsentimento() === "aceito") concederConsentimento()

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
  ativar()
  window.addEventListener(EVENTO_COOKIES_ACEITOS, concederConsentimento)
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
  ativar()
  if (!noDominioReal() || jaDisparouConversaoContato()) return
  marcarConversaoContatoDisparada()
  gtag("event", "conversion", { send_to: site.googleAds.conversaoContatoId })
}

const CHAVE_CONVERSAO_WHATSAPP = "conversao-whatsapp-disparada"
const PAGINA_VIRTUAL_WHATSAPP = new URL("/whatsapp/", site.url).href

/**
 * Conversão "Clique WhatsApp": a meta da campanha inteligente é a visita à
 * página /whatsapp/, que não existe de verdade. O clique envia uma visualização
 * de página virtual com esse endereço. Fica de fora em /obrigado, onde o
 * contato já contou pelo formulário, e conta uma vez por sessão.
 */
export function registrarConversaoWhatsApp() {
  // Confere pelo script no DOM, não pela variável `ativado`: o Astro pode
  // empacotar este módulo em mais de um script da página. Com o modo de
  // consentimento, o script existe em toda visita no domínio real, com ou sem
  // aceite: quem recusou envia o clique como sinal sem cookies.
  if (!document.getElementById("google-ads-gtag") || !noDominioReal()) return
  if (window.location.pathname.startsWith("/obrigado")) return
  try {
    if (sessionStorage.getItem(CHAVE_CONVERSAO_WHATSAPP) === "1") return
    sessionStorage.setItem(CHAVE_CONVERSAO_WHATSAPP, "1")
  } catch {
    // Armazenamento bloqueado: segue sem a trava da sessão.
  }
  gtag("event", "page_view", {
    page_location: PAGINA_VIRTUAL_WHATSAPP,
    page_title: "Clique WhatsApp",
    send_to: site.googleAds.id,
  })
}
