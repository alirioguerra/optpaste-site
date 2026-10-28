import { useEffect, useState, type ReactNode } from 'react'
import { Icon, type IconName } from './Icon'

export type Lang = 'pt' | 'en'

const STORAGE_KEY = 'optpaste.lang'

const winKey = (
  <kbd aria-label="Windows">
    <Icon name="windows" />
  </kbd>
)

export const COFFEE_URL = 'https://www.buymeacoffee.com/alirioguerra'
export const REPO_URL = 'https://github.com/alirioguerra/OptPaste'
export const PROFILE_URL = 'https://alirioguerra.github.io'

const coffeeLink = <a href={COFFEE_URL}>buymeacoffee.com/alirioguerra</a>

const optV = (
  <>
    <kbd>⌥</kbd>
    <kbd>V</kbd>
  </>
)

/** Portuguese for Portuguese-speaking devices, English for everyone else, unless the visitor picked one. */
function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'pt' || saved === 'en') return saved
  } catch {
    // Storage blocked: fall back to the device language.
  }
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language]
  return languages.some((language) => language?.toLowerCase().startsWith('pt')) ? 'pt' : 'en'
}

export function useLang() {
  const [lang, setLang] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en'
    document.title = content[lang].meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', content[lang].meta.description)
  }, [lang])

  const choose = (next: Lang) => {
    setLang(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // Not remembered across visits, but the switch still works.
    }
  }

  return [lang, choose] as const
}

type Content = {
  meta: { title: string; description: string }
  nav: { features: string; privacy: string; shortcuts: string; download: string; language: string }
  hero: {
    iconAlt: string
    version: (prerelease: boolean, version?: string) => string
    free: string
    title: string
    titleAccent: string
    lead: ReactNode
    download: string
    fine: string
    hint: ReactNode
  }
  windows: { title: ReactNode; lead: ReactNode; checks: string[]; imageAlt: string }
  features: { title: string; lead: string; items: { icon: IconName; title: string; text: string }[] }
  privacy: { title: string; lead: string; checks: string[]; source: string; sourceButton: string }
  shortcuts: { title: string; lead: string; items: [string[], string][] }
  final: { title: string; download: string; fine: (version?: string) => string }
  footer: { coffee: ReactNode }
  demo: {
    label: string
    title: string
    clear: string
    empty: string
    emptyHint: string
    pasted: string
    pin: string
    unpin: string
    remove: string
    imageAlt: string
    footer: string
    reopen: ReactNode
    items: {
      meeting: string
      file: { name: string; path: string }
      times: { now: string; minutes: (n: number) => string; hours: (n: number) => string }
    }
  }
}

export const content: Record<Lang, Content> = {
  pt: {
    meta: {
      title: 'OptPaste — histórico da área de transferência para Mac',
      description:
        'Tudo o que você copia, a um atalho de distância. OptPaste guarda o histórico da área de transferência do seu Mac e abre com ⌥V.',
    },
    nav: { features: 'Recursos', privacy: 'Privacidade', shortcuts: 'Atalhos', download: 'Baixar', language: 'Idioma' },
    hero: {
      iconAlt: 'Ícone do OptPaste',
      version: (prerelease, version) => (version ? `${prerelease ? 'Beta' : 'Versão'} ${version}` : 'Beta'),
      free: 'Grátis para sempre',
      title: 'Tudo o que você copia,',
      titleAccent: ' a um atalho de distância.',
      lead: (
        <>
          O OptPaste guarda o histórico da área de transferência do seu Mac. Copiou algo há dez minutos e já
          sobrescreveu? Aperte {optV} e cole de novo.
        </>
      ),
      download: 'Baixar para Mac',
      fine: 'Grátis, sem anúncios e sem conta · requer macOS 14 Sonoma ou mais recente',
      hint: (
        <>
          Experimente aqui: <kbd>↑</kbd>
          <kbd>↓</kbd>, <kbd>P</kbd>, <kbd>⌫</kbd> e <kbd>↩</kbd>
        </>
      ),
    },
    windows: {
      title: <>O {winKey} + <kbd>V</kbd> do Windows, agora no Mac.</>,
      lead: (
        <>
          No Windows, a tecla do Windows + V abre uma janela com os últimos itens copiados, e um clique cola o que você
          escolher. O Mac também guarda um histórico, mas falta esse atalho direto e uma janela feita só para isso. O
          OptPaste traz essa experiência para o Mac, com {optV} no lugar de {winKey} + <kbd>V</kbd>.
        </>
      ),
      checks: [
        'Abre por cima de qualquer app, onde você estiver',
        'Texto, links, imagens e arquivos no mesmo histórico',
        'Escolheu o item, ele é colado no app em que você estava',
      ],
      imageAlt: 'Painel do OptPaste aberto sobre o Chrome no macOS, com texto, link e imagem copiados',
    },
    features: {
      title: 'Feito para quem copia e cola o dia todo.',
      lead: 'Sem janelas para gerenciar, sem conta, sem configuração. Ele só lembra.',
      items: [
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
      ],
    },
    privacy: {
      title: 'Seu histórico não sai do seu Mac.',
      lead: 'Tudo o que o OptPaste grava em disco é criptografado com AES-256-GCM. A chave é gerada no seu Mac e fica no seu Keychain. Não há conta, servidor nem telemetria. O app só se conecta à internet para conferir se existe uma versão nova.',
      checks: [
        'Tudo fica salvo localmente, só no seu Mac',
        'Nada do que você copia é enviado para servidores',
        'Criptografia em repouso com chave no Keychain',
        'Senhas ocultas na lista, ou nem guardadas',
      ],
      source: 'O código do OptPaste é aberto. Não precisa acreditar só na minha palavra: veja você mesmo o que o app faz.',
      sourceButton: 'Ver o código no GitHub',
    },
    shortcuts: {
      title: 'Mãos no teclado.',
      lead: 'Abra, encontre e cole sem tocar no mouse.',
      items: [
        [['⌥', 'V'], 'Abrir o histórico'],
        [['↑', '↓'], 'Navegar pelos itens'],
        [['↩'], 'Colar o item selecionado'],
        [['1', '…', '9'], 'Colar direto pela posição'],
        [['P'], 'Fixar ou desafixar'],
        [['⌫'], 'Apagar do histórico'],
        [['esc'], 'Fechar'],
      ],
    },
    final: {
      title: 'Pare de perder o que você copiou.',
      download: 'Baixar o OptPaste',
      fine: (version) => `${version ? `Versão ${version} · ` : ''}Grátis para sempre · macOS 14+`,
    },
    footer: {
      coffee: (
        <>
          O OptPaste é e sempre será gratuito. Se ele te ajuda e você quiser apoiar o projeto, me pague um café em{' '}
          {coffeeLink}.
        </>
      ),
    },
    demo: {
      label: 'Demonstração do painel do OptPaste',
      title: 'Área de transferência',
      clear: 'Limpar tudo',
      empty: 'Nada copiado ainda',
      emptyHint: 'Copie algo com ⌘C e ele aparecerá aqui.',
      pasted: 'Colado ✓',
      pin: 'Fixar',
      unpin: 'Desafixar',
      remove: 'Apagar',
      imageAlt: 'Imagem copiada',
      footer: '↩ colar   ↑↓ navegar   P fixar   ⌫ apagar   esc fechar',
      reopen: (
        <>
          Pressione {optV} ou clique para abrir
        </>
      ),
      items: {
        meeting: 'Reunião remarcada para quinta às 15h, sala 3. Levar a proposta revisada.',
        file: { name: 'Proposta-final.pdf', path: '~/Documents/Clientes' },
        times: { now: 'agora', minutes: (n) => `há ${n} min`, hours: (n) => `há ${n} h` },
      },
    },
  },
  en: {
    meta: {
      title: 'OptPaste — clipboard history for Mac',
      description:
        'Everything you copy, one shortcut away. OptPaste keeps your Mac’s clipboard history and opens with ⌥V.',
    },
    nav: { features: 'Features', privacy: 'Privacy', shortcuts: 'Shortcuts', download: 'Download', language: 'Language' },
    hero: {
      iconAlt: 'OptPaste icon',
      version: (prerelease, version) => (version ? `${prerelease ? 'Beta' : 'Version'} ${version}` : 'Beta'),
      free: 'Free forever',
      title: 'Everything you copy,',
      titleAccent: ' one shortcut away.',
      lead: (
        <>
          OptPaste keeps your Mac’s clipboard history. Copied something ten minutes ago and already overwrote it? Press{' '}
          {optV} and paste it again.
        </>
      ),
      download: 'Download for Mac',
      fine: 'Free, no ads, no account · requires macOS 14 Sonoma or later',
      hint: (
        <>
          Try it here: <kbd>↑</kbd>
          <kbd>↓</kbd>, <kbd>P</kbd>, <kbd>⌫</kbd> and <kbd>↩</kbd>
        </>
      ),
    },
    windows: {
      title: <>Windows’ {winKey} + <kbd>V</kbd>, now on the Mac.</>,
      lead: (
        <>
          On Windows, Windows key + V opens a window with your latest copies, and one click pastes the one you pick.
          The Mac keeps a history too, but it has no direct shortcut and no window built just for it. OptPaste brings
          that experience to the Mac, with {optV} instead of {winKey} + <kbd>V</kbd>.
        </>
      ),
      checks: [
        'Opens on top of any app, wherever you are',
        'Text, links, images and files in one history',
        'Pick an item and it’s pasted into the app you were in',
      ],
      imageAlt: 'OptPaste panel open over Chrome on macOS, with copied text, a link and an image',
    },
    features: {
      title: 'Made for people who copy and paste all day.',
      lead: 'No windows to manage, no account, no setup. It just remembers.',
      items: [
        {
          icon: 'keyboard',
          title: 'One shortcut, from any app',
          text: 'Press ⌥V and your history shows up wherever you are. Prefer another combo? Record yours in seconds.',
        },
        {
          icon: 'paste',
          title: 'Pastes for you',
          text: 'Pick an item and OptPaste pastes it straight into the app you were using. Or have it just copy.',
        },
        {
          icon: 'pin',
          title: 'Pin what matters',
          text: 'Addresses, canned replies, code snippets: pinned items stay on top and survive “Clear all”.',
        },
        {
          icon: 'layers',
          title: 'Text, images and files',
          text: 'Keeps everything that goes through the clipboard, with the source app’s icon and the time it was copied.',
        },
        {
          icon: 'eye',
          title: 'Masked passwords',
          text: 'Anything from a password manager shows up hidden in the list. Or turn it off and never store passwords.',
        },
        {
          icon: 'bolt',
          title: 'Light and out of the way',
          text: 'Lives in the menu bar, starts at login and keeps 10 to 200 items, your call.',
        },
      ],
    },
    privacy: {
      title: 'Your history never leaves your Mac.',
      lead: 'Everything OptPaste writes to disk is encrypted with AES-256-GCM. The key is generated on your Mac and stays in your Keychain. No account, no server, no telemetry. The app only goes online to check for a new version.',
      checks: [
        'Everything is stored locally, only on your Mac',
        'Nothing you copy is ever sent to a server',
        'Encryption at rest with the key in your Keychain',
        'Passwords hidden in the list, or not stored at all',
      ],
      source: 'OptPaste is open source. You don’t have to take my word for it: see for yourself what the app does.',
      sourceButton: 'View the code on GitHub',
    },
    shortcuts: {
      title: 'Hands on the keyboard.',
      lead: 'Open, find and paste without touching the mouse.',
      items: [
        [['⌥', 'V'], 'Open the history'],
        [['↑', '↓'], 'Move through items'],
        [['↩'], 'Paste the selected item'],
        [['1', '…', '9'], 'Paste by position'],
        [['P'], 'Pin or unpin'],
        [['⌫'], 'Delete from history'],
        [['esc'], 'Close'],
      ],
    },
    final: {
      title: 'Stop losing what you copied.',
      download: 'Download OptPaste',
      fine: (version) => `${version ? `Version ${version} · ` : ''}Free forever · macOS 14+`,
    },
    footer: {
      coffee: (
        <>
          OptPaste is and always will be free. If it helps you and you’d like to support it, buy me a coffee at{' '}
          {coffeeLink}.
        </>
      ),
    },
    demo: {
      label: 'OptPaste panel demo',
      title: 'Clipboard',
      clear: 'Clear all',
      empty: 'Nothing copied yet',
      emptyHint: 'Copy something with ⌘C and it will show up here.',
      pasted: 'Pasted ✓',
      pin: 'Pin',
      unpin: 'Unpin',
      remove: 'Delete',
      imageAlt: 'Copied image',
      footer: '↩ paste   ↑↓ navigate   P pin   ⌫ delete   esc close',
      reopen: (
        <>
          Press {optV} or click to open
        </>
      ),
      items: {
        meeting: 'Meeting moved to Thursday at 3 pm, room 3. Bring the revised proposal.',
        file: { name: 'Final-proposal.pdf', path: '~/Documents/Clients' },
        times: { now: 'now', minutes: (n) => `${n} min ago`, hours: (n) => `${n} h ago` },
      },
    },
  },
}
