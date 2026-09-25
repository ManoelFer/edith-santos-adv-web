import { site } from "@data/site"

const mensagemPadrao =
  "Olá, vim pelo site e gostaria de agendar uma análise do meu caso."

/** Link do WhatsApp da advogada, com a mensagem já preenchida. */
export function whatsappUrl(mensagem: string = mensagemPadrao): string {
  const url = new URL(site.whatsapp)
  url.searchParams.set("text", mensagem)
  return url.toString()
}

/** Mensagem pronta quando a pessoa vem da página de um benefício. */
export function mensagemSobre(assunto: string): string {
  return `Olá, vim pelo site e gostaria de agendar uma análise do meu caso sobre ${assunto}.`
}
