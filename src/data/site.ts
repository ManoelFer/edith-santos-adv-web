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
    "Advogada previdenciária com planejamento estratégico para aposentadoria e benefícios do INSS. Atendimento online em todo o Brasil e no exterior.",
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
    texto: "Segunda a sexta, das 8h às 12h e das 14h às 18h",
    dias: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    faixas: [
      { abre: "08:00", fecha: "12:00" },
      { abre: "14:00", fecha: "18:00" },
    ],
  },

  // TODO(cliente): links oficiais. Links vazios não são exibidos nem entram no Schema.
  social: {
    instagram: "",
    perfilGoogle: "https://share.google/lmOc1yPqXP0gMm3ET",
  },

  analytics: {
    provedor: "umami",
    id: "008ea546-8bd2-4184-9d93-da952cf68088",
    script: "https://cloud.umami.is/script.js",
  } as ConfigAnalytics,

  // Google tag (gtag.js) fornecida pelo Google Ads, para medir conversões dos anúncios.
  googleAds: {
    id: "G-NHR49Y9N0V",
    // Tag da conta de anúncios 859-314-3974 (criada em 28/09/2026; a anterior ficou pausada).
    conversaoId: "AW-18480818483",
    // Evento "Contato": formulário enviado, disparado na página /obrigado.
    conversaoContatoId: "AW-18480818483/40lICMXBtIkdELPSq-xE",
  },

  features: {
    // Selo com nota e link para o Google, sem citar comentários. Ligue quando o
    // perfil tiver avaliações reais e `yarn avaliacoes` tiver rodado.
    avaliacoesGoogle: true,
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
