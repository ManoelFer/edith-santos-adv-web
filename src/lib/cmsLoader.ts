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
      rendered: { html: string }
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
        store.set({
          id: artigo.slug,
          data,
          rendered: { html: artigo.bodyHtml },
          digest: generateDigest(artigo),
        })
      }
      logger.info(`CMS: ${posts.length} artigo(s) carregado(s).`)
    },
  }
}
