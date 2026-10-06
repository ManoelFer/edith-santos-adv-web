import { type CollectionEntry, getCollection } from "astro:content"

export type Artigo = CollectionEntry<"artigos">

/**
 * Rascunhos aparecem no `yarn dev` e no build com MOSTRAR_RASCUNHOS=1 (prévia
 * para a advogada revisar). No build normal, só o que foi aprovado.
 */
const mostrarRascunhos =
  import.meta.env.DEV || process.env.MOSTRAR_RASCUNHOS === "1"

/** Artigos publicados, do mais recente para o mais antigo. */
export async function artigosPublicados(): Promise<Artigo[]> {
  const artigos = await getCollection(
    "artigos",
    ({ data }) => mostrarRascunhos || !data.draft,
  )
  return artigos.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}

export const urlArtigo = (id: string) => `/artigos/${id}/`

const PALAVRAS_POR_MINUTO = 200

/** Minutos de leitura (no mínimo 1), pelo número de palavras do texto. */
function minutosDeLeitura(artigo: Artigo): number {
  const palavras = (artigo.rendered?.html ?? "")
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter(Boolean).length
  return Math.max(1, Math.ceil(palavras / PALAVRAS_POR_MINUTO))
}

export const textoDeLeitura = (artigo: Artigo) =>
  `${minutosDeLeitura(artigo)} min de leitura`
