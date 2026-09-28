import {
  EVENTO_COOKIES_ACEITOS,
  lerConsentimento,
  salvarConsentimento,
} from "@lib/cookies"

export function iniciarAvisoCookies() {
  const aviso = document.getElementById("aviso-cookies")
  const aceitar = document.getElementById("cookies-aceitar")
  const recusar = document.getElementById("cookies-recusar")

  if (aviso && !lerConsentimento()) {
    aviso.hidden = false
  }

  aceitar?.addEventListener("click", () => {
    if (aviso) aviso.hidden = true
    salvarConsentimento("aceito")
    window.dispatchEvent(new CustomEvent(EVENTO_COOKIES_ACEITOS))
  })

  recusar?.addEventListener("click", () => {
    if (aviso) aviso.hidden = true
    salvarConsentimento("recusado")
  })
}
