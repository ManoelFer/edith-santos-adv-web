/**
 * Faz as seções com `data-reveal` aparecerem com um leve deslize ao entrar na
 * tela. É só melhoria progressiva: sem JS, sem IntersectionObserver ou com
 * movimento reduzido, tudo aparece normalmente.
 */
export function iniciarReveal(): void {
  const semMovimento = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches
  if (semMovimento || !("IntersectionObserver" in window)) return

  const alvos = Array.from(
    document.querySelectorAll<HTMLElement>("[data-reveal]"),
  ).filter((el) => el.getBoundingClientRect().top >= window.innerHeight)

  const observer = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (!entrada.isIntersecting) continue
        entrada.target.removeAttribute("data-pending")
        observer.unobserve(entrada.target)
      }
    },
    { rootMargin: "0px 0px -8% 0px" },
  )

  for (const alvo of alvos) {
    alvo.setAttribute("data-pending", "")
    observer.observe(alvo)
  }
}
