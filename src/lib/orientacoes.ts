import { getCollection } from "astro:content"

/** Orientações publicadas (sem rascunhos), da mais recente para a mais antiga. */
export async function orientacoesPublicadas() {
  const posts = await getCollection("orientacoes", ({ data }) => !data.draft)
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
}
