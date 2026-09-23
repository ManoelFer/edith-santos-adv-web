export interface CamposContato {
  nome: string
  whatsapp: string
  cidade: string
  /** Rótulo do benefício escolhido (vazio se não escolheu). */
  beneficio: string
  mensagem: string
  lgpd: boolean
}

export type CampoObrigatorio = "nome" | "whatsapp" | "lgpd"
export type ErrosContato = Partial<Record<CampoObrigatorio, string>>

/** Campo livre curto: detalhes do caso ficam para o atendimento (LGPD/OAB). */
export const limiteMensagem = 500

export function validarContato(campos: CamposContato): ErrosContato {
  const erros: ErrosContato = {}
  if (!campos.nome.trim()) {
    erros.nome = "Escreva o seu nome para eu saber como te chamar."
  }
  const digitos = campos.whatsapp.replace(/\D/g, "")
  if (!digitos) {
    erros.whatsapp = "Preciso do seu WhatsApp com DDD para responder."
  } else if (digitos.length < 10) {
    erros.whatsapp = "Faltam números. Inclua o DDD e os 8 ou 9 dígitos."
  }
  if (!campos.lgpd) {
    erros.lgpd = "Marque esta autorização para eu poder entrar em contato."
  }
  return erros
}

export function resumoErros(quantidade: number): string {
  if (quantidade === 0) return ""
  return quantidade === 1
    ? "Falta um campo para eu conseguir responder."
    : `Faltam ${quantidade} campos para eu conseguir responder.`
}

/** Texto que vai pronto para o WhatsApp da advogada. */
export function montarMensagem(campos: CamposContato): string {
  const linhas = [
    "Olá, vim pelo site e gostaria de uma análise do meu caso.",
    "",
    `Nome: ${campos.nome.trim()}`,
    `WhatsApp: ${campos.whatsapp.trim()}`,
    campos.cidade.trim() && `Cidade: ${campos.cidade.trim()}`,
    campos.beneficio && `Benefício: ${campos.beneficio}`,
    campos.mensagem.trim() && `\n${campos.mensagem.trim()}`,
  ]
  return linhas.filter((linha) => linha !== "").join("\n")
}
