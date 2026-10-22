# optpaste-site

Site do OptPaste, feito com React + Vite.

```sh
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/ para publicar
```

Publicado na Vercel (preset Vite: `npm run build`, saída em `dist/`).

A cada release, atualize `public/latest.json` (versão, se é beta e link do `.dmg`).
O botão de download do site e a checagem de atualização do app leem esse arquivo.
