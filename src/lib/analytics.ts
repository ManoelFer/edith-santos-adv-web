import type { EventoConversao } from "@typings/analytics"

declare global {
  interface Window {
    umami?: { track: (evento: string) => void }
    plausible?: (evento: string) => void
  }
}

const eventos: readonly EventoConversao[] = [
  "whatsapp_click",
  "phone_click",
  "form_submit",
]

function ehEvento(valor: string | undefined): valor is EventoConversao {
  return eventos.some((evento) => evento === valor)
}

/** Registra uma conversão no provedor configurado em `site.analytics`. */
export function track(evento: EventoConversao): void {
  window.umami?.track(evento)
  window.plausible?.(evento)
}

/** Dispara o evento de qualquer elemento clicado que tenha `data-event`. */
export function iniciarEventos(): void {
  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return
    const alvo = e.target.closest<HTMLElement>("[data-event]")
    const evento = alvo?.dataset.event
    if (ehEvento(evento)) track(evento)
  })
}
