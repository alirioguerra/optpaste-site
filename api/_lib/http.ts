/** Fields from a form-encoded (what the app sends) or JSON body. */
export async function readFields(request: Request): Promise<Record<string, string>> {
  const text = await request.text()
  if (request.headers.get('content-type')?.includes('application/json')) {
    try {
      const body = JSON.parse(text)
      return Object.fromEntries(Object.entries(body ?? {}).map(([k, v]) => [k, String(v)]))
    } catch {
      return {}
    }
  }
  return Object.fromEntries(new URLSearchParams(text))
}

export function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } })
}
