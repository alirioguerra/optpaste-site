const paths = {
  key: 'M15.5 7.5a3.5 3.5 0 1 1-2.6 5.85L4 22H2v-3l1-1h2v-2h2l1.65-1.65A3.5 3.5 0 0 1 15.5 7.5ZM16.5 9.5h.01',
  coffee: 'M6 2v2M10 2v2M14 2v2M4 8h13v8a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4ZM17 8a4 4 0 1 1 0 8h-1',
  pin: 'M12 17v5M9 3h6l-1 6 4 4v2H6v-2l4-4-1-6Z',
  trash: 'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',
  file: 'M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5ZM14 3v5h5',
  keyboard: 'M3 6h18v12H3zM7 10h.01M11 10h.01M15 10h.01M7 14h10',
  paste: 'M9 4h6v3H9zM15 5h3v16H6V5h3M9 12h6M9 16h4',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  layers: 'M12 3 2 8l10 5 10-5-10-5ZM2 13l10 5 10-5M2 17.5l10 5 10-5',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12ZM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
  github:
    'M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21',
  download: 'M12 3v12M7 10l5 5 5-5M4 21h16',
  apple:
    'M16.4 12.6c0-2.4 2-3.6 2.1-3.7a4.5 4.5 0 0 0-3.6-1.9c-1.5-.2-3 .9-3.7.9-.8 0-2-.9-3.2-.9a4.8 4.8 0 0 0-4 2.4c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4a10 10 0 0 0 1.3-2.7 4.2 4.2 0 0 1-2.3-3.9ZM14 5.4A4.2 4.2 0 0 0 15 2.3a4.3 4.3 0 0 0-2.8 1.4 4 4 0 0 0-1 3 3.5 3.5 0 0 0 2.8-1.3Z',
  windows:
    'M5.1 2Q8.8.2 13.3 2l-1.9 7.7Q7.3 7.9 3.1 9.2ZM14.4 3.2q4.1 1.9 8.6.8l-2.2 7.4q-4.1 1.6-8.3-.5ZM2.4 11.1q4.4-1.6 8.3.3l-1.9 7.7q-4.2-2.2-8.4-.5ZM12 12.5q4.1 2 8.4.7l-2.1 7.4q-4.4 2.3-8.4-.3Z',
} as const

export type IconName = keyof typeof paths

export function Icon({ name, size = 18 }: { name: IconName; size?: number }) {
  const filled = name === 'apple' || name === 'windows'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
