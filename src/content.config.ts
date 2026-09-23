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

export const collections = { orientacoes }
