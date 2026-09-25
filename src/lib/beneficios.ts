import { type CollectionEntry, getCollection } from "astro:content"

import { beneficios as opcoes } from "@data/beneficios"

export type Beneficio = CollectionEntry<"beneficios">

/**
 * Rascunhos aparecem no `yarn dev` e no build com MOSTRAR_RASCUNHOS=1 (prévia
 * para a advogada revisar). No build normal, só o que foi aprovado.
 */
const mostrarRascunhos =
  import.meta.env.DEV || process.env.MOSTRAR_RASCUNHOS === "1"

/** Páginas de benefício publicadas, na ordem do título. */
export async function beneficiosPublicados(): Promise<Beneficio[]> {
  const paginas = await getCollection(
    "beneficios",
    ({ data }) => mostrarRascunhos || !data.draft,
  )
  return paginas.sort((a, b) => a.data.title.localeCompare(b.data.title, "pt"))
}

export const urlBeneficio = (slug: string) => `/beneficios/${slug}/`

/** Nome curto para menus e trilha: o título até os dois-pontos. */
export const nomeCurto = ({ data }: Beneficio) =>
  data.title.split(":")[0].trim()

/** Nome do benefício como no formulário (ex.: "BPC / LOAS"). */
export function rotuloDe({ data }: Beneficio): string {
  return opcoes.find(({ valor }) => valor === data.beneficio)?.rotulo ?? data.h1
}

/** Nome no meio de uma frase ("sobre pensão por morte", "sobre BPC / LOAS"). */
export function assuntoDe(beneficio: Beneficio): string {
  const rotulo = rotuloDe(beneficio)
  return /^[A-Z]{2}/.test(rotulo)
    ? rotulo
    : rotulo.charAt(0).toLowerCase() + rotulo.slice(1)
}

/** Títulos da seção de requisitos: o padrão serve às páginas de benefício. */
export function secaoRequisitosDe({ data }: Beneficio) {
  return (
    data.secaoRequisitos ?? {
      eyebrow: "Requisitos",
      titulo: "Quem tem direito",
      lead: "Em linhas gerais, estas são as condições que o INSS confere. Cada uma tem exceções e detalhes que dependem da análise dos documentos.",
    }
  )
}

/** Título e texto do passo a passo: o padrão serve aos pedidos comuns ao INSS. */
export function secaoPassosDe({ data }: Beneficio) {
  return (
    data.secaoPassos ?? {
      titulo: "Como o pedido funciona",
      lead: "A ordem mais comum de um pedido no INSS. Prazos e exigências variam conforme o caso e a agência.",
    }
  )
}
