import { useEffect, useState } from 'react'

export const REPO_URL = 'https://github.com/alirioguerra/OptPaste'
export const RELEASES_URL = `${REPO_URL}/releases/latest`

type Release = {
  tag_name: string
  html_url: string
  draft: boolean
  prerelease: boolean
  assets: { name: string; browser_download_url: string }[]
}

export type LatestRelease = {
  version: string
  prerelease: boolean
  downloadURL: string
}

// Newest published release (betas included), pointing straight at the .dmg/.zip when there is one.
export function useLatestRelease() {
  const [release, setRelease] = useState<LatestRelease | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch('https://api.github.com/repos/alirioguerra/OptPaste/releases?per_page=10', {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : []))
      .then((releases: Release[]) => {
        const latest = releases.find((r) => !r.draft)
        if (!latest) return
        const asset = latest.assets.find((a) => /\.(dmg|zip)$/i.test(a.name))
        setRelease({
          version: latest.tag_name.replace(/^v/, ''),
          prerelease: latest.prerelease,
          downloadURL: asset?.browser_download_url ?? latest.html_url,
        })
      })
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return release
}
