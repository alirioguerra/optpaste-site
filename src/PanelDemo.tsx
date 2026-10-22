import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'
import type { content } from './i18n'

type Strings = (typeof content)['pt']['demo']

type Item =
  | { id: number; kind: 'text'; text: string; app: string; time: string; pinned?: boolean }
  | { id: number; kind: 'password'; text: string; app: string; time: string; pinned?: boolean }
  | { id: number; kind: 'image'; app: string; time: string; pinned?: boolean }
  | { id: number; kind: 'file'; name: string; path: string; app: string; time: string; pinned?: boolean }

const initialItems = ({ meeting, file, times }: Strings['items']): Item[] => [
  { id: 1, kind: 'text', text: meeting, app: '#34c759', time: times.now },
  { id: 2, kind: 'password', text: 'hun••••••••', app: '#0a84ff', time: times.minutes(1) },
  { id: 3, kind: 'image', app: '#ff9f0a', time: times.minutes(4) },
  { id: 4, kind: 'file', name: file.name, path: file.path, app: '#5e5ce6', time: times.minutes(12), pinned: true },
  { id: 5, kind: 'text', text: 'https://github.com/alirioguerra/OptPaste', app: '#ff375f', time: times.minutes(20) },
  { id: 6, kind: 'text', text: 'npm run dev -- --host', app: '#8e8e93', time: times.hours(1) },
]

const sorted = (items: Item[]) => [...items.filter((i) => i.pinned), ...items.filter((i) => !i.pinned)]

// A working replica of the history panel: ⌥V toggles it, the keyboard drives it like the app.
export function PanelDemo({ t }: { t: Strings }) {
  const [items, setItems] = useState(() => sorted(initialItems(t.items)))
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(true)
  const [toast, setToast] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  const flash = useCallback((message: string) => {
    setToast(message)
    window.setTimeout(() => setToast(null), 1400)
  }, [])

  const paste = useCallback(
    (index: number) => {
      if (!items[index]) return
      flash(t.pasted)
      setOpen(false)
    },
    [items, flash, t.pasted],
  )

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey && event.code === 'KeyV') {
        event.preventDefault()
        setOpen((value) => !value)
        setSelected(0)
        return
      }
      if (!open || !panelRef.current?.contains(document.activeElement)) return

      const key = event.key.toLowerCase()
      if (key === 'arrowdown' || key === 'arrowup') {
        event.preventDefault()
        const step = key === 'arrowdown' ? 1 : -1
        setSelected((index) => Math.min(Math.max(index + step, 0), items.length - 1))
      } else if (key === 'enter') {
        event.preventDefault()
        paste(selected)
      } else if (key === 'escape') {
        setOpen(false)
      } else if (key === 'p') {
        const target = items[selected]
        if (!target) return
        const next = sorted(items.map((i) => (i.id === target.id ? { ...i, pinned: !i.pinned } : i)))
        setItems(next)
        setSelected(next.findIndex((i) => i.id === target.id))
      } else if (key === 'backspace' || key === 'delete') {
        event.preventDefault()
        setItems((current) => current.filter((_, index) => index !== selected))
        setSelected((index) => Math.max(0, Math.min(index, items.length - 2)))
      } else if (/^[1-9]$/.test(key)) {
        paste(Number(key) - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, items, selected, paste])

  useEffect(() => {
    if (open) panelRef.current?.focus({ preventScroll: true })
  }, [open])

  // Pinning moves the row to the top, so follow it there. Scrolls only the list, never the page.
  useEffect(() => {
    const list = panelRef.current?.querySelector<HTMLElement>('.panel-list')
    const row = list?.querySelectorAll<HTMLElement>('.row')[selected]
    if (!list || !row) return
    const top = row.getBoundingClientRect().top - list.getBoundingClientRect().top + list.scrollTop
    if (top < list.scrollTop) list.scrollTop = top
    else if (top + row.offsetHeight > list.scrollTop + list.clientHeight) list.scrollTop = top + row.offsetHeight - list.clientHeight
  }, [selected, items])

  return (
    <div className="demo">
      <div className={`panel ${open ? 'is-open' : ''}`} ref={panelRef} tabIndex={-1} aria-label={t.label}>
        <div className="panel-header">
          <span className="grabber" />
          <div className="panel-title">
            <strong>{t.title}</strong>
            <button
              type="button"
              className="link"
              disabled={items.length === 0}
              onClick={() => setItems((current) => current.filter((i) => i.pinned))}
            >
              {t.clear}
            </button>
          </div>
        </div>

        <ul className="panel-list">
          {items.length === 0 && (
            <li className="panel-empty">
              <strong>{t.empty}</strong>
              <span>{t.emptyHint}</span>
            </li>
          )}
          {items.map((item, index) => (
            <li
              key={item.id}
              className={`row ${index === selected ? 'is-selected' : ''}`}
              onMouseEnter={() => setSelected(index)}
              onClick={() => paste(index)}
            >
              <RowContent item={item} imageAlt={t.imageAlt} />
              <div className="row-meta">
                <span className="app-dot" style={{ background: item.app }} />
                <span>{item.time}</span>
                {item.pinned && <Icon name="pin" size={12} />}
                <span className="spacer" />
                {index === selected ? (
                  <span className="row-actions">
                    <button type="button" aria-label={item.pinned ? t.unpin : t.pin} onClick={(e) => {
                      e.stopPropagation()
                      const next = sorted(items.map((i) => (i.id === item.id ? { ...i, pinned: !i.pinned } : i)))
                      setItems(next)
                      setSelected(next.findIndex((i) => i.id === item.id))
                    }}>
                      <Icon name="pin" size={13} />
                    </button>
                    <button type="button" aria-label={t.remove} onClick={(e) => {
                      e.stopPropagation()
                      setItems((current) => current.filter((i) => i.id !== item.id))
                    }}>
                      <Icon name="trash" size={13} />
                    </button>
                  </span>
                ) : (
                  index < 9 && <span className="mono">{index + 1}</span>
                )}
              </div>
            </li>
          ))}
        </ul>

        <div className="panel-footer">{t.footer}</div>
      </div>

      {!open && (
        <button type="button" className="demo-reopen" onClick={() => setOpen(true)}>
          {t.reopen}
        </button>
      )}
      <div className={`toast ${toast ? 'is-visible' : ''}`} role="status">
        {toast}
      </div>
    </div>
  )
}

function RowContent({ item, imageAlt }: { item: Item; imageAlt: string }) {
  switch (item.kind) {
    case 'text':
      return <p className="row-text">{item.text}</p>
    case 'password':
      return (
        <p className="row-text mono">
          <Icon name="key" size={14} /> {item.text}
        </p>
      )
    case 'image':
      // Photo from Unsplash (images.unsplash.com/photo-1506905925346-21bda4d32df4)
      return <img className="row-image" src="/demo/copied-image.jpg" alt={imageAlt} />
    case 'file':
      return (
        <div className="row-file">
          <span className="file-icon">PDF</span>
          <div>
            <strong>{item.name}</strong>
            <span>{item.path}</span>
          </div>
        </div>
      )
  }
}
