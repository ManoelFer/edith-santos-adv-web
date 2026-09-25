# Pesquisa: Aposentadoria por tempo de contribuição (regras de transição)

Pesquisa feita em 23/09/2026. Os textos legais foram baixados e lidos na versão compilada do Planalto (sem os trechos riscados). A tabela de conversão do art. 188-P, § 5º, do Decreto 3.048/1999 é uma imagem no Planalto (`D104102.jpg`), e foi aberta e lida. Fatos de recurso e Justiça reaproveitados de `aposentadoria-por-invalidez.md` (já conferidos na mesma data).

URLs usadas:

- EC103 = https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc103.htm (DOU 13/11/2019)
- L8213 = https://www.planalto.gov.br/ccivil_03/leis/l8213cons.htm
- D3048 = https://www.planalto.gov.br/ccivil_03/decreto/d3048.htm
- CONV = https://www.planalto.gov.br/ccivil_03/_Ato2019-2022/2020/Decreto/D104102.jpg (tabela de conversão do art. 188-P, § 5º)
- REGRAS = https://www.gov.br/inss/pt-br/direitos-e-deveres/aposentadorias/regras-de-aposentadorias (atualizada em 28/07/2025; traz os números de 2024)
- SERV = https://www.gov.br/pt-br/servicos/solicitar-aposentadoria-por-tempo-de-contribuicao (última modificação 12/08/2026)
- S272 = https://scon.stj.jus.br/SCON/sumstj/doc.jsp?livre=%22272%22.num.&b=SUMU&p=false&l=10&i=1&operador=E&ordenacao=-@NUM
- L10259 = https://www.planalto.gov.br/ccivil_03/leis/leis_2001/l10259.htm
- L13876 = https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2019/lei/l13876.htm
- SJGO = https://portal.trf1.jus.br/sjgo/

Não consegui abrir as notícias de 2026 do INSS ("Regras de aposentadoria mudam em 2026") e do Ministério da Previdência ("Guia de aposentadoria 2026"): as duas redirecionam para login do gov.br ("Conteúdo Restrito"), por curl e por WebFetch. O resumo do buscador indica 93/103 pontos e 59,5/64,5 anos em 2026, o que bate com as contas abaixo, mas **os números de 2026 foram calculados a partir do texto da EC 103** e conferidos contra a tabela oficial de 2024 do INSS.

## Contas dos números de 2026

**Regra dos pontos (EC 103, art. 15, II e § 1º; D3048 art. 188-I):** base 86 (M) / 96 (H) na data da EC; +1 ponto a cada ano a partir de 01/01/2020.

| Ano | Mulher | Homem |
| --- | --- | --- |
| 2019 | 86 | 96 |
| 2020 | 87 | 97 |
| 2021 | 88 | 98 |
| 2022 | 89 | 99 |
| 2023 | 90 | 100 |
| 2024 | 91 | 101 (confere com REGRAS) |
| 2025 | 92 | 102 |
| **2026** | **93** | **103** |
| 2027 | 94 | 104 |
| 2028 | 95 | 105 (limite dos homens) |
| 2033 | 100 (limite das mulheres) | 105 |

Conta: 2026 − 2019 = 7 acréscimos → 86 + 7 = 93; 96 + 7 = 103. Mulher chega a 100 em 2019 + 14 = 2033; homem a 105 em 2019 + 9 = 2028.

**Regra da idade mínima (EC 103, art. 16, II e § 1º; D3048 art. 188-J):** base 56 (M) / 61 (H); +6 meses por ano a partir de 01/01/2020.

- 2026: 7 acréscimos × 6 meses = 3 anos e 6 meses → 59 anos e 6 meses (M); 64 anos e 6 meses (H).
- Conferência: REGRAS traz 58a6m / 63a6m em 2024 (5 acréscimos) → +1 ano em 2026. Confere.
- Limites: M 62 = 56 + 12 acréscimos → 2031; H 65 = 61 + 8 acréscimos → 2027.

**Professor, pontos (EC 103, art. 15, § 3º; D3048 art. 188-M):** base 81 (M) / 91 (H) + 7 = **88 / 98** em 2026. Conferência: REGRAS traz 86/96 em 2024. Limites: 92 (M) em 2030; 100 (H) em 2028.

**Professor, idade (EC 103, art. 16, § 2º; D3048 art. 188-N):** base 51 (M) / 56 (H) + 3a6m = **54a6m / 59a6m** em 2026. Conferência: REGRAS traz 53a6m / 58a6m em 2024. Limites: 57 (M) em 2031; 60 (H) em 2027.

**Professor, pedágio 100% (EC 103, art. 20, § 1º; D3048 art. 188-O):** 57 − 5 = 52 (M); 60 − 5 = 55 (H); tempo 25 (M) / 30 (H). Fixo, não muda por ano.

**Exemplos de cálculo usados na página:**

- Pontos: mulher com 61 anos + 32 de contribuição = 93 pontos.
- Pedágio 50%: homem com 34 anos em 13/11/2019 → faltava 1 ano → pedágio 6 meses → total 35 anos e 6 meses.
- Pedágio 100%: homem com 32 anos em 13/11/2019 → faltavam 3 → pedágio 3 → total 38 anos (e idade mínima de 60).
- Valor: homem com 35 anos → 60% + (35 − 20) × 2% = 90%; mulher com 30 anos → 60% + (30 − 15) × 2% = 90%.
- Salário mínimo 2026: R$ 1.621,00 (Decreto 12.797/2025, já confirmado em pesquisa anterior).

## Tabela de afirmações

| Afirmação | Base legal/fonte | URL | Confiança |
| --- | --- | --- | --- |
| EC 103 publicada e em vigor em 13/11/2019 (salvo arts. 11, 28 e 32 e regras de RPPS) | EC 103 art. 36, III; DOU 13.11.2019 | EC103 | alta |
| Aposentadoria só por tempo, sem idade mínima, deixou de existir para quem se filiou depois da EC; regra nova: 62 (M) / 65 (H) de idade | EC 103 art. 19, caput (15 anos M / 20 anos H) | EC103, REGRAS | alta |
| Regras de transição valem para filiados ao RGPS até a data da EC | EC 103 arts. 15, 16, 17 e 20 (caput) | EC103 | alta |
| Tempo mínimo 30 (M) / 35 (H) em todas as quatro regras | EC 103 arts. 15, I; 16, I; 17, I; 20, II | EC103 | alta |
| Carência de 180 contribuições | Lei 8.213 art. 25, II; D3048 arts. 188-I a 188-L (inciso "carência") | L8213, D3048 | alta |
| Se cumprir mais de uma regra, pode optar pela melhor | D3048 arts. 188-H a 188-L ("ressalvado o direito de opção") | D3048 | alta |
| INSS analisa a regra de transição mais vantajosa | Página do serviço: "o INSS analisará a possibilidade de aplicar a regra de transição mais vantajosa" | SERV | alta (texto); média (na prática, convém conferir) |
| Pontos: soma de idade e tempo, com frações, apurada em dias | EC 103 art. 15, II e § 2º | EC103 | alta |
| Pontos 2026: 93 (M) / 103 (H); 2027: 94/104; limites 100 (M, 2033) e 105 (H, 2028) | Cálculo sobre EC 103 art. 15, § 1º; conferido com REGRAS (2024 = 91/101) | EC103, REGRAS | alta |
| Idade mínima 2026: 59a6m (M) / 64a6m (H); limites 62 (M, 2031) e 65 (H, 2027) | Cálculo sobre EC 103 art. 16, § 1º; conferido com REGRAS (2024 = 58a6m/63a6m) | EC103, REGRAS | alta |
| Pedágio 50%: só para quem tinha mais de 28 (M) / 33 (H) anos em 13/11/2019; sem idade mínima; pedágio = 50% do que faltava | EC 103 art. 17, caput e II | EC103 | alta |
| Pedágio 50%: média × fator previdenciário (obrigatório, sem a opção dos pontos do art. 29-C) | EC 103 art. 17, parágrafo único; D3048 art. 188-K, §§ 2º e 3º | EC103, D3048 | alta |
| Fator previdenciário usa idade, expectativa de sobrevida (tábua do IBGE) e tempo de contribuição | Lei 8.213 art. 29, §§ 7º e 8º; D3048 art. 188-E, §§ 2º e 3º | L8213, D3048 | alta |
| "Quanto mais jovem, menor tende a ser o fator" | Dedução da fórmula (expectativa de sobrevida maior em idades menores reduz o fator) | L8213, D3048 | alta (dedução direta) |
| Em 2026, pedágio 50% interessa sobretudo a quem parou de contribuir | Dedução: pedágio máximo era 1 ano (M: 2 anos faltando × 50%); quem contribuiu sem parar cumpriu até o fim de 2022 | EC103 | média (dedução) |
| Pedágio 100%: idade 57 (M) / 60 (H), fixa; pedágio = 100% do que faltava | EC 103 art. 20, I e IV | EC103, REGRAS | alta |
| Pedágio 100%: 100% da média | EC 103 art. 26, § 3º, I (remete ao art. 20, § 2º, II); D3048 art. 188-L, § 2º | EC103, D3048 | alta |
| Pontos e idade mínima: 60% + 2 p.p. por ano acima de 20 (H) / 15 (M) | EC 103 art. 26, § 2º, I (remete aos arts. 15, § 4º, e 16, § 3º) e § 5º (mulheres); D3048 art. 188-H, § 3º | EC103, D3048 | alta |
| Média de 100% dos salários desde 07/1994 ou do início das contribuições | EC 103 art. 26, caput | EC103 | alta |
| Média limitada ao teto | EC 103 art. 26, § 1º; Lei 8.213 art. 29, § 2º | EC103, L8213 | alta |
| Piso de um salário mínimo | Lei 8.213 art. 29, § 2º (salário de benefício) e art. 33; CF art. 201, § 2º | L8213 | alta |
| Continuar contribuindo acrescenta 2 p.p. por ano (pontos e idade) | EC 103 art. 26, §§ 2º e 5º | EC103 | alta |
| Contribuição com alíquota reduzida (MEI, plano simplificado) não conta para aposentadoria por tempo, salvo complementação | Lei 8.213 art. 55, § 4º (remete ao art. 21, §§ 2º e 3º, da Lei 8.212); D3048 art. 199-A | L8213, D3048 | alta |
| Tempo especial convertido em comum só até 13/11/2019 | EC 103 art. 25, § 2º; D3048 art. 188-P, § 5º | EC103, D3048 | alta |
| Multiplicadores para atividade de 25 anos: 1,40 (H) e 1,20 (M) (15 anos: 2,33/2,00; 20 anos: 1,75/1,50) | D3048 art. 188-P, § 5º (tabela em imagem) | CONV | alta |
| Prova usual do tempo especial: PPP preenchido pela empresa | Lei 8.213 art. 58, § 1º (formulário emitido pela empresa, com base em laudo técnico) e § 4º (perfil profissiográfico entregue ao trabalhador na rescisão) | L8213 | alta |
| Professor: só educação infantil, fundamental e médio, com tempo exclusivo no magistério; 25 (M) / 30 (H) | EC 103 arts. 15, § 3º; 16, § 2º; 20, § 1º; D3048 arts. 188-M a 188-O | EC103, D3048 | alta |
| Professor 2026: 88/98 pontos (limites 92/100); 54a6m/59a6m; pedágio 100% com 52/55 anos | Cálculos acima; conferido com REGRAS 2024 | EC103, D3048, REGRAS | alta |
| Não há regra de pedágio 50% própria do professor | EC 103 art. 17 não tem parágrafo para professor | EC103 | alta (não citado na página) |
| Direito adquirido: requisitos cumpridos até 13/11/2019 garantem a regra antiga a qualquer tempo | EC 103 art. 3º, caput e § 2º; D3048 art. 188-A, II | EC103, D3048 | alta |
| Direito adquirido: valor calculado na data de 13/11/2019 e reajustado até o pedido | D3048 art. 188-A, § 5º | D3048 | alta |
| Direito adquirido: sem idade mínima; cálculo com 80% maiores salários × fator, com opção de afastar o fator se 86/96 pontos (31/12/2018 a 13/11/2019) ou 85/95 (18/06/2015 a 30/12/2018) | D3048 arts. 188-E, I e § 8º, e 188-F, II; Lei 8.213 art. 29-C | D3048, L8213 | alta (detalhe não levado à página) |
| Trabalho rural anterior a 11/1991 conta como tempo sem contribuição, exceto para carência | Lei 8.213 art. 55, § 2º; D3048 art. 188-G, IV | L8213, D3048 | alta |
| Prova do tempo exige início de prova material da época; testemunha sozinha não basta | Lei 8.213 art. 55, § 3º | L8213 | alta |
| Segurado especial depois de 11/1991 só tem aposentadoria por tempo se contribuir facultativamente | Lei 8.213 art. 39, II; STJ Súmula 272 | L8213, S272 | alta |
| Serviço militar conta, se não usado para inatividade remunerada ou aposentadoria no serviço público | Lei 8.213 art. 55, I; D3048 art. 188-G, I | L8213, D3048 | alta |
| Aluno-aprendiz em escola técnica conta (até 13/11/2019), com remuneração pelo erário, ainda que indireta, e vínculo | D3048 art. 188-G, IX | D3048 | alta (texto); média (ver "Para a Dra. Edith conferir") |
| INSS usa o CNIS; segurado pode pedir inclusão ou correção com documentos | Lei 8.213 art. 29-A, caput e § 2º | L8213 | alta |
| Simular Aposentadoria no Meu INSS | Página do serviço | SERV | alta |
| Pedido: Meu INSS > Do que você precisa? > "Aposentadoria por tempo de contribuição"; 135 de segunda a sábado, 7h às 22h; resposta em Consultar Pedidos | Página do serviço | SERV | alta |
| Documentos oficiais: identificação (RG, CIN, CNH ou CTPS), CPF, procuração ou termo de representação | Página do serviço | SERV | alta |
| Demais documentos (carteiras antigas, carnês, PPP, documentos rurais, reservista, CTC) | Recomendação prática ligada às regras acima; não é lista oficial | — | média |
| "Exigência" como etapa do pedido | Prática administrativa do INSS | — | média |
| Recurso ao CRPS em 30 dias da ciência | D3048 art. 305; Lei 8.213 art. 126 (pesquisa anterior) | D3048, L8213 | alta |
| Justiça Federal; JEF até 60 salários mínimos | CF art. 109, I; Lei 10.259 art. 3º | L10259 | alta |
| Goiás: Seção Judiciária de Goiás / TRF1 | Portal SJGO | SJGO | alta |
| Competência delegada: comarca a mais de 70 km de vara federal | Lei 13.876/2019 art. 3º | L13876 | alta |

## Mudanças recentes

1. **Nenhuma mudança legal nas regras de transição do RGPS até 23/09/2026.** O texto compilado da EC 103 no Planalto não mostra alteração nos arts. 15, 16, 17, 20, 25 e 26. As mudanças de 2026 são só os degraus automáticos: pontos (93/103) e idade (59a6m/64a6m) passaram a valer em 01/01/2026.
2. **Próximos degraus:** em 01/01/2027, pontos 94/104 e idade 60/65. Em 2027 os homens atingem o limite da idade (65); em 2028, o limite dos pontos (105). A página deve ser revista em janeiro de 2027 (campo `revisado`).
3. **Página oficial do INSS desatualizada:** REGRAS (atualizada em 28/07/2025) ainda mostra os números de 2024 e diz, por erro, que o limite dos pontos do professor é 100 (M) / 105 (H). A EC 103, art. 15, § 3º, diz 92 (M) / 100 (H). A página usa o texto da EC.
4. **Decreto 10.410/2020** incluiu no Decreto 3.048 os arts. 188-A a 188-P, que regulamentam as regras de transição e a carência de 180 meses em cada uma.

## Para a Dra. Edith conferir

1. **Números de 2026 vieram de cálculo, não de tabela oficial de 2026.** As notícias oficiais de 2026 (INSS e Ministério) estão atrás de login no gov.br. Os números batem com a tabela oficial de 2024 do INSS somada aos degraus da EC. Confiança alta, mas vale conferir no simulador do Meu INSS.
2. **Pedágio de 50% em 2026.** A página diz que a regra "interessa sobretudo a quem parou de contribuir antes de completar o pedágio". É dedução aritmética. Confirmar se concorda com o enfoque.
3. **Aluno-aprendiz.** O Decreto (art. 188-G, IX) exige remuneração pelo erário, ainda que indireta, e vínculo empregatício. Não abri a súmula 18 da TNU nem o entendimento atual do TCU/TNU sobre o tema. A página usa só o texto do Decreto e omite a exigência de vínculo por simplicidade; avaliar se quer citá-la.
4. **Rural anterior a 11/1991.** A lei fala em "anterior à data de início de vigência desta Lei" e o Decreto em "anterior à competência novembro de 1991". A página usa "anterior a novembro de 1991" na FAQ. Não tratei da discussão sobre idade mínima para o trabalho rural (menor de 12/14 anos), que tem jurisprudência própria.
5. **PPP como prova do tempo especial.** Confirmado no art. 58, §§ 1º e 4º, da Lei 8.213. A página diz que o PPP "costuma ser" a prova, sem detalhar o laudo técnico (LTCAT) nem o enquadramento por categoria profissional antes de 1995, que segue a lei da época (D3048 art. 188-P, § 6º).
6. **Documentos extras** (carteiras antigas, carnês, PPP, documentos rurais, reservista, CTC) são recomendação prática, não lista oficial do INSS.
7. **Reafirmação da DER** (STJ, Tema 995) e **revisão da vida toda** não foram tratadas. Se quiser mencionar a reafirmação (contar contribuições feitas depois do pedido), é preciso conferir no site do STJ.
8. **`relacionados`**: `aposentadoria-por-idade`, `aposentadoria-da-pessoa-com-deficiencia` e `revisao-de-beneficio` ainda não existiam em `src/content/beneficios/` quando esta página foi escrita.
