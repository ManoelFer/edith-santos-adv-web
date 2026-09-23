import { site } from "@data/site"
import type { Topico } from "@typings/conteudo"

export const credenciais: Topico[] = [
  {
    titulo: "Inscrição na OAB",
    descricao: `${site.oab}. Você pode conferir o registro no Cadastro Nacional dos Advogados, no site do Conselho Federal.`,
  },
  {
    titulo: "Sigilo profissional",
    descricao:
      "Tudo o que você conta e envia está protegido por sigilo profissional, dever previsto no Estatuto da Advocacia.",
  },
  {
    titulo: "Contrato por escrito",
    descricao:
      "A prestação de serviço é formalizada em contrato escrito antes de qualquer providência no seu caso.",
  },
  {
    titulo: "Dados e LGPD",
    descricao:
      "Seus dados são usados apenas para a análise e o acompanhamento do caso, conforme a Lei Geral de Proteção de Dados.",
  },
  {
    titulo: "Atendimento remoto",
    descricao:
      "Videochamada com horário marcado, para que você não precise se deslocar nem enfrentar fila.",
  },
  {
    titulo: "Canais oficiais",
    descricao:
      "Confira sempre o número e o e-mail listados no rodapé deste site. Eu nunca peço senha, código do Meu INSS ou dados bancários por mensagem.",
  },
]
