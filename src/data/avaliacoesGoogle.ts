import dados from "./avaliacoesGoogle.json"

const { placeId, nota, total, avaliacoes } = dados

/**
 * Nota, total e avaliações de 5 estrelas do Perfil da Empresa no Google.
 * Atualize com `yarn avaliacoes`. Aparecem todas as que têm comentário, da mais
 * recente para a mais antiga, no máximo `LIMITE`.
 */
const LIMITE = 20

export const avaliacoesGoogle = {
  nota,
  total,
  exibidas: avaliacoes
    .filter((item) => item.texto.trim() !== "")
    .sort((a, b) => b.data.localeCompare(a.data))
    .slice(0, LIMITE),
  verUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
  avaliarUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
} as const
