import { randomBytes, randomUUID } from 'node:crypto'
import { Redis } from '@upstash/redis'

export const ACTIVATION_LIMIT = 3

export type Instance = { id: string; name: string; createdAt: string }

export type License = {
  key: string
  email: string
  transactionId: string
  status: 'active' | 'revoked'
  emailed: boolean
  createdAt: string
  instances: Instance[]
}

// The Upstash integration on Vercel sets either pair of variables, depending on how it was added.
const redis = new Redis({
  url: process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL ?? '',
  token: process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN ?? '',
})

const licenseKey = (key: string) => `license:${key}`
const transactionKey = (id: string) => `transaction:${id}`

// Crockford base32 without I, L, O, U: nothing that reads as another character.
const ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ'

/** OPTP-XXXX-XXXX-XXXX-XXXX, 80 random bits. */
function generateKey() {
  const chars = [...randomBytes(16)].map((byte) => ALPHABET[byte % 32]).join('')
  return ['OPTP', ...chars.match(/.{4}/g)!].join('-')
}

export function normalizeKey(key: string) {
  return key.trim().toUpperCase()
}

export async function getLicense(key: string) {
  return redis.get<License>(licenseKey(normalizeKey(key)))
}

export async function saveLicense(license: License) {
  await redis.set(licenseKey(license.key), license)
}

/** The license for a transaction, created on first call; webhook retries get the same one back. */
export async function licenseForTransaction(transactionId: string, email: string) {
  const key = generateKey()
  const claimed = await redis.set(transactionKey(transactionId), key, { nx: true })
  if (!claimed) {
    const existing = await redis.get<string>(transactionKey(transactionId))
    const license = existing ? await getLicense(existing) : null
    if (license) return license
  }
  const license: License = {
    key,
    email,
    transactionId,
    status: 'active',
    emailed: false,
    createdAt: new Date().toISOString(),
    instances: [],
  }
  await redis.set(transactionKey(transactionId), key)
  await saveLicense(license)
  return license
}

export async function licenseByTransaction(transactionId: string) {
  const key = await redis.get<string>(transactionKey(transactionId))
  return key ? getLicense(key) : null
}

export function newInstance(name: string): Instance {
  return { id: randomUUID(), name: name.slice(0, 100), createdAt: new Date().toISOString() }
}
