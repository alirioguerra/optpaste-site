import { sendLicenseEmail } from './_lib/email.js'
import { licenseByTransaction, licenseForTransaction, saveLicense } from './_lib/licenses.js'
import { customerEmail, verifySignature } from './_lib/paddle.js'

type PaddleEvent = { event_type: string; data: unknown }
type Transaction = { id: string; customer_id: string; items: { price: { id: string } }[] }
type Adjustment = { action: string; status: string; transaction_id: string }

// Paddle retries anything that isn't a 2xx, so failures throw and ignored events return 200.
export async function POST(request: Request) {
  const rawBody = await request.text()
  if (!verifySignature(rawBody, request.headers.get('paddle-signature'), process.env.PADDLE_WEBHOOK_SECRET ?? '')) {
    return new Response('invalid signature', { status: 401 })
  }

  const event = JSON.parse(rawBody) as PaddleEvent
  switch (event.event_type) {
    case 'transaction.completed': {
      const data = event.data as Transaction
      if (!data.items.some((item) => item.price.id === process.env.PADDLE_PRICE_ID)) break
      const license = await licenseForTransaction(data.id, await customerEmail(data.customer_id))
      if (!license.emailed) {
        await sendLicenseEmail(license)
        await saveLicense({ ...license, emailed: true })
      }
      break
    }
    case 'adjustment.created':
    case 'adjustment.updated': {
      const data = event.data as Adjustment
      const takesMoneyBack = data.action === 'refund' || data.action === 'chargeback'
      if (!takesMoneyBack || data.status !== 'approved') break
      const license = await licenseByTransaction(data.transaction_id)
      if (license && license.status !== 'revoked') {
        await saveLicense({ ...license, status: 'revoked' })
      }
      break
    }
  }
  return new Response('ok')
}
