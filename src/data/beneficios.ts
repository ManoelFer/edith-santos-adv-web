import type { Opcao } from "@typings/conteudo"

/** Opções do campo "Sobre qual benefício você quer falar" do formulário. */
export const beneficios: Opcao[] = [
  { valor: "idade", rotulo: "Aposentadoria por idade" },
  { valor: "tempo", rotulo: "Aposentadoria por tempo de contribuição" },
  { valor: "pcd", rotulo: "Aposentadoria da pessoa com deficiência" },
  { valor: "bpc", rotulo: "BPC / LOAS" },
  {
    valor: "incapacidade-temporaria",
    rotulo: "Auxílio por incapacidade temporária",
  },
  {
    valor: "incapacidade-permanente",
    rotulo: "Aposentadoria por incapacidade permanente",
  },
  { valor: "pensao", rotulo: "Pensão por morte" },
  { valor: "acidente", rotulo: "Auxílio-acidente" },
  { valor: "revisao", rotulo: "Revisão de benefício" },
  { valor: "planejamento", rotulo: "Planejamento previdenciário" },
  { valor: "nao-sei", rotulo: "Não sei dizer ainda" },
]
