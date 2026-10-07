import { CHAVE_CONSENTIMENTO } from "@lib/cookies"

/**
 * Script inline do aviso de cookies: roda antes da primeira pintura e tira o
 * aviso de quem já escolheu, sem a página "pular". O Astro não calcula o hash
 * de script `is:inline`, então o `astro.config.mjs` importa este texto e
 * libera exatamente ele na CSP (qualquer mudança aqui muda o hash junto).
 */
export const scriptAvisoCookies = `try{if(localStorage.getItem("${CHAVE_CONSENTIMENTO}"))document.getElementById("aviso-cookies").remove()}catch(e){}`
