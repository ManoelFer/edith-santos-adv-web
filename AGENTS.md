# CLAUDE.md

Guia do projeto para o Claude. Todo código gerado ou alterado neste repositório **deve** seguir este arquivo e as regras de `.claude/rules/`.

## Como este guia está organizado

- **Este arquivo:** só o que é específico deste projeto: contexto do cliente, stack, comandos e definição de pronto.
- **`.claude/rules/`:** padrões de projeto, um tema por arquivo, genéricos e reutilizáveis. O Claude Code carrega esses arquivos automaticamente. Outros agentes devem lê-los antes de mexer no assunto correspondente.

### Onde vai cada instrução nova

- **Específico deste projeto fica aqui.** Tudo o que só vale neste repositório ou é dado pessoal do projeto (nome, OAB, domínio, cidade, contatos, cores e fontes da marca, público, decisões do cliente) fica neste arquivo. **Nunca mova isso para `.claude/rules/`.**
- **Padrão reaproveitável vai para `.claude/rules/`.** Como escrever código, organizar arquivos, estilizar, escrever conteúdo e validar entregas vai para lá, sem nenhum dado deste projeto, porque essas regras serão copiadas para projetos futuros.

Passo a passo completo em [`organizacao-do-claude-md.md`](.claude/rules/organizacao-do-claude-md.md).

| Regra                                                                      | Quando se aplica                                                                          |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [`organizacao-do-claude-md.md`](.claude/rules/organizacao-do-claude-md.md) | Ao adicionar ou mudar instruções no `CLAUDE.md` ou em `.claude/rules/`                    |
| [`estrutura-e-nomes.md`](.claude/rules/estrutura-e-nomes.md)               | Ao criar, mover ou renomear arquivos: pastas, nomes, aliases de import                    |
| [`componentes-astro.md`](.claude/rules/componentes-astro.md)               | Componentes, layouts, páginas, `src/data/`, imagens, JS no cliente                        |
| [`content-collections.md`](.claude/rules/content-collections.md)           | Blog, artigos e conteúdo em Markdown                                                      |
| [`tailwind.md`](.claude/rules/tailwind.md)                                 | Estilos: utilitários, tokens no `@theme`, classes dinâmicas                               |
| [`acessibilidade.md`](.claude/rules/acessibilidade.md)                     | Qualquer HTML                                                                             |
| [`seo.md`](.claude/rules/seo.md)                                           | `<head>`, conteúdo, imagens, dados estruturados, sitemap, performance, análise de acessos |
| [`publicidade-advocacia.md`](.claude/rules/publicidade-advocacia.md)       | Todo texto do site, por ser site de advocacia (regras da OAB)                             |

## Contexto do cliente

- **Cliente:** Edith Santos, advogada previdenciária (INSS, aposentadorias, BPC/LOAS, auxílio por incapacidade, pensão por morte).
- **Domínio:** `edithsantos.adv.br`.
- **Schema.org:** `LegalService` (ou `Attorney`) com nome, telefone, área atendida, horário e link do Perfil da Empresa no Google em `sameAs`.
- **Público:** segurados do INSS. Use a linguagem deles ("como me aposentar pelo INSS"), não jargão ("benefício previdenciário").
- **Dados sensíveis:** casos previdenciários envolvem dados de saúde. Formulários nunca pedem laudos, doenças ou CPF.

## Stack

- **Framework:** Astro (versão 5+)
- **Linguagem:** TypeScript (modo `strict`). TS 7 lado a lado com TS 6: `typescript` é alias de `@typescript/typescript6` (só a API, usada pelo typescript-eslint) e o `tsc` vem de `@typescript/native` (TS 7). Remover o alias quando o TS 7.1 trouxer a API e o typescript-eslint suportá-lo. `astro check` não é usado neste projeto.
- **Qualidade:** ESLint (flat config), Prettier (aspas duplas, sem `;`), Husky + lint-staged + commitlint (Conventional Commits), Knip e secretlint. Configurados pela skill global `setup-qualidade`.
- **Estilos:** Tailwind CSS v4 via `@tailwindcss/vite`, configurado em `src/styles/global.css` (`@import "tailwindcss"` + tokens no `@theme`)
- **Idioma do site:** português do Brasil (`<html lang="pt-BR">`)

## Comandos

Gerenciador de pacotes: **yarn**. Não use `npm` nem `npx` neste projeto, e não gere `package-lock.json`. O lockfile é o `yarn.lock`.

```bash
yarn                  # instalar dependências
yarn dev              # servidor local em http://localhost:4321
yarn build            # build de produção em ./dist
yarn preview          # pré-visualizar o build
yarn lint             # ESLint no projeto (yarn lint:fix corrige o que der)
yarn format           # Prettier em tudo (yarn format:check só confere)
yarn typecheck        # tsc --noEmit (TS 7; não cobre arquivos .astro)
yarn knip             # arquivos, exports e dependências não usados
yarn secretlint       # procura tokens e chaves no código
yarn astro add <int>  # adicionar integração (ex.: sitemap, tailwind, react)
yarn add <pacote>     # adicionar dependência
yarn add -D <pacote>  # adicionar dependência de desenvolvimento
```

## Definição de pronto

Antes de dizer que uma tarefa está pronta, rode `yarn lint`, `yarn format:check`, `yarn typecheck`, `yarn knip` e `yarn build`. Todos precisam passar sem erros. Commits seguem Conventional Commits (`feat:`, `fix:`, `chore:`...).
