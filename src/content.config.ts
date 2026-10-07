import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"
import { loadEnv } from "vite"

import { site } from "./data/site"
import { cmsLoader } from "./lib/cmsLoader"

// CMS_* vêm do ambiente do build (Cloudflare, GitHub) ou do .env no dev.
const cms = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "CMS_")

// Artigos, escritos pela advogada no Hello World CMS e lidas pela
// API no build. Sem CMS_* o build falha de propósito (melhor manter o deploy
// anterior do que publicar o site sem artigos); no `yarn dev` só avisa.
// A capa é uma URL: o Astro baixa e otimiza no build (image.domains).
// Conteúdo que depende de lei tem `updated` e deve ser revisto quando a regra mudar.
// O <title> é "<título> | <nome do site>" e precisa caber em 60 letras (yarn seo).
// Os mesmos números ficam no CMS (Sites > Edith > Integração > Título no Google):
// lá o editor barra o artigo antes de publicar. Aqui é a rede de segurança.
const TITULO_GOOGLE_MAX = 60 - ` | ${site.name}`.length

const artigos = defineCollection({
  loader: cmsLoader({
    url: cms.CMS_URL,
    siteId: cms.CMS_SITE_ID,
    token: cms.CMS_TOKEN,
    obrigatorio: process.env.NODE_ENV === "production",
  }),
  schema: z
    .object({
      title: z.string(),
      /** Título para a aba e o Google (opcional); a página usa `title` no h1. */
      tituloGoogle: z.string().optional(),
      description: z.string().min(120).max(155),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      cover: z.url().optional(),
      coverAlt: z.string().optional(),
      draft: z.boolean().default(false),
    })
    .refine((d) => (d.tituloGoogle ?? d.title).length <= TITULO_GOOGLE_MAX, {
      message: `O título no Google passa de ${TITULO_GOOGLE_MAX} letras. No CMS, encurte o título ou preencha "Título para o Google".`,
      path: ["tituloGoogle"],
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
      /** Resposta direta à busca, em até ~30 palavras. */
      resumo: z.string(),
      /** Valor da opção no formulário (src/data/beneficios.ts). */
      beneficio: z.string(),
      imagem: image(),
      imagemAlt: z.string(),
      requisitos: z.array(topico).min(1).max(4),
      /** Títulos da seção de requisitos quando não é "Quem tem direito" (planejamento, revisão). */
      secaoRequisitos: z
        .object({ eyebrow: z.string(), titulo: z.string(), lead: z.string() })
        .optional(),
      /**
       * Perguntas sim/não do checklist "seu caso se parece...?". Nada de dado
       * de saúde: só situação de vida. O resultado nunca diz "você tem direito".
       */
      sinais: z.array(z.string()).min(3).max(4),
      /**
       * "O que a advogada confere": só o NOME de cada ponto, sem explicar como
       * resolver. Mostra domínio sem entregar o método.
       */
      confere: z.array(z.string()).min(4).max(5),
      /** "O INSS negou?": 2 a 3 frases, sem detalhar recurso nem ação judicial. */
      negativa: z.string(),
      faq: z
        .array(z.object({ pergunta: z.string(), resposta: z.string() }))
        .max(3),
      fontes: z
        .array(z.object({ rotulo: z.string(), url: z.url() }))
        .min(1)
        .max(5),
      relacionados: z.array(z.string()).default([]),
      revisado: z.coerce.date(),
      draft: z.boolean().default(false),
    }),
})

export const collections = { artigos, beneficios }
