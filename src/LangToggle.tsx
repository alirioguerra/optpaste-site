import type { Lang } from './i18n'

const flags: Record<Lang, { name: string; svg: React.ReactNode }> = {
  pt: {
    name: 'Português',
    svg: (
      <svg viewBox="0 0 28 20" aria-hidden="true">
        <rect width="28" height="20" fill="#009c3b" />
        <path d="M14 2.5 25 10 14 17.5 3 10Z" fill="#ffdf00" />
        <circle cx="14" cy="10" r="4.4" fill="#002776" />
      </svg>
    ),
  },
  en: {
    name: 'English',
    svg: (
      <svg viewBox="0 0 28 20" aria-hidden="true">
        <rect width="28" height="20" fill="#fff" />
        {[0, 2, 4, 6, 8, 10, 12].map((i) => (
          <rect key={i} y={(i * 20) / 13} width="28" height={20 / 13} fill="#b22234" />
        ))}
        <rect width="12" height={(7 * 20) / 13} fill="#3c3b6e" />
      </svg>
    ),
  },
}

export function LangToggle({ lang, onChange, label }: { lang: Lang; onChange: (lang: Lang) => void; label: string }) {
  return (
    <div className="lang-toggle" role="group" aria-label={label}>
      {(Object.keys(flags) as Lang[]).map((option) => (
        <button
          key={option}
          type="button"
          className={option === lang ? 'is-active' : ''}
          aria-pressed={option === lang}
          aria-label={flags[option].name}
          title={flags[option].name}
          onClick={() => onChange(option)}
        >
          {flags[option].svg}
        </button>
      ))}
    </div>
  )
}
