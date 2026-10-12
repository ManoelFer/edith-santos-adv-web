/**
 * Linha do tempo da seção "Como funciona o atendimento": conforme a página
 * rola, a linha dourada preenche até o ponto de cada etapa, o ponto acende e o
 * cartão é "impresso" (título e texto juntos) e permanece depois (global.css,
 * `.linha-tempo`). É só melhoria progressiva: sem JS tudo fica visível; com movimento reduzido, a linha já nasce completa.
 */
// Altura da tela (em fração) em que a linha "pontua" as etapas.
const FOCO = 0.6

const ENTRADA = [
  "motion-safe:animate-resposta",
  "motion-safe:animate-impressao",
]

/** Abre ou fecha a altura do texto da etapa junto com o cartão (sem animação própria). */
function definirAberto(item: HTMLElement, aberto: boolean) {
  item.toggleAttribute("data-aberto", aberto)
}

/** Imprime o cartão inteiro, título e descrição juntos. Depois de impresso, fica. */
function revelar(item: HTMLElement, animar: boolean) {
  if (item.hasAttribute("data-ativo")) return
  item.setAttribute("data-ativo", "")
  const card = item.querySelector<HTMLElement>("[data-etapa-painel]")
  const linha = item.querySelector<HTMLElement>("[data-etapa-linha]")
  if (!card) return
  card.classList.remove(...ENTRADA)
  linha?.classList.remove(...ENTRADA)
  if (!animar) return
  void card.offsetWidth // reinicia a animação
  const [classeCard, classeLinha] = ENTRADA
  card.classList.add(classeCard)
  linha?.classList.add(classeLinha)
}

const limitar = (valor: number, max: number) =>
  Math.min(max, Math.max(0, valor))

export function iniciarLinhaDoTempo(): void {
  const raiz = document.querySelector<HTMLElement>(".linha-tempo")
  if (!raiz) return

  const itens = Array.from(
    raiz.querySelectorAll<HTMLElement>(":scope > ol > li"),
  )
  const pontos = itens.map((item) =>
    item.querySelector<HTMLElement>(".linha-ponto"),
  )
  if (itens.length === 0 || pontos.some((ponto) => !ponto)) return

  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)")
  let quadro = 0
  let primeiro = true
  let maximo = 0 // trecho já percorrido: a linha só enche, nunca esvazia

  function atualizar() {
    quadro = 0
    const base = raiz!.getBoundingClientRect().top
    const centros = pontos.map((ponto) => {
      const caixa = ponto!.getBoundingClientRect()
      return caixa.top + caixa.height / 2 - base
    })
    const topo = centros[0]
    const altura = centros[centros.length - 1] - topo
    const foco = window.innerHeight * FOCO - base

    raiz!.style.setProperty("--topo", `${topo}px`)
    raiz!.style.setProperty("--altura", `${altura}px`)
    maximo = Math.max(maximo, limitar(foco - topo, altura))
    raiz!.style.setProperty(
      "--preenche",
      `${semMovimento.matches ? altura : limitar(maximo, altura)}px`,
    )
    itens.forEach((item, i) => {
      if (semMovimento.matches || centros[i] <= foco) {
        revelar(item, !primeiro && !semMovimento.matches)
        definirAberto(item, true)
      }
    })
    primeiro = false
  }

  const agendar = () => {
    if (!quadro) quadro = requestAnimationFrame(atualizar)
  }

  raiz.setAttribute("data-linha", "")
  window.addEventListener("scroll", agendar, { passive: true })
  window.addEventListener("resize", agendar)
  semMovimento.addEventListener("change", agendar)
  // Abrir ou fechar um cartão muda a altura da lista e move os pontos.
  new ResizeObserver(agendar).observe(raiz)
  atualizar()
}
