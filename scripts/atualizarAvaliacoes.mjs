// Atualiza src/data/avaliacoesGoogle.json com a nota, o total e as avaliações de
// 5 estrelas do Perfil da Empresa no Google (Places API New). Rode: yarn avaliacoes
// A API devolve só até 5 avaliações por consulta; por isso as já guardadas no
// JSON são mantidas e as novas somam, da mais recente para a mais antiga.
// Avaliação nova entra com "exibir": false: só aparece no site depois que a
// advogada revisar o texto (Provimento 205/2021) e mudar para true no JSON.
// Requer GOOGLE_PLACES_API_KEY no .env (nunca versionado).
import { readFile, writeFile } from "node:fs/promises"

const arquivo = new URL("../src/data/avaliacoesGoogle.json", import.meta.url)
const chave = process.env.GOOGLE_PLACES_API_KEY

if (!chave) {
  console.error("Defina GOOGLE_PLACES_API_KEY no .env.")
  process.exit(1)
}

const atual = JSON.parse(await readFile(arquivo, "utf8"))

const resposta = await fetch(
  `https://places.googleapis.com/v1/places/${atual.placeId}?languageCode=pt-BR`,
  {
    headers: {
      "X-Goog-Api-Key": chave,
      "X-Goog-FieldMask": "rating,userRatingCount,reviews",
    },
  },
)

if (!resposta.ok) {
  console.error(
    `Places API respondeu ${resposta.status}:`,
    await resposta.text(),
  )
  process.exit(1)
}

const { rating = 0, userRatingCount = 0, reviews = [] } = await resposta.json()

const anteriores = new Map(
  (atual.avaliacoes ?? []).map((item) => [item.id, item]),
)

// Só 5 estrelas e com texto; o texto vai como o cliente escreveu, sem edição
const recebidas = reviews
  .filter((r) => r.rating === 5 && (r.originalText?.text ?? r.text?.text))
  .map((r) => {
    const id = r.name.split("/").pop()
    return {
      id,
      autor: r.authorAttribution?.displayName ?? "Cliente",
      texto: (r.originalText?.text ?? r.text.text).trim(),
      data: r.publishTime?.slice(0, 10) ?? "",
      exibir: anteriores.get(id)?.exibir ?? false,
    }
  })

const ids = new Set(recebidas.map((item) => item.id))
const avaliacoes = [
  ...recebidas,
  ...(atual.avaliacoes ?? []).filter((item) => !ids.has(item.id)),
].sort((a, b) => b.data.localeCompare(a.data))

const novo = {
  placeId: atual.placeId,
  nota: Math.round(rating * 10) / 10,
  total: userRatingCount,
  atualizadoEm: new Date().toISOString().slice(0, 10),
  avaliacoes,
}

await writeFile(arquivo, `${JSON.stringify(novo, null, 2)}\n`)
console.log(
  `Nota ${novo.nota} em ${novo.total} avaliações; ${avaliacoes.length} de 5 estrelas com texto.`,
)
