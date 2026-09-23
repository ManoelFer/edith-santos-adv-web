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

export const site = {
  name: "Edith Santos",
  nomeCompleto: "Edith Silva de Almeida Santos",
  profissao: "Advogada",
  url: "https://edithsantos.adv.br",
  description:
    "Advogada previdenciária com atendimento online em todo o Brasil. Pedidos, recursos e revisões de aposentadoria, BPC/LOAS e auxílios do INSS.",
  oab: "OAB/GO nº 73.463",
  area: "Direito Previdenciário",

  // NAP: mesmo formato do Perfil da Empresa no Google e das redes
  telefone: "(64) 98447-4053",
  telefoneE164: "+5564984474053",
  whatsappNumero,
  whatsapp: `https://wa.me/${whatsappNumero}`,
  email: "edith2016if@gmail.com",
  base: "Goiás",
  areaAtendida: "Brasil",
  atendimento: "Online, por videochamada, para todo o Brasil",
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

  // TODO(cliente): escolher entre Umami e Plausible e preencher o ID
  analytics: {
    provedor: null,
    id: "",
    script: "",
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
