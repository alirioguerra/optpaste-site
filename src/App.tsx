import { Icon, type IconName } from './Icon'
import { PanelDemo } from './PanelDemo'
import { RELEASES_URL, REPO_URL, useLatestRelease } from './useLatestRelease'

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
  const downloadURL = release?.downloadURL ?? RELEASES_URL

  return (
    <>
      <div className="backdrop" aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#top">
          <img src="/icon-512.png" alt="" width={28} height={28} />
          OptPaste
        </a>
        <nav>
          <a href="#recursos">Recursos</a>
          <a href="#privacidade">Privacidade</a>
          <a href="#atalhos">Atalhos</a>
          <a href={REPO_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Icon name="github" />
          </a>
        </nav>
        <a className="button small" href={downloadURL}>
          Baixar
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <img className="hero-icon" src="/icon-512.png" alt="Ícone do OptPaste" width={112} height={112} />
            <span className="pill">
              {release ? `${release.prerelease ? 'Beta' : 'Versão'} ${release.version}` : 'Beta'} · grátis e open source
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
              <a className="button ghost" href={REPO_URL} target="_blank" rel="noreferrer">
                <Icon name="github" /> Ver no GitHub
              </a>
            </div>
            <p className="fine">Requer macOS 14 Sonoma ou mais recente</p>
          </div>

          <div className="hero-demo">
            <PanelDemo />
            <p className="demo-hint">
              Experimente aqui: <kbd>↑</kbd>
              <kbd>↓</kbd>, <kbd>P</kbd>, <kbd>⌫</kbd> e <kbd>↩</kbd>
            </p>
          </div>
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
              fica no seu Keychain. Não há conta, servidor nem telemetria. A única conexão que o app faz é para
              conferir se existe uma versão nova no GitHub.
            </p>
            <ul className="checks">
              <li>Criptografia em repouso com chave no Keychain</li>
              <li>Senhas ocultas na lista, ou nem guardadas</li>
              <li>Código aberto: confira você mesmo</li>
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
          <img src="/icon-512.png" alt="" width={88} height={88} />
          <h2>Pare de perder o que você copiou.</h2>
          <a className="button" href={downloadURL}>
            <Icon name="download" /> Baixar o OptPaste
          </a>
          <p className="fine">
            {release ? `Versão ${release.version} · ` : ''}grátis · macOS 14+
          </p>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Alirio Guerra</span>
        <a href={REPO_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a href={`${REPO_URL}/releases`} target="_blank" rel="noreferrer">
          Releases
        </a>
      </footer>
    </>
  )
}
