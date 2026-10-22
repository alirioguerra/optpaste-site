import { useEffect } from 'react'
import { Icon } from './Icon'
import { LangToggle } from './LangToggle'
import { PanelDemo } from './PanelDemo'
import { content, useLang } from './i18n'
import { CHECKOUT_HASH, openCheckout } from './paddle'
import { useLatestRelease } from './useLatestRelease'

const icon = `${import.meta.env.BASE_URL}icon-512.png`
const DOWNLOAD_URL = '/downloads/OptPaste.dmg'

export default function App() {
  const release = useLatestRelease()
  const downloadURL = release?.url ?? DOWNLOAD_URL
  const [lang, setLang] = useLang()
  const t = content[lang]

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
          <a href="#recursos">{t.nav.features}</a>
          <a href="#privacidade">{t.nav.privacy}</a>
          <a href="#atalhos">{t.nav.shortcuts}</a>
        </nav>
        <LangToggle lang={lang} onChange={setLang} label={t.nav.language} />
        <a className="button small" href={downloadURL}>
          {t.nav.download}
        </a>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <img className="hero-icon" src={icon} alt={t.hero.iconAlt} width={112} height={112} />
            <span className="pill">
              {t.hero.version(release?.prerelease ?? true, release?.version)} · {t.hero.trial}
            </span>
            <h1>
              {t.hero.title}
              <span className="gradient-text">{t.hero.titleAccent}</span>
            </h1>
            <p className="lead">{t.hero.lead}</p>
            <div className="cta">
              <a className="button" href={downloadURL}>
                <Icon name="apple" /> {t.hero.download}
              </a>
              <a className="button ghost" href={CHECKOUT_HASH} onClick={buy}>
                <Icon name="key" /> {t.hero.buy}
              </a>
            </div>
            <p className="fine">{t.hero.fine}</p>
          </div>

          <div className="hero-demo">
            <PanelDemo key={lang} t={t.demo} />
            <p className="demo-hint">{t.hero.hint}</p>
          </div>
        </section>

        <section className="section windows">
          <div>
            <h2>{t.windows.title}</h2>
            <p className="section-lead">{t.windows.lead}</p>
            <ul className="checks">
              {t.windows.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>
          <img src="/demo/optpaste-on-mac.jpg" alt={t.windows.imageAlt} width={1400} height={1407} loading="lazy" />
        </section>

        <section id="recursos" className="section">
          <h2>{t.features.title}</h2>
          <p className="section-lead">{t.features.lead}</p>
          <div className="grid">
            {t.features.items.map((feature) => (
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
            <h2>{t.privacy.title}</h2>
            <p className="section-lead">{t.privacy.lead}</p>
            <ul className="checks">
              {t.privacy.checks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </div>
        </section>

        <section id="atalhos" className="section">
          <h2>{t.shortcuts.title}</h2>
          <p className="section-lead">{t.shortcuts.lead}</p>
          <dl className="shortcuts">
            {t.shortcuts.items.map(([keys, label]) => (
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
          <h2>{t.final.title}</h2>
          <div className="cta">
            <a className="button" href={downloadURL}>
              <Icon name="download" /> {t.final.download}
            </a>
            <a className="button ghost" href={CHECKOUT_HASH} onClick={buy}>
              <Icon name="key" /> {t.final.buy}
            </a>
          </div>
          <p className="fine">{t.final.fine(release?.version)}</p>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Alirio Guerra</span>
      </footer>
    </>
  )
}
