export type Client = { id: string; name: string; email?: string }

export async function getClients(): Promise<Client[]> {
  const res = await fetch('/api/clients')
  if (!res.ok) throw new Error('Failed to load clients')
  return res.json()
}
