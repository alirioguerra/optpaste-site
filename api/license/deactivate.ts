import { json, readFields } from '../_lib/http.js'
import { getLicense, saveLicense } from '../_lib/licenses.js'

export async function POST(request: Request) {
  const { license_key: key = '', instance_id: instanceId = '' } = await readFields(request)
  const license = key ? await getLicense(key) : null
  if (!license) return json({ deactivated: false, error: 'license_key not found.' }, 404)
  const instances = license.instances.filter((instance) => instance.id !== instanceId)
  if (instances.length === license.instances.length) {
    return json({ deactivated: false, error: 'instance_id not found.' }, 404)
  }
  await saveLicense({ ...license, instances })
  return json({ deactivated: true, error: null })
}
