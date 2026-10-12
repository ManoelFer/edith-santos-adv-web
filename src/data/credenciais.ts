import { site } from "@data/site"
import { whatsappUrl } from "@lib/whatsapp"
import type { Credencial } from "@typings/conteudo"

export const confiancaIntro = {
  eyebrow: "Confiança e segurança",
  /** O número vem do tamanho da lista (gatilho de lista numerada). */
  titulo: "dicas para não cair em golpe de falso advogado",
  texto:
    "Golpistas usam o nome de advogados para enganar quem espera um benefício. Veja uma por vez, e garanta que é comigo que está falando.",
}

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
    titulo: "Contrato por escrito",
    descricao:
      "Antes de fazer qualquer coisa no seu caso, a gente assina um contrato. Fica tudo combinado por escrito. Quem pede para começar sem nada assinado não é de confiança.",
  },
  {
    titulo: "O que eu não peço",
    descricao:
      "Não peço senha do banco, número ou senha do cartão, nem o código que chega por SMS ou WhatsApp. Também não peço Pix para “liberar” benefício. Se alguém pedir isso usando meu nome, é golpe.",
  },
  {
    titulo: "Cuidado com links e arquivos",
    descricao:
      "Não clique em link nem baixe arquivo que chegou de número desconhecido, mesmo que fale do seu benefício. Para consultar o seu pedido, entre você mesmo no Meu INSS ou ligue para a central 135.",
    links: [
      {
        label: "Abrir o Meu INSS (site oficial)",
        href: "https://meu.inss.gov.br/",
      },
    ],
  },
  {
    titulo: "Sigilo e seus dados",
    descricao:
      "O que você me conta e os documentos que me envia ficam só entre nós: a lei obriga o advogado a guardar esse sigilo. Uso seus dados só para cuidar do seu caso, como manda a Lei Geral de Proteção de Dados (LGPD).",
  },
  {
    titulo: "Atendimento a distância",
    descricao:
      "A gente conversa por videochamada, com horário marcado, tudo no conforto da sua casa. Assim você me vê e me ouve antes de enviar qualquer documento.",
  },
  {
    titulo: "Golpista sempre tem pressa",
    descricao:
      "Quem aplica o golpe diz que o benefício vai ser cortado, que o prazo acaba hoje ou que é preciso fazer um Pix para liberar um valor. Se sentir essa pressa, pare e me chame por um dos contatos da primeira dica. Nunca envie documentos, dados pessoais ou dinheiro antes de ter certeza de que está falando com a pessoa certa.",
    alerta: true,
  },
]
