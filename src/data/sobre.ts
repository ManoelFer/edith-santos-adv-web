import { site } from "@data/site"

export interface CartaoSobre {
  /** Nome do arquivo (sem extensão) esperado em `src/assets/sobre/`. */
  foto: string
  identificador: string
  titulo: string
  paragrafos: string[]
  /** Descrição da foto (só usada se o arquivo existir). */
  alt: string
  /** Classe `object-position` completa: mantém o rosto à vista quando o quadro é cortado. */
  enquadramento: string
}

export const sobreIntro = {
  eyebrow: "Sobre mim",
  titulo: "Conhecimento jurídico, atendimento humano e respeito à sua história",
  texto:
    "Por trás de cada questão previdenciária, existe uma história que merece ser ouvida com atenção, respeito e responsabilidade.",
}

/** Resumo dos 3 cartões, só para o celular (um retrato e texto breve). */
export const sobreResumo = {
  titulo: "Quem é Edith Santos?",
  foto: "sobre-01-sem-fundo",
  alt: `Retrato de ${site.nomeCompleto}, advogada previdenciária, de vestido preto e colar dourado`,
  paragrafos: [
    `Sou ${site.nomeCompleto}, cristã, casada e advogada previdenciária em Goiás (${site.oab}), pós-graduada em Aposentadoria Especial. Há 5 anos e 8 meses, atuo com ética, dedicação e estudo constante, buscando explicar com clareza os direitos e as possibilidades previstas em lei.`,
  ],
}

// TODO(cliente): confirmar se "5 anos e 8 meses" ainda vale na data da publicação.
export const sobreCartoes: CartaoSobre[] = [
  {
    foto: "sobre-01-conhecimento",
    enquadramento: "object-[50%_14%]",
    identificador: "01 / Conhecimento",
    titulo: "Conhecimento construído com dedicação.",
    alt: `Retrato de ${site.nomeCompleto}, advogada previdenciária, de vestido preto e colar dourado`,
    paragrafos: [
      `Sou ${site.nomeCompleto}, advogada previdenciária em Goiás (${site.oab}). Formada em Direito pela Universidade Estadual de Goiás e pós-graduada em aposentadoria especial, atuo na área há 5 anos e 8 meses.`,
      "Atuo com ética e estudo constante, para explicar com clareza os requisitos e as possibilidades previstas em lei.",
    ],
  },
  {
    foto: "sobre-02-acolhimento",
    enquadramento: "object-[50%_14%]",
    identificador: "02 / Acolhimento",
    titulo: "Cada história merece ser ouvida.",
    alt: `${site.nomeCompleto}, sentada em seu escritório, de blazer preto e camisa branca`,
    paragrafos: [
      "Cada pessoa tem uma realidade própria. Por isso, começo ouvindo com atenção e analiso cada caso de forma individual.",
      "Estudo a situação à luz da legislação previdenciária e oriento com transparência sobre as possibilidades e os limites de cada caso.",
    ],
  },
  {
    foto: "sobre-03-responsabilidade",
    enquadramento: "object-[50%_17%]",
    identificador: "03 / Responsabilidade",
    titulo: "Orientação jurídica com ética e transparência.",
    alt: `${site.nomeCompleto} sentada à mesa de trabalho, com livros ao fundo`,
    paragrafos: [
      "Como cristã, valorizo honestidade, respeito e cuidado com o próximo, sempre dentro dos limites éticos da advocacia.",
      "Atendo por videochamada e WhatsApp, em todo o Brasil e para brasileiros que moram no exterior. Tudo o que você compartilha é tratado com sigilo profissional.",
    ],
  },
]
