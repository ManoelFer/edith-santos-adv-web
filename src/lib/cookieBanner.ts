import { EVENTO_COOKIES_ACEITOS, salvarConsentimento } from "@lib/cookies"

export function iniciarAvisoCookies() {
  const aviso = document.getElementById("aviso-cookies")
  const aceitar = document.getElementById("cookies-aceitar")
  const recusar = document.getElementById("cookies-recusar")

  aceitar?.addEventListener("click", () => {
    aviso?.remove()
    salvarConsentimento("aceito")
    window.dispatchEvent(new CustomEvent(EVENTO_COOKIES_ACEITOS))
  })

  recusar?.addEventListener("click", () => {
    aviso?.remove()
    salvarConsentimento("recusado")
  })
}
