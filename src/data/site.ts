import type { LinkNav } from "@typings/conteudo"

type ProvedorAnalytics = "umami" | "plausible"

interface ConfigAnalytics {
  provedor: ProvedorAnalytics | null
  /** Umami: website ID. Plausible: domínio do site. */
  id: string
  /** URL do script (Umami próprio ou Plausible). */
  script: string
}

const whatsappNumero = "5564984474053"

/** Até onde o atendimento chega. Base dos textos de atendimento do site. */
const abrangencia = "em todo o Brasil e para brasileiros no exterior"

export const site = {
  name: "Edith Santos",
  nomeCompleto: "Edith Silva de Almeida Santos",
  profissao: "Advogada",
  url: "https://edithsantos.adv.br",
  description:
    "Advogada previdenciária com atendimento online em todo o Brasil e para brasileiros no exterior. Pedidos, recursos e revisões de benefícios do INSS.",
  oab: "OAB/GO nº 73.463",
  area: "Direito Previdenciário",

  // NAP: mesmo formato do Perfil da Empresa no Google e das redes
  telefone: "(64) 98447-4053",
  telefoneE164: "+5564984474053",
  whatsappNumero,
  whatsapp: `https://wa.me/${whatsappNumero}`,
  email: "edith.advocacia24@gmail.com",
  base: "Goiás",
  areaAtendida: "Brasil",
  abrangencia,
  atendimento: `Online, por videochamada, ${abrangencia}`,
  horario: {
    texto: "Segunda a sexta, por videochamada",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    // TODO(cliente): confirmar horário de abertura e fechamento (ex.: "08:00" e "18:00")
    abre: "",
    fecha: "",
  },

  // TODO(cliente): links oficiais. Links vazios não são exibidos nem entram no Schema.
  social: {
    instagram: "",
    perfilGoogle: "",
  },

  analytics: {
    provedor: "umami",
    id: "008ea546-8bd2-4184-9d93-da952cf68088",
    script: "https://cloud.umami.is/script.js",
  } as ConfigAnalytics,

  features: {
    // Depende de confirmação da OAB/GO (ver .claude/rules/publicidade-advocacia.md)
    depoimentos: false,
  },

  nav: [
    { label: "Atuação", href: "/#atuacao" },
    { label: "Atendimento", href: "/#atendimento" },
    { label: "Fases", href: "/#fases" },
    { label: "Sobre", href: "/#sobre" },
    { label: "Dúvidas", href: "/#duvidas" },
  ] satisfies LinkNav[],

  institucional: [
    { label: "Áreas de atuação", href: "/#atuacao" },
    { label: "Política de Privacidade", href: "/politica-de-privacidade/" },
    { label: "Termos de uso", href: "/termos-de-uso/" },
  ] satisfies LinkNav[],
} as const
