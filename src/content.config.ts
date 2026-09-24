import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

// Orientações (artigos). Conteúdo que depende de lei tem `updated` e deve ser
// revisto quando a regra mudar. Rascunhos ficam com `draft: true`.
const orientacoes = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/orientacoes" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().min(120).max(155),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
})

const topico = z.object({ titulo: z.string(), texto: z.string() })

// Páginas de benefício (/beneficios/<slug>/). Texto jurídico: `revisado` é a
// data da última conferência com a lei, e `draft: true` até a advogada aprovar.
const beneficios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/beneficios" }),
  schema: ({ image }) =>
    z.object({
      // + " | Edith Santos" precisa caber em 60 caracteres
      title: z.string().max(45),
      description: z.string().min(120).max(155),
      h1: z.string(),
      eyebrow: z.string(),
      /** Nome oficial, quando o público usa outro (selo "nome antigo, nome novo"). */
      nomeOficial: z.string().optional(),
      /** Resposta direta à busca, 40 a 60 palavras. */
      resumo: z.string(),
      /** Valor da opção no formulário (src/data/beneficios.ts). */
      beneficio: z.string(),
      imagem: image(),
      imagemAlt: z.string(),
      requisitos: z.array(topico).min(1),
      /** Títulos da seção de requisitos quando não é "Quem tem direito" (planejamento, revisão). */
      secaoRequisitos: z
        .object({ eyebrow: z.string(), titulo: z.string(), lead: z.string() })
        .optional(),
      passos: z.array(topico).min(3),
      /** Título e texto do passo a passo quando não é um pedido comum ao INSS. */
      secaoPassos: z
        .object({ titulo: z.string(), lead: z.string() })
        .optional(),
      documentos: z.array(z.string()).min(3),
      faq: z.array(z.object({ pergunta: z.string(), resposta: z.string() })),
      fontes: z.array(z.object({ rotulo: z.string(), url: z.url() })).min(1),
      relacionados: z.array(z.string()).default([]),
      revisado: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { orientacoes, beneficios }
