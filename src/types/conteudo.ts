/** Card com título e descrição curta (etapas). */
interface Topico {
  titulo: string
  descricao: string
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
