import type { IconName } from "@typings/icon"

/** Card com título e descrição curta (situações, credenciais, etapas). */
export interface Topico {
  titulo: string
  descricao: string
}

export interface Area extends Topico {
  icone: IconName
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
