import dados from "./avaliacoesGoogle.json"

const { placeId, nota, total, avaliacoes } = dados

/**
 * Nota, total e avaliações de 5 estrelas do Perfil da Empresa no Google.
 * Atualize com `yarn avaliacoes`. Só aparecem as marcadas com `"exibir": true`
 * no JSON, depois da revisão da advogada (Provimento 205/2021).
 */
export const avaliacoesGoogle = {
  nota,
  total,
  exibidas: avaliacoes
    .filter((item) => item.exibir)
    .sort((a, b) => b.data.localeCompare(a.data)),
  verUrl: `https://search.google.com/local/reviews?placeid=${placeId}`,
  avaliarUrl: `https://search.google.com/local/writereview?placeid=${placeId}`,
} as const
