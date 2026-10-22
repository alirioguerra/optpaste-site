import { json, readFields } from '../_lib/http.js'
import { ACTIVATION_LIMIT, getLicense, newInstance, saveLicense } from '../_lib/licenses.js'

// Same response shape as the Lemon Squeezy License API, which the app was first written against.
export async function POST(request: Request) {
  const { license_key: key = '', instance_name: name = 'Mac' } = await readFields(request)
  const license = key ? await getLicense(key) : null
  if (!license) return json({ activated: false, error: 'license_key not found.' }, 404)
  if (license.status === 'revoked') return json({ activated: false, error: 'This license key is disabled.' }, 400)

  // Reinstalling macOS loses the Keychain; reusing the Mac's previous slot keeps it from piling up.
  let instance = license.instances.find((existing) => existing.name === name)
  if (!instance) {
    if (license.instances.length >= ACTIVATION_LIMIT) {
      return json({ activated: false, error: 'This license key has reached the activation limit.' }, 400)
    }
    instance = newInstance(name)
    await saveLicense({ ...license, instances: [...license.instances, instance] })
  }
  return json({ activated: true, error: null, instance: { id: instance.id }, meta: { customer_email: license.email } })
}
