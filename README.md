# optpaste-site

Site do OptPaste, feito com React + Vite.

```sh
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ para publicar
```

Publicado na Vercel (preset Vite: `npm run build`, saída em `dist/`).

Releases são publicadas pelo `scripts/release.sh` do repositório do app: ele atualiza o `.dmg`, o
`public/appcast.xml` (feed do Sparkle, usado pelo app para se atualizar sozinho) e o `public/latest.json`
(lido por versões até a 1.0.0-beta.2).
O botão de download do site lê o `latest.json`.
