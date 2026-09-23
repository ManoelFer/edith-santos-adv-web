/**
 * Manifestações espontâneas de pessoas atendidas. Só publique com autorização
 * por escrito de quem escreveu e depois da confirmação da OAB/GO (ver
 * `site.features.depoimentos`). Tire trechos com resultado, valor ou promessa.
 */
export interface Depoimento {
  texto: string
  hora: string
  origem: string
}

export const depoimentos: Depoimento[] = []
