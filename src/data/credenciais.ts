import { site } from "@data/site"
import { whatsappUrl } from "@lib/whatsapp"
import type { Credencial } from "@typings/conteudo"

export const credenciais: Credencial[] = [
  {
    titulo: "Meus únicos contatos",
    descricao:
      "Eu só mando mensagem deste WhatsApp e deste e-mail. Se alguém falar com você por outro número ou outro e-mail usando meu nome ou minha foto, não sou eu.",
    links: [
      {
        label: `WhatsApp ${site.telefone}`,
        href: whatsappUrl(),
        evento: "whatsapp_click",
      },
      { label: site.email, href: `mailto:${site.email}` },
    ],
  },
  {
    titulo: "Registro na OAB",
    descricao: `Meu número de inscrição é ${site.oab}. Você mesmo pode conferir no Cadastro Nacional dos Advogados, no site da OAB.`,
    links: [
      {
        label: "Conferir no Cadastro Nacional dos Advogados",
        href: "https://cna.oab.org.br/",
      },
    ],
  },
  {
    titulo: "O que eu não peço",
    descricao:
      "Não peço seus dados bancários: senha do banco, número ou senha do cartão. Se alguém pedir isso usando meu nome, é golpe.",
  },
  {
    titulo: "Sigilo",
    descricao:
      "O que você me conta e os documentos que me envia ficam só entre nós. A lei obriga o advogado a guardar esse sigilo.",
  },
  {
    titulo: "Contrato por escrito",
    descricao:
      "Antes de fazer qualquer coisa no seu caso, a gente assina um contrato. Fica tudo combinado por escrito.",
  },
  {
    titulo: "Seus dados",
    descricao:
      "Uso seus dados só para cuidar do seu caso, como manda a Lei Geral de Proteção de Dados (LGPD).",
  },
  {
    titulo: "Atendimento a distância",
    descricao:
      "A gente conversa por videochamada, com horário marcado. Você não precisa sair de casa nem pegar fila.",
  },
]
