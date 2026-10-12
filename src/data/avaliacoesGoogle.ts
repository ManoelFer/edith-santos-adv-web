import dados from "./avaliacoesGoogle.json"

const { placeId, nota, total, avaliacoes } = dados

/**
 * Nota, total e avaliações de 5 estrelas do Perfil da Empresa no Google.
 * Atualize com `yarn avaliacoes`. Aparecem as que têm comentário primeiro, da
 * mais recente para a mais antiga, e depois as sem comentário (`texto` vazio,
 * mostradas só com um ícone), no máximo `LIMITE`.
 */
const LIMITE = 20

const comentario = (texto: string) => texto.trim() !== ""

export const avaliacoesGoogle = {
  nota,
  total,
  exibidas: avaliacoes
    .toSorted(
      (a, b) =>
        Number(comentario(b.texto)) - Number(comentario(a.texto)) ||
        b.data.localeCompare(a.data),
    )
    .slice(0, LIMITE),
  verUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
  avaliarUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
} as const
