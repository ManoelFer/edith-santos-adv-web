import { site } from "@data/site"
import type { FaqItem } from "@typings/conteudo"

type Schema = Record<string, unknown>

const idNegocio = `${site.url}/#negocio`

/** Links oficiais preenchidos em `site.social` (Perfil do Google, Instagram). */
function linksOficiais(): string[] {
  return Object.values(site.social).filter((link) => link !== "")
}

/** Negócio: LegalService com os dados de `src/data/site.ts`. */
export function legalServiceSchema(imagem: string): Schema {
  const { horario } = site
  const sameAs = linksOficiais()

  return {
    "@context": "https://schema.org",
    "@type": "LegalService",
    "@id": idNegocio,
    name: `${site.name} Advogada`,
    description: site.description,
    url: `${site.url}/`,
    image: imagem,
    telephone: site.telefoneE164,
    email: site.email,
    areaServed: { "@type": "Country", name: site.areaAtendida },
    knowsAbout: site.area,
    founder: {
      "@type": "Person",
      name: site.nomeCompleto,
      jobTitle: site.profissao,
      identifier: site.oab,
    },
    openingHoursSpecification: horario.faixas.map(({ abre, fecha }) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: horario.dias,
      opens: abre,
      closes: fecha,
    })),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  }
}

/** Perguntas frequentes: só use com o mesmo texto visível na página. */
export function faqPageSchema(itens: FaqItem[]): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map(({ pergunta, resposta }) => ({
      "@type": "Question",
      name: pergunta,
      acceptedAnswer: { "@type": "Answer", text: resposta },
    })),
  }
}

interface DadosArtigo {
  titulo: string
  descricao: string
  url: string
  imagem: string
  publicado: Date
  atualizado?: Date
}

/** Artigo de Orientações, com a advogada como autora. */
export function articleSchema(artigo: DadosArtigo): Schema {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: artigo.titulo,
    description: artigo.descricao,
    url: artigo.url,
    image: artigo.imagem,
    datePublished: artigo.publicado.toISOString(),
    dateModified: (artigo.atualizado ?? artigo.publicado).toISOString(),
    inLanguage: "pt-BR",
    author: {
      "@type": "Person",
      name: site.nomeCompleto,
      jobTitle: site.profissao,
      identifier: site.oab,
      url: `${site.url}/#sobre`,
    },
    publisher: { "@id": idNegocio },
  }
}
