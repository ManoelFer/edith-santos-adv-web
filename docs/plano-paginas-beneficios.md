# Plano: páginas de benefício ("Saiba mais")

> **Status (23/09/2026):** todas as áreas de atuação têm página (10 páginas em rascunho, aguardando a validação da Dra. Edith em `docs/validacao-paginas-beneficios.md`), além da página `/beneficios/`. O planejamento previdenciário tem página própria e card de destaque na Home. Autoavaliação e artigos de Orientações ligados aos pilares continuam pendentes.

Objetivo: quem busca "aposentadoria por invalidez", "BPC LOAS", "pensão por morte INSS" (e os outros benefícios que a Dra. Edith atende) encontrar o site no Google e chegar ao contato. Hoje só a Home disputa essas buscas, e uma página só não consegue ranquear para oito temas diferentes.

A ideia do "Saiba mais" é o caminho certo. Este plano transforma cada card de **Áreas de atuação** numa porta de entrada para uma página própria, feita para responder a dúvida de quem chega pelo Google e levar ao contato sem vender nada (Provimento 205/2021).

---

## 1. Arquitetura

```
/                                  Home (Atuação: cards viram links "Saiba mais")
/beneficios/                       Hub: "Qual benefício é o seu?" (por situação de vida)
/beneficios/aposentadoria-por-invalidez/
/beneficios/bpc-loas/
/beneficios/pensao-por-morte/
/beneficios/auxilio-doenca/
/beneficios/aposentadoria-por-idade/
/beneficios/aposentadoria-por-tempo-de-contribuicao/
/beneficios/aposentadoria-da-pessoa-com-deficiencia/
/beneficios/auxilio-acidente/
/beneficios/revisao-de-beneficio/
/orientacoes/<artigo>/             Artigos de cauda longa que apontam para as páginas acima
```

**Decisões:**

- **URL com o nome que o público usa, não o nome oficial.** O povo ainda busca "aposentadoria por invalidez" e "auxílio-doença", não "incapacidade permanente/temporária". A URL, o `<title>` e o `<h1>` usam o termo popular; o texto explica logo no início o nome novo (e assim a página também ranqueia pelo termo oficial).
- **Uma página por intenção de busca** (regra do `seo.md`). Hoje "Pensão por morte e auxílio-acidente" é um card só; vira duas páginas, porque são buscas diferentes.
- **Hub `/beneficios/`** dá a hierarquia (breadcrumb Início › Benefícios › BPC/LOAS) e recebe o link do menu. Pode ser adiada para a onda 2 se a Home fizer esse papel no começo.
- **Cluster de conteúdo:** cada página de benefício é o "pilar"; artigos de Orientações respondem dúvidas específicas ("BPC para autista", "pensão por morte para companheira sem casamento", "perícia negada: o que fazer") e sempre linkam de volta para o pilar.

### Ondas

| Onda | Páginas                                                                                           | Por quê                                                     |
| ---- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| 1    | Aposentadoria por invalidez, BPC/LOAS, Pensão por morte, Auxílio-doença                           | Maior volume de busca e casos mais urgentes (renda parada)  |
| 2    | Hub `/beneficios/`, Aposentadoria por idade, Tempo de contribuição, Pessoa com deficiência        | Completa a árvore e o menu                                  |
| 3    | Auxílio-acidente, Revisão de benefício, primeiros artigos de Orientações para cada pilar          | Cauda longa e links internos                                |

Antes de escrever cada página, conferir os termos no Planejador de Palavras-chave do Google e, depois do lançamento, no Search Console (aba Consultas). Este plano não inventa volumes de busca.

---

## 2. Anatomia da página de benefício

Referências de UX: o padrão **"Step by step navigation"** e o **"Check a service is suitable"** do GOV.UK Design System (serviço público explicado para leigos, com ordem clara de passos), e o padrão das melhores páginas de área de atuação de escritórios em 2026: responder "estou no lugar certo?" acima da dobra, texto sem jargão, CTA sempre à vista sem atrapalhar a leitura, autor identificado (E-E-A-T para conteúdo YMYL).

Esqueleto no celular (mobile first; no desktop o índice vira coluna fixa à direita):

```
┌──────────────────────────────────────┐
│ Início › Benefícios › BPC/LOAS       │  Breadcrumb (BreadcrumbList)
│                                      │
│ BENEFÍCIO ASSISTENCIAL               │  Eyebrow (dourado, tracking-eyebrow)
│ BPC/LOAS: quem tem direito           │  H1 em Instrument Serif
│ e como pedir                         │
│                                      │
│ ┃ Em resumo                          │  Caixa "resposta direta" (bg-surface,
│ ┃ O BPC paga um salário mínimo por   │  borda esquerda dourada). 40–60 palavras
│ ┃ mês a idosos a partir de 65 anos e │  que respondem a busca: vira candidato a
│ ┃ a pessoas com deficiência de baixa │  trecho em destaque e resposta de IA.
│ ┃ renda. Não exige contribuição...   │
│                                      │
│ Por Dra. Edith Santos · OAB/GO …     │  Linha de autoria + "Revisado em set/2026"
│                                      │
│ [ Falar sobre o meu caso  ➜ ]        │  CTA primário: WhatsApp com mensagem
│                                      │  "…quero uma análise sobre BPC/LOAS"
│ ▸ Nesta página                       │  Índice em <details> no celular
├──────────────────────────────────────┤
│ Quem tem direito                     │  Cards com ✓ (requisitos em linguagem
│ ✓ Tem 65 anos ou mais, ou…           │  simples, 1 ideia por linha)
│ ✓ Renda por pessoa da família…       │
│                                      │
│ ┌ Confira se o seu caso se parece ┐  │  Autoavaliação leve (onda 2), ver §3
│ └ com os de quem tem direito ────┘   │
├──────────────────────────────────────┤
│ Passo a passo                        │  Linha do tempo numerada (NumberBadge,
│ ① Separe os documentos               │  mesmo visual de Fases). GOV.UK step
│ ② Faça o pedido no Meu INSS          │  by step: cada passo abre um detalhe.
│ ③ Avaliação social e perícia         │
│ ④ Resposta do INSS                   │
│ ⑤ Se negar: recurso ou Justiça       │
├──────────────────────────────────────┤
│ Documentos para separar              │  Checklist + botão "Compartilhar a lista
│ ☐ Documento com foto e CPF           │  pelo WhatsApp" (ver §3)
│ ☐ CadÚnico atualizado …              │
├──────────────────────────────────────┤
│ Quando o INSS nega                   │  Motivos comuns de negativa e o que dá
│ "Renda acima do limite" → …          │  para fazer. Liga com "Situações" da Home
├──────────────────────────────────────┤
│ Perguntas frequentes                 │  Acordeão (Faq reutilizado com props)
├──────────────────────────────────────┤
│ [foto] Edith Santos                  │  AuthorCard + fontes oficiais (gov.br/inss,
│ Advogada · OAB/GO nº 73.463          │  Lei 8.742/93, Lei 8.213/91) + data de
│ Fontes · Última revisão              │  revisão
├──────────────────────────────────────┤
│ Benefícios relacionados              │  2–3 cards: Aposentadoria da PcD,
│ → Aposentadoria da pessoa com defic. │  Auxílio-doença… (links internos)
├──────────────────────────────────────┤
│ Entre em contato para agendar uma    │  Formulário com o benefício já marcado
│ análise do seu caso                  │  (?beneficio=bpc)
└──────────────────────────────────────┘
  [ WhatsApp ]  [ Ligar ]                 ContactBar fixa já existente
```

### Design system

Nada novo de marca: fundo `page`/`page-alt` alternando seções, `Card variant="gradient"`, títulos em `font-serif`, dourado `primary` só em números de passo, ✓, eyebrow e CTA. Componentes a reaproveitar: `Section`, `SectionHeading`, `Eyebrow`, `Card`, `NumberBadge`, `DashList`, `InfoList`, `AuthorCard`, `Prose`, `Button`, `Faq`, `FormularioContato`.

Novos componentes (todos pequenos, em `common/` ou `sections/`):

| Componente                    | Pasta       | Papel                                                                 |
| ----------------------------- | ----------- | --------------------------------------------------------------------- |
| `Breadcrumb.astro`            | `common/`   | Trilha visível + dados do `BreadcrumbList`                            |
| `EmResumo.astro`              | `common/`   | Caixa de resposta direta com borda dourada                            |
| `IndicePagina.astro`          | `common/`   | `<details>` no celular, `<nav>` fixa (`lg:sticky`) no desktop         |
| `Checklist.astro`             | `common/`   | Lista com ✓ ou ☐, usada em "Quem tem direito" e "Documentos"          |
| `NomeAntigo.astro`            | `common/`   | Selo "Antes chamado de aposentadoria por invalidez"                   |
| `PassoAPasso.astro`           | `sections/` | Linha do tempo numerada com `<details>` por passo                     |
| `BeneficioHero.astro`         | `sections/` | Breadcrumb, eyebrow, H1, Em resumo, autoria e CTA                     |
| `BeneficiosRelacionados.astro`| `sections/` | Cards de links internos                                               |
| `BeneficioLayout.astro`       | `layouts/`  | Monta a página a partir da entrada da collection                      |

---

## 3. Ideias que diferenciam (sem ferir OAB nem LGPD)

1. **"Nome antigo, nome novo".** Selo logo abaixo do H1: _"Desde 2019, a aposentadoria por invalidez se chama aposentadoria por incapacidade permanente."_ Resolve a confusão do segurado e faz a página ranquear pelos dois termos.
2. **Autoavaliação "Seu caso se parece com os de quem tem direito?"** (onda 2). Três ou quatro perguntas sim/não em HTML (`<fieldset>` + rádio), respondidas só no navegador: **nada é enviado nem guardado**, e as perguntas não pedem doença nem renda exata. O resultado nunca diz "você tem direito" (seria promessa de resultado); diz algo como _"Pelas suas respostas, vale conversar com uma advogada para analisar os detalhes"_ ou _"Alguns requisitos parecem não se encaixar agora; ainda assim, cada caso tem particularidades"_. Padrão "Check a service is suitable" do GOV.UK. Evento Umami só de conclusão (`autoavaliacao_concluida`), sem as respostas.
3. **"Compartilhar a lista pelo WhatsApp".** Botão que abre `https://wa.me/?text=<lista de documentos>`: a pessoa escolhe o próprio contato e guarda a lista no celular. Útil de verdade, zero dado coletado. Alternativa: botão "Imprimir lista" com CSS de impressão.
4. **CTA com contexto.** O WhatsApp e o formulário já saem com o benefício preenchido (`whatsappUrl("…análise sobre BPC/LOAS")` e `?beneficio=bpc` pré-selecionando o `<select>`). A advogada já sabe o assunto na primeira mensagem.
5. **Hub "Qual benefício é o seu?"** organizado por situação de vida, não por nome técnico: _Estou doente e não consigo trabalhar_ · _Cheguei à idade_ · _Perdi alguém da família_ · _Tenho deficiência ou baixa renda_ · _Já recebo e acho que está errado_. Cada situação leva aos benefícios dela. Só HTML e âncoras, sem JS.
6. **"Revisado em" visível** + fontes oficiais linkadas. Para conteúdo que depende de lei, isso é o que o Google chama de confiança (E-E-A-T em YMYL) e também protege a advogada quando a regra muda.

---

## 4. Mudanças na Home e na navegação

- **Cards de Atuação viram links.** Padrão "card clicável": o link fica no `<h3>` e um `::after` (`after:absolute after:inset-0`) estende o clique para o card inteiro, com um "Saiba mais →" visível no rodapé do card (não depende de `hover:`, alvo ≥ 44px, `focus-visible` no card).
- **Texto do link nunca pode ser só "Saiba mais".** O Lighthouse (auditoria _link-text_) e o nosso `yarn seo` reprovam texto genérico. Use `Saiba mais<span class="sr-only"> sobre BPC/LOAS</span>`, ou o próprio título do benefício como texto do link.
- **Menu:** "Benefícios" apontando para `/beneficios/` (onda 2; na onda 1 o menu segue com âncoras).
- **Rodapé:** lista de benefícios com links. Link interno em todas as páginas, sem página órfã.
- **`src/data/areas.ts`** ganha `slug` e `href`, fonte única para cards, rodapé, hub e "relacionados".

---

## 5. Conteúdo e modelo de dados

Collection nova `beneficios` em `src/content.config.ts` (Markdown, um arquivo por benefício), no mesmo padrão de `orientacoes`:

```ts
const beneficios = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/beneficios" }),
  schema: z.object({
    title: z.string().max(45), // + " | Edith Santos" ≤ 60
    description: z.string().min(120).max(155),
    h1: z.string(),
    eyebrow: z.string(),
    nomeOficial: z.string().optional(), // selo "nome antigo, nome novo"
    resumo: z.string(), // caixa "Em resumo", 40–60 palavras
    beneficio: z.string(), // valor do <select> do formulário
    requisitos: z.array(z.string()),
    passos: z.array(z.object({ titulo: z.string(), texto: z.string() })),
    documentos: z.array(z.string()),
    faq: z.array(z.object({ pergunta: z.string(), resposta: z.string() })),
    fontes: z.array(z.object({ rotulo: z.string(), url: z.string().url() })),
    relacionados: z.array(z.string()), // slugs
    revisado: z.coerce.date(),
    draft: z.boolean().default(false),
  }),
})
```

O corpo do Markdown guarda as seções de texto corrido ("Quando o INSS nega", explicações). Os campos estruturados alimentam os componentes e o Schema, e o FAQ do Schema sai exatamente do mesmo texto visível.

**Fórmula de `<title>`** (≤ 60 com " | Edith Santos"):

| Página                     | `<title>`                                                  |
| -------------------------- | ---------------------------------------------------------- |
| Aposentadoria por invalidez | Aposentadoria por invalidez: quem tem direito \| Edith Santos |
| BPC/LOAS                   | BPC/LOAS: quem tem direito e como pedir \| Edith Santos     |
| Pensão por morte           | Pensão por morte do INSS: quem tem direito \| Edith Santos  |
| Auxílio-doença             | Auxílio-doença: como pedir e se o INSS negar \| Edith Santos |

**Escrita** (regras de `seo.md` e `publicidade-advocacia.md`):

- Responder a pergunta nas primeiras linhas; aprofundar depois.
- Linguagem do segurado ("o INSS negou", "a perícia"), sem jargão.
- Proibido: prometer resultado, citar honorários, "consulta grátis", casos identificáveis.
- Valores e prazos oficiais (salário mínimo, 30 dias de recurso, idade mínima) são informação pública e podem aparecer, sempre com data de revisão, porque mudam.
- Rascunho gerado por IA é só rascunho: a Dra. Edith revisa, acrescenta a experiência dela (o que mais vê dar errado nos pedidos) e aprova cada página antes de publicar.

---

## 6. Dados estruturados por página

Em `src/lib/schema.ts`, novas funções:

- `breadcrumbSchema(itens)`: `BreadcrumbList`.
- `beneficioSchema(pagina)`: `WebPage` com `about` (o benefício), `lastReviewed`, `reviewedBy` (a advogada, `Person` com `identifier` da OAB) e `mainEntity` = `Service` (`serviceType`, `areaServed`, `provider: { "@id": ".../#negocio" }`).
- `faqPageSchema` (já existe) com o FAQ da página. O Google quase não mostra FAQ expandido nos resultados desde 2023, mas o bloco ajuda buscadores e respostas de IA a entender a página.

Validar cada tipo no Teste de pesquisa aprimorada (manual).

---

## 7. Qualidade e medição

- **Pipeline:** `yarn seo` e o Lighthouse CI já cobrem título, description, canonical, sitemap, h1 e ordem de títulos, imagens, links quebrados, âncoras, páginas órfãs, texto de link genérico e Core Web Vitals no celular. Toda página nova passa por eles automaticamente.
- **Conversão por página:** os eventos `whatsapp_click` e `form_submit` ganham a propriedade do benefício (`data-umami-event-beneficio="bpc"`), para o Umami mostrar qual página gera contato.
- **Search Console:** após publicar, pedir indexação de cada URL e acompanhar impressões e cliques por consulta. Expectativa realista: 3 a 6 meses para posicionar termos concorridos; artigos de cauda longa costumam trazer visitas antes.
- **Revisão periódica:** a cada mudança de regra do INSS (ou pelo menos a cada 6 meses), atualizar `revisado` e o texto.

---

## 8. Ordem de implementação

1. `areas.ts` com `slug`/`href`; collection `beneficios` e schema; funções de Schema.
2. Componentes novos (`Breadcrumb`, `EmResumo`, `Checklist`, `PassoAPasso`, `IndicePagina`, `NomeAntigo`, `BeneficioHero`, `BeneficiosRelacionados`) e `BeneficioLayout`.
3. Rota `src/pages/beneficios/[slug].astro`; pré-seleção do benefício no formulário e mensagem de WhatsApp por benefício.
4. Cards de Atuação clicáveis e links no rodapé.
5. Conteúdo da onda 1 (4 páginas), revisado pela advogada, como `draft: true` até a aprovação.
6. `yarn seo`, Lighthouse, conferência em 320/375/768/1280 px, Teste de pesquisa aprimorada.
7. Onda 2: hub `/beneficios/`, item de menu, autoavaliação, botão "mandar lista para o WhatsApp".
8. Onda 3: páginas restantes e artigos de Orientações ligados aos pilares.

## Referências

- GOV.UK Design System: [Step by step navigation](https://design-system.service.gov.uk/patterns/step-by-step-navigation) e [Check a service is suitable](https://design-system.service.gov.uk/patterns/check-a-service-is-suitable)
- [50+ Best Practice Area Pages for Law Firms (2026)](https://www.paperstreet.com/blog/50-best-practice-area-pages-for-law-firms-get-creative/)
- [Law Firm Website Design Guide for 2026](https://www.websites.law/law-firm-website-design-guide-for-2026/)
- [E-E-A-T and YMYL for Lawyers (2026)](https://rankings.io/blog/eeat-ymyl-for-lawyers/)
- [EEAT Legal Content: what law firms need to demonstrate](https://www.lexiconlegalcontent.com/eeat-legal-content/)
