import { useEffect, useState } from 'react'

export type LatestRelease = {
  version: string
  prerelease: boolean
  url: string
}

// Written by the app repo's scripts/release.sh on each release.
export function useLatestRelease() {
  const [release, setRelease] = useState<LatestRelease | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('/latest.json', { cache: 'no-cache', signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((latest: LatestRelease | null) => latest && setRelease(latest))
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return release
}
