import { getCollection } from "astro:content"

/**
 * Rascunhos aparecem no `yarn dev` e no build com MOSTRAR_RASCUNHOS=1 (prévia
 * para a advogada revisar). No build normal, só o que foi aprovado.
 */
const mostrarRascunhos =
  import.meta.env.DEV || process.env.MOSTRAR_RASCUNHOS === "1"

/** Orientações publicadas, da mais recente para a mais antiga. */
export async function orientacoesPublicadas() {
  const posts = await getCollection(
    "orientacoes",
    ({ data }) => mostrarRascunhos || !data.draft,
  )
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}
