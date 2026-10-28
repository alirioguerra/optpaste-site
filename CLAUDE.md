# optpaste-site

Site do OptPaste (React + Vite), publicado no Cloudflare Pages (projeto `optpaste`, https://optpaste.pages.dev).

## Commits

- Assim que cada unidade de trabalho (feat, fix, chore, refactor) estiver concluída, **commite, faça push** para a `main` e publique com `npm run deploy` sem pedir confirmação. O push não publica: o projeto é de upload direto. A credencial fica em `~/.dev/cloudflare.env` (`set -a; source ~/.dev/cloudflare.env; set +a` antes).
- Antes de commitar, o projeto precisa compilar sem erros: `npm run build`.
- Um commit por mudança lógica. Não misture uma feature com um fix sem relação.
- Mensagens no padrão Conventional Commits, em inglês, como no histórico: `feat: ...`, `fix: ...`, `chore: ...`, `refactor: ...`.
- Commite só os arquivos da mudança.

## Textos

- O site tem português e inglês. Todo texto visível fica em `src/i18n.tsx`, nas duas línguas.
