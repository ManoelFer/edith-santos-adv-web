import type { ImageMetadata } from "astro"

import type { EventoConversao } from "@typings/analytics"

/** Card com título e descrição curta (situações, credenciais, etapas). */
export interface Topico {
  titulo: string
  descricao: string
}

export interface Area extends Topico {
  /** Ilustração do topo do card (SVG próprio). */
  imagem: ImageMetadata
  /**
   * Páginas em /beneficios/<slug>/ (o link só aparece se estiver publicada).
   * A primeira é o "Saiba mais" do card; as outras entram como "Veja também".
   */
  slugs?: string[]
  /** Card em largura total, com a ilustração ao lado do texto. */
  destaque?: boolean
}

/** Link exibido junto de um item (contato oficial, consulta externa). */
interface LinkTopico {
  label: string
  href: string
  evento?: EventoConversao
}

export interface Credencial extends Topico {
  links?: LinkTopico[]
}

export interface Etapa extends Topico {
  numero: string
}

export interface FaqItem {
  pergunta: string
  resposta: string
}

export interface LinkNav {
  label: string
  href: string
}

export interface Opcao {
  valor: string
  rotulo: string
}

/** Item com título curto e texto (requisitos e passos de um benefício). */
export interface ItemBeneficio {
  titulo: string
  texto: string
}

/** Referência oficial citada no conteúdo (lei, portaria, página do INSS). */
export interface Fonte {
  rotulo: string
  url: string
}
