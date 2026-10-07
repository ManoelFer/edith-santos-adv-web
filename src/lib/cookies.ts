export const CHAVE_CONSENTIMENTO = "cookies-consentimento"

export const EVENTO_COOKIES_ACEITOS = "cookies:aceitos"

export type Consentimento = "aceito" | "recusado"

export function lerConsentimento(): Consentimento | null {
  try {
    return localStorage.getItem(CHAVE_CONSENTIMENTO) as Consentimento | null
  } catch {
    return null
  }
}

export function salvarConsentimento(valor: Consentimento) {
  try {
    localStorage.setItem(CHAVE_CONSENTIMENTO, valor)
  } catch {
    // Armazenamento bloqueado (navegação privada, extensão): a escolha vale só para esta visita.
  }
}
