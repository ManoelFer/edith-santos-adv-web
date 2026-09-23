import type { Etapa } from "@typings/conteudo"

export const fases: Etapa[] = [
  {
    numero: "01",
    titulo: "Requerimento",
    descricao:
      "O pedido é apresentado ao INSS pelo Meu INSS, pela central 135 ou com atendimento agendado.",
  },
  {
    numero: "02",
    titulo: "Análise administrativa",
    descricao:
      "O servidor confere dados cadastrais, tempo de contribuição e documentos anexados ao pedido.",
  },
  {
    numero: "03",
    titulo: "Exigência de documentos",
    descricao:
      "O INSS pode abrir prazo para complementar o que faltou. Perder esse prazo costuma gerar indeferimento.",
  },
  {
    numero: "04",
    titulo: "Perícia médica",
    descricao:
      "Nos benefícios por incapacidade, há avaliação médica e, em alguns casos, avaliação social.",
  },
  {
    numero: "05",
    titulo: "Decisão",
    descricao:
      "O resultado aparece na carta de concessão ou de indeferimento, com o motivo registrado em código.",
  },
  {
    numero: "06",
    titulo: "Recurso à Junta de Recursos",
    descricao:
      "Cabível contra o indeferimento, no prazo legal, dentro do Conselho de Recursos da Previdência Social.",
  },
  {
    numero: "07",
    titulo: "Câmara de Julgamento",
    descricao:
      "Segunda instância administrativa, quando ainda houver matéria a ser revista.",
  },
  {
    numero: "08",
    titulo: "Via judicial",
    descricao:
      "Esgotada ou dispensada a via administrativa, o pedido pode ser levado ao Judiciário.",
  },
  {
    numero: "09",
    titulo: "Perícia e sentença",
    descricao:
      "No processo judicial há perícia por profissional nomeado pelo juízo e, ao final, a sentença.",
  },
]
