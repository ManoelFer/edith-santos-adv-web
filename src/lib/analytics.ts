import { registrarConversaoWhatsApp } from "@lib/googleAds"
import type { EventoConversao } from "@typings/analytics"

/** Detalhes do evento (qual benefício, de qual botão veio o clique). */
type Detalhes = Record<string, string>

declare global {
  interface Window {
    umami?: { track: (evento: string, dados?: Detalhes) => void }
    plausible?: (evento: string, opcoes?: { props: Detalhes }) => void
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
export function track(evento: EventoConversao, detalhes?: Detalhes): void {
  window.umami?.track(evento, detalhes)
  window.plausible?.(evento, detalhes && { props: detalhes })
  if (evento === "whatsapp_click") registrarConversaoWhatsApp()
}

/**
 * Dispara o evento de qualquer elemento clicado que tenha `data-event`.
 * `data-origem` e `data-beneficio` entram como detalhes, para saber qual
 * botão de qual página converte.
 */
export function iniciarEventos(): void {
  document.addEventListener("click", (e) => {
    if (!(e.target instanceof Element)) return
    const alvo = e.target.closest<HTMLElement>("[data-event]")
    const evento = alvo?.dataset.event
    if (!alvo || !ehEvento(evento)) return

    const { origem, beneficio } = alvo.dataset
    track(evento, {
      ...(origem && { origem }),
      ...(beneficio && { beneficio }),
    })
  })
}
