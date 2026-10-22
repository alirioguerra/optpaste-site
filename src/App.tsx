import { useEffect } from 'react'
import { Icon, type IconName } from './Icon'
import { PanelDemo } from './PanelDemo'
import { CHECKOUT_HASH, openCheckout } from './paddle'
import { useLatestRelease } from './useLatestRelease'

const icon = `${import.meta.env.BASE_URL}icon-512.png`
const DOWNLOAD_URL = '/downloads/OptPaste.dmg'

const features: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'keyboard',
    title: 'Um atalho, de qualquer app',
    text: 'Aperte ⌥V e o histórico aparece onde você estiver. Prefere outra combinação? Grave a sua em segundos.',
  },
  {
    icon: 'paste',
    title: 'Cola sozinho',
    text: 'Escolha um item e o OptPaste cola direto no app em que você estava. Se preferir, ele só copia.',
  },
  {
    icon: 'pin',
    title: 'Fixe o que importa',
    text: 'Endereços, respostas prontas, trechos de código: itens fixados ficam no topo e sobrevivem ao “Limpar tudo”.',
  },
  {
    icon: 'layers',
    title: 'Texto, imagem e arquivo',
    text: 'Guarda tudo o que passa pela área de transferência, com o ícone do app de origem e a hora da cópia.',
  },
  {
    icon: 'eye',
    title: 'Senhas mascaradas',
    text: 'O que vem de gerenciadores de senha aparece oculto na lista. Ou desligue de vez e não guarde senhas.',
  },
  {
    icon: 'bolt',
    title: 'Leve e discreto',
    text: 'Vive na barra de menus, abre ao iniciar a sessão e guarda de 10 a 200 itens, como você escolher.',
  },
]

const shortcuts: [string[], string][] = [
  [['⌥', 'V'], 'Abrir o histórico'],
  [['↑', '↓'], 'Navegar pelos itens'],
  [['↩'], 'Colar o item selecionado'],
  [['1', '…', '9'], 'Colar direto pela posição'],
  [['P'], 'Fixar ou desafixar'],
  [['⌫'], 'Apagar do histórico'],
  [['esc'], 'Fechar'],
]

export default function App() {
  const release = useLatestRelease()
  const downloadURL = release?.url ?? DOWNLOAD_URL

  // The app's "Comprar licença…" links here.
  useEffect(() => {
    if (window.location.hash === CHECKOUT_HASH) openCheckout()
  }, [])

  const buy = (event: React.MouseEvent) => {
    event.preventDefault()
    openCheckout()
  }

  return (
    <>
      <div className="backdrop" aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#top">
          <img src={icon} alt="" width={28} height={28} />
          OptPaste
        </a>
        <nav>
          <a href="#recursos">Recursos</a>
          <a href="#privacidade">Privacidade</a>
          <a href="#atalhos">Atalhos</a>
        </nav>
        <a className="button small" href={downloadURL}>
          Baixar
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <img className="hero-icon" src={icon} alt="Ícone do OptPaste" width={112} height={112} />
            <span className="pill">
              {release ? `${release.prerelease ? 'Beta' : 'Versão'} ${release.version}` : 'Beta'} · 14 dias grátis
            </span>
            <h1>
              Tudo o que você copia,
              <br />
              <span className="gradient-text">a um atalho de distância.</span>
            </h1>
            <p className="lead">
              O OptPaste guarda o histórico da área de transferência do seu Mac. Copiou algo há dez minutos e já
              sobrescreveu? Aperte <kbd>⌥</kbd>
              <kbd>V</kbd> e cole de novo.
            </p>
            <div className="cta">
              <a className="button" href={downloadURL}>
                <Icon name="apple" /> Baixar para Mac
              </a>
              <a className="button ghost" href={CHECKOUT_HASH} onClick={buy}>
                <Icon name="key" /> Comprar licença
              </a>
            </div>
            <p className="fine">Teste grátis por 14 dias · requer macOS 14 Sonoma ou mais recente</p>
          </div>

          <div className="hero-demo">
            <PanelDemo />
            <p className="demo-hint">
              Experimente aqui: <kbd>↑</kbd>
              <kbd>↓</kbd>, <kbd>P</kbd>, <kbd>⌫</kbd> e <kbd>↩</kbd>
            </p>
          </div>
        </section>

        <section className="section windows">
          <div>
            <h2>
              O <kbd aria-label="Windows"><Icon name="windows" /></kbd> + <kbd>V</kbd> do Windows, agora no Mac.
            </h2>
            <p className="section-lead">
              No Windows, a tecla do Windows + V abre uma janela com os últimos itens copiados, e um clique cola o que
              você escolher. O Mac também guarda um histórico, mas falta esse atalho direto e uma janela feita só para
              isso. O OptPaste traz essa experiência para o Mac, com <kbd>⌥</kbd>
              <kbd>V</kbd> no lugar de <kbd aria-label="Windows"><Icon name="windows" /></kbd> + <kbd>V</kbd>.
            </p>
            <ul className="checks">
              <li>Abre por cima de qualquer app, onde você estiver</li>
              <li>Texto, links, imagens e arquivos no mesmo histórico</li>
              <li>Escolheu o item, ele é colado no app em que você estava</li>
            </ul>
          </div>
          <img
            src="/demo/optpaste-on-mac.jpg"
            alt="Painel do OptPaste aberto sobre o Chrome no macOS, com texto, link e imagem copiados"
            width={1400}
            height={1407}
            loading="lazy"
          />
        </section>

        <section id="recursos" className="section">
          <h2>Feito para quem copia e cola o dia todo.</h2>
          <p className="section-lead">Sem janelas para gerenciar, sem conta, sem configuração. Ele só lembra.</p>
          <div className="grid">
            {features.map((feature) => (
              <article className="card" key={feature.title}>
                <span className="card-icon">
                  <Icon name={feature.icon} size={22} />
                </span>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="privacidade" className="section privacy">
          <div className="privacy-icon">
            <Icon name="lock" size={34} />
          </div>
          <div>
            <h2>Seu histórico não sai do seu Mac.</h2>
            <p className="section-lead">
              Tudo o que o OptPaste grava em disco é criptografado com AES-256-GCM. A chave é gerada no seu Mac e
              fica no seu Keychain. Não há conta, servidor nem telemetria. O app só se conecta à internet para
              conferir se existe uma versão nova e para validar sua licença.
            </p>
            <ul className="checks">
              <li>Criptografia em repouso com chave no Keychain</li>
              <li>Senhas ocultas na lista, ou nem guardadas</li>
            </ul>
          </div>
        </section>

        <section id="atalhos" className="section">
          <h2>Mãos no teclado.</h2>
          <p className="section-lead">Abra, encontre e cole sem tocar no mouse.</p>
          <dl className="shortcuts">
            {shortcuts.map(([keys, label]) => (
              <div key={label}>
                <dt>
                  {keys.map((key) => (key === '…' ? <span key={key}>…</span> : <kbd key={key}>{key}</kbd>))}
                </dt>
                <dd>{label}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="section final">
          <img src={icon} alt="" width={88} height={88} />
          <h2>Pare de perder o que você copiou.</h2>
          <div className="cta">
            <a className="button" href={downloadURL}>
              <Icon name="download" /> Baixar o OptPaste
            </a>
            <a className="button ghost" href={CHECKOUT_HASH} onClick={buy}>
              <Icon name="key" /> Comprar licença
            </a>
          </div>
          <p className="fine">
            {release ? `Versão ${release.version} · ` : ''}14 dias grátis · macOS 14+
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Alirio Guerra</span>
      </footer>
    </>
  )
}
