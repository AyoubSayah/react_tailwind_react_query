export type LoginDto = { email: string; password: string }

export async function login(dto: LoginDto) {
  const res = await fetch('/api/login', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(dto),
  })

  if (!res.ok) throw new Error('Login failed')
  return res.json()
}

export async function logout() {
  await fetch('/api/logout', { method: 'POST' })
}
