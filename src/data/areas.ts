import pcd from "@assets/beneficios/aposentadoria-da-pessoa-com-deficiencia.svg"
import idade from "@assets/beneficios/aposentadoria-por-idade.svg"
import invalidez from "@assets/beneficios/aposentadoria-por-invalidez.svg"
import tempo from "@assets/beneficios/aposentadoria-por-tempo-de-contribuicao.svg"
import auxilio from "@assets/beneficios/auxilio-doenca.svg"
import bpc from "@assets/beneficios/bpc-loas.svg"
import pensao from "@assets/beneficios/pensao-por-morte.svg"
import planejamento from "@assets/beneficios/planejamento-previdenciario.svg"
import revisao from "@assets/beneficios/revisao-de-beneficio.svg"
import type { Area } from "@typings/conteudo"

// Ilustrações próprias (src/assets/beneficios), as mesmas das páginas de benefício.
// Ordem da grade: as quatro aposentadorias na primeira linha, os demais benefícios na
// segunda e o planejamento em destaque, em largura total, no fim.
export const areas: Area[] = [
  {
    titulo: "Aposentadoria por idade",
    slugs: ["aposentadoria-por-idade"],
    descricao:
      "Análise dos requisitos de idade e carência a partir do seu histórico de contribuições.",
    imagem: idade,
  },
  {
    titulo: "Aposentadoria por tempo de contribuição",
    slugs: ["aposentadoria-por-tempo-de-contribuicao"],
    descricao:
      "Levantamento do tempo reconhecido e do que ainda pode ser comprovado ou somado.",
    imagem: tempo,
  },
  {
    titulo: "Aposentadoria da pessoa com deficiência",
    slugs: ["aposentadoria-da-pessoa-com-deficiencia"],
    descricao:
      "Verificação dos requisitos específicos e da documentação médica necessária.",
    imagem: pcd,
  },
  {
    titulo: "Aposentadoria por incapacidade permanente",
    slugs: ["aposentadoria-por-invalidez"],
    descricao:
      "Casos em que a incapacidade para o trabalho se mostra definitiva.",
    imagem: invalidez,
  },
  {
    titulo: "Auxílio por incapacidade temporária",
    slugs: ["auxilio-doenca"],
    descricao:
      "O antigo auxílio-doença, incluindo pedidos, prorrogações e recursos de indeferimento.",
    imagem: auxilio,
  },
  {
    titulo: "BPC / LOAS",
    slugs: ["bpc-loas"],
    descricao:
      "Benefício assistencial para idosos e pessoas com deficiência em situação de baixa renda.",
    imagem: bpc,
  },
  {
    titulo: "Pensão por morte e auxílio-acidente",
    slugs: ["pensao-por-morte", "auxilio-acidente"],
    descricao:
      "Pensão para a família de quem faleceu. Para quem ficou com sequela de um acidente, há uma indenização.",
    imagem: pensao,
  },
  {
    titulo: "Revisão de benefício",
    slugs: ["revisao-de-beneficio"],
    descricao:
      "Correção de erros em benefício concedido ou negado, como empregos e salários que ficaram de fora.",
    imagem: revisao,
  },
  {
    titulo: "Planejamento previdenciário",
    slugs: ["planejamento-previdenciario"],
    descricao:
      "Análise do seu histórico antes de pedir a aposentadoria: o que corrigir no CNIS, em quais regras você se encaixa e qual o melhor momento para dar entrada.",
    imagem: planejamento,
    destaque: true,
  },
]
