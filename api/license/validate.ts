import { json, readFields } from '../_lib/http.js'
import { getLicense } from '../_lib/licenses.js'

export async function POST(request: Request) {
  const { license_key: key = '', instance_id: instanceId = '' } = await readFields(request)
  const license = key ? await getLicense(key) : null
  if (!license) return json({ valid: false, error: 'license_key not found.' }, 404)
  if (license.status === 'revoked') return json({ valid: false, error: 'This license key is disabled.' })
  if (!license.instances.some((instance) => instance.id === instanceId)) {
    return json({ valid: false, error: 'instance_id not found.' })
  }
  return json({ valid: true, error: null, meta: { customer_email: license.email } })
}
