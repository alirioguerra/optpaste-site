import type { License } from './licenses.js'

/** Sends the license key to the buyer through Resend. */
export async function sendLicenseEmail(license: License) {
  const text = [
    'Obrigado por comprar o OptPaste!',
    '',
    `Sua chave de licença: ${license.key}`,
    '',
    'Para ativar, abra o OptPaste, vá em Preferências > Licença, cole a chave e clique em Ativar.',
    'A chave funciona em até 3 Macs. Para trocar de Mac, use "Desativar neste Mac" no antigo.',
    '',
    'Guarde este e-mail. Se precisar de ajuda, é só responder.',
  ].join('\n')

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: process.env.LICENSE_EMAIL_FROM,
      to: license.email,
      reply_to: process.env.LICENSE_EMAIL_REPLY_TO || undefined,
      subject: 'Sua licença do OptPaste',
      text,
    }),
  })
  if (!response.ok) throw new Error(`Resend: ${response.status} ${await response.text()}`)
}
