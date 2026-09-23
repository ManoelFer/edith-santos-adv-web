const formato = new Intl.DateTimeFormat("pt-BR", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
})

/** Ex.: "23 de setembro de 2026". */
export function formatarData(data: Date): string {
  return formato.format(data)
}
