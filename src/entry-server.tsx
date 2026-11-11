import { renderToString } from 'react-dom/server'
import App from './App'

// Usado só no build (scripts/prerender.mjs): gera o HTML da página para quem lê sem rodar JS
// (buscadores, diretórios que verificam o site). No navegador, main.tsx monta o React por cima.
export function render() {
  return renderToString(<App />)
}
