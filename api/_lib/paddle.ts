import { createHmac, timingSafeEqual } from 'node:crypto'

const apiBase = process.env.PADDLE_ENV === 'production' ? 'https://api.paddle.com' : 'https://sandbox-api.paddle.com'

/** Checks the `Paddle-Signature` header (`ts=…;h1=…`) against the raw body. */
export function verifySignature(rawBody: string, header: string | null, secret: string, toleranceSeconds = 300) {
  if (!header || !secret) return false
  const parts = Object.fromEntries(header.split(';').map((part) => part.split('=') as [string, string]))
  const timestamp = Number(parts.ts)
  if (!parts.h1 || !Number.isFinite(timestamp)) return false
  if (Math.abs(Date.now() / 1000 - timestamp) > toleranceSeconds) return false
  const expected = createHmac('sha256', secret).update(`${parts.ts}:${rawBody}`).digest()
  const received = Buffer.from(parts.h1, 'hex')
  return received.length === expected.length && timingSafeEqual(received, expected)
}

export async function customerEmail(customerId: string) {
  const response = await fetch(`${apiBase}/customers/${customerId}`, {
    headers: { Authorization: `Bearer ${process.env.PADDLE_API_KEY}` },
  })
  if (!response.ok) throw new Error(`Paddle customers/${customerId}: ${response.status}`)
  const { data } = (await response.json()) as { data: { email: string } }
  return data.email
}
