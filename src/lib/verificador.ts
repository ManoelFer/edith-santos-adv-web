import { mensagemSobre } from "@lib/whatsapp"

export interface ResultadoVerificador {
  titulo: string
  texto: string
  mensagem: string
}

/**
 * Resultado do checklist "seu caso se parece...?". Nunca diz que a pessoa tem
 * direito (Provimento 205/2021): só indica se vale a análise. A mensagem leva
 * só contagens, nunca o conteúdo das perguntas (podem tocar em saúde).
 */
export function resultadoVerificador(
  assunto: string,
  respondidas: number,
  sims: number,
  total: number,
): ResultadoVerificador {
  const base = mensagemSobre(assunto)

  if (respondidas === 0) {
    return {
      titulo: "Marque as respostas",
      texto: "Leva menos de um minuto e nada do que você marcar é enviado.",
      mensagem: base,
    }
  }

  const mensagem = `${base} Respondi o checklist do site: ${sims} de ${respondidas} respostas "sim".`

  if (sims > 0) {
    return {
      titulo: "Seu caso tem sinais que merecem análise",
      texto:
        "Só a análise do seu histórico mostra se há direito e quais são os próximos passos. Entre em contato para agendar essa análise.",
      mensagem,
    }
  }

  return {
    titulo:
      respondidas < total
        ? "Continue respondendo"
        : "Vale conversar mesmo assim",
    texto:
      respondidas < total
        ? "Faltam algumas perguntas. Ou, se preferir, fale direto com a advogada."
        : "Cada caso tem detalhes que um checklist não alcança. Entre em contato para agendar uma análise do seu caso.",
    mensagem,
  }
}
