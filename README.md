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

## Licenças

A venda é feita pelo Paddle. As funções em `api/` geram e validam as chaves:

- `POST /api/paddle-webhook`: em `transaction.completed` do preço `PADDLE_PRICE_ID`, gera a chave
  `OPTP-…`, guarda no Upstash Redis e manda por e-mail (Resend). Reembolso ou chargeback aprovado
  revoga a chave.
- `POST /api/license/activate|validate|deactivate`: usados pelo app. Cada chave vale para 3 Macs.

As variáveis de ambiente estão em `.env.example`.
