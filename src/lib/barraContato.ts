/**
 * Mostra a barra fixa de contato do celular a partir da segunda seção da
 * página, assim que ela entra na tela (a primeira já traz os botões de
 * contato). Entra e sai com fade (transição no ContactBar). Melhoria
 * progressiva: sem JS ou sem IntersectionObserver a barra fica oculta; o
 * conteúdo continua no HTML, então não afeta o SEO.
 */
export function iniciarBarraContato(): void {
  const barra = document.getElementById("barra-contato")
  const segunda = document.querySelector("main > :nth-child(2)")
  if (!barra || !segunda || !("IntersectionObserver" in window)) return

  const observer = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      // Visível na tela ou já rolada para cima (rolagem rápida, recarga no meio)
      const mostrar =
        entrada.isIntersecting || entrada.boundingClientRect.top < 0
      barra.toggleAttribute("data-visivel", mostrar)
      // `inert` tira a barra oculta do foco do teclado e dos leitores de tela
      barra.toggleAttribute("inert", !mostrar)
    }
  })
  observer.observe(segunda)
}
