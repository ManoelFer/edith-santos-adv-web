/**
 * Content loader do Astro para o Hello World CMS.
 *
 * CÓPIA de packages/astro-loader/src/index.ts do repositório hello-world-cms
 * (enquanto o pacote não é publicado), sem os `export` que o site não usa.
 * Mudou lá? Copie de novo, não edite aqui. Os tipos abaixo são
 * só o pedaço do `LoaderContext` do Astro que usamos; o Astro aceita o objeto
 * devolvido como um `Loader` de verdade.
 *
 * Uso (src/content.config.ts do site):
 *
 *   const orientacoes = defineCollection({
 *     loader: cmsLoader({
 *       url: import.meta.env.CMS_URL,
 *       siteId: import.meta.env.CMS_SITE_ID,
 *       token: import.meta.env.CMS_TOKEN,
 *       obrigatorio: !import.meta.env.DEV,
 *     }),
 *     schema: ...,
 *   })
 */

/** Artigo como a API de leitura (`/api/v1/sites/:id/posts`) devolve. */
interface ArtigoDoCms {
  id: string
  slug: string
  title: string
  description: string
  /** HTML já limpo pelo servidor; imagens com endereço completo. */
  bodyHtml: string
  coverUrl: string | null
  coverAlt: string
  publishedAt: string
  updatedAt: string
}

export interface OpcoesCms {
  /** Endereço do CMS, ex.: https://cms.helloworldestudio.com.br */
  url: string | undefined
  siteId: string | undefined
  token: string | undefined
  /**
   * true (padrão): sem credenciais ou com o CMS fora do ar, o build FALHA e o
   * site continua com o deploy anterior (melhor do que publicar sem artigos).
   * false: sem credenciais, só avisa e segue sem artigos (uso no `astro dev`).
   */
  obrigatorio?: boolean
  /** Transforma o artigo nos dados da coleção. O padrão serve ao schema da Edith. */
  mapearDados?: (artigo: ArtigoDoCms) => Record<string, unknown>
  /** Só para testes. */
  fetch?: typeof fetch
}

interface ContextoDoLoader {
  store: {
    clear(): void
    set(entrada: {
      id: string
      data: Record<string, unknown>
      rendered: { html: string; metadata: { headings: TituloDoArtigo[] } }
      digest: string
    }): unknown
  }
  parseData(args: {
    id: string
    data: Record<string, unknown>
  }): Promise<Record<string, unknown>>
  generateDigest(dados: unknown): string
  logger: { info(msg: string): void; warn(msg: string): void }
}

const UMA_HORA_MS = 3_600_000

/** Título (h2/h3) do artigo, no formato que `render()` do Astro devolve em `headings`. */
interface TituloDoArtigo {
  depth: number
  slug: string
  text: string
}

const ENTIDADES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
}

function slugDoTitulo(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

/**
 * O HTML do CMS não traz id nos títulos. Aqui cada h2/h3 ganha um (para link
 * direto e índice do artigo) e a lista de títulos sai pronta para o Astro.
 * O HTML já vem limpo do servidor: títulos sem atributos, só texto e negrito.
 */
function comAncoras(html: string): {
  html: string
  headings: TituloDoArtigo[]
} {
  const headings: TituloDoArtigo[] = []
  const usados = new Map<string, number>()

  const novo = html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_inteiro, nivel: string, miolo: string) => {
      const texto = miolo
        .replace(/<[^>]+>/g, "")
        .replace(/&(?:amp|lt|gt|quot|#39);/g, (e) => ENTIDADES[e] ?? e)
        .trim()
      const base = slugDoTitulo(texto) || "secao"
      const vezes = (usados.get(base) ?? 0) + 1
      usados.set(base, vezes)
      const slug = vezes === 1 ? base : `${base}-${vezes}`

      headings.push({ depth: Number(nivel), slug, text: texto })
      return `<h${nivel} id="${slug}">${miolo}</h${nivel}>`
    },
  )
  return { html: novo, headings }
}

/**
 * Dados padrão da coleção. `updated` só aparece quando o artigo foi mexido
 * depois de publicado (o autosave mexe em `updatedAt` o tempo todo antes disso).
 */
function dadosPadrao(a: ArtigoDoCms): Record<string, unknown> {
  const foiEditadoDepois =
    new Date(a.updatedAt).getTime() - new Date(a.publishedAt).getTime() >
    UMA_HORA_MS
  return {
    title: a.title,
    description: a.description,
    date: a.publishedAt,
    updated: foiEditadoDepois ? a.updatedAt : undefined,
    cover: a.coverUrl ?? undefined,
    coverAlt: a.coverAlt || undefined,
    draft: false,
  }
}

export function cmsLoader(opcoes: OpcoesCms) {
  const obrigatorio = opcoes.obrigatorio ?? true
  const mapear = opcoes.mapearDados ?? dadosPadrao

  return {
    name: "hello-world-cms",
    async load({ store, parseData, generateDigest, logger }: ContextoDoLoader) {
      const { url, siteId, token } = opcoes
      if (!url || !siteId || !token) {
        if (obrigatorio) {
          throw new Error(
            "CMS: defina CMS_URL, CMS_SITE_ID e CMS_TOKEN no ambiente do build.",
          )
        }
        logger.warn("CMS sem credenciais: seguindo sem artigos (ok no dev).")
        store.clear()
        return
      }

      const base = url.replace(/\/+$/, "")
      let resposta: Response
      try {
        resposta = await (opcoes.fetch ?? fetch)(
          `${base}/api/v1/sites/${encodeURIComponent(siteId)}/posts`,
          {
            headers: { authorization: `Bearer ${token}` },
            signal: AbortSignal.timeout(20_000),
          },
        )
      } catch (erro) {
        throw new Error(`CMS: não foi possível conectar em ${base}.`, {
          cause: erro,
        })
      }
      if (!resposta.ok) {
        throw new Error(
          `CMS respondeu ${resposta.status}. Confira CMS_SITE_ID e CMS_TOKEN.`,
        )
      }

      const { posts } = (await resposta.json()) as { posts: ArtigoDoCms[] }
      store.clear()
      for (const artigo of posts) {
        const data = await parseData({ id: artigo.slug, data: mapear(artigo) })
        const { html, headings } = comAncoras(artigo.bodyHtml)
        store.set({
          id: artigo.slug,
          data,
          rendered: { html, metadata: { headings } },
          digest: generateDigest(artigo),
        })
      }
      logger.info(`CMS: ${posts.length} artigo(s) carregado(s).`)
    },
  }
}
