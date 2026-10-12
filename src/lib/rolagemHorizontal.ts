/**
 * Rolagem horizontal presa à tela: enquanto a pessoa rola a página para baixo,
 * o trilho de cartões anda para o lado. Só melhoria progressiva:
 *
 * - sem JS, com movimento reduzido ou numa tela baixa demais para o cartão
 *   inteiro caber, o trilho continua sendo uma faixa de cartões que se arrasta
 *   com o dedo (`snap`), com todo o conteúdo visível;
 * - com JS, o palco ganha altura extra, o pino fica `sticky` e um único
 *   listener passivo, limitado a um quadro por `requestAnimationFrame`, só
 *   escreve variáveis CSS (`transform`), sem ler layout a cada rolagem.
 */
export function iniciarRolagemHorizontal(palco: HTMLElement): void {
  const pino = palco.querySelector<HTMLElement>("[data-pino]")
  const trilho = palco.querySelector<HTMLElement>("[data-trilho]")
  const cartoes = Array.from(
    palco.querySelectorAll<HTMLElement>("[data-cartao]"),
  )
  const cabecalho = document.querySelector<HTMLElement>("body > header")
  if (!pino || !trilho || cartoes.length === 0) return

  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)")

  let ativo = false
  let topo = 0
  let alturaPino = 0
  let distancia = 0
  let alcance = 1
  let indice = -1
  let pendente = false

  function desligar() {
    ativo = false
    delete palco.dataset.preso
    palco.style.height = ""
    pino!.style.height = ""
    pino!.style.top = ""
    trilho!.style.removeProperty("--sobre-x")
    palco.style.removeProperty("--sobre-p")
    for (const c of cartoes) c.removeAttribute("data-ativo")
    indice = -1
  }

  function medir() {
    desligar()
    if (semMovimento.matches) return

    topo = cabecalho ? Math.round(cabecalho.getBoundingClientRect().height) : 0
    palco.dataset.preso = ""
    pino!.style.top = `${topo}px`
    pino!.style.height = `calc(100svh - ${topo}px)`

    // Os cartões têm a altura do conteúdo: precisam caber inteiros na tela;
    // senão, volta à faixa de arrastar.
    const cabem = pino!.scrollHeight <= pino!.clientHeight + 1
    distancia = trilho!.scrollWidth - pino!.clientWidth
    if (!cabem || distancia <= 0) return desligar()

    alturaPino = pino!.clientHeight
    alcance = distancia
    palco.style.height = `${alturaPino + alcance}px`
    ativo = true
    atualizar()
  }

  function atualizar() {
    pendente = false
    if (!ativo) return
    const caminhado = topo - palco.getBoundingClientRect().top
    const p = Math.min(1, Math.max(0, caminhado / alcance))
    trilho!.style.setProperty("--sobre-x", `${(-p * distancia).toFixed(1)}px`)
    palco.style.setProperty("--sobre-p", p.toFixed(4))

    const atual = Math.round(p * (cartoes.length - 1))
    if (atual === indice) return
    indice = atual
    cartoes.forEach((c, i) => c.toggleAttribute("data-ativo", i === atual))
  }

  function aoRolar() {
    if (pendente) return
    pendente = true
    requestAnimationFrame(atualizar)
  }

  let redimensionando = 0
  function aoRedimensionar() {
    cancelAnimationFrame(redimensionando)
    redimensionando = requestAnimationFrame(medir)
  }

  window.addEventListener("scroll", aoRolar, { passive: true })
  window.addEventListener("resize", aoRedimensionar)
  semMovimento.addEventListener("change", medir)
  // Fontes e imagens mudam a largura do trilho depois do primeiro cálculo.
  window.addEventListener("load", medir)
  medir()
}
