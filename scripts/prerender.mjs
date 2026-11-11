// Coloca o HTML gerado pelo React dentro de <div id="root"> em dist/index.html.
import { readFile, rm, writeFile } from 'node:fs/promises'

const { render } = await import('../dist-ssr/entry-server.js')
const file = new URL('../dist/index.html', import.meta.url)
const html = await readFile(file, 'utf8')
const marker = '<div id="root"></div>'
if (!html.includes(marker)) throw new Error(`${marker} not found in dist/index.html`)
await writeFile(file, html.replace(marker, `<div id="root">${render()}</div>`))
await rm(new URL('../dist-ssr', import.meta.url), { recursive: true, force: true })
console.log('prerendered dist/index.html')
