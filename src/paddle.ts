type PaddleJS = {
  Environment: { set(environment: 'sandbox'): void }
  Initialize(options: { token: string }): void
  Checkout: { open(options: { items: { priceId: string; quantity: number }[] }): void }
}

declare global {
  interface Window {
    Paddle?: PaddleJS
  }
}

const token = import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string | undefined
const priceId = import.meta.env.VITE_PADDLE_PRICE_ID as string | undefined

export const CHECKOUT_HASH = '#comprar'

let initialized = false

/** Opens Paddle's overlay checkout; the license key arrives by email once it completes. */
export function openCheckout() {
  const paddle = window.Paddle
  if (!paddle || !token || !priceId) return
  if (!initialized) {
    // Sandbox client tokens start with test_, live ones with live_.
    if (token.startsWith('test_')) paddle.Environment.set('sandbox')
    paddle.Initialize({ token })
    initialized = true
  }
  paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] })
}
